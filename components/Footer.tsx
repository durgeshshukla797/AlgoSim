import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            © 2026 AlgoScope
          </div>
          <p className="text-sm text-gray-600 text-center max-w-md">
            A comprehensive platform for understanding algorithms through visualization and structured learning.
          </p>
          <div className="flex space-x-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              College
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
