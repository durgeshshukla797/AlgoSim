import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const postTestQuestions = [
  {
    id: '1',
    question: 'What is the main advantage of Merge Sort over Quick Sort?',
    options: [
      { id: 'a', text: 'Faster average case' },
      { id: 'b', text: 'Guaranteed O(n log n) time complexity' },
      { id: 'c', text: 'Lower space complexity' },
      { id: 'd', text: 'Easier to implement' },
    ],
    correctAnswerId: 'b',
    explanation: 'Merge Sort guarantees O(n log n) time complexity in all cases, while Quick Sort can degrade to O(n²) in the worst case.',
  },
  {
    id: '2',
    question: 'In which scenario would Selection Sort be preferred?',
    options: [
      { id: 'a', text: 'Large datasets' },
      { id: 'b', text: 'When memory writes are expensive' },
      { id: 'c', text: 'When stability is required' },
      { id: 'd', text: 'When average case performance matters' },
    ],
    correctAnswerId: 'b',
    explanation: 'Selection Sort minimizes the number of swaps, making it useful when memory writes are expensive, though it has O(n²) time complexity.',
  },
]

export default function SortingPostTestPage() {
  return (
    <AlgorithmLayout title="Sorting Algorithms" algorithm="sorting">
      <Quiz title="Post-Test Quiz" questions={postTestQuestions} />
    </AlgorithmLayout>
  )
}
