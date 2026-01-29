'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Map, Activity, ArrowRight, Navigation, Globe, Gamepad2, Radio, CheckCircle } from 'lucide-react'
import AlgorithmLayout from '@/components/AlgorithmLayout'

export default function DijkstraIntroductionPage() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AlgorithmLayout title="Dijkstra's Algorithm" algorithm="dijkstra">
      <div className="w-full max-w-7xl mx-auto mb-8 transition-all duration-500 ease-in-out">
        {/* Header / Toggle Bar */}
        <div
          className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-indigo-500 hover:shadow-md transition-all group cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <Map size={24} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Introduction to Dijkstra's Algorithm
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {isOpen ? 'Click to collapse theory' : 'Click to expand theory section'}
              </p>
            </div>
          </div>
          {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
        </div>

        {/* Content Body */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white mt-4 rounded-xl shadow-sm border border-gray-100 p-8 pt-10 animate-fadeIn">

            <div className="max-w-4xl mx-auto">

              {/* 1. Definition / Algorithm Used */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  1. Definition & Algorithm
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    <span className="font-semibold text-gray-900">Dijkstra’s Algorithm</span> is a greedy graph algorithm used to find the shortest path from a single source node to all other nodes in a weighted graph.
                  </p>

                  <div className="bg-amber-50 rounded-xl p-6 border border-amber-100 mb-8">
                    <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                      Important Conditions
                    </h3>
                    <ul className="space-y-2 text-amber-800 list-disc list-inside">
                      <li>Works only with <span className="font-bold">non-negative</span> edge weights.</li>
                      <li>Produces the minimum distance from the source to every vertex.</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Activity className="text-indigo-500" size={20} /> Algorithmic Paradigm: Greedy Algorithm
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      At every step, the algorithm:
                    </p>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                      <li>Selects the <span className="font-medium text-gray-900">unvisited node</span> with the smallest known distance.</li>
                      <li><span className="font-medium text-gray-900">Relaxes</span> its neighboring edges to update shortest paths.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <hr className="border-gray-100 mb-16" />

              {/* 2. Example with Dry Run */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  2. Example with Dry Run
                </h2>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Example Graph (Source: A)</h3>

                  {/* Visual Graph Representation could go here, simplified as text/structure for now */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-semibold text-gray-700 mb-2 border-b pb-2">Edges & Weights</h4>
                      <ul className="grid grid-cols-2 gap-2 text-sm font-mono text-gray-600">
                        <li>A → B: 4</li>
                        <li>A → C: 2</li>
                        <li>B → C: 1</li>
                        <li>B → D: 5</li>
                        <li>C → D: 8</li>
                        <li>C → E: 10</li>
                        <li>D → E: 2</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-semibold text-gray-700 mb-2 border-b pb-2">Initialization</h4>
                      <div className="grid grid-cols-5 text-center text-sm">
                        <div className="p-1 bg-green-50 border border-green-100 rounded">A: 0</div>
                        <div className="p-1 bg-gray-50 border border-gray-100 rounded">B: ∞</div>
                        <div className="p-1 bg-gray-50 border border-gray-100 rounded">C: ∞</div>
                        <div className="p-1 bg-gray-50 border border-gray-100 rounded">D: ∞</div>
                        <div className="p-1 bg-gray-50 border border-gray-100 rounded">E: ∞</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">Visited = ∅</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-sm">1</span>
                        Step 1: Pick A (dist = 0)
                      </h4>
                      <div className="pl-8 space-y-1 text-gray-600 text-sm">
                        <p>Update B: 0 + 4 = 4 <span className="text-green-600 font-bold">✓</span></p>
                        <p>Update C: 0 + 2 = 2 <span className="text-green-600 font-bold">✓</span></p>
                        <p className="text-gray-400 mt-1">Visited = {'{A}'}</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-sm">2</span>
                        Step 2: Pick C (dist = 2)
                      </h4>
                      <div className="pl-8 space-y-1 text-gray-600 text-sm">
                        <p>Update D: 2 + 8 = 10 <span className="text-green-600 font-bold">✓</span></p>
                        <p>Update E: 2 + 10 = 12 <span className="text-green-600 font-bold">✓</span></p>
                        <p className="text-gray-400 mt-1">Visited = {'{A, C}'}</p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-sm">3</span>
                        Step 3: Pick B (dist = 4)
                      </h4>
                      <div className="pl-8 space-y-1 text-gray-600 text-sm">
                        <p>Update C: 4 + 1 = 5 (No update, 2 {'<'} 5)</p>
                        <p>Update D: 4 + 5 = 9 <span className="text-green-600 font-bold">✓</span> (New shortest path to D!)</p>
                        <p className="text-gray-400 mt-1">Visited = {'{A, C, B}'}</p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-sm">4</span>
                        Step 4: Pick D (dist = 9)
                      </h4>
                      <div className="pl-8 space-y-1 text-gray-600 text-sm">
                        <p>Update E: 9 + 2 = 11 <span className="text-green-600 font-bold">✓</span> (New shortest path to E!)</p>
                        <p className="text-gray-400 mt-1">Visited = {'{A, C, B, D}'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                    <h4 className="font-bold text-indigo-900 mb-4 text-center">Final Shortest Distances from A</h4>
                    <div className="flex justify-center gap-4 flex-wrap">
                      {['A: 0', 'B: 4', 'C: 2', 'D: 9', 'E: 11'].map((item, idx) => (
                        <div key={idx} className="bg-white px-4 py-2 rounded shadow-sm border border-indigo-200 font-mono font-bold text-indigo-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-gray-100 mb-16" />

              {/* 3. Main Logical Code */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  3. Implementation
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  Core logic using a standard Priority Queue in C++:
                </p>

                <div className="relative group">
                  <div className="absolute -top-3 left-4 px-2 bg-white text-xs font-semibold text-gray-400 tracking-wider">
                    C++
                  </div>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <div className="overflow-x-auto p-6 pt-8">
                      <pre className="font-mono text-sm leading-relaxed text-gray-800">
                        {`#include <bits/stdc++.h>
using namespace std;

void dijkstra(int src, vector<vector<pair<int,int>>>& adj, int V) {
    // Min-heap priority queue to store {distance, node}
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    vector<int> dist(V, INT_MAX);

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int node = pq.top().second;
        int d = pq.top().first;
        pq.pop();

        // If current distance is greater than already found shortest, skip
        if (d > dist[node]) continue;

        for (auto it : adj[node]) {
            int next = it.first;
            int weight = it.second;

            // Relaxation Step
            if (dist[node] + weight < dist[next]) {
                dist[next] = dist[node] + weight;
                pq.push({dist[next], next});
            }
        }
    }
}`}
                      </pre>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" /> Priority Queue ensures closest node selection
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" /> Edge relaxation updates shortest paths
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-gray-100 mb-16" />

              {/* 4. Complexity Analysis */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  4. Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Min Heap (PQ) Time</div>
                    <div className="text-2xl font-bold text-gray-900">O((V + E) log V)</div>
                    <div className="text-xs text-gray-400 mt-1">Standard Implementation</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Space Complexity</div>
                    <div className="text-2xl font-bold text-gray-900">O(V)</div>
                    <div className="text-xs text-gray-400 mt-1">Distance Array + PQ</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Array-based Time</div>
                    <div className="text-lg font-bold text-gray-800">O(V²)</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Edge Weights</div>
                    <div className="text-lg font-bold text-gray-800">Non-negative</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Type</div>
                    <div className="text-lg font-bold text-gray-800">Single Source</div>
                  </div>
                </div>
              </section>

              <hr className="border-gray-100 mb-16" />

              {/* 5. Applications */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  5. Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                      <Navigation size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">GPS & Navigation</h3>
                      <p className="text-gray-600 leading-relaxed">Finding the shortest route between locations on a map.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Network Routing</h3>
                      <p className="text-gray-600 leading-relaxed">Routing protocols like OSPF use Dijkstra to find the best path for data.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mr-4">
                      <Activity size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Traffic Optimization</h3>
                      <p className="text-gray-600 leading-relaxed">Optimizing traffic flow in urban planning.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-4">
                      <Gamepad2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Game Development</h3>
                      <p className="text-gray-600 leading-relaxed">Pathfinding for AI characters (though A* is often preferred).</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mr-4">
                      <Radio size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Telecommunications</h3>
                      <p className="text-gray-600 leading-relaxed">Routing calls and data efficiently across networks.</p>
                    </div>
                  </div>

                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </AlgorithmLayout>
  )
}
