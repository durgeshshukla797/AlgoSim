'use client'

interface Option {
  id: string
  text: string
}

interface QuizQuestionProps {
  questionId: string
  question: string
  options: Option[]
  correctAnswerId: string
  explanation: string
  selectedAnswerId?: string
  isSubmitted: boolean
  onAnswerSelect: (questionId: string, optionId: string) => void
}

export default function QuizQuestion({
  questionId,
  question,
  options,
  correctAnswerId,
  explanation,
  selectedAnswerId,
  isSubmitted,
  onAnswerSelect,
}: QuizQuestionProps) {
  const handleOptionClick = (optionId: string) => {
    if (isSubmitted) return
    onAnswerSelect(questionId, optionId)
  }

  const getOptionStyle = (optionId: string) => {
    if (!isSubmitted) {
      const isSelected = selectedAnswerId === optionId
      return isSelected
        ? 'border-black bg-gray-100 cursor-pointer'
        : 'border-gray-300 hover:border-black cursor-pointer'
    }

    if (optionId === correctAnswerId) {
      return 'border-green-500 bg-green-50 cursor-not-allowed'
    }

    if (optionId === selectedAnswerId && optionId !== correctAnswerId) {
      return 'border-red-500 bg-red-50 cursor-not-allowed'
    }

    return 'border-gray-300 opacity-50 cursor-not-allowed'
  }

  return (
    <div className="border border-gray-300 bg-white rounded-lg p-6">
      <h4 className="font-heading text-xl font-semibold text-black mb-4">
        {question}
      </h4>
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={`border-2 rounded-lg p-4 transition-all ${getOptionStyle(option.id)}`}
          >
            <span className="text-black">{option.text}</span>
          </div>
        ))}
      </div>
      {isSubmitted && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold text-black">Explanation: </span>
            {explanation}
          </p>
        </div>
      )}
    </div>
  )
}
