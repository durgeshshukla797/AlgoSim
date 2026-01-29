import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const preTestQuestions = [
  {
    id: '1',
    question: 'What is the main goal of the Tower of Hanoi problem?',
    options: [
      { id: 'a', text: 'To sort disks by size' },
      { id: 'b', text: 'To move all disks from source to destination following rules' },
      { id: 'c', text: 'To minimize memory usage' },
      { id: 'd', text: 'To reverse the order of disks' },
    ],
    correctAnswerId: 'b',
    explanation: 'The goal is to move all disks from the source rod to the destination rod while following the given constraints.',
  },
  {
    id: '2',
    question: 'How many rods are used in the classic Tower of Hanoi problem?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4' },
      { id: 'd', text: '5' },
    ],
    correctAnswerId: 'b',
    explanation: 'The classic Tower of Hanoi problem uses three rods: source, auxiliary, and destination.',
  },
  {
    id: '3',
    question: 'Which programming concept is most commonly used to solve Tower of Hanoi?',
    options: [
      { id: 'a', text: 'Iteration' },
      { id: 'b', text: 'Greedy algorithm' },
      { id: 'c', text: 'Recursion' },
      { id: 'd', text: 'Dynamic programming' },
    ],
    correctAnswerId: 'c',
    explanation: 'Tower of Hanoi is a classic example used to demonstrate recursion.',
  },
  {
    id: '4',
    question: 'Which rule must always be followed in Tower of Hanoi?',
    options: [
      { id: 'a', text: 'Multiple disks can be moved at once' },
      { id: 'b', text: 'Larger disk can be placed on smaller disk' },
      { id: 'c', text: 'Only one disk can be moved at a time' },
      { id: 'd', text: 'Disks must be moved in pairs' },
    ],
    correctAnswerId: 'c',
    explanation: 'Only one disk can be moved at a time in the Tower of Hanoi problem.',
  },
  {
    id: '5',
    question: 'What is the minimum number of moves required to solve Tower of Hanoi with 1 disk?',
    options: [
      { id: 'a', text: '0' },
      { id: 'b', text: '1' },
      { id: 'c', text: '2' },
      { id: 'd', text: '3' },
    ],
    correctAnswerId: 'b',
    explanation: 'With one disk, only one move is required to transfer it from source to destination.',
  },
]


export default function TowerOfHanoiPreTestPage() {
  return (
    <AlgorithmLayout title="Tower of Hanoi" algorithm="tower-of-hanoi">
      <Quiz title="Pre-Test Quiz" questions={preTestQuestions} />
    </AlgorithmLayout>
  )
}
