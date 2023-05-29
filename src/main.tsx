import {
  SimulationLinkDatum,
  SimulationNodeDatum,
  drag,
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  select,
} from 'd3';

interface Node extends SimulationNodeDatum {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Link extends SimulationLinkDatum<Node> {}

interface LinkedLink {
  source: Node;
  target: Node;
}

const nodes = [
  { id: 'node1', label: 'Node 1' },
  { id: 'node2', label: 'Node 2' },
  { id: 'node3', label: 'Node 3' },
  { id: 'node4', label: 'Node 4' },
  { id: 'node5', label: 'Node 5' },
] as Node[];

const links = [
  { source: 'node1', target: 'node2' },
  { source: 'node1', target: 'node3' },
  { source: 'node2', target: 'node3' },
  { source: 'node2', target: 'node4' },
  { source: 'node3', target: 'node4' },
  { source: 'node4', target: 'node5' },
];

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const simulation = forceSimulation(nodes)
  .force(
    'link',
    forceLink<Node, Link>(links).id((d) => d.id)
  )
  .force('charge', forceManyBody())
  .force('center', forceCenter(width / 2, height / 2))
  .force('collide', forceCollide().radius(60))
  .on('tick', tick);

function tick() {
  const line = svg
    .selectAll('.line')
    .data(links as unknown as LinkedLink[])
    .enter()
    .append('line')
    .attr('class', 'line')
    .attr('stroke', 'gray') // add this line to make links gray
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y);

  // Nodes
  const node = svg
    .selectAll('.node')
    .data(nodes)
    .enter()
    // change this to 'g' to create a group that can hold the circle and text
    .append('g');

  node
    .append('circle')
    .attr('class', 'node')
    // increase radius to make circles wider
    .attr('r', 20)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .call(
      drag<SVGCircleElement, Node>()
        .on('start', function dragstarted(event, d) {
          select(this).raise().classed('active', true);
        })
        .on('drag', function dragged(event, d) {
          select(this)
            .attr('cx', (d.x = event.x))
            .attr('cy', (d.y = event.y));

          line
            .attr('x1', (l) => l.source.x)
            .attr('y1', (l) => l.source.y)
            .attr('x2', (l) => l.target.x)
            .attr('y2', (l) => l.target.y);
        })
        .on('end', function dragended(event, d) {
          select(this).classed('active', false);
        })
    );

  // Node Labels
  node
    .append('text')
    .text((d) => d.label) // set the text to the node label
    .attr('text-anchor', 'middle') // center the text
    .attr('dominant-baseline', 'central') // vertically align the text
    .style('font-size', '6em'); // set the font size
}
