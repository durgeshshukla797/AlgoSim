'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, GitMerge, Activity, ArrowDown, Database, HardDrive, Link, Layers } from 'lucide-react'
import AlgorithmLayout from '@/components/AlgorithmLayout'

const MergeSortIntroduction = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AlgorithmLayout title="Merge Sort" algorithm="sorting">
      <div className="w-full max-w-7xl mx-auto mb-8 transition-all duration-500 ease-in-out">
        {/* Header / Toggle Bar */}
        <div
          className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-indigo-500 hover:shadow-md transition-all group cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <GitMerge size={24} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Introduction to Merge Sort
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
                    <span className="font-semibold text-gray-900">Merge Sort</span> is a divide-and-conquer sorting algorithm that recursively divides an array into smaller subarrays, sorts them, and then merges them back together in sorted order.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    Instead of sorting elements in place, Merge Sort focuses on:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6 pl-4">
                    <li><span className="font-semibold">Breaking</span> the problem into smaller independent parts.</li>
                    <li><span className="font-semibold">Solving</span> each part recursively.</li>
                    <li><span className="font-semibold">Combining</span> the results using a merge process.</li>
                  </ul>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Activity className="text-indigo-500" size={20} /> Algorithmic Paradigm: Divide and Conquer
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-medium text-gray-900">Key Idea:</span> An array of size <span className="font-mono text-sm bg-gray-200 px-1 rounded">n</span> is divided until subarrays of size 1 are obtained. These are then merged in a sorted manner.
                    </p>
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
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Example: Sorting [38, 27, 43, 3, 9, 82, 10]</h3>

                  <div className="space-y-8">
                    {/* Step 1: Divide Phase */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                      <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                        <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                        Divide Phase
                      </h4>
                      <div className="flex flex-col items-center space-y-4">
                        <div className="font-mono bg-white px-3 py-1 rounded shadow-sm border border-blue-200">[38, 27, 43, 3, 9, 82, 10]</div>
                        <ArrowDown size={20} className="text-blue-400" />
                        <div className="flex gap-8">
                          <div className="font-mono bg-white px-3 py-1 rounded shadow-sm border border-blue-200">[38, 27, 43]</div>
                          <div className="font-mono bg-white px-3 py-1 rounded shadow-sm border border-blue-200">[3, 9, 82, 10]</div>
                        </div>
                        <div className="flex w-full justify-center gap-4 text-gray-400"><ArrowDown size={16} /><ArrowDown size={16} /></div>
                        <div className="flex gap-4 flex-wrap justify-center">
                          <div className="font-mono bg-white px-2 py-1 rounded shadow-sm border border-blue-200 text-xs">[38, 27]</div>
                          <div className="font-mono bg-white px-2 py-1 rounded shadow-sm border border-blue-200 text-xs">[43]</div>
                          <div className="font-mono bg-white px-2 py-1 rounded shadow-sm border border-blue-200 text-xs">[3, 9]</div>
                          <div className="font-mono bg-white px-2 py-1 rounded shadow-sm border border-blue-200 text-xs">[82, 10]</div>
                        </div>
                        <div className="flex w-full justify-center gap-2 text-gray-400 text-xs">...</div>
                        <div className="flex gap-2 flex-wrap justify-center">
                          <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200 text-xs">[38]</span>
                          <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200 text-xs">[27]</span>
                          <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200 text-xs">[43]</span>
                          <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200 text-xs">[3]</span>
                          <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200 text-xs">[9]</span>
                          <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200 text-xs">[82]</span>
                          <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200 text-xs">[10]</span>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Merge Phase */}
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                      <h4 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                        <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                        Merge Phase
                      </h4>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-4 items-center justify-center text-sm">
                          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-green-200 shadow-sm">
                            <span className="text-gray-500">[38]+[27]</span> <ArrowDown className="rotate-[-90deg] text-green-500" size={12} /> <span className="font-bold text-green-700 font-mono">[27, 38]</span>
                          </div>
                          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-green-200 shadow-sm">
                            <span className="text-gray-500">[3]+[9]</span> <ArrowDown className="rotate-[-90deg] text-green-500" size={12} /> <span className="font-bold text-green-700 font-mono">[3, 9]</span>
                          </div>
                          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-green-200 shadow-sm">
                            <span className="text-gray-500">[82]+[10]</span> <ArrowDown className="rotate-[-90deg] text-green-500" size={12} /> <span className="font-bold text-green-700 font-mono">[10, 82]</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <ArrowDown size={20} className="text-green-400 my-2" />
                          <div className="font-mono bg-white px-4 py-2 rounded shadow-sm border border-green-300 text-green-800 font-bold text-lg">
                            [3, 9, 10, 27, 38, 43, 82]
                          </div>
                          <span className="text-green-600 text-xs font-semibold mt-1">Sorted Output</span>
                        </div>
                      </div>
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
                  Here is the core logic for Merge Sort in C++:
                </p>

                <div className="relative group">
                  <div className="absolute -top-3 left-4 px-2 bg-white text-xs font-semibold text-gray-400 tracking-wider">
                    C++
                  </div>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <div className="overflow-x-auto p-6 pt-8">
                      <pre className="font-mono text-sm leading-relaxed text-gray-800">
                        {`void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp;
    int i = left, j = mid + 1;

    // Merge two sorted halves
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j])
            temp.push_back(arr[i++]);
        else
            temp.push_back(arr[j++]);
    }

    // Add remaining elements
    while (i <= mid)
        temp.push_back(arr[i++]);

    while (j <= right)
        temp.push_back(arr[j++]);

    // Copy back to original array
    for (int k = 0; k < temp.size(); k++)
        arr[left + k] = temp[k];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right)
        return;

    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}`}
                      </pre>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 italic">
                    Key Insight: Sorting happens during the merge step, while recursion handles the divide phase automatically.
                  </p>
                </div>
              </section>

              <hr className="border-gray-100 mb-16" />

              {/* 4. Complexity Analysis */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  4. Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Time Complexity</div>
                    <div className="text-2xl font-bold text-gray-900">O(n log n)</div>
                    <div className="text-xs text-gray-400 mt-1">Best, Average, & Worst Case</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Space Complexity</div>
                    <div className="text-2xl font-bold text-gray-900">O(n)</div>
                    <div className="text-xs text-gray-400 mt-1">Auxiliary Array</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Stability</div>
                    <div className="text-2xl font-bold text-green-600">Yes</div>
                    <div className="text-xs text-gray-400 mt-1">Maintains relative order</div>
                  </div>
                </div>
                <p className="mt-6 text-gray-600 text-center italic">
                  Merge Sort guarantees the same performance regardless of input order.
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mr-4">
                      <Database size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Sorting Large Datasets</h3>
                      <p className="text-gray-600 leading-relaxed">Preferred when stability and predictable performance are required.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                      <HardDrive size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">External Sorting</h3>
                      <p className="text-gray-600 leading-relaxed">Effective for disk-based data where data does not fit in RAM.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
                      <Link size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Linked Lists</h3>
                      <p className="text-gray-600 leading-relaxed">Sorts linked lists efficiently without requiring random access.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mr-4">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Foundational Algorithm</h3>
                      <p className="text-gray-600 leading-relaxed">A core example of the divide-and-conquer paradigm.</p>
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

export default MergeSortIntroduction
