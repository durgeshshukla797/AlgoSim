'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Plus, Move, Play, RotateCcw, Trash2, MousePointer2 } from 'lucide-react'
import { Node, Edge, InteractionMode, AlgorithmState, NodeStatus, EdgeStatus } from '@/app/dijkstra/simulation/types'

const NODE_RADIUS = 20
const INITIAL_ALGO_STATE: AlgorithmState = {
  distances: {},
  previous: {},
  visited: [],
  unvisited: [],
  current: null,
  path: [],
  relaxedEdges: [],
  highlightedEdge: null,
}

export default function DijkstraVisualizer() {
  // --- State ---
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [mode, setMode] = useState<InteractionMode>('move')

  const [sourceNodeId, setSourceNodeId] = useState<string | null>(null) // For edge creation
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  const [startNode, setStartNode] = useState<string | null>(null)
  const [endNode, setEndNode] = useState<string | null>(null)

  const [isRunning, setIsRunning] = useState(false)
  const [algoState, setAlgoState] = useState<AlgorithmState>(INITIAL_ALGO_STATE)
  const [message, setMessage] = useState<string>('Select "Add Node" to create a graph')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Mouse position for edge preview
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // --- Algorithm Logic ---
  const runDijkstra = async () => {
    if (!startNode || !endNode || isRunning) return
    setIsRunning(true)
    setAlgoState(INITIAL_ALGO_STATE)

    // Setup
    const distances: Record<string, number> = {}
    const previous: Record<string, string | null> = {}
    const unvisited: string[] = []

    nodes.forEach(node => {
      distances[node.id] = node.id === startNode ? 0 : Infinity
      previous[node.id] = null
      unvisited.push(node.id)
    })

    setAlgoState(prev => ({ ...prev, distances, previous, unvisited, visited: [] }))

    // Sort logic helper
    const getClosestNode = (nodesList: string[]) => {
      return nodesList.reduce((minNode, node) =>
        distances[node] < distances[minNode] ? node : minNode
        , nodesList[0])
    }

    let currentUnvisited = [...unvisited]

    while (currentUnvisited.length > 0) {
      // Step 1: Select node with min distance
      const closest = getClosestNode(currentUnvisited)

      // Stop if closest is infinity (unreachable) or we reached end
      if (distances[closest] === Infinity) break

      setAlgoState(prev => ({ ...prev, current: closest }))
      await new Promise(r => setTimeout(r, 800))

      // if (closest === endNode) break // Continued to visit all nodes

      currentUnvisited = currentUnvisited.filter(n => n !== closest)
      setAlgoState(prev => ({
        ...prev,
        visited: [...prev.visited, closest],
        unvisited: currentUnvisited
      }))

      // Step 2: Relax edges
      const neighbors = edges.filter(e => e.source === closest)
      for (const edge of neighbors) {
        setAlgoState(prev => ({ ...prev, highlightedEdge: edge.id }))
        await new Promise(r => setTimeout(r, 600))

        const alt = distances[closest] + edge.weight
        if (alt < distances[edge.target]) {
          distances[edge.target] = alt
          previous[edge.target] = closest
          setAlgoState(prev => ({
            ...prev,
            distances: { ...distances },
            previous: { ...previous },
            relaxedEdges: [...prev.relaxedEdges, edge.id]
          }))
        }
        setAlgoState(prev => ({ ...prev, highlightedEdge: null }))
      }
    }

    // Reconstruction
    const path: string[] = []
    let curr: string | null = endNode
    if (curr && (previous[curr] || curr === startNode)) {
      while (curr) {
        path.unshift(curr)
        curr = previous[curr]
      }
    }

    setAlgoState(prev => ({ ...prev, path, current: null }))
    setIsRunning(false)
  }

  const resetAlgo = () => {
    setAlgoState(INITIAL_ALGO_STATE)
    setIsRunning(false)
  }

  const clearGraph = () => {
    setNodes([])
    setEdges([])
    setStartNode(null)
    setEndNode(null)
    resetAlgo()
  }

  // --- Canvas Interaction Handlers ---

  const getCanvasCoordinates = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isRunning) return

    const { x, y } = getCanvasCoordinates(e)

    // Check if clicked on a node
    const clickedNode = nodes.find(n =>
      Math.sqrt(Math.pow(n.x - x, 2) + Math.pow(n.y - y, 2)) < NODE_RADIUS
    )

    if (mode === 'node') {
      if (clickedNode) return // Don't overlook overlap too strictly but avoid direct on top
      if (nodes.length >= 26) {
        setErrorMsg('Max 26 nodes reached')
        setTimeout(() => setErrorMsg(null), 2000)
        return
      }
      const label = String.fromCharCode(65 + nodes.length)
      const newNode: Node = {
        id: crypto.randomUUID(),
        x,
        y,
        label
      }
      setNodes([...nodes, newNode])
      if (!startNode) setStartNode(newNode.id)
      else if (!endNode) setEndNode(newNode.id)
    }
    else if (mode === 'edge') {
      if (clickedNode) {
        if (!sourceNodeId) {
          setSourceNodeId(clickedNode.id)
          setMessage(`Selected ${clickedNode.label}. Click second node to connect.`)
        } else {
          if (sourceNodeId === clickedNode.id) {
            setErrorMsg("No self-loops allowed")
            setTimeout(() => setErrorMsg(null), 2000)
            setSourceNodeId(null)
            setMessage('Click first node to add edge')
            return
          }
          // Check duplicate
          const exists = edges.some(e =>
            e.source === sourceNodeId && e.target === clickedNode.id
          )
          if (exists) {
            setErrorMsg("Edge already exists")
            setTimeout(() => setErrorMsg(null), 2000)
            setSourceNodeId(null)
            setMessage('Click first node to add edge')
            return
          }

          const weightStr = prompt("Enter edge weight (positive number):", "1")
          const weight = parseInt(weightStr || "0")

          if (weight > 0) {
            setEdges([...edges, {
              id: crypto.randomUUID(),
              source: sourceNodeId,
              target: clickedNode.id,
              weight
            }])
          } else {
            setErrorMsg("Invalid weight")
            setTimeout(() => setErrorMsg(null), 2000)
          }

          setSourceNodeId(null)
          setMessage('Click first node to add edge')
        }
      } else {
        // Clicked empty space cancels edge creation
        setSourceNodeId(null)
        setMessage('Click first node to add edge')
      }
    }
    else if (mode === 'delete') {
      if (clickedNode) {
        setNodes(nodes.filter(n => n.id !== clickedNode.id))
        setEdges(edges.filter(e => e.source !== clickedNode.id && e.target !== clickedNode.id))
        if (startNode === clickedNode.id) setStartNode(null)
        if (endNode === clickedNode.id) setEndNode(null)
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isRunning || mode !== 'move') return
    const { x, y } = getCanvasCoordinates(e)

    const clickedNode = nodes.find(n =>
      Math.sqrt(Math.pow(n.x - x, 2) + Math.pow(n.y - y, 2)) < NODE_RADIUS
    )
    if (clickedNode) {
      setDraggedNodeId(clickedNode.id)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const { x, y } = getCanvasCoordinates(e)

    // Only update mousePos state if we need to draw the temporary edge line
    if (mode === 'edge' && sourceNodeId) {
      setMousePos({ x, y })
    }

    // Efficient hover detection
    if (!draggedNodeId) {
      const hovered = nodes.find(n =>
        Math.sqrt(Math.pow(n.x - x, 2) + Math.pow(n.y - y, 2)) < NODE_RADIUS
      )
      if (hovered?.id !== hoveredNodeId) {
        setHoveredNodeId(hovered ? hovered.id : null)
      }
    }

    if (draggedNodeId) {
      setNodes(prev => prev.map(n => n.id === draggedNodeId ? { ...n, x, y } : n))
    }
  }

  const handleMouseUp = () => {
    setDraggedNodeId(null)
  }

  // --- Rendering ---
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw Edges
    edges.forEach(edge => {
      const source = nodes.find(n => n.id === edge.source)
      const target = nodes.find(n => n.id === edge.target)
      if (!source || !target) return

      // Determine color
      let color = '#ccc'
      let width = 2

      if (algoState.path.includes(edge.source) && algoState.path.includes(edge.target)) {
        // Check if this specific edge is part of the path flow
        // The path array is ordered nodes. We need to check if source/target are adjacent in path
        const idxS = algoState.path.indexOf(edge.source)
        const idxT = algoState.path.indexOf(edge.target)
        // Since it is a directed graph in our logic, or we treat it as such for drawing?
        // Wait, Dijkstra usually on directed or undirected? 
        // Plan said: "Click first node -> select source, Click second node -> select target", implies Directed.
        // Assuming directed for now.
        if (idxS !== -1 && idxT !== -1 && idxT === idxS + 1) {
          color = '#ef4444' // Red for path
          width = 4
        }
      } else if (algoState.highlightedEdge === edge.id) {
        color = '#f97316' // Orange for processing
        width = 3
      } else if (algoState.previous[edge.target] === edge.source) {
        color = '#3b82f6' // Blue for relaxed (current shortest path tree)
      }

      // Draw Line
      ctx.beginPath()
      ctx.moveTo(source.x, source.y)
      ctx.lineTo(target.x, target.y)
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.stroke()

      // Draw Arrow head (if directed) - let's do simple arrow
      const angle = Math.atan2(target.y - source.y, target.x - source.x)
      ctx.beginPath()
      ctx.moveTo(target.x - NODE_RADIUS * Math.cos(angle), target.y - NODE_RADIUS * Math.sin(angle))
      ctx.lineTo(target.x - (NODE_RADIUS + 10) * Math.cos(angle) - 5 * Math.sin(angle), target.y - (NODE_RADIUS + 10) * Math.sin(angle) + 5 * Math.cos(angle))
      ctx.lineTo(target.x - (NODE_RADIUS + 10) * Math.cos(angle) + 5 * Math.sin(angle), target.y - (NODE_RADIUS + 10) * Math.sin(angle) - 5 * Math.cos(angle))
      ctx.fillStyle = color
      ctx.fill()

      // Draw Weight
      const midX = (source.x + target.x) / 2
      const midY = (source.y + target.y) / 2
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.arc(midX, midY, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'black'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(edge.weight.toString(), midX, midY)
    })

    // Draw Temporary Edge Line
    if (mode === 'edge' && sourceNodeId) {
      const source = nodes.find(n => n.id === sourceNodeId)
      if (source) {
        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(mousePos.x, mousePos.y)
        ctx.strokeStyle = '#9ca3af'
        ctx.setLineDash([5, 5])
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    // Draw Nodes
    nodes.forEach(node => {
      let color = 'white'
      let borderColor = '#374151'

      if (node.id === startNode) {
        color = '#ddd6fe' // Violet tint
        borderColor = '#7c3aed'
      } else if (node.id === endNode) {
        // color = '#fecaca' // Red tint
        // borderColor = '#dc2626'
        // Actually end node just normal unless visited or path
      }

      if (algoState.visited.includes(node.id)) {
        color = '#bbf7d0' // Green tint
        borderColor = '#16a34a'
      }
      if (algoState.path.includes(node.id)) {
        color = '#fecaca' // Red tint (End/Path)
        borderColor = '#dc2626'
      }
      if (algoState.current === node.id) {
        color = '#fed7aa' // Orange tint
        borderColor = '#ea580c'
      }
      if (sourceNodeId === node.id) {
        borderColor = '#2563eb' // Blue for selected source
        ctx.lineWidth = 3
      } else if (hoveredNodeId === node.id && !draggedNodeId) {
        borderColor = '#60a5fa' // Lighter blue for hover
        ctx.lineWidth = 3
      }

      ctx.beginPath()
      ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = borderColor
      ctx.lineWidth = sourceNodeId === node.id ? 3 : 2
      ctx.stroke()

      // Label
      ctx.fillStyle = 'black'
      ctx.font = 'bold 14px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.label, node.x, node.y)

      // Distances (if running/ran)
      if (algoState.distances[node.id] !== undefined && algoState.distances[node.id] !== Infinity) {
        ctx.fillStyle = '#4b5563'
        ctx.font = '10px sans-serif'
        ctx.fillText(`d:${algoState.distances[node.id]}`, node.x, node.y + NODE_RADIUS + 12)
      }
    })

  }, [nodes, edges, algoState, mode, sourceNodeId, mousePos, startNode, endNode, hoveredNodeId])

  useEffect(() => {
    draw()
  }, [draw])

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
      {/* Main Canvas Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col">
        {/* Controls Toolbar */}
        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
          <button
            onClick={() => { setMode('node'); setMessage('Click on empty space to add a node'); setSourceNodeId(null); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${mode === 'node' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'
              }`}
            disabled={isRunning}
          >
            <Plus size={18} />
            Add Node
          </button>
          <button
            onClick={() => { setMode('edge'); setMessage('Click first node to add edge'); setSourceNodeId(null); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${mode === 'edge' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'
              }`}
            disabled={isRunning}
          >
            <Move size={18} /> {/* Using Move icon for 'Connect'? Maybe another one. */}
            Add Edge
          </button>
          <button
            onClick={() => { setMode('move'); setMessage('Drag nodes to move them'); setSourceNodeId(null); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${mode === 'move' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'
              }`}
            disabled={isRunning}
          >
            <MousePointer2 size={18} />
            Move
          </button>
          <button
            onClick={() => { setMode('delete'); setMessage('Click on node to delete'); setSourceNodeId(null); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${mode === 'delete' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-200'
              }`}
            disabled={isRunning}
          >
            <Trash2 size={18} />
            Delete
          </button>

          <div className="w-px h-8 bg-gray-300 mx-2" />

          <button
            onClick={runDijkstra}
            disabled={!startNode || !endNode || isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={18} />
            Run Dijkstra
          </button>
          <button
            onClick={resetAlgo}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            disabled={isRunning}
          >
            <RotateCcw size={18} />
            Reset Path
          </button>
          <button
            onClick={clearGraph}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md ml-auto"
            disabled={isRunning}
          >
            Clear Graph
          </button>
        </div>

        {/* Message / Error Bar */}
        <div className="mb-2 h-6 text-sm">
          {errorMsg ? (
            <span className="text-red-600 font-medium">{errorMsg}</span>
          ) : (
            <span className="text-gray-600">{message}</span>
          )}
        </div>

        {/* Canvas */}
        <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-white flex-1 min-h-[500px]">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className={`w-full h-full block ${mode === 'node' ? 'cursor-crosshair' : mode === 'edge' ? 'cursor-cell' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleCanvasClick}
          />
        </div>
      </div>

      {/* Sidebar Panels */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {/* Settings Panel */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-4">Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start Node</label>
              <select
                value={startNode || ''}
                onChange={(e) => setStartNode(e.target.value)}
                className="w-full p-2 border rounded-md"
                disabled={isRunning}
              >
                <option value="">Select Start</option>
                {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Target Node</label>
              <select
                value={endNode || ''}
                onChange={(e) => setEndNode(e.target.value)}
                className="w-full p-2 border rounded-md"
                disabled={isRunning}
              >
                <option value="">Select Target</option>
                {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1">
          <h3 className="font-semibold mb-4">Results</h3>
          {algoState.path.length > 0 ? (
            <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md">
              <div className="text-sm font-medium">Shortest Path Found!</div>
              <div className="text-lg mt-1">
                {algoState.path.map((nid, i) => {
                  const n = nodes.find(node => node.id === nid)
                  return (
                    <span key={nid}>
                      {n?.label}
                      {i < algoState.path.length - 1 && ' → '}
                    </span>
                  )
                })}
              </div>
              <div className="text-sm mt-2">
                Total Distance: <b>{algoState.distances[endNode!] ?? 0}</b>
              </div>
            </div>
          ) : (
            <div className="mb-4 text-sm text-gray-500">
              Run the algorithm to see the shortest path.
            </div>
          )}

          {/* Distance Table */}
          <div className="overflow-auto max-h-[300px]">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left">Node</th>
                  <th className="p-2 text-right">Dist</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map(n => {
                  const dist = algoState.distances[n.id]
                  const isVisited = algoState.visited.includes(n.id)
                  return (
                    <tr key={n.id} className={`border-b ${isVisited ? 'bg-green-50/50' : ''} ${n.id === endNode && algoState.path.length > 0 ? 'bg-green-100 font-bold' : ''}`}>
                      <td className="p-2">{n.label}</td>
                      <td className="p-2 text-right">
                        {dist === undefined ? '∞' : dist === Infinity ? '∞' : dist}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
