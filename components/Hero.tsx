import Link from 'next/link'

export default function Hero() {
  return (
    <section className="pt-32 pb-28 px-4 relative">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
          Algorithm Visualiser
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed max-w-2xl mx-auto">
          Understand algorithms through step-by-step visualization,
          structured learning, and pre & post quizzes with
          detailed feedback.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          <Link
            href="#algorithms"
            className="px-8 py-3 border-2 border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-colors"
          >
            Explore Algorithms
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto border-b border-gray-800"></div>
    </section>
  )
}
