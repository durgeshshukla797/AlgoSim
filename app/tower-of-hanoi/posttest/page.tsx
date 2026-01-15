import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const postTestQuestions = [
  {
    id: '1',
    question: 'What is the time complexity of the Tower of Hanoi algorithm?',
    options: [
      { id: 'a', text: 'O(n)' },
      { id: 'b', text: 'O(n log n)' },
      { id: 'c', text: 'O(2ⁿ)' },
      { id: 'd', text: 'O(n²)' },
    ],
    correctAnswerId: 'c',
    explanation: 'The time complexity is O(2ⁿ) because the algorithm makes 2ⁿ - 1 moves, and each move takes constant time.',
  },
  {
    id: '2',
    question: 'In Tower of Hanoi, what is the key constraint when moving disks?',
    options: [
      { id: 'a', text: 'Only even-numbered disks can move' },
      { id: 'b', text: 'A larger disk cannot be placed on top of a smaller disk' },
      { id: 'c', text: 'Only one disk can be moved at a time' },
      { id: 'd', text: 'Both b and c' },
    ],
    correctAnswerId: 'd',
    explanation: 'The Tower of Hanoi has two key constraints: only one disk can be moved at a time, and a larger disk cannot be placed on top of a smaller disk.',
  },
]

export default function TowerOfHanoiPostTestPage() {
  return (
    <AlgorithmLayout title="Tower of Hanoi" algorithm="tower-of-hanoi">
      <Quiz title="Post-Test Quiz" questions={postTestQuestions} />
    </AlgorithmLayout>
  )
}
