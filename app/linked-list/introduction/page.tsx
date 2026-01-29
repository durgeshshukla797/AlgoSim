'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Share2, Activity, ArrowRight, Database, Repeat, RotateCcw } from 'lucide-react'
import AlgorithmLayout from '@/components/AlgorithmLayout'

const LinkedListIntroduction = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AlgorithmLayout title="Linked List" algorithm="linked-list">
      <div className="w-full max-w-7xl mx-auto mb-8 transition-all duration-500 ease-in-out">
        {/* Header / Toggle Bar */}
        <div
          className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-indigo-500 hover:shadow-md transition-all group cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <Share2 size={24} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Introduction to Singly Linked List
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
                    A <span className="font-semibold text-gray-900">Singly Linked List</span> is a linear data structure where each element (called a node) contains:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6 pl-4">
                    <li><span className="font-semibold">Data</span>: The value stored in the node.</li>
                    <li><span className="font-semibold">Next</span>: A pointer (reference) to the next node in the list.</li>
                  </ul>
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    Unlike arrays, linked lists do not store elements in contiguous memory locations. Each node dynamically links to the next, allowing efficient insertions and deletions. The last node points to <span className="font-mono text-sm bg-gray-100 px-1 rounded">NULL</span>, indicating the end of the list.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Activity className="text-indigo-500" size={20} /> Algorithmic Paradigm
                    </h3>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                      <li><span className="font-medium text-gray-900">Pointer manipulation</span>: The core mechanism for traversing and modifying the list.</li>
                      <li><span className="font-medium text-gray-900">Linear traversal</span>: Accessing elements sequentially starting from the head.</li>
                    </ul>
                  </div>

                  <div className="flex justify-center my-8">
                    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                      <p className="text-center text-sm text-gray-500 mb-2 font-mono">Structure of a Node</p>
                      <div className="flex items-center">
                        <div className="flex border-2 border-gray-800 rounded-md overflow-hidden">
                          <div className="px-4 py-2 bg-blue-50 border-r-2 border-gray-800 font-mono font-bold">Data</div>
                          <div className="px-4 py-2 bg-purple-50 font-mono text-purple-700">Next</div>
                        </div>
                        <ArrowRight className="ml-2 text-gray-400" />
                        <span className="ml-2 font-mono text-gray-500">...</span>
                      </div>
                    </div>
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
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Example: Insert elements 10 → 20 → 30</h3>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-700 mb-2">1. Initial State</h4>
                      <div className="font-mono text-gray-600 bg-white p-2 rounded border border-gray-200 inline-block">
                        Head → NULL
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-700 mb-2">2. Create node with value 10</h4>
                      <div className="font-mono text-gray-600 bg-white p-2 rounded border border-gray-200 inline-block">
                        Head → [10 | NULL]
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-700 mb-2">3. Insert 20 at the end</h4>
                      <div className="font-mono text-gray-600 bg-white p-2 rounded border border-gray-200 inline-block">
                        Head → [10 | •] → [20 | NULL]
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-700 mb-2">4. Insert 30 at the end</h4>
                      <div className="font-mono text-gray-600 bg-white p-2 rounded border border-gray-200 inline-block">
                        Head → [10 | •] → [20 | •] → [30 | NULL]
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Dry Run: Deleting node with value 20</h3>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-red-500 mb-2">Before Deletion</h4>
                        <div className="font-mono text-sm bg-gray-50 p-3 rounded text-gray-700">
                          Head → [10] → [20] → [30] → NULL
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">After Deletion</h4>
                        <div className="font-mono text-sm bg-gray-50 p-3 rounded text-gray-700">
                          Head → [10] → [30] → NULL
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Operation Steps:</h4>
                      <ol className="list-decimal list-inside text-gray-600 space-y-1">
                        <li>Traverse the list until the node before 20 (node 10).</li>
                        <li>Update the next pointer of 10 to skip 20 and point to 30.</li>
                        <li>(In languages like C++, delete node 20 to free memory).</li>
                      </ol>
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
                  Below is the core logic for basic operations on a Singly Linked List in C++:
                </p>

                <div className="relative group">
                  <div className="absolute -top-3 left-4 px-2 bg-white text-xs font-semibold text-gray-400 tracking-wider">
                    C++
                  </div>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <div className="overflow-x-auto p-6 pt-8">
                      <pre className="font-mono text-sm leading-relaxed text-gray-800">
                        {`struct Node {
    int data;
    Node* next;
};

Node* insertAtEnd(Node* head, int value) {
    Node* newNode = new Node();
    newNode->data = value;
    newNode->next = NULL;

    if (head == NULL)
        return newNode;

    Node* temp = head;
    while (temp->next != NULL)
        temp = temp->next;

    temp->next = newNode;
    return head;
}

Node* deleteNode(Node* head, int value) {
    if (head == NULL)
        return head;

    if (head->data == value)
        return head->next;

    Node* temp = head;
    while (temp->next != NULL && temp->next->data != value)
        temp = temp->next;

    if (temp->next != NULL)
        temp->next = temp->next->next;

    return head;
}`}
                      </pre>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 italic">
                    Key Insight: All operations rely on sequential traversal and pointer updates.
                  </p>
                </div>
              </section>

              <hr className="border-gray-100 mb-16" />

              {/* 4. Complexity Analysis */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                  4. Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Insert (Beginning)</div>
                    <div className="text-xl font-bold text-gray-900">O(1)</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Insert (End)</div>
                    <div className="text-xl font-bold text-gray-900">O(n)</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Deletion</div>
                    <div className="text-xl font-bold text-gray-900">O(n)</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Search</div>
                    <div className="text-xl font-bold text-gray-900">O(n)</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Space Complexity</div>
                    <div className="text-2xl font-bold text-gray-900">O(n)</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Memory Allocation</div>
                    <div className="text-2xl font-bold text-gray-900">Dynamic</div>
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
                      <Database size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Dynamic Data Storage</h3>
                      <p className="text-gray-600 leading-relaxed">Memory-efficient storage where size is not known in advance.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
                      <Repeat size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Stacks & Queues</h3>
                      <p className="text-gray-600 leading-relaxed">Underlying data structure for implementing flexible stacks and queues.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-4">
                      <Share2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Graphs</h3>
                      <p className="text-gray-600 leading-relaxed">Used in Adjacency Lists to represent graph connections efficiently.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mr-4">
                      <RotateCcw size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Undo/Redo</h3>
                      <p className="text-gray-600 leading-relaxed">Used in applications to maintain a history of states for undo operations.</p>
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

export default LinkedListIntroduction
