import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface AlgorithmCard {
  title: string
  algorithms: string[]
  href: string
}

const algorithmCards: AlgorithmCard[] = [
  {
    title: 'Merge Sort',
    algorithms: ['Divide & Conquer', 'O(n log n) Efficiency', 'Stable Sort'],
    href: '/sorting/introduction',
  },
  {
    title: 'Linked List',
    algorithms: ['Insertion', 'Deletion', 'Traversal'],
    href: '/linked-list/introduction',
  },
  {
    title: 'Dijkstra\'s Algorithm',
    algorithms: ['Shortest Path', 'Operations'],
    href: '/dijkstra/introduction',
  },
  {
    title: 'Hashing',
    algorithms: ['Collision Handling', 'Load Factor', 'Operations'],
    href: '/hashing/introduction',
  },
  {
    title: 'Tower of Hanoi',
    algorithms: ['Move Disk', 'Operations'],
    href: '/tower-of-hanoi/introduction',
  },
]

export default function Algorithms() {
  return (
    <section id="algorithms" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-black text-center mb-16">
          Algorithms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithmCards.map((card, index) => (
            <AlgorithmCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AlgorithmCard({ card }: { card: AlgorithmCard }) {
  return (
    <div className="h-full flex flex-col bg-white border border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-black transition-all duration-300 hover:-translate-y-1">
      <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">
        {card.title}
      </h3>
      <ul className="space-y-3 mb-8">
        {card.algorithms.map((algo, index) => (
          <li key={index} className="text-gray-600 flex items-center text-sm">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 shrink-0"></span>
            {algo}
          </li>
        ))}
      </ul>
      <Link
        href={card.href}
        className="mt-auto inline-flex items-center justify-center w-full px-4 py-3 bg-gray-50 text-gray-900 font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-200 group border border-gray-200 hover:border-black"
      >
        Visualize
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}
