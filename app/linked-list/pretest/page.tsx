import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const preTestQuestions = [
  {
    id: '1',
    question: 'What is the time complexity of inserting a node at the beginning of a linked list?',
    options: [
      { id: 'a', text: 'O(n)' },
      { id: 'b', text: 'O(1)' },
      { id: 'c', text: 'O(log n)' },
      { id: 'd', text: 'O(n²)' },
    ],
    correctAnswerId: 'b',
    explanation: 'Inserting at the beginning of a linked list is O(1) because you only need to update the head pointer and the new node\'s next pointer.',
  },
  {
    id: '2',
    question: 'What is a disadvantage of linked lists compared to arrays?',
    options: [
      { id: 'a', text: 'Dynamic size' },
      { id: 'b', text: 'No random access' },
      { id: 'c', text: 'Memory efficiency' },
      { id: 'd', text: 'Easy insertion' },
    ],
    correctAnswerId: 'b',
    explanation: 'Linked lists do not support random access. To access an element, you must traverse from the head, making it O(n) instead of O(1) like arrays.',
  },
]

export default function LinkedListPreTestPage() {
  return (
    <AlgorithmLayout title="Linked List" algorithm="linked-list">
      <Quiz title="Pre-Test Quiz" questions={preTestQuestions} />
    </AlgorithmLayout>
  )
}
