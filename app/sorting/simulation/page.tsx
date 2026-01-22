import AlgorithmLayout from '@/components/AlgorithmLayout'
import MergeSortVisualizer from '@/components/visualizers/MergeSortVisualizer'

export default function SortingSimulationPage() {
  return (
    <AlgorithmLayout title="Sorting Algorithms" algorithm="sorting">
      <section className="py-12">
        <MergeSortVisualizer />
      </section>
    </AlgorithmLayout>
  )
}
