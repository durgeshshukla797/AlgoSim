'use client'

import { useState } from 'react'
import QuizInstruction from './QuizInstruction'
import QuizQuestion from './QuizQuestion'

interface Option {
  id: string
  text: string
}

interface Question {
  id: string
  question: string
  options: Option[]
  correctAnswerId: string
  explanation: string
}

interface QuizProps {
  title: string
  questions: Question[]
}

export default function Quiz({ title, questions }: QuizProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})

  const handleStart = () => {
    setIsStarted(true)
  }

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    if (isSubmitted) return
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId })
  }

  const handleSubmit = () => {
    const allAnswered = questions.every((q) => selectedAnswers[q.id])
    if (allAnswered) {
      setIsSubmitted(true)
    }
  }

  const calculateResults = () => {
    return questions.map((q) => selectedAnswers[q.id] === q.correctAnswerId)
  }

  if (!isStarted) {
    return (
      <div className="py-12">
        <QuizInstruction questionCount={questions.length} onStart={handleStart} />
      </div>
    )
  }

  const results = isSubmitted ? calculateResults() : []
  const allAnswered = questions.every((q) => selectedAnswers[q.id])
  const score = results.filter((r) => r).length

  return (
    <div className="py-12">
      <div className="mb-8">
        <h2 className="font-heading text-3xl font-bold text-black mb-2">{title}</h2>
        <p className="text-gray-700">
          {questions.length} questions
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question) => (
          <QuizQuestion
            key={question.id}
            questionId={question.id}
            question={question.question}
            options={question.options}
            correctAnswerId={question.correctAnswerId}
            explanation={question.explanation}
            selectedAnswerId={selectedAnswers[question.id]}
            isSubmitted={isSubmitted}
            onAnswerSelect={handleAnswerSelect}
          />
        ))}
      </div>

      {!isSubmitted && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-8 py-3 font-medium rounded-md transition-colors ${
              allAnswered
                ? 'bg-black text-white hover:bg-gray-900'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Quiz
          </button>
        </div>
      )}

      {isSubmitted && (
        <div className="border border-gray-300 bg-white rounded-lg p-8 max-w-2xl mx-auto mt-8">
          <h3 className="font-heading text-2xl font-semibold text-black mb-4">
            Quiz Completed!
          </h3>
          <p className="text-gray-700 mb-4">
            You scored {score} out of {questions.length}
          </p>
          <p className="text-gray-700">
            Score: {Math.round((score / questions.length) * 100)}%
          </p>
        </div>
      )}
    </div>
  )
}
