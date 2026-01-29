'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Hash, Activity, ArrowRight, Database, Key, Search, Lock } from 'lucide-react'
import AlgorithmLayout from '@/components/AlgorithmLayout'

const HashingIntroduction = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AlgorithmLayout title="Hashing" algorithm="hashing">
      <div className="w-full max-w-7xl mx-auto mb-8 transition-all duration-500 ease-in-out">
        {/* Header / Toggle Bar */}
        <div
          className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-indigo-500 hover:shadow-md transition-all group cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <Hash size={24} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Introduction to Hashing
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
                    <span className="font-semibold text-gray-900">Hashing</span> is a technique used to map data to a fixed-size table using a hash function. The hash function converts a key into an index where the value is stored.
                  </p>

                  <div className="flex justify-center my-6">
                    <div className="bg-indigo-50 px-6 py-3 rounded-lg border border-indigo-100 font-mono text-indigo-800 font-bold">
                      index = hash(key)
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    A Hash Table allows for fast insertion, deletion, and searching, ideally in <span className="font-mono text-sm bg-gray-100 px-1 rounded">O(1)</span> time. However, since multiple keys can map to the same index, <strong>collisions</strong> can occur.
                  </p>

                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 mb-8">
                    <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                      Collision
                    </h3>
                    <p className="text-orange-800 leading-relaxed mb-4">
                      A collision happens when two different keys generate the same hash index.
                    </p>
                    <div className="bg-white p-3 rounded border border-orange-200 font-mono text-sm text-gray-600 mb-4 inline-block">
                      <div>hash(12) = 2</div>
                      <div>hash(22) = 2</div>
                    </div>
                    <p className="text-orange-800 leading-relaxed">
                      Since both want to occupy index 2, we need a resolution technique. In this visualizer, we focus on <span className="font-bold">Linear Probing</span>.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-gray-100 mb-16" />

              {/* 2. Example with Dry Run */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  2. Example with Dry Run (Linear Probing)
                </h2>

                <div className="mb-8">
                  <div className="flex gap-4 mb-6">
                    <span className="px-3 py-1 bg-gray-100 rounded text-sm font-semibold text-gray-700">Hash Function: key % 10</span>
                    <span className="px-3 py-1 bg-gray-100 rounded text-sm font-semibold text-gray-700">Table Size: 10</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-6">Insert Keys: 12, 22, 32, 25</h3>

                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                      <h4 className="font-semibold text-gray-900 mb-2">Step 1: Insert 12</h4>
                      <p className="text-gray-600 mb-2 code-font">hash(12) = 12 % 10 = 2</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 uppercase">Action</span>
                        <span className="text-green-700 font-medium">Index 2 is empty. Insert 12 at Index 2.</span>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
                      <h4 className="font-semibold text-gray-900 mb-2">Step 2: Insert 22</h4>
                      <p className="text-gray-600 mb-2 code-font">hash(22) = 22 % 10 = 2 (Collision!)</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 uppercase">Action</span>
                        <span className="text-yellow-700 font-medium">Linear Probe → Check Index 3. Empty. Insert 22 at Index 3.</span>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>
                      <h4 className="font-semibold text-gray-900 mb-2">Step 3: Insert 32</h4>
                      <p className="text-gray-600 mb-2 code-font">hash(32) = 32 % 10 = 2 (Collision!)</p>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="text-gray-600 text-sm">Index 2 occupied. Next...</div>
                        <div className="text-gray-600 text-sm">Index 3 occupied. Next...</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs font-bold text-gray-400 uppercase">Action</span>
                          <span className="text-orange-700 font-medium">Index 4 is empty. Insert 32 at Index 4.</span>
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                      <h4 className="font-semibold text-gray-900 mb-2">Step 4: Insert 25</h4>
                      <p className="text-gray-600 mb-2 code-font">hash(25) = 25 % 10 = 5</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 uppercase">Action</span>
                        <span className="text-green-700 font-medium">Index 5 is empty. Insert 25 at Index 5.</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Final Hash Table State</h4>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2 font-mono text-center">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
                        const val = i === 2 ? 12 : i === 3 ? 22 : i === 4 ? 32 : i === 5 ? 25 : null;
                        return (
                          <div key={i} className={`border rounded p-2 ${val ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200 text-gray-300'}`}>
                            <div className="text-xs text-gray-500 mb-1">{i}</div>
                            <div className={`font-bold ${val ? 'text-indigo-700' : ''}`}>{val || '-'}</div>
                          </div>
                        )
                      })}
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
                  Core logic for Linear Probing in C++:
                </p>

                <div className="relative group">
                  <div className="absolute -top-3 left-4 px-2 bg-white text-xs font-semibold text-gray-400 tracking-wider">
                    C++
                  </div>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <div className="overflow-x-auto p-6 pt-8">
                      <pre className="font-mono text-sm leading-relaxed text-gray-800">
                        {`#define SIZE 10

int hashFunction(int key) {
    return key % SIZE;
}

void insert(int table[], int key) {
    int index = hashFunction(key);

    // Linear Probing for collision resolution
    while (table[index] != -1) {
        index = (index + 1) % SIZE; 
    }

    table[index] = key;
}`}
                      </pre>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 italic">
                    Key Insight: It checks the next slot sequentially, wrapping around using modulo if necessary.
                  </p>
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
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Average Case</div>
                    <div className="text-2xl font-bold text-gray-900">O(1)</div>
                    <div className="text-xs text-gray-400 mt-1">Insertion, Search, Deletion</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Worst Case</div>
                    <div className="text-2xl font-bold text-red-600">O(n)</div>
                    <div className="text-xs text-gray-400 mt-1">Due to Clustering</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Space Complexity</div>
                    <div className="text-2xl font-bold text-gray-900">O(n)</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Main Issue</div>
                    <div className="text-2xl font-bold text-gray-900">Clustering</div>
                    <div className="text-xs text-gray-400 mt-1">Primary Clustering</div>
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
                      <Search size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Fast Lookup Systems</h3>
                      <p className="text-gray-600 leading-relaxed">Used in dictionaries and symbol tables for O(1) access.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
                      <Database size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Database Indexing</h3>
                      <p className="text-gray-600 leading-relaxed">Efficiently maps keys to physical storage locations.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mr-4">
                      <Activity size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Caching Systems</h3>
                      <p className="text-gray-600 leading-relaxed">Used in caches (like LRU) to quickly locate data.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-4">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Security</h3>
                      <p className="text-gray-600 leading-relaxed">Password storage and authentication verification.</p>
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

export default HashingIntroduction
