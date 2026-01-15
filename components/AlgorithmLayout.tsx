'use client'

import Header from './Header'
import Footer from './Footer'
import AlgorithmSidebar from './AlgorithmSidebar'
import { SidebarProvider, useSidebar } from './SidebarContext'

interface AlgorithmLayoutProps {
  title: string
  algorithm: string
  children: React.ReactNode
}

function AlgorithmLayoutContent({ title, algorithm, children }: AlgorithmLayoutProps) {
  const { isCollapsed } = useSidebar()

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AlgorithmSidebar algorithm={algorithm} />
      <div className={`pt-16 pb-24 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="container mx-auto max-w-7xl px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-12 pt-8">
            {title}
          </h1>
          {children}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default function AlgorithmLayout({ title, algorithm, children }: AlgorithmLayoutProps) {
  return (
    <SidebarProvider>
      <AlgorithmLayoutContent title={title} algorithm={algorithm}>
        {children}
      </AlgorithmLayoutContent>
    </SidebarProvider>
  )
}
