import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const postTestQuestions = [
  {
    id: '1',
    question: 'What happens during a collision when using linear probing?',
    options: [
      { id: 'a', text: 'The key is discarded' },
      { id: 'b', text: 'The algorithm searches sequentially for the next empty slot' },
      { id: 'c', text: 'A new table is created' },
      { id: 'd', text: 'The hash function is changed' },
    ],
    correctAnswerId: 'b',
    explanation: 'Linear probing resolves collisions by checking the next available slots sequentially.',
  },
  {
    id: '2',
    question: 'Which formula correctly represents linear probing?',
    options: [
      { id: 'a', text: '(hash(key) + i²) % size' },
      { id: 'b', text: '(hash(key) + i) % size' },
      { id: 'c', text: '(hash(key) × i) % size' },
      { id: 'd', text: 'hash(key) % size' },
    ],
    correctAnswerId: 'b',
    explanation: 'Linear probing uses (hash(key) + i) % table_size to find the next slot.',
  },
  {
    id: '3',
    question: 'What is the major drawback of linear probing?',
    options: [
      { id: 'a', text: 'High memory usage' },
      { id: 'b', text: 'Primary clustering' },
      { id: 'c', text: 'Complex implementation' },
      { id: 'd', text: 'Slow hash function' },
    ],
    correctAnswerId: 'b',
    explanation: 'Linear probing suffers from primary clustering, where long sequences of filled slots form.',
  },
  {
    id: '4',
    question: 'What is the average time complexity of search in hashing?',
    options: [
      { id: 'a', text: 'O(log n)' },
      { id: 'b', text: 'O(n)' },
      { id: 'c', text: 'O(1)' },
      { id: 'd', text: 'O(n log n)' },
    ],
    correctAnswerId: 'c',
    explanation: 'On average, hashing provides constant-time operations.',
  },
  {
    id: '5',
    question: 'Why is modulo operation commonly used in hash functions?',
    options: [
      { id: 'a', text: 'To sort keys' },
      { id: 'b', text: 'To limit index range within table size' },
      { id: 'c', text: 'To avoid collisions completely' },
      { id: 'd', text: 'To increase table size' },
    ],
    correctAnswerId: 'b',
    explanation: 'Modulo ensures the computed index fits within the hash table size.',
  },
]


export default function HashingPostTestPage() {
  return (
    <AlgorithmLayout title="Hashing" algorithm="hashing">
      <Quiz title="Post-Test Quiz" questions={postTestQuestions} />
    </AlgorithmLayout>
  )
}
