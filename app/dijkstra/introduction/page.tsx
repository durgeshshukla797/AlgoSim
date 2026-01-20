'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Map, Clock, AlertTriangle, ArrowRight, CheckCircle, XCircle, Activity } from 'lucide-react'
import Link from 'next/link'
import AlgorithmLayout from '@/components/AlgorithmLayout'

export default function DijkstraIntroductionPage() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AlgorithmLayout title="Dijkstra's Algorithm" algorithm="dijkstra">
      <div className="w-full max-w-5xl mx-auto mb-8 transition-all duration-500 ease-in-out">
        {/* Header / Toggle Bar */}
        <div
          className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <Map size={24} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Introduction to Dijkstra’s Algorithm
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {isOpen ? 'Click to collapse theory' : 'Click to expand theory section'}
              </p>
            </div>
          </div>
          {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
        </div>

        {/* Content Body */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white mt-4 rounded-xl shadow-sm border border-gray-100 p-8 space-y-12 animate-fadeIn">

            {/* Section 1: Intro */}
            <section className="prose max-w-none">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-indigo-700 mb-4">
                    What is it?
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    Ever wondered how <span className="font-semibold text-gray-900">Google Maps</span> finds the shortest and fastest route between two places?
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    The answer lies in <span className="font-semibold text-indigo-600">Dijkstra’s Algorithm</span>. It is a graph-based greedy algorithm used to find the shortest path from a single source node to all other nodes in a weighted graph.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Key Characteristics */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Activity className="text-indigo-500" size={20} /> Key Characteristics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Works on weighted graphs",
                  "All edge weights must be positive",
                  "Finds single-source shortest paths",
                  "Uses a greedy approach"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-indigo-50 hover:border-indigo-100 transition-colors cursor-default">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span className="font-medium text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 & 4 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Time Complexity */}
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Clock size={100} />
                </div>
                <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <Clock size={20} /> Time Complexity
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-indigo-800">
                    <span>Adjacency Matrix</span>
                    <span className="font-mono font-bold bg-white/50 px-2 py-1 rounded">O(V²)</span>
                  </li>
                  <li className="flex justify-between items-center text-indigo-800">
                    <span>Adjacency List + PQ</span>
                    <span className="font-mono font-bold bg-white/50 px-2 py-1 rounded">O((V+E) log V)</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-indigo-200/50 flex gap-4 text-xs text-indigo-700 font-medium">
                  <span>V = Vertices</span>
                  <span>E = Edges</span>
                </div>
              </div>

              {/* Basics */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Basics of the Algorithm</h3>
                <ul className="space-y-3">
                  {[
                    "Starts from the source node",
                    "Maintains shortest known distance to each node",
                    "Updates distances using edge relaxation",
                    "Marks nodes as visited once shortest path is confirmed",
                    "Continues until all nodes are visited"
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-xs font-bold mt-0.5">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
              <AlertTriangle className="flex-shrink-0 text-amber-600 mt-1" />
              <div>
                <h4 className="font-bold text-amber-800">Important Requirement</h4>
                <p className="text-sm mt-1 text-amber-700 leading-relaxed">
                  Dijkstra’s Algorithm <span className="font-bold">cannot handle negative edge weights</span> because once a node is marked visited, its distance is considered final. Negative edges could theoretically reduce the distance to an already visited node, breaking the greedy assumption.
                </p>
              </div>
            </div>

            {/* Steps Timeline */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-8">Step-by-Step Algorithm</h3>
              <div className="relative pl-8 border-l-2 border-indigo-100 space-y-8">
                {[
                  { title: "Initialization", desc: "Set source distance = 0, others = ∞" },
                  { title: "Selection", desc: "Select unvisited node with minimum distance" },
                  { title: "Relaxation", desc: "Update distances of all unvisited neighbors if a shorter path is found through current node" },
                  { title: "Mark Visited", desc: "Mark the current node as visited. Its distance is now final." },
                  { title: "Repeat", desc: "Repeat until all nodes are visited or destination is reached" }
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white shadow-sm ring-2 ring-indigo-50" />
                    <h4 className="font-bold text-gray-900">Step {idx + 1}: {step.title}</h4>
                    <p className="text-gray-600 mt-1">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-600" /> Advantages
                </h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  {["Efficient for shortest paths in non-negative graphs", "Works for single source → all destinations", "Can stop early for single destination", "Widely used in routing protocols"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {p}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                  <XCircle size={20} className="text-red-600" /> Disadvantages
                </h3>
                <ul className="space-y-2 text-red-800 text-sm">
                  {["Cannot handle negative edges", "Slower than BFS for unweighted graphs", "Slower for very large graphs compared to A*", "Blind search (doesn't use heuristics)"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Action */}
           

          </div>
        </div>
      </div>
    </AlgorithmLayout>
  )
}
