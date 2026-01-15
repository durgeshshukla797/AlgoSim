import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const preTestQuestions = [
  {
    id: '1',
    question: 'What is the primary purpose of a hash function?',
    options: [
      { id: 'a', text: 'To encrypt data' },
      { id: 'b', text: 'To map keys to array indices' },
      { id: 'c', text: 'To sort data' },
      { id: 'd', text: 'To compress files' },
    ],
    correctAnswerId: 'b',
    explanation: 'A hash function maps keys to array indices, allowing for efficient data storage and retrieval in hash tables.',
  },
  {
    id: '2',
    question: 'What happens when two different keys hash to the same index?',
    options: [
      { id: 'a', text: 'Hash table overflow' },
      { id: 'b', text: 'Collision' },
      { id: 'c', text: 'Hash function failure' },
      { id: 'd', text: 'Automatic rehashing' },
    ],
    correctAnswerId: 'b',
    explanation: 'When two different keys produce the same hash value, it\'s called a collision. This must be handled using techniques like chaining or open addressing.',
  },
]

export default function HashingPreTestPage() {
  return (
    <AlgorithmLayout title="Hashing" algorithm="hashing">
      <Quiz title="Pre-Test Quiz" questions={preTestQuestions} />
    </AlgorithmLayout>
  )
}
