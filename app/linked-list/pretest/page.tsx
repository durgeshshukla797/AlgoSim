import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const preTestQuestions = [
  {
    id: '1',
    question: 'What is a linked list?',
    options: [
      { id: 'a', text: 'A collection of elements stored contiguously in memory' },
      { id: 'b', text: 'A linear data structure where elements point to the next element' },
      { id: 'c', text: 'A hierarchical data structure' },
      { id: 'd', text: 'A fixed-size data structure' },
    ],
    correctAnswerId: 'b',
    explanation: 'A linked list is a linear data structure where each node contains data and a reference to the next node.',
  },
  {
    id: '2',
    question: 'Which component is NOT part of a singly linked list node?',
    options: [
      { id: 'a', text: 'Data' },
      { id: 'b', text: 'Next pointer' },
      { id: 'c', text: 'Previous pointer' },
      { id: 'd', text: 'Node address' },
    ],
    correctAnswerId: 'c',
    explanation: 'A singly linked list does not store a previous pointer.',
  },
  {
    id: '3',
    question: 'What does the last node of a singly linked list point to?',
    options: [
      { id: 'a', text: 'The first node' },
      { id: 'b', text: 'Another new node' },
      { id: 'c', text: 'NULL' },
      { id: 'd', text: 'Random memory location' },
    ],
    correctAnswerId: 'c',
    explanation: 'The last node points to NULL, indicating the end of the list.',
  },
  {
    id: '4',
    question: 'Which operation is efficient in a singly linked list compared to an array?',
    options: [
      { id: 'a', text: 'Random access' },
      { id: 'b', text: 'Insertion and deletion' },
      { id: 'c', text: 'Binary search' },
      { id: 'd', text: 'Sorting' },
    ],
    correctAnswerId: 'b',
    explanation: 'Insertion and deletion are efficient since shifting of elements is not required.',
  },
  {
    id: '5',
    question: 'Which pointer is used to access the linked list?',
    options: [
      { id: 'a', text: 'Tail pointer' },
      { id: 'b', text: 'Current pointer' },
      { id: 'c', text: 'Head pointer' },
      { id: 'd', text: 'Middle pointer' },
    ],
    correctAnswerId: 'c',
    explanation: 'The head pointer stores the address of the first node in the linked list.',
  },
]


export default function LinkedListPreTestPage() {
  return (
    <AlgorithmLayout title="Linked List" algorithm="linked-list">
      <Quiz title="Pre-Test Quiz" questions={preTestQuestions} />
    </AlgorithmLayout>
  )
}
