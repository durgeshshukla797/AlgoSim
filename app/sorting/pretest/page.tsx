import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const preTestQuestions = [
  {
    id: '1',
    question: 'What is the time complexity of Bubble Sort in the worst case?',
    options: [
      { id: 'a', text: 'O(n)' },
      { id: 'b', text: 'O(n log n)' },
      { id: 'c', text: 'O(n²)' },
      { id: 'd', text: 'O(log n)' },
    ],
    correctAnswerId: 'c',
    explanation: 'Bubble Sort has a time complexity of O(n²) in the worst case because it requires nested loops to compare and swap adjacent elements.',
  },
  {
    id: '2',
    question: 'Which sorting algorithm is known for its stability?',
    options: [
      { id: 'a', text: 'Quick Sort' },
      { id: 'b', text: 'Merge Sort' },
      { id: 'c', text: 'Heap Sort' },
      { id: 'd', text: 'Selection Sort' },
    ],
    correctAnswerId: 'b',
    explanation: 'Merge Sort is a stable sorting algorithm, meaning it preserves the relative order of equal elements in the sorted output.',
  },
]

export default function SortingPreTestPage() {
  return (
    <AlgorithmLayout title="Sorting Algorithms" algorithm="sorting">
      <Quiz title="Pre-Test Quiz" questions={preTestQuestions} />
    </AlgorithmLayout>
  )
}
