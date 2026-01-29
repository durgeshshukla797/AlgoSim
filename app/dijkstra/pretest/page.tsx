import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const preTestQuestions = [
  {
    id: '1',
    question: 'What type of problem does Dijkstra’s Algorithm solve?',
    options: [
      { id: 'a', text: 'Sorting problem' },
      { id: 'b', text: 'Shortest path problem' },
      { id: 'c', text: 'Minimum spanning tree problem' },
      { id: 'd', text: 'Graph traversal problem' },
    ],
    correctAnswerId: 'b',
    explanation: 'Dijkstra’s Algorithm is used to find the shortest path from a source to other vertices.',
  },
  {
    id: '2',
    question: 'Which data structure is commonly used to implement Dijkstra efficiently?',
    options: [
      { id: 'a', text: 'Stack' },
      { id: 'b', text: 'Queue' },
      { id: 'c', text: 'Priority Queue (Min Heap)' },
      { id: 'd', text: 'Hash Table' },
    ],
    correctAnswerId: 'c',
    explanation: 'A priority queue helps efficiently extract the vertex with minimum distance.',
  },
  {
    id: '3',
    question: 'What type of graph is required for Dijkstra’s Algorithm?',
    options: [
      { id: 'a', text: 'Unweighted graph' },
      { id: 'b', text: 'Graph with negative weights' },
      { id: 'c', text: 'Graph with non-negative weights' },
      { id: 'd', text: 'Directed acyclic graph only' },
    ],
    correctAnswerId: 'c',
    explanation: 'Dijkstra’s Algorithm works only with non-negative edge weights.',
  },
  {
    id: '4',
    question: 'What does the distance array represent in Dijkstra’s Algorithm?',
    options: [
      { id: 'a', text: 'Number of edges from source' },
      { id: 'b', text: 'Shortest known distance from source to each vertex' },
      { id: 'c', text: 'Visited status of vertices' },
      { id: 'd', text: 'Graph adjacency list' },
    ],
    correctAnswerId: 'b',
    explanation: 'The distance array stores the shortest known distance from the source to each vertex.',
  },
  {
    id: '5',
    question: 'Which of the following algorithms is similar in purpose to Dijkstra’s?',
    options: [
      { id: 'a', text: 'Merge Sort' },
      { id: 'b', text: 'Bellman–Ford' },
      { id: 'c', text: 'Binary Search' },
      { id: 'd', text: 'DFS' },
    ],
    correctAnswerId: 'b',
    explanation: 'Bellman–Ford also finds shortest paths but can handle negative weights.',
  },
]


export default function DijkstraPreTestPage() {
  return (
    <AlgorithmLayout title="Dijkstra's Algorithm" algorithm="dijkstra">
      <Quiz title="Pre-Test Quiz" questions={preTestQuestions} />
    </AlgorithmLayout>
  )
}
