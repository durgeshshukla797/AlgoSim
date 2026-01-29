import AlgorithmLayout from '@/components/AlgorithmLayout'
import Quiz from '@/components/quiz/Quiz'

const postTestQuestions = [
  {
    id: '1',
    question: 'Why does Dijkstra’s Algorithm fail with negative edge weights?',
    options: [
      { id: 'a', text: 'It increases time complexity' },
      { id: 'b', text: 'Greedy selection becomes invalid' },
      { id: 'c', text: 'Priority queue cannot be used' },
      { id: 'd', text: 'Graph becomes cyclic' },
    ],
    correctAnswerId: 'b',
    explanation: 'Negative weights can invalidate the greedy choice of picking the minimum-distance vertex.',
  },
  {
    id: '2',
    question: 'What is the time complexity of Dijkstra’s Algorithm using a min heap?',
    options: [
      { id: 'a', text: 'O(V²)' },
      { id: 'b', text: 'O(E log V)' },
      { id: 'c', text: 'O(V log V)' },
      { id: 'd', text: 'O(E²)' },
    ],
    correctAnswerId: 'b',
    explanation: 'Using a min heap, the time complexity is O((V + E) log V), commonly written as O(E log V).',
  },
  {
    id: '3',
    question: 'What does edge relaxation mean in Dijkstra’s Algorithm?',
    options: [
      { id: 'a', text: 'Removing edges from the graph' },
      { id: 'b', text: 'Updating shortest distances using an edge' },
      { id: 'c', text: 'Marking vertices as visited' },
      { id: 'd', text: 'Sorting edges by weight' },
    ],
    correctAnswerId: 'b',
    explanation: 'Edge relaxation updates the distance to a vertex if a shorter path is found.',
  },
  {
    id: '4',
    question: 'How many times can a vertex be extracted from the priority queue?',
    options: [
      { id: 'a', text: 'Exactly once' },
      { id: 'b', text: 'At most once' },
      { id: 'c', text: 'Multiple times, but only smallest distance is processed' },
      { id: 'd', text: 'Only when all neighbors are visited' },
    ],
    correctAnswerId: 'c',
    explanation: 'A vertex may appear multiple times, but only the entry with the smallest distance is useful.',
  },
  {
    id: '5',
    question: 'Which real-world application directly uses Dijkstra’s Algorithm?',
    options: [
      { id: 'a', text: 'Text compression' },
      { id: 'b', text: 'GPS navigation systems' },
      { id: 'c', text: 'Database normalization' },
      { id: 'd', text: 'Syntax parsing' },
    ],
    correctAnswerId: 'b',
    explanation: 'GPS and routing systems use Dijkstra’s Algorithm to compute shortest paths.',
  },
]


export default function DijkstraPostTestPage() {
  return (
    <AlgorithmLayout title="Dijkstra's Algorithm" algorithm="dijkstra">
      <Quiz title="Post-Test Quiz" questions={postTestQuestions} />
    </AlgorithmLayout>
  )
}
