import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const preTestQuestions =[
  {
    id: '1',
    question: 'What is the main purpose of hashing?',
    options: [
      { id: 'a', text: 'To sort data' },
      { id: 'b', text: 'To store data sequentially' },
      { id: 'c', text: 'To enable fast data retrieval' },
      { id: 'd', text: 'To compress data' },
    ],
    correctAnswerId: 'c',
    explanation: 'Hashing is used to map keys to indexes for fast insertion, deletion, and searching.',
  },
  {
    id: '2',
    question: 'What data structure is primarily used in hashing?',
    options: [
      { id: 'a', text: 'Stack' },
      { id: 'b', text: 'Queue' },
      { id: 'c', text: 'Array' },
      { id: 'd', text: 'Tree' },
    ],
    correctAnswerId: 'c',
    explanation: 'Hash tables are usually implemented using arrays.',
  },
  {
    id: '3',
    question: 'What is a hash function?',
    options: [
      { id: 'a', text: 'A function that sorts keys' },
      { id: 'b', text: 'A function that maps keys to table indexes' },
      { id: 'c', text: 'A function that encrypts data' },
      { id: 'd', text: 'A function that searches elements' },
    ],
    correctAnswerId: 'b',
    explanation: 'A hash function maps a key to a specific index in the hash table.',
  },
  {
    id: '4',
    question: 'What is a collision in hashing?',
    options: [
      { id: 'a', text: 'When a key is deleted' },
      { id: 'b', text: 'When two keys map to the same index' },
      { id: 'c', text: 'When the table is full' },
      { id: 'd', text: 'When hashing fails' },
    ],
    correctAnswerId: 'b',
    explanation: 'A collision occurs when two different keys generate the same hash index.',
  },
  {
    id: '5',
    question: 'Which of the following is NOT a collision resolution technique?',
    options: [
      { id: 'a', text: 'Chaining' },
      { id: 'b', text: 'Linear probing' },
      { id: 'c', text: 'Binary search' },
      { id: 'd', text: 'Quadratic probing' },
    ],
    correctAnswerId: 'c',
    explanation: 'Binary search is not a collision resolution technique used in hashing.',
  },
]


export default function HashingPreTestPage() {
  return (
    <AlgorithmLayout title="Hashing" algorithm="hashing">
      <Quiz title="Pre-Test Quiz" questions={preTestQuestions} />
    </AlgorithmLayout>
  )
}
