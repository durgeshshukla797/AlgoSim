"use client"

import React, { useState, useEffect, useRef } from 'react'

// Types
type Phase = 'SETUP' | 'SIMULATION'

interface Cell {
  value: number | null
  status: 'empty' | 'occupied' | 'probed' | 'active' | 'collision'
}

interface LogEntry {
  id: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

const LinearProbingVisualizer: React.FC = () => {
  // --- State ---
  const [phase, setPhase] = useState<Phase>('SETUP')
  const [tableSize, setTableSize] = useState<number>(7) // Default m=7
  const [table, setTable] = useState<Cell[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [logs, setLogs] = useState<LogEntry[]>([])

  // Animation State
  const [isInserting, setIsInserting] = useState<boolean>(false)
  const [currentProbeIndex, setCurrentProbeIndex] = useState<number | null>(null)
  const [animationMessage, setAnimationMessage] = useState<string>('')

  // Refs for animation timeout management
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // --- Handlers ---

  const handleCreateTable = (e: React.FormEvent) => {
    e.preventDefault()
    if (tableSize < 1 || tableSize > 20) {
      addLog("Table size must be between 1 and 20", 'error')
      return
    }
    const newTable = Array(tableSize).fill(null).map(() => ({ value: null, status: 'empty' })) as Cell[]
    setTable(newTable)
    setPhase('SIMULATION')
    addLog(`Created empty hash table of size ${tableSize}`, 'success')
  }

  const handleReset = () => {
    setPhase('SETUP')
    setTable([])
    setLogs([])
    setInputValue('')
    setIsInserting(false)
    setCurrentProbeIndex(null)
    setAnimationMessage('')
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [{ id: Date.now().toString() + Math.random(), message, type }, ...prev])
  }

  const insertKey = async (key: number) => {
    if (isInserting) return
    setIsInserting(true)

    // 1. Calculate Hash
    const initialHash = key % tableSize
    setAnimationMessage(`Calculated Hash: ${key} % ${tableSize} = ${initialHash}`)
    addLog(`Attempting to insert key ${key}. Hash: ${initialHash}`, 'info')

    await wait(2000)

    let index = initialHash
    let probes = 0
    let inserted = false

    // Linear Probing Loop
    while (probes < tableSize) {
      setCurrentProbeIndex(index)

      // Update cell status to 'active' (checking) if not occupied
      // If occupied, we show collision

      const cell = table[index]

      if (cell.value === null) {
        // FOUND EMPTY SPOT
        setAnimationMessage(`Index ${index} is empty. Inserting ${key}.`)
        setTable(prev => {
          const next = [...prev]
          next[index] = { value: key, status: 'active' } // Highlight green immediately? Or 'active' then 'occupied'
          return next
        })
        await wait(2000)

        // Finalize
        setTable(prev => {
          const next = [...prev]
          next[index] = { value: key, status: 'occupied' }
          return next
        })
        addLog(`Inserted ${key} at index ${index}`, 'success')
        inserted = true
        break
      } else {
        // COLLISION
        setAnimationMessage(`Collision at index ${index} (Value: ${cell.value}). Probing next...`)
        setTable(prev => {
          const next = [...prev]
          next[index] = { ...next[index], status: 'collision' } // Flash red
          return next
        })

        await wait(2000)

        // Revert status of checked cell back to occupied
        setTable(prev => {
          const next = [...prev]
          next[index] = { ...next[index], status: 'occupied' }
          return next
        })

        // Move next
        index = (index + 1) % tableSize
        probes++
      }
    }

    if (!inserted) {
      setAnimationMessage(`Table is full! Could not insert ${key}.`)
      addLog(`Failed to insert ${key}: Table full`, 'error')
    }

    setIsInserting(false)
    setCurrentProbeIndex(null)
  }

  const handleInsertSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const val = parseInt(inputValue)
    if (isNaN(val)) return
    insertKey(val)
    setInputValue('')
  }

  const wait = (ms: number) => new Promise(resolve => {
    timeoutRef.current = setTimeout(resolve, ms)
  })

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // --- Renderers ---

  if (phase === 'SETUP') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Linear Probing Setup</h2>
        <form onSubmit={handleCreateTable} className="flex flex-col gap-4 w-full max-w-xs">
          <label className="text-gray-600 font-medium">Hash Table Size (m)</label>
          <input
            type="number"
            value={tableSize}
            onChange={(e) => setTableSize(parseInt(e.target.value))}
            className="border p-2 rounded focus:ring-2 ring-blue-500 outline-none"
            min="1"
            max="20"
            required
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Create Table
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-6">
      {/* Top Bar: Controls & Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-1">
          <h3 className="font-bold text-gray-700 mb-4">Operations</h3>
          <form onSubmit={handleInsertSubmit} className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Enter Key"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isInserting}
              className="flex-1 border p-2 rounded outline-none focus:ring-2 ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={isInserting}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 font-medium"
            >
              Insert
            </button>
          </form>
          <button
            onClick={handleReset}
            className="text-sm text-red-600 hover:underline"
          >
            Reset Visualization
          </button>

          <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-100 min-h-[100px]">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Hash Function</p>
            <p className="font-mono text-lg text-gray-800">h(k) = k % {tableSize}</p>

            {animationMessage && (
              <div className="mt-4 p-2 bg-blue-50 border border-blue-100 rounded text-blue-800 text-sm font-medium animate-fade-in">
                {animationMessage}
              </div>
            )}
          </div>
        </div>

        {/* Visualization Area */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-1 md:col-span-2 flex flex-col items-center justify-center min-h-[300px]">
          <div className="flex flex-wrap justify-center gap-2">
            {table.map((cell, index) => {
              // Determine Cell Color
              let borderColor = 'border-gray-300'
              let bgColor = 'bg-white'

              if (currentProbeIndex === index) {
                borderColor = 'border-blue-500'
                bgColor = 'bg-blue-50 shadow-md scale-105'
                if (cell.status === 'collision') {
                  borderColor = 'border-red-500'
                  bgColor = 'bg-red-50'
                }
              } else if (cell.status === 'occupied') {
                bgColor = 'bg-gray-100'
              }

              return (
                <div key={index} className="flex flex-col items-center group">
                  <span className="text-xs text-gray-400 mb-1 font-mono">{index}</span>
                  <div className={`
                                    w-16 h-16 flex items-center justify-center border-2 rounded-lg text-xl font-bold transition-all duration-300
                                    ${borderColor} ${bgColor}
                                `}>
                    {cell.value !== null ? cell.value : ''}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* Logs */}
      <div className="bg-gray-900 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm shadow-inner">
        {logs.length === 0 && <span className="text-gray-500 italic">Logs will appear here...</span>}
        {logs.map(log => (
          <div key={log.id} className={`mb-1 ${log.type === 'error' ? 'text-red-400' :
            log.type === 'success' ? 'text-green-400' : 'text-gray-300'
            }`}>
            <span className="opacity-50 mr-2">{'>'}</span>{log.message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LinearProbingVisualizer
