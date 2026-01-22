import AlgorithmLayout from '@/components/AlgorithmLayout'
import LinearProbingVisualizer from '@/components/visualizers/LinearProbingVisualizer'

export default function HashingSimulationPage() {
  return (
    <AlgorithmLayout title="Hashing" algorithm="hashing">
      <section className="py-12">
        <LinearProbingVisualizer />
      </section>
    </AlgorithmLayout>
  )
}
