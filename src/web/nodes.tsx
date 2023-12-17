import { SimulationLinkDatum, SimulationNodeDatum } from 'd3'

export interface GraphNode extends SimulationNodeDatum {
  id: string
  label: string
  x: number
  y: number
}

export interface Link extends SimulationLinkDatum<GraphNode> {
  source: GraphNode
  target: GraphNode
}

export const nodes = [
  { id: 'node1', label: 'Node 1' },
  { id: 'node2', label: 'Node 2' },
  { id: 'node3', label: 'Node 3' },
  { id: 'node4', label: 'Node 4' },
  { id: 'node5', label: 'Node 5' },
].map(node => {
  let x = 0
  let y = 0

  return {
    ...node,
    fx: null,
    fy: null,
    get x() {
      return this.fx ?? x
    },
    set x(value) {
      x = value
    },
    get y() {
      return this.fy ?? y
    },
    set y(value) {
      y = value
    },
  }
}) as GraphNode[]

export const links = [
  { source: 'node1', target: 'node2' },
  { source: 'node1', target: 'node3' },
  { source: 'node2', target: 'node3' },
  { source: 'node2', target: 'node4' },
  { source: 'node3', target: 'node4' },
  { source: 'node4', target: 'node5' },
] as any as Link[]
