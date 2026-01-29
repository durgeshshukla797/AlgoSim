import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const postTestQuestions = [
  {
    id: '1',
    question: 'What is the time complexity of Merge Sort in the worst case?',
    options: [
      { id: 'a', text: 'O(n)' },
      { id: 'b', text: 'O(n log n)' },
      { id: 'c', text: 'O(n²)' },
      { id: 'd', text: 'O(log n)' },
    ],
    correctAnswerId: 'b',
    explanation: 'Merge Sort consistently runs in O(n log n) time regardless of input order.',
  },
  {
    id: '2',
    question: 'Why is Merge Sort preferred for sorting linked lists?',
    options: [
      { id: 'a', text: 'It does not use recursion' },
      { id: 'b', text: 'It requires random access' },
      { id: 'c', text: 'It works efficiently without extra memory' },
      { id: 'd', text: 'It efficiently merges lists using pointers' },
    ],
    correctAnswerId: 'd',
    explanation: 'Merge Sort works well with linked lists because merging can be done using pointer manipulation.',
  },
  {
    id: '3',
    question: 'What is the space complexity of Merge Sort?',
    options: [
      { id: 'a', text: 'O(1)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(n)' },
      { id: 'd', text: 'O(n log n)' },
    ],
    correctAnswerId: 'c',
    explanation: 'Additional space is required for temporary arrays during merging.',
  },
  {
    id: '4',
    question: 'What happens if the array is already sorted when using Merge Sort?',
    options: [
      { id: 'a', text: 'Time complexity becomes O(n)' },
      { id: 'b', text: 'Algorithm terminates early' },
      { id: 'c', text: 'Time complexity remains O(n log n)' },
      { id: 'd', text: 'Merge step is skipped' },
    ],
    correctAnswerId: 'c',
    explanation: 'Merge Sort always divides and merges, so its complexity remains unchanged.',
  },
  {
    id: '5',
    question: 'Which scenario best justifies using Merge Sort over Quick Sort?',
    options: [
      { id: 'a', text: 'When memory is limited' },
      { id: 'b', text: 'When stable sorting is required' },
      { id: 'c', text: 'When average-case speed is more important' },
      { id: 'd', text: 'When in-place sorting is needed' },
    ],
    correctAnswerId: 'b',
    explanation: 'Merge Sort is stable, making it suitable when relative order of equal elements matters.',
  },
]


export default function SortingPostTestPage() {
  return (
    <AlgorithmLayout title="Sorting Algorithms" algorithm="sorting">
      <Quiz title="Post-Test Quiz" questions={postTestQuestions} />
    </AlgorithmLayout>
  )
}
