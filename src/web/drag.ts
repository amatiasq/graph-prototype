import { drag, select } from 'd3'
import { GraphNode } from './nodes'

let dragging = false

export function isDragging() {
  return dragging
}

export const dragNodes = drag<SVGGElement, GraphNode>()
  .on('start', function dragstarted(event, d) {
    dragging = true
    select(this).raise().classed('active', true)
  })

  .on('end', function dragended(event, d) {
    dragging = false
    select(this).classed('active', false)
  })

  .on('drag', function dragged(event, d) {
    d.fx = event.x
    d.fy = event.y
  })
