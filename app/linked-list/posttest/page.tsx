import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const postTestQuestions = [
  {
    id: '1',
    question: 'What is the main advantage of a doubly linked list over a singly linked list?',
    options: [
      { id: 'a', text: 'Less memory usage' },
      { id: 'b', text: 'Bidirectional traversal' },
      { id: 'c', text: 'Faster insertion' },
      { id: 'd', text: 'Simpler implementation' },
    ],
    correctAnswerId: 'b',
    explanation: 'Doubly linked lists allow traversal in both directions (forward and backward) because each node has pointers to both the next and previous nodes.',
  },
  {
    id: '2',
    question: 'In a circular linked list, what points to the first node?',
    options: [
      { id: 'a', text: 'The last node\'s next pointer' },
      { id: 'b', text: 'The head pointer only' },
      { id: 'c', text: 'Both head and tail pointers' },
      { id: 'd', text: 'No pointer' },
    ],
    correctAnswerId: 'a',
    explanation: 'In a circular linked list, the last node\'s next pointer points back to the first node, creating a circular structure.',
  },
]

export default function LinkedListPostTestPage() {
  return (
    <AlgorithmLayout title="Linked List" algorithm="linked-list">
      <Quiz title="Post-Test Quiz" questions={postTestQuestions} />
    </AlgorithmLayout>
  )
}
