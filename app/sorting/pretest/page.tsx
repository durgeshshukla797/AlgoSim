import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const preTestQuestions = [
  {
    id: '1',
    question: 'What type of algorithm is Merge Sort?',
    options: [
      { id: 'a', text: 'Greedy algorithm' },
      { id: 'b', text: 'Divide and Conquer algorithm' },
      { id: 'c', text: 'Dynamic programming algorithm' },
      { id: 'd', text: 'Backtracking algorithm' },
    ],
    correctAnswerId: 'b',
    explanation: 'Merge Sort follows the divide-and-conquer paradigm by breaking the array into smaller parts.',
  },
  {
    id: '2',
    question: 'What is the smallest unit that Merge Sort divides an array into?',
    options: [
      { id: 'a', text: 'Size 0' },
      { id: 'b', text: 'Size 1' },
      { id: 'c', text: 'Size 2' },
      { id: 'd', text: 'Size log n' },
    ],
    correctAnswerId: 'b',
    explanation: 'An array of size 1 is already sorted and is the base case for Merge Sort.',
  },
  {
    id: '3',
    question: 'At which step does actual sorting occur in Merge Sort?',
    options: [
      { id: 'a', text: 'Divide step' },
      { id: 'b', text: 'Recursive call step' },
      { id: 'c', text: 'Merge step' },
      { id: 'd', text: 'Base case step' },
    ],
    correctAnswerId: 'c',
    explanation: 'The merge step compares and combines elements in sorted order.',
  },
  {
    id: '4',
    question: 'Which of the following is true about Merge Sort?',
    options: [
      { id: 'a', text: 'It sorts in-place' },
      { id: 'b', text: 'It has O(n²) time complexity' },
      { id: 'c', text: 'It is a stable sorting algorithm' },
      { id: 'd', text: 'It works only for small inputs' },
    ],
    correctAnswerId: 'c',
    explanation: 'Merge Sort preserves the relative order of equal elements, making it stable.',
  },
  {
    id: '5',
    question: 'Which data structure is commonly used during the merge process?',
    options: [
      { id: 'a', text: 'Stack' },
      { id: 'b', text: 'Queue' },
      { id: 'c', text: 'Temporary array' },
      { id: 'd', text: 'Linked list only' },
    ],
    correctAnswerId: 'c',
    explanation: 'A temporary array is used to merge two sorted subarrays.',
  },
]


export default function SortingPreTestPage() {
  return (
    <AlgorithmLayout title="Sorting Algorithms" algorithm="sorting">
      <Quiz title="Pre-Test Quiz" questions={preTestQuestions} />
    </AlgorithmLayout>
  )
}
