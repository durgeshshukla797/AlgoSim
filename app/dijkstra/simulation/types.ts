export interface Node {
  id: string
  x: number
  y: number
  label: string
}

export interface Edge {
  id: string
  source: string
  target: string
  weight: number
}

export type InteractionMode = 'node' | 'edge' | 'move' | 'delete'

export interface AlgorithmState {
  distances: Record<string, number>
  previous: Record<string, string | null>
  visited: string[]
  unvisited: string[]
  current: string | null
  path: string[]
  relaxedEdges: string[] // Edge IDs
  highlightedEdge: string | null
}

export type NodeStatus = 'idle' | 'start' | 'end' | 'visited' | 'active' | 'path'
export type EdgeStatus = 'idle' | 'relaxed' | 'path'

export interface GraphState {
  nodes: Node[]
  edges: Edge[]
}
