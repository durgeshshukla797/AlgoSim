import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const postTestQuestions = [
  {
    id: '1',
    question: 'What is the base case for the Tower of Hanoi recursive algorithm?',
    options: [
      { id: 'a', text: 'n = 0' },
      { id: 'b', text: 'n = 1' },
      { id: 'c', text: 'n = 2' },
      { id: 'd', text: 'n = 3' },
    ],
    correctAnswerId: 'b',
    explanation: 'The base case is when n = 1, where only one disk needs to be moved directly.',
  },
  {
    id: '2',
    question: 'What is the formula for the minimum number of moves required for n disks?',
    options: [
      { id: 'a', text: 'n² - 1' },
      { id: 'b', text: '2n - 1' },
      { id: 'c', text: '2ⁿ - 1' },
      { id: 'd', text: 'n log n' },
    ],
    correctAnswerId: 'c',
    explanation: 'The minimum number of moves required is 2ⁿ − 1.',
  },
  {
    id: '3',
    question: 'Which rod is used to temporarily hold disks during the process?',
    options: [
      { id: 'a', text: 'Source rod' },
      { id: 'b', text: 'Destination rod' },
      { id: 'c', text: 'Auxiliary rod' },
      { id: 'd', text: 'Primary rod' },
    ],
    correctAnswerId: 'c',
    explanation: 'The auxiliary rod is used to temporarily store disks during recursive transfers.',
  },
  {
    id: '4',
    question: 'What is the time complexity of the Tower of Hanoi algorithm?',
    options: [
      { id: 'a', text: 'O(n)' },
      { id: 'b', text: 'O(n log n)' },
      { id: 'c', text: 'O(2ⁿ)' },
      { id: 'd', text: 'O(n²)' },
    ],
    correctAnswerId: 'c',
    explanation: 'The algorithm requires 2ⁿ − 1 moves, resulting in exponential time complexity.',
  },
  {
    id: '5',
    question: 'Why is Tower of Hanoi useful in algorithm education?',
    options: [
      { id: 'a', text: 'It optimizes memory usage' },
      { id: 'b', text: 'It demonstrates recursion and call stack behavior' },
      { id: 'c', text: 'It sorts data efficiently' },
      { id: 'd', text: 'It uses advanced graph techniques' },
    ],
    correctAnswerId: 'b',
    explanation: 'Tower of Hanoi clearly demonstrates recursive problem solving and call stack execution.',
  },
]


export default function TowerOfHanoiPostTestPage() {
  return (
    <AlgorithmLayout title="Tower of Hanoi" algorithm="tower-of-hanoi">
      <Quiz title="Post-Test Quiz" questions={postTestQuestions} />
    </AlgorithmLayout>
  )
}
