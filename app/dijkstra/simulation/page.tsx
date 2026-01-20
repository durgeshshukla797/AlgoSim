import AlgorithmLayout from '@/components/AlgorithmLayout'
import DijkstraVisualizer from '@/components/visualizers/DijkstraVisualizer'



export default function DijkstraSimulationPage() {
  return (
    <AlgorithmLayout title="Dijkstra's Algorithm" algorithm="dijkstra">
      <section className="py-8">
        <DijkstraVisualizer />
      </section>
    </AlgorithmLayout>
  )
}
