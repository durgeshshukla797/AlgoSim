import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const postTestQuestions = [
  {
    id: '1',
    question: 'What is the time complexity of inserting a node at the beginning of a singly linked list?',
    options: [
      { id: 'a', text: 'O(n)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(1)' },
      { id: 'd', text: 'O(n log n)' },
    ],
    correctAnswerId: 'c',
    explanation: 'Insertion at the beginning only updates the head pointer, making it O(1).',
  },
  {
    id: '2',
    question: 'Why is searching in a singly linked list O(n)?',
    options: [
      { id: 'a', text: 'Because memory is fragmented' },
      { id: 'b', text: 'Because traversal must be sequential' },
      { id: 'c', text: 'Because pointers are slow' },
      { id: 'd', text: 'Because recursion is used' },
    ],
    correctAnswerId: 'b',
    explanation: 'Nodes must be visited one by one since random access is not possible.',
  },
  {
    id: '3',
    question: 'What happens if the head pointer is NULL?',
    options: [
      { id: 'a', text: 'The list has one node' },
      { id: 'b', text: 'The list has a cycle' },
      { id: 'c', text: 'The list is empty' },
      { id: 'd', text: 'The list is corrupted' },
    ],
    correctAnswerId: 'c',
    explanation: 'A NULL head pointer indicates that the linked list is empty.',
  },
  {
    id: '4',
    question: 'Which operation requires traversal of the list?',
    options: [
      { id: 'a', text: 'Insert at beginning' },
      { id: 'b', text: 'Delete head node' },
      { id: 'c', text: 'Insert at end (without tail pointer)' },
      { id: 'd', text: 'Update head pointer' },
    ],
    correctAnswerId: 'c',
    explanation: 'To insert at the end, traversal is needed to reach the last node.',
  },
  {
    id: '5',
    question: 'Which real-world example best represents a singly linked list?',
    options: [
      { id: 'a', text: 'Pages of a book' },
      { id: 'b', text: 'Browser back button' },
      { id: 'c', text: 'Music playlist played in order' },
      { id: 'd', text: 'Tree structure of folders' },
    ],
    correctAnswerId: 'c',
    explanation: 'A music playlist moves forward sequentially, similar to a singly linked list.',
  },
]


export default function LinkedListPostTestPage() {
  return (
    <AlgorithmLayout title="Linked List" algorithm="linked-list">
      <Quiz title="Post-Test Quiz" questions={postTestQuestions} />
    </AlgorithmLayout>
  )
}
