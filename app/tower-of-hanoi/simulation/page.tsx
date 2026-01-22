import AlgorithmLayout from '@/components/AlgorithmLayout'
import HanoiVisualizer from '@/components/visualizers/HanoiVisualizer'

export default function TowerOfHanoiSimulationPage() {
  return (
    <AlgorithmLayout title="Tower of Hanoi" algorithm="tower-of-hanoi">
      <section className="py-12">
        <HanoiVisualizer />
      </section>
    </AlgorithmLayout>
  )
}
