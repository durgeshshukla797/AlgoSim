import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const preTestQuestions = [
  {
    id: '1',
    question: 'What problem does Dijkstra\'s algorithm solve?',
    options: [
      { id: 'a', text: 'Finding minimum spanning tree' },
      { id: 'b', text: 'Finding shortest path from a source vertex' },
      { id: 'c', text: 'Finding all paths in a graph' },
      { id: 'd', text: 'Detecting cycles in a graph' },
    ],
    correctAnswerId: 'b',
    explanation: 'Dijkstra\'s algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.',
  },
  {
    id: '2',
    question: 'What is a requirement for Dijkstra\'s algorithm to work correctly?',
    options: [
      { id: 'a', text: 'Graph must be unweighted' },
      { id: 'b', text: 'All edge weights must be non-negative' },
      { id: 'c', text: 'Graph must be undirected' },
      { id: 'd', text: 'Graph must be acyclic' },
    ],
    correctAnswerId: 'b',
    explanation: 'Dijkstra\'s algorithm requires all edge weights to be non-negative. Negative weights can cause incorrect results.',
  },
]

export default function DijkstraPreTestPage() {
  return (
    <AlgorithmLayout title="Dijkstra's Algorithm" algorithm="dijkstra">
      <Quiz title="Pre-Test Quiz" questions={preTestQuestions} />
    </AlgorithmLayout>
  )
}
