'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Layers, Activity } from 'lucide-react'
import AlgorithmLayout from '@/components/AlgorithmLayout'

const TowerOfHanoiIntroduction = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AlgorithmLayout title="Tower of Hanoi" algorithm="tower-of-hanoi">
      <div className="w-full max-w-7xl mx-auto mb-8 transition-all duration-500 ease-in-out">
        {/* Header / Toggle Bar */}
        <div
          className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-indigo-500 hover:shadow-md transition-all group cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <Layers size={24} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Introduction to Tower of Hanoi
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

            {/* Header Section Removed as per request */}
            <div className="max-w-4xl mx-auto">

              {/* 1. Definition / Algorithm Used */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  1. Definition & Algorithm
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    The Tower of Hanoi is a mathematical puzzle consisting of three rods and a number of disks of different sizes, which can slide onto any rod. The puzzle starts with the disks in a stack on the Source rod in ascending order of size, the smallest at the top.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Activity className="text-indigo-500" size={20} /> The Rules
                    </h3>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                      <li>Only one disk can be moved at a time.</li>
                      <li>Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack.</li>
                      <li>No disk may be placed on top of a smaller disk.</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Algorithm Used: Recursive Divide and Conquer</h3>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    To move <span className="font-semibold text-gray-900">N</span> disks from Source to Destination:
                  </p>
                  <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700 bg-white pl-2">
                    <li className="pl-2">Move <span className="font-medium">N-1</span> disks from <span className="font-medium text-blue-600">Source</span> to <span className="font-medium text-purple-600">Auxiliary</span>.</li>
                    <li className="pl-2">Move the largest disk from <span className="font-medium text-blue-600">Source</span> to <span className="font-medium text-green-600">Destination</span>.</li>
                    <li className="pl-2">Move <span className="font-medium">N-1</span> disks from <span className="font-medium text-purple-600">Auxiliary</span> to <span className="font-medium text-green-600">Destination</span>.</li>
                  </ol>
                </div>
              </section>

              <hr className="border-gray-100 mb-16" />

              {/* 2. Example with Dry Run */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  2. Example: 3 Disks
                </h2>
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Initial State</h3>
                      <div className="font-mono text-sm space-y-1 text-gray-600 bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between"><span>Rod A (Source):</span> <span className="font-bold text-blue-600">[3, 2, 1]</span></div>
                        <div className="flex justify-between"><span>Rod B (Aux):</span> <span className="text-gray-400">[]</span></div>
                        <div className="flex justify-between"><span>Rod C (Dest):</span> <span className="text-gray-400">[]</span></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Final State</h3>
                      <div className="font-mono text-sm space-y-1 text-gray-600 bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between"><span>Rod A:</span> <span className="text-gray-400">[]</span></div>
                        <div className="flex justify-between"><span>Rod B:</span> <span className="text-gray-400">[]</span></div>
                        <div className="flex justify-between"><span>Rod C:</span> <span className="font-bold text-green-600">[3, 2, 1]</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Step-by-step Execution</h3>
                    <div className="space-y-2">
                      {[
                        "Move disk 1 from A → C",
                        "Move disk 2 from A → B",
                        "Move disk 1 from C → B",
                        "Move disk 3 from A → C",
                        "Move disk 1 from B → A",
                        "Move disk 2 from B → C",
                        "Move disk 1 from A → C"
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-center text-gray-700 bg-white p-3 rounded-lg border border-gray-100">
                          <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-mono text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-sm text-gray-500 text-center font-medium">
                      Minimum moves: 2³ - 1 = 7
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
                  The recursive solution is elegant and concise. Here is the core logic in C++:
                </p>

                <div className="relative group">
                  {/* Decorative header for code block */}
                  <div className="absolute -top-3 left-4 px-2 bg-white text-xs font-semibold text-gray-400 tracking-wider">
                    C++
                  </div>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <div className="overflow-x-auto p-6 pt-8">
                      <pre className="font-mono text-sm leading-relaxed text-gray-800">
                        {`void towerOfHanoi(int n, char source, char auxiliary, char destination) {
    // Base Case
    if (n == 0)
        return;

    // Move N-1 disks from Source to Auxiliary
    towerOfHanoi(n - 1, source, destination, auxiliary);
    
    // Move the Nth disk from Source to Destination
    cout << "Move disk " << n << " from " << source 
         << " to " << destination << endl;
    
    // Move N-1 disks from Auxiliary to Destination
    towerOfHanoi(n - 1, auxiliary, source, destination);
}`}
                      </pre>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 italic">
                    Key Insight: Recursion naturally models the problem by delegating the movement of N-1 disks.
                  </p>
                </div>
              </section>

              <hr className="border-gray-100 mb-16" />

              {/* 4. Complexity Analysis */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  4. Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Time Complexity</div>
                    <div className="text-2xl font-bold text-gray-900">O(2ⁿ)</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Exponential
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Space Complexity</div>
                    <div className="text-2xl font-bold text-gray-900">O(n)</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Stack Depth
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Total Moves</div>
                    <div className="text-2xl font-bold text-gray-900">2ⁿ - 1</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Minimal
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                  The exponential time complexity makes this algorithm computationally expensive for large values of <span className="font-mono text-sm bg-gray-100 px-1 rounded">N</span>, doubling the number of moves with each additional disk.
                </p>
              </section>

              <hr className="border-gray-100 mb-16" />

              {/* 5. Applications */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  5. Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Teaching Recursion</h3>
                      <p className="text-gray-600 leading-relaxed">The primary example used to explain recursion, stack frames, and divide-and-conquer strategies.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Algorithm Design</h3>
                      <p className="text-gray-600 leading-relaxed">Used to model recursive processes and test algorithm visualizers for stack visualization.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Backup Rotations</h3>
                      <p className="text-gray-600 leading-relaxed">The underlying logic is similar to the "Tower of Hanoi" backup rotation scheme used in data archiving.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Game Logic</h3>
                      <p className="text-gray-600 leading-relaxed">A foundational puzzle in game design, often appearing as a mini-game in adventure titles.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
    </AlgorithmLayout>
  );
};

export default TowerOfHanoiIntroduction;
