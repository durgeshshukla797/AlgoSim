import AlgorithmLayout from '@/components/AlgorithmLayout'
import LinkedListVisualizer from '@/components/visualizers/LinkedListVisualizer'

export default function LinkedListSimulationPage() {
  return (
    <AlgorithmLayout title="Linked List" algorithm="linked-list">
      <section className="py-12">
        <LinkedListVisualizer />
      </section>
    </AlgorithmLayout>
  )
}
