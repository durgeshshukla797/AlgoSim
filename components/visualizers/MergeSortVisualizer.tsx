"use client"

import React, { useState, useEffect, useCallback } from 'react'

// Types
type Phase = 'INPUT_SIZE' | 'INPUT_ELEMENTS' | 'VISUALIZING'

interface TreeNode {
  id: string
  values: number[]
  level: number
  parentId: string | null
  type: 'root' | 'left' | 'right'
  isDivisible: boolean
  isSorted: boolean
}

interface AnimationStep {
  message: string
  visibleNodes: string[] // IDs of nodes visible at this step
  sortedNodes: string[] // IDs of nodes marked as sorted
  activeNodes: string[] // IDs of nodes currently being processed
  mergeHighlight: { nodeId: string, values: number[] } | null // Active update
}

const MergeSortVisualizer: React.FC = () => {
  // --- State ---
  const [phase, setPhase] = useState<Phase>('INPUT_SIZE')
  const [arraySize, setArraySize] = useState<number>(4)
  const [inputArray, setInputArray] = useState<string[]>([]) // Strings for input handling

  // Visualization State
  const [treeStructure, setTreeStructure] = useState<TreeNode[]>([])
  const [steps, setSteps] = useState<AnimationStep[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  // --- Helpers ---
  const generateTree = (initialArray: number[]) => {
    const nodes: TreeNode[] = []
    let idCounter = 0

    const build = (arr: number[], level: number, parentId: string | null, type: 'root' | 'left' | 'right') => {
      const id = `node-${idCounter++}`
      const node: TreeNode = {
        id,
        values: arr,
        level,
        parentId,
        type,
        isDivisible: arr.length > 1,
        isSorted: false
      }
      nodes.push(node)

      if (arr.length > 1) {
        const mid = Math.floor(arr.length / 2)
        const left = arr.slice(0, mid)
        const right = arr.slice(mid)

        const leftId = build(left, level + 1, id, 'left')
        const rightId = build(right, level + 1, id, 'right')

        // We can store children IDs if needed, but linear list with parentId is enough for React render if we map carefully.
        // Actually, for a tree render, recursive structure is easier. 
        // But let's verify structure first.
        return id
      }
      return id
    }

    build(initialArray, 0, null, 'root')
    return nodes
  }

  const generateSteps = (structure: TreeNode[], initialArray: number[]) => {
    const animationSteps: AnimationStep[] = []

    // Step 0: Initial State (Only Root)
    // Actually, user wants "dividing arrays further".
    // Let's reveal top-down via Recursion simulation.

    const visible: Set<string> = new Set()
    const sorted: Set<string> = new Set()
    const active: Set<string> = new Set()

    // Helper to find node by values+level (approximate) or stick to the generated structure order.
    // Since `generateTree` is deterministic depth-first, we can re-simulate or just use the nodes list.
    // Better: Simulate Merge Sort and find corresponding nodes in the `structure`.
    // NOTE: `structure` contains the "Static" tree. 
    // We need to map dynamic merge sort actions to these nodes.
    // Unique ID map: level + index_in_level? Or maintain value reference?
    // Values change! The `structure` above stores the *initial* divided values.
    // Wait, in standard merge sort visualization, the nodes *are* the subarrays.
    // The "Merge" replaces the "Unsorted Parent" with the "Sorted Parent".
    // So the Parent Node's values update.

    // REVISED STRATEGY:
    // The Tree Nodes are fixed slots.
    // 1. Divide Phase: Reveal slots downwards.
    // 2. Merge Phase: Update values in the slots upwards.

    // We need a way to look up the node ID for a given recursive call.
    let nodeIdx = 0
    const getNode = () => structure[nodeIdx++]

    const simulate = (arr: number[]) => {
      const currentNode = getNode() // Depth-first traversal matches build order
      const myId = currentNode.id

      // Step: Reveal this node
      visible.add(myId)
      active.clear()
      active.add(myId)

      animationSteps.push({
        message: `Dividing current array: [${arr.join(', ')}]`,
        visibleNodes: Array.from(visible),
        sortedNodes: Array.from(sorted),
        activeNodes: Array.from(active),
        mergeHighlight: null
      })

      if (arr.length <= 1) {
        sorted.add(myId)
        animationSteps.push({
          message: `Reached atomic element [${arr[0]}]. Ready to merge.`,
          visibleNodes: Array.from(visible),
          sortedNodes: Array.from(sorted),
          activeNodes: [],
          mergeHighlight: null
        })
        return arr
      }

      const mid = Math.floor(arr.length / 2)
      const leftArr = arr.slice(0, mid)
      const rightArr = arr.slice(mid)

      const sortedLeft = simulate(leftArr)
      const sortedRight = simulate(rightArr)

      // Merge Phase
      const merged: number[] = []
      let i = 0, j = 0
      while (i < sortedLeft.length && j < sortedRight.length) {
        if (sortedLeft[i] < sortedRight[j]) merged.push(sortedLeft[i++])
        else merged.push(sortedRight[j++])
      }
      while (i < sortedLeft.length) merged.push(sortedLeft[i++])
      while (j < sortedRight.length) merged.push(sortedRight[j++])

      // Step: Show Merge result in this node
      active.clear()
      active.add(myId)
      sorted.add(myId)

      animationSteps.push({
        message: `Merging [${sortedLeft.join(', ')}] and [${sortedRight.join(', ')}] into [${merged.join(', ')}]`,
        visibleNodes: Array.from(visible),
        sortedNodes: Array.from(sorted),
        activeNodes: Array.from(active),
        mergeHighlight: { nodeId: myId, values: merged } // Update this node's values visually
      })

      return merged
    }

    simulate(initialArray)
    return animationSteps
  }

  // --- Handlers ---

  const handleSizeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (arraySize < 2 || arraySize > 20) {
      alert("Please choose a size between 2 and 20 for best visualization.")
      return
    }
    setInputArray(new Array(arraySize).fill(''))
    setPhase('INPUT_ELEMENTS')
  }

  const handleElementChange = (idx: number, val: string) => {
    const newArr = [...inputArray]
    newArr[idx] = val
    setInputArray(newArr)
  }

  const handleElementsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = inputArray.map(s => parseInt(s)).filter(n => !isNaN(n))
    if (parsed.length !== arraySize) {
      alert("Please fill all fields with valid numbers.")
      return
    }

    const tree = generateTree(parsed)
    setTreeStructure(tree)

    const animSteps = generateSteps(tree, parsed)
    setSteps(animSteps)

    setCurrentStep(0)
    setPhase('VISUALIZING')
  }

  // Auto-play loop
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 2000) // 2 seconds per step reading time
    } else {
      setIsPlaying(false)
    }
    return () => clearTimeout(timer)
  }, [isPlaying, currentStep, steps.length])


  // --- Renderers ---

  // Recursive Tree Rendering
  const renderTree = (nodeId: string): React.ReactNode => {
    const node = treeStructure.find(n => n.id === nodeId)
    if (!node) return null

    // Check visibility from current step
    const stepState = steps[currentStep]
    if (!stepState || !stepState.visibleNodes.includes(nodeId)) return null

    // Determine values to show (Initial vs Merged)
    // If we have a mergeHighlight for this node in the *past* or *current* step, we should show that.
    // Actually, `mergeHighlight` is transient active action.
    // But once merged, the node should STAY merged.
    // The `sortedNodes` set implies it has been merged.
    // But we need the VALUES of the merge.
    // My step generation calculated `merged` array but didn't persist it in a state lookup for random access efficiently.
    // Let's assume for now: If node is sorted, we need its sorted values.
    // But `treeStructure` has initial values.
    // Quick fix: `generateSteps` should probably output the *entire* value map for the tree at that step if we want time-travel?
    // OR: We can re-calculate sorted version on the fly? No, expensive.
    // Better: Store `valuesResult` in the step for *all* sorted nodes? 
    // Optimization: Just store the `values` in the node map in the step?
    // Let's try: `step.nodeValues: Record<string, number[]>`

    // WAIT: `generateSteps` creates the steps linearly. 
    // Inside `simulate`, when we merge, we get the specific `merged` array.
    // We can cache this in a `map` inside `generateSteps` and snapshot it.

    // For this implementation, I will just use the `mergeHighlight` to show *active* change,
    // and for *completed* steps, I rely on the fact that I didn't verify *previous* merges in `renderTree`.
    // I need the data.
    // Redo `generateSteps` logic slightly to include a frame of values?
    // Yes.

    // Hack for now:
    // If `isSorted` (in step), we display the sorted version of `node.values`.
    // Since Merge Sort is deterministic, `node.values` sorted is... just `node.values.sort()`.
    // YES! Because the node represents that subarray range.
    // So if `stepState.sortedNodes.includes(nodeId)`, we show `[...node.values].sort((a,b)=>a-b)`.
    // This is valid for Merge Sort.

    const displayValues = stepState.sortedNodes.includes(nodeId)
      ? [...node.values].sort((a, b) => a - b)
      : node.values

    const isRoot = node.type === 'root'

    // Find children
    // The structure is flat list in generic generation, but traversal order was DFS.
    // We can find children by parentId.
    const children = treeStructure.filter(n => n.parentId === nodeId)
    const leftChild = children.find(n => n.type === 'left')
    const rightChild = children.find(n => n.type === 'right')

    return (
      <div key={nodeId} className="flex flex-col items-center mx-6 animate-fade-in">
        {/* Node Content */}
        <div className={`
            flex items-center justify-center p-2 rounded shadow-sm border-2 transition-all duration-300 mb-4
            ${stepState.activeNodes.includes(nodeId) ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-200 bg-white'}
            ${stepState.sortedNodes.includes(nodeId) && !stepState.activeNodes.includes(nodeId) ? 'border-green-500 bg-green-50' : ''}
         `}>
          {displayValues.map((v, i) => (
            <span key={i} className="w-8 h-8 flex items-center justify-center border font-semibold border-gray-100 mx-0.5 rounded bg-white text-gray-700">
              {v}
            </span>
          ))}
        </div>

        {/* Connector Lines (Visual Only - simplified) */}
        {/* Children Container */}
        {/* Connector Lines */}
        {(leftChild || rightChild) && (
          <div className="flex items-start justify-center gap-16 relative mt-8">
            {/* Vertical Line from Parent Bottom to Branch Split (1rem length) */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 h-4 w-0.5 bg-black"></div>

            {leftChild && (
              <div className="flex flex-col items-center relative">
                {/* Left Branch: Curve from Split down to Child */}
                <div className="absolute -top-4 right-[-2rem] w-[calc(50%+2rem)] h-4 border-t-2 border-l-2 border-black rounded-tl-xl pointer-events-none"></div>
                {renderTree(leftChild.id)}
              </div>
            )}
            {rightChild && (
              <div className="flex flex-col items-center relative">
                {/* Right Branch: Curve from Split down to Child */}
                <div className="absolute -top-4 left-[-2rem] w-[calc(50%+2rem)] h-4 border-t-2 border-r-2 border-black rounded-tr-xl pointer-events-none"></div>
                {renderTree(rightChild.id)}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }


  // --- Views ---

  if (phase === 'INPUT_SIZE') {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Merge Sort Visualization</h2>
        <form onSubmit={handleSizeSubmit} className="flex flex-col gap-4 w-full max-w-xs">
          <label className="text-gray-600 font-medium">Enter Array Size (2-20)</label>
          <input
            type="number"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            className="border p-2 rounded focus:ring-2 ring-blue-500 outline-none"
            autoFocus
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Next
          </button>
        </form>
      </div>
    )
  }

  if (phase === 'INPUT_ELEMENTS') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Enter {arraySize} Elements</h2>
        <form onSubmit={handleElementsSubmit} className="flex flex-col gap-6 w-full items-center">
          <div className="flex flex-wrap justify-center gap-3">
            {inputArray.map((val, idx) => (
              <input
                key={idx}
                type="number"
                placeholder={`#${idx + 1}`}
                value={val}
                onChange={(e) => handleElementChange(idx, e.target.value)}
                className="w-16 h-12 text-center border rounded focus:ring-2 ring-blue-500 outline-none text-lg"
                required
              />
            ))}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setPhase('INPUT_SIZE')}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition shadow-lg"
            >
              Visualize
            </button>
          </div>
        </form>
      </div>
    )
  }

  // Visualization Phase
  const step = steps[currentStep]
  const rootNode = treeStructure.find(n => n.type === 'root')

  return (
    <div className="flex flex-col w-full min-h-[700px] bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
      {/* Header / Instructions */}
      <div className="bg-white p-4 border-b flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="text-lg font-medium text-gray-800">
          {step?.message || "Ready"}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPlaying(false)
              setCurrentStep(Math.max(0, currentStep - 1))
            }}
            disabled={currentStep === 0}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded text-sm font-medium min-w-[60px]"
          >
            {isPlaying ? 'Pause' : step && currentStep === steps.length - 1 ? 'Done' : 'Play'}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false)
              setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
            }}
            disabled={!step || currentStep === steps.length - 1}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium disabled:opacity-50"
          >
            Next
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <button
            onClick={() => {
              setIsPlaying(false)
              setPhase('INPUT_SIZE')
            }}
            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Tree Container */}
      {/* Tree Container */}
      <div className="flex-1 overflow-auto p-8 flex items-start">
        <div className="m-auto">
          {rootNode && renderTree(rootNode.id)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

export default MergeSortVisualizer
