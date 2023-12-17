import { forceCenter, forceLink, forceManyBody, forceSimulation, select } from 'd3'
import { dragNodes, isDragging } from './drag'
import { GraphNode, Link, links, nodes } from './nodes'

const width = window.innerWidth
const height = window.innerHeight
const background = 'black'
const color = 'white'

const svg = select('body')
  .style('background-color', background)
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const simulation = forceSimulation(nodes)
  .force(
    'link',
    forceLink<GraphNode, Link>(links)
      .id(d => d.id)
      .strength(0.1),
  )
  .force('charge', forceManyBody().strength(-2000))
  .force('center', forceCenter(width / 2, height / 2))
// .force('collide', forceCollide().radius(80))
// .on('tick', tick)

const line = svg
  .selectAll('.line')
  .data(links)
  .enter()
  .append('line')
  .attr('class', 'line')
  .attr('stroke', 'gray')
  .attr('stroke-width', 3)
  .attr('x1', d => d.source.x)
  .attr('y1', d => d.source.y)
  .attr('x2', d => d.target.x)
  .attr('y2', d => d.target.y)

const node = svg
  .selectAll('.node')
  .data(nodes)
  .enter()
  .append('g')
  .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')

node
  .append('circle')
  .attr('class', 'node')
  .attr('r', 40)
  .attr('fill', background)
  .attr('stroke', color)
  .attr('stroke-width', 2)

node
  .append('text')
  .text(d => d.label)
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .style('font-size', '1em')
  .style('user-select', 'none')
  .style('fill', color)

node.call(dragNodes)

// Render loop
;(function frame() {
  node.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')

  line
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)

  requestAnimationFrame(frame)
})()

setInterval(() => {
  if (simulation.alpha() < 0.1 && !isDragging()) simulation.alpha(0.1).restart()
}, 100)
