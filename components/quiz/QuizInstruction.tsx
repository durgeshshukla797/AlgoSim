interface QuizInstructionProps {
  questionCount: number
  onStart: () => void
}

export default function QuizInstruction({ questionCount, onStart }: QuizInstructionProps) {
  return (
    <div className="border border-gray-300 bg-white rounded-lg p-8 max-w-2xl mx-auto">
      <h3 className="font-heading text-2xl font-semibold text-black mb-6">
        Quiz Instructions
      </h3>
      <ul className="space-y-3 mb-8">
        <li className="flex items-start text-gray-700">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2"></span>
          <span>Total questions: <span className="text-black font-medium">{questionCount}</span></span>
        </li>
        <li className="flex items-start text-gray-700">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2"></span>
          <span>Single correct answer per question</span>
        </li>
        <li className="flex items-start text-gray-700">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2"></span>
          <span>No negative marking</span>
        </li>
        <li className="flex items-start text-gray-700">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2"></span>
          <span>Answers and explanations will be shown after submission</span>
        </li>
      </ul>
      <button
        onClick={onStart}
        className="w-full px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-900 transition-colors"
      >
        Start Quiz
      </button>
    </div>
  )
}
