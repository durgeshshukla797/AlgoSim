import Link from 'next/link'

interface AlgorithmCard {
  title: string
  algorithms: string[]
  href: string
}

const algorithmCards: AlgorithmCard[] = [
  {
    title: 'Sorting Algorithms',
    algorithms: ['Bubble Sort', 'Selection Sort', 'Merge Sort'],
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
    <div className="border-2 border-gray-300 rounded-lg p-6 hover:border-black hover:scale-[1.02] transition-all duration-200">
      <h3 className="font-heading text-xl font-semibold text-black mb-4">
        {card.title}
      </h3>
      <ul className="space-y-2 mb-6">
        {card.algorithms.map((algo, index) => (
          <li key={index} className="text-gray-700 flex items-center">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
            {algo}
          </li>
        ))}
      </ul>
      <Link
        href={card.href}
        className="inline-flex items-center text-black font-medium hover:text-gray-700 transition-colors"
      >
        Visualize →
      </Link>
    </div>
  )
}
