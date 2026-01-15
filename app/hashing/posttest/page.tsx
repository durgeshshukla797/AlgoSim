import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const postTestQuestions = [
  {
    id: '1',
    question: 'What is the load factor of a hash table?',
    options: [
      { id: 'a', text: 'Number of buckets / Number of elements' },
      { id: 'b', text: 'Number of elements / Number of buckets' },
      { id: 'c', text: 'Number of collisions / Number of elements' },
      { id: 'd', text: 'Number of buckets / Number of collisions' },
    ],
    correctAnswerId: 'b',
    explanation: 'The load factor is the ratio of the number of elements to the number of buckets. A high load factor increases the likelihood of collisions.',
  },
  {
    id: '2',
    question: 'Which collision resolution technique uses linked lists?',
    options: [
      { id: 'a', text: 'Linear probing' },
      { id: 'b', text: 'Quadratic probing' },
      { id: 'c', text: 'Chaining' },
      { id: 'd', text: 'Double hashing' },
    ],
    correctAnswerId: 'c',
    explanation: 'Chaining resolves collisions by storing multiple elements in the same bucket using a linked list or other data structure.',
  },
]

export default function HashingPostTestPage() {
  return (
    <AlgorithmLayout title="Hashing" algorithm="hashing">
      <Quiz title="Post-Test Quiz" questions={postTestQuestions} />
    </AlgorithmLayout>
  )
}
