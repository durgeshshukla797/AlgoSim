import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const preTestQuestions = [
  {
    id: '1',
    question: 'What is the minimum number of moves required to solve Tower of Hanoi with n disks?',
    options: [
      { id: 'a', text: 'n' },
      { id: 'b', text: '2n' },
      { id: 'c', text: '2ⁿ - 1' },
      { id: 'd', text: 'n²' },
    ],
    correctAnswerId: 'c',
    explanation: 'The minimum number of moves required to solve Tower of Hanoi with n disks is 2ⁿ - 1, which follows from the recursive nature of the problem.',
  },
  {
    id: '2',
    question: 'What is the base case for the Tower of Hanoi recursive algorithm?',
    options: [
      { id: 'a', text: 'n = 0' },
      { id: 'b', text: 'n = 1' },
      { id: 'c', text: 'n = 2' },
      { id: 'd', text: 'n = 3' },
    ],
    correctAnswerId: 'b',
    explanation: 'The base case is when n = 1, where you simply move the single disk from the source to the destination rod.',
  },
]

export default function TowerOfHanoiPreTestPage() {
  return (
    <AlgorithmLayout title="Tower of Hanoi" algorithm="tower-of-hanoi">
      <Quiz title="Pre-Test Quiz" questions={preTestQuestions} />
    </AlgorithmLayout>
  )
}
