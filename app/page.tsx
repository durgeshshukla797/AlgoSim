import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Algorithms from '@/components/Algorithms'
import LearningFlow from '@/components/LearningFlow'
import Team from '@/components/Team'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-16 flex-1">
        <Hero />
        <div className="container mx-auto max-w-7xl px-6">
          <div className="border-t border-gray-200"></div>
        </div>
        <Algorithms />
        <LearningFlow />
        <Team />
      </div>
      <Footer />
    </main>
  )
}
