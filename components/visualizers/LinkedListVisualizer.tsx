"use client"

import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, Trash2 } from 'lucide-react'

// Constants
const TRAVERSAL_DELAY = 2000

// Types
interface ListNode {
  id: string
  value: number
  nextId: string | null
}

interface AnimationState {
  type: 'IDLE' | 'TRAVERSING' | 'INSERTING' | 'DELETING'
  activeIndices: number[] // Highlighted nodes
  targetIndex: number | null // Where we are going
  message: string
}

const LinkedListVisualizer: React.FC = () => {
  // --- State ---
  const [list, setList] = useState<ListNode[]>([])

  const [inputValue, setInputValue] = useState<number | ''>('')
  const [insertIndex, setInsertIndex] = useState<number | ''>('')
  const [deleteIndex, setDeleteIndex] = useState<number | ''>('')

  const [anim, setAnim] = useState<AnimationState>({
    type: 'IDLE',
    activeIndices: [],
    targetIndex: null,
    message: 'Ready'
  })

  // Refs for async flow control
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // --- Helpers ---

  const wait = (ms: number) => new Promise(resolve => {
    timeoutRef.current = setTimeout(resolve, ms)
  })

  const resetList = () => {
    setList([])
    setAnim({ type: 'IDLE', activeIndices: [], targetIndex: null, message: 'List Reset' })
    setInputValue('')
    setInsertIndex('')
    setDeleteIndex('')
  }

  // --- Operations ---

  // 1. Traverse Helper
  // Returns true if verify success, false if failed (e.g. index out of bounds)
  const traverseTo = async (targetIdx: number, limit: number): Promise<boolean> => {
    let currentIdx = 0

    while (currentIdx <= limit && currentIdx < list.length) {
      setAnim(prev => ({
        ...prev,
        activeIndices: [currentIdx],
        message: `Traversing: Node ${currentIdx} (Value: ${list[currentIdx].value})`
      }))

      await wait(TRAVERSAL_DELAY)

      if (currentIdx === targetIdx) {
        setAnim(prev => ({ ...prev, message: `Reached Index ${currentIdx}` }))
        return true
      }
      currentIdx++
    }
    return false
  }

  // 2. Insert at Start
  const insertStart = async () => {
    if (inputValue === '') return
    if (anim.type !== 'IDLE') return

    const val = Number(inputValue)
    setAnim({ type: 'INSERTING', activeIndices: [], targetIndex: 0, message: 'Inserting at Head...' })

    await wait(TRAVERSAL_DELAY)

    const newNode: ListNode = { id: Date.now().toString(), value: val, nextId: list.length > 0 ? list[0].id : null }
    setList([newNode, ...list])

    setAnim({ type: 'IDLE', activeIndices: [0], targetIndex: null, message: `Inserted ${val} at Head` })
    setInputValue('')
  }

  // 3. Insert at End
  const insertEnd = async () => {
    if (inputValue === '') return
    if (anim.type !== 'IDLE') return

    const val = Number(inputValue)
    setAnim({ type: 'TRAVERSING', activeIndices: [], targetIndex: list.length, message: 'Traversing to Tail...' })

    // Traverse to last element
    if (list.length > 0) {
      await traverseTo(list.length - 1, list.length - 1)
    }

    setAnim(prev => ({ ...prev, type: 'INSERTING', message: 'Inserting at Tail...' }))
    await wait(TRAVERSAL_DELAY)

    const newNode: ListNode = { id: Date.now().toString(), value: val, nextId: null }

    setList(prev => {
      const newList = [...prev]
      if (newList.length > 0) {
        newList[newList.length - 1].nextId = newNode.id
      }
      return [...newList, newNode]
    })

    setAnim({ type: 'IDLE', activeIndices: [list.length], targetIndex: null, message: `Inserted ${val} at Tail` })
    setInputValue('')
  }

  // 4. Insert at Index
  const insertAtIndex = async () => {
    if (inputValue === '' || insertIndex === '') return
    if (anim.type !== 'IDLE') return

    const val = Number(inputValue)
    const idx = Number(insertIndex)

    // Validation
    if (idx < 0 || idx > list.length) {
      setAnim({ type: 'IDLE', activeIndices: [], targetIndex: null, message: 'Error: Index out of bounds' })
      return
    }

    if (idx === 0) {
      await insertStart()
      return
    }
    if (idx === list.length) {
      await insertEnd()
      return
    }

    setAnim({ type: 'TRAVERSING', activeIndices: [], targetIndex: idx - 1, message: `Traversing to Index ${idx - 1}...` })

    // Traverse to idx - 1
    await traverseTo(idx - 1, list.length - 1)

    setAnim(prev => ({ ...prev, type: 'INSERTING', message: `Inserting ${val} at Index ${idx}...` }))
    await wait(TRAVERSAL_DELAY)

    const newNode: ListNode = { id: Date.now().toString(), value: val, nextId: null }

    setList(prev => {
      const newList = [...prev]
      const prevNode = newList[idx - 1]
      newNode.nextId = prevNode.nextId
      prevNode.nextId = newNode.id

      // Insert into array
      newList.splice(idx, 0, newNode)
      return newList
    })

    setAnim({ type: 'IDLE', activeIndices: [idx], targetIndex: null, message: `Inserted ${val} at Index ${idx}` })
    setInputValue('')
    setInsertIndex('')
  }

  // 5. Delete Start
  const deleteStart = async () => {
    if (list.length === 0) {
      setAnim({ type: 'IDLE', activeIndices: [], targetIndex: null, message: 'Error: List is empty' })
      return
    }
    if (anim.type !== 'IDLE') return

    setAnim({ type: 'DELETING', activeIndices: [0], targetIndex: 0, message: 'Deleting Head...' })
    await wait(TRAVERSAL_DELAY)

    setList(prev => prev.slice(1))

    setAnim({ type: 'IDLE', activeIndices: [], targetIndex: null, message: 'Deleted Head' })
  }

  // 6. Delete End
  const deleteEnd = async () => {
    if (list.length === 0) {
      setAnim({ type: 'IDLE', activeIndices: [], targetIndex: null, message: 'Error: List is empty' })
      return
    }
    if (anim.type !== 'IDLE') return

    setAnim({ type: 'TRAVERSING', activeIndices: [], targetIndex: list.length - 2, message: 'Traversing to second to last node...' })

    if (list.length > 1) {
      await traverseTo(list.length - 2, list.length - 2)
    } else {
      // Only 1 item, just highlight it
      setAnim(prev => ({ ...prev, activeIndices: [0] }))
      await wait(TRAVERSAL_DELAY)
    }

    setAnim(prev => ({ ...prev, type: 'DELETING', message: 'Removing last node pointer...' }))
    await wait(TRAVERSAL_DELAY)

    setList(prev => {
      if (prev.length <= 1) return []
      const newList = prev.slice(0, prev.length - 1)
      newList[newList.length - 1].nextId = null
      return newList
    })

    setAnim({ type: 'IDLE', activeIndices: [], targetIndex: null, message: 'Deleted Tail' })
  }

  // 7. Delete at Index
  const deleteAtIndex = async () => {
    if (deleteIndex === '') return
    const idx = Number(deleteIndex)

    if (list.length === 0) {
      setAnim({ type: 'IDLE', activeIndices: [], targetIndex: null, message: 'Error: List is empty' })
      return
    }
    if (idx < 0 || idx >= list.length) {
      setAnim({ type: 'IDLE', activeIndices: [], targetIndex: null, message: 'Error: Index out of bounds' })
      return
    }

    if (idx === 0) {
      await deleteStart()
      return
    }
    if (idx === list.length - 1) {
      await deleteEnd()
      return
    }

    setAnim({ type: 'TRAVERSING', activeIndices: [], targetIndex: idx - 1, message: `Traversing to Index ${idx - 1}...` })
    await traverseTo(idx - 1, list.length - 1)

    setAnim(prev => ({ ...prev, type: 'DELETING', message: `Deleting node at Index ${idx}...` }))
    await wait(TRAVERSAL_DELAY)

    setList(prev => {
      const newList = [...prev]
      const prevNode = newList[idx - 1]
      // Skip the node at idx
      // prev -> (idx) -> next
      // prev -> next
      // Since our list state is an array, we just need to splice it out
      // and ensure the prevNode nextId points to the spliced-out node's next.
      // BUT: The visual arrow is derived from array order in this simplified visualizer,
      // UNLESS we render strictly by nextId.
      // For simplicity in this visualizer reqs, we render array order.
      // State management dictates:
      const nodeToDelete = newList[idx]
      prevNode.nextId = nodeToDelete.nextId

      newList.splice(idx, 1)
      return newList
    })

    setAnim({ type: 'IDLE', activeIndices: [], targetIndex: null, message: `Deleted Node at Index ${idx}` })
    setDeleteIndex('')
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])


  // --- Render ---
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-8">

      {/* Controls Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg border border-gray-200">

        {/* Insertion Controls */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-700">Insertion</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Value"
              value={inputValue}
              onChange={e => setInputValue(Number(e.target.value))}
              disabled={anim.type !== 'IDLE'}
              className="border p-2 rounded w-24"
            />
            <button onClick={insertStart} disabled={anim.type !== 'IDLE'} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50">Insert at Head</button>
            <button onClick={insertEnd} disabled={anim.type !== 'IDLE'} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50">Insert at Tail</button>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Idx"
              value={insertIndex}
              onChange={e => setInsertIndex(Number(e.target.value))}
              disabled={anim.type !== 'IDLE'}
              className="border p-2 rounded w-16"
            />
            <button onClick={insertAtIndex} disabled={anim.type !== 'IDLE'} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50">Insert at Index</button>
          </div>
        </div>

        {/* Deletion Controls */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-700">Deletion</h3>
          <div className="flex gap-2">
            <button onClick={deleteStart} disabled={anim.type !== 'IDLE'} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50">Delete Head</button>
            <button onClick={deleteEnd} disabled={anim.type !== 'IDLE'} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50">Delete Tail</button>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Idx"
                value={deleteIndex}
                onChange={e => setDeleteIndex(Number(e.target.value))}
                disabled={anim.type !== 'IDLE'}
                className="border p-2 rounded w-16"
              />
              <button onClick={deleteAtIndex} disabled={anim.type !== 'IDLE'} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50">Delete at Index</button>
            </div>
          </div>
          <button onClick={resetList} disabled={anim.type !== 'IDLE'} className="text-gray-500 text-sm underline hover:text-gray-700 w-fit">Reset List</button>
        </div>
      </div>

      {/* Status Message */}
      <div className="text-center min-h-[2rem]">
        <span className={`text-lg font-medium transition-colors duration-300
                ${anim.type === 'TRAVERSING' ? 'text-yellow-600' : ''}
                ${anim.type === 'INSERTING' ? 'text-green-600' : ''}
                ${anim.type === 'DELETING' ? 'text-red-600' : ''}
                ${anim.type === 'IDLE' ? 'text-gray-600' : ''}
            `}>
          {anim.message}
        </span>
      </div>

      {/* Visualization Canvas */}
      <div className="flex flex-wrap items-center justify-start min-h-[200px] p-8 bg-white rounded-xl border border-gray-300 shadow-inner overflow-x-auto">
        {list.length === 0 ? (
          <div className="text-gray-400 italic w-full text-center">List is empty</div>
        ) : (
          <div className="flex items-center gap-0">
            {list.map((node, index) => {
              const isActive = anim.activeIndices.includes(index)
              return (
                <div key={node.id} className="flex items-center animate-fade-in group">
                  {/* Node Box */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400 font-mono">Idx:{index}</span>
                    <div className={`
                                        w-16 h-16 flex items-center justify-center border-2 rounded-lg text-xl font-bold transition-all duration-500 relative z-10
                                        ${isActive ? 'border-yellow-500 bg-yellow-50 scale-110 shadow-lg' : 'border-gray-400 bg-white'}
                                     `}>
                      {node.value}

                      {/* Next Pointer Visualization inside (optional) or just Arrow outside */}
                    </div>
                  </div>

                  {/* Arrow to Next */}
                  <div className="w-12 flex justify-center text-gray-400">
                    <ArrowRight size={24} />
                  </div>
                </div>
              )
            })}

            {/* Null Terminator */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-transparent">End</span>
              <div className="w-12 h-12 flex items-center justify-center border-2 border-dashed border-gray-300 rounded bg-gray-50 text-gray-400 font-mono text-sm">
                NULL
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LinkedListVisualizer
