import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const postTestQuestions = [
  {
    id: '1',
    question: 'What data structure is typically used to implement Dijkstra\'s algorithm efficiently?',
    options: [
      { id: 'a', text: 'Stack' },
      { id: 'b', text: 'Queue' },
      { id: 'c', text: 'Priority Queue (Min Heap)' },
      { id: 'd', text: 'Hash Table' },
    ],
    correctAnswerId: 'c',
    explanation: 'A priority queue (min heap) is used to efficiently extract the vertex with the minimum distance, reducing the time complexity to O((V + E) log V).',
  },
  {
    id: '2',
    question: 'What is the time complexity of Dijkstra\'s algorithm using a binary heap?',
    options: [
      { id: 'a', text: 'O(V)' },
      { id: 'b', text: 'O(V log V)' },
      { id: 'c', text: 'O((V + E) log V)' },
      { id: 'd', text: 'O(V²)' },
    ],
    correctAnswerId: 'c',
    explanation: 'Using a binary heap, Dijkstra\'s algorithm has a time complexity of O((V + E) log V), where V is vertices and E is edges.',
  },
]

export default function DijkstraPostTestPage() {
  return (
    <AlgorithmLayout title="Dijkstra's Algorithm" algorithm="dijkstra">
      <Quiz title="Post-Test Quiz" questions={postTestQuestions} />
    </AlgorithmLayout>
  )
}
