"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react'

// Types
interface Move {
  from: number
  to: number
}

const HanoiVisualizer: React.FC = () => {
  // --- State ---
  const [numRings, setNumRings] = useState<number>(3)
  const [numPegs, setNumPegs] = useState<number>(3)
  const [speed, setSpeed] = useState<number>(500)

  // Towers: Array of arrays. towers[i] contains ring sizes [0..N-1] (largest to smallest or vice versa? Typically 0 is smallest)
  // Let's use: 1 is smallest, N is largest. So towers[0] = [3, 2, 1] means 3 is at bottom, 1 at top.
  // Actually, standard is usually: Larger numbers = Larger rings. 
  // Stack: Bottom is index 0. So [3, 2, 1] -> 3 is at bottom.
  const [towers, setTowers] = useState<number[][]>([])

  const [moveQueue, setMoveQueue] = useState<Move[]>([])
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0)

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // --- Initialization ---

  const initializeTowers = () => {
    // Rings: N, N-1, ... 1. (N is largest, at bottom)
    const initialRemoteTowers: number[][] = Array.from({ length: numPegs }, () => [])
    const rings = []
    for (let i = numRings; i >= 1; i--) {
      rings.push(i)
    }
    initialRemoteTowers[0] = rings // Peg 0 gets all rings
    setTowers(initialRemoteTowers)
    setMoveQueue([])
    setCurrentMoveIndex(0)
    setIsPlaying(false)
    setIsPaused(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  useEffect(() => {
    initializeTowers()
  }, [numRings, numPegs])

  // --- Algorithm: Frame-Stewart ---

  const generateMoves = () => {
    const moves: Move[] = []

    const hanoi = (n: number, source: number, target: number, auxPegs: number[]) => {
      if (n === 0) return
      if (n === 1) {
        moves.push({ from: source, to: target })
        return
      }

      // Frame-Stewart Heuristic
      // k is number of rings to move to first aux peg
      // optimal k is approx n - round(sqrt(2*n + 1)) + 1 ?? Or simpler logic.
      // For < 3 pegs, standard Hanoi.
      // For > 3 pegs: Split K and N-K.

      if (auxPegs.length === 1) {
        // Standard 3-peg case (Source, Target, Aux)
        const aux = auxPegs[0]
        hanoi(n - 1, source, aux, [target])
        moves.push({ from: source, to: target })
        hanoi(n - 1, aux, target, [source])
        return
      }

      // Multi-peg Frame-Stewart
      // k = n - round(sqrt(2*n + 1)) + 1 (Typical heuristic)
      // Simplified: k = Math.floor(n / 2) often works reasonably well for small N and P=4,5
      const k = Math.floor(n / 2)

      // 1. Move top node-k rings to first available aux peg
      const aux1 = auxPegs[0]
      const otherAux = auxPegs.slice(1)

      // To move top n-k to aux1, allowed pegs are {target} + otherAux
      hanoi(n - k, source, aux1, [...otherAux, target])

      // 2. Move bottom k rings to target using remaining aux pegs (without aux1 which holds top pile)
      hanoi(k, source, target, otherAux) // aux1 is blocked

      // 3. Move top n-k rings from aux1 to target
      hanoi(n - k, aux1, target, [...otherAux, source])
    }

    // Setup pegs
    // Source: 0, Target: numPegs - 1
    // Aux: 1 .. numPegs - 2
    const aux: number[] = []
    for (let i = 1; i < numPegs - 1; i++) aux.push(i)

    hanoi(numRings, 0, numPegs - 1, aux)

    return moves
  }

  // --- Animation Control ---

  const handleStart = () => {
    // Create queue
    const moves = generateMoves()
    setMoveQueue(moves)
    setTowers(prev => {
      // Reset to start state just in case
      const initialRemoteTowers: number[][] = Array.from({ length: numPegs }, () => [])
      const rings = []
      for (let i = numRings; i >= 1; i--) {
        rings.push(i)
      }
      initialRemoteTowers[0] = rings
      return initialRemoteTowers
    })
    setCurrentMoveIndex(0)
    setIsPlaying(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(true)
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const handleResume = () => {
    setIsPaused(false)
  }

  const handleReset = () => {
    initializeTowers()
  }

  // Animation Loop
  useEffect(() => {
    if (!isPlaying || isPaused) return

    if (currentMoveIndex >= moveQueue.length) {
      setIsPlaying(false)
      return
    }

    timerRef.current = setTimeout(() => {
      const move = moveQueue[currentMoveIndex]

      setTowers(prev => {
        const newTowers = prev.map(t => [...t])
        const ring = newTowers[move.from].pop()
        if (ring !== undefined) {
          newTowers[move.to].push(ring)
        }
        return newTowers
      })

      setCurrentMoveIndex(prev => prev + 1)

    }, speed)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, isPaused, currentMoveIndex, moveQueue, speed])


  // --- Render ---

  // Calculate Layout
  // Fixed height for pegs container
  const CONTAINER_HEIGHT = 300
  const PEG_HEIGHT = 200
  const BASE_WIDTH = 40 // width of smallest ring
  const MAX_WIDTH = 120 // width of largest ring
  // ring width = BASE + (ringIdx * increment)
  // ringIdx 0 (val 1) -> BASE
  // ringIdx N-1 (val N) -> MAX

  const getRingWidth = (val: number) => {
    // val is 1..numRings
    // Map 1 -> BASE, numRings -> MAX
    if (numRings === 1) return MAX_WIDTH
    const step = (MAX_WIDTH - BASE_WIDTH) / (numRings - 1)
    return BASE_WIDTH + (val - 1) * step
  }

  // Colors
  // Rings: RED (bg-red-500)
  // Pegs: GREY (bg-gray-300)
  // Highlight Moving? We just animate snapshot to snapshot. 
  // If we want highlighting, we can check previous move.

  const lastMove = currentMoveIndex > 0 ? moveQueue[currentMoveIndex - 1] : null

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8">

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium">Rings: {numRings}</label>
            <input
              type="range" min="1" max="8" value={numRings}
              onChange={e => setNumRings(Number(e.target.value))}
              disabled={isPlaying}
              className="w-32"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium">Pegs: {numPegs}</label>
            <input
              type="range" min="3" max="5" value={numPegs}
              onChange={e => setNumPegs(Number(e.target.value))}
              disabled={isPlaying}
              className="w-32"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium">Speed: {speed}ms</label>
            <input
              type="range" min="50" max="1000" step="50" value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="w-32"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          {!isPlaying ? (
            <button onClick={handleStart} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors">
              <Play size={20} /> Start
            </button>
          ) : (
            <div className="flex gap-2">
              {!isPaused ? (
                <button onClick={handlePause} className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 font-medium transition-colors">
                  <Pause size={20} /> Pause
                </button>
              ) : (
                <button onClick={handleResume} className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-medium transition-colors">
                  <Play size={20} /> Resume
                </button>
              )}
              <button onClick={handleReset} className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 font-medium transition-colors">
                <RotateCcw size={20} /> Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="text-center h-8">
        {isPlaying ? (
          <span className="text-gray-600 font-medium">
            Move {currentMoveIndex} / {moveQueue.length}
            {lastMove && <span className="ml-4 text-blue-600">Moved from Peg {lastMove.from} to {lastMove.to}</span>}
          </span>
        ) : (
          <span className="text-gray-400">Ready to start</span>
        )}
      </div>

      {/* Visual Canvas */}
      <div className="flex items-end justify-around bg-gray-50 border border-gray-200 rounded-xl p-8 relative" style={{ height: CONTAINER_HEIGHT }}>
        {towers.map((tower, pegIdx) => {
          // Determine layout
          const isSource = lastMove?.from === pegIdx
          const isDest = lastMove?.to === pegIdx

          return (
            <div key={pegIdx} className="flex flex-col items-center justify-end relative w-full h-full">
              {/* PEG ROD */}
              <div className={`absolute bottom-0 w-4 bg-gray-300 rounded-t-lg transition-colors duration-300
                             ${isSource ? 'bg-blue-200' : ''} ${isDest ? 'bg-green-200' : ''}
                        `} style={{ height: PEG_HEIGHT, zIndex: 0 }}></div>

              {/* BASE (Optional visual) */}
              <div className="absolute bottom-0 w-24 h-4 bg-gray-300 rounded mx-auto" style={{ zIndex: 0 }}></div>

              {/* RINGS Container */}
              <div className="flex flex-col-reverse items-center justify-start w-full relative z-10 mb-4">
                {/* Flex-col-reverse makes first item in DOM appear at BOTTOM. 
                                tower array: [3, 2, 1] (3 is bottom). 
                                We want 3 to be visually at bottom.
                                flex-col-reverse + DOM order [3, 2, 1]: 
                                1 (top of array) -> Visual Bottom? NO. 
                                
                                flex-col-reverse:
                                Last child is at top?
                                
                                Let's stick to absolute positioning for strict stacking OR flex-col-reverse with correct order.
                                
                                Tower [3, 2, 1] -> 3 is at index 0. 
                                If we map [3, 2, 1], index 0 (3) is rendered first.
                                flex-col-reverse puts first child at bottom.
                                So rendering [3, 2, 1] with flex-col-reverse puts 3 at bottom. Correct.
                            */}
                {tower.map((ringVal, ringIdx) => (
                  <div
                    key={ringVal}
                    className="h-6 rounded-md bg-red-500 border border-red-600 shadow-sm transition-all duration-200 ease-in-out"
                    style={{ width: getRingWidth(ringVal), marginBottom: 2 }}
                  ></div>
                ))}
              </div>

              {/* Label */}
              <span className="absolute -bottom-8 text-gray-400 font-mono text-sm">Peg {pegIdx}</span>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default HanoiVisualizer
