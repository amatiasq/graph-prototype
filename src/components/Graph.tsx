import * as d3 from 'd3';
import { createEffect } from 'solid-js';
import { GraphNode } from './data';

// const drag = (x: d3.Selection<SVGCircleElement, GraphNode, null, unknown>) => {
//   function dragged(event: DragEvent, d: any) {
//     x
//       .raise()
//       .attr('cx', (d.x = event.x))
//       .attr('cy', (d.y = event.y));
//   }

//   return d3
//     .drag()
//     .on('start', () => x.attr('stroke', 'black'))
//     .on('end', () => x.attr('stroke', null))
//     .on('drag', dragged)
// };

const drag = createDrag();

const radius = 25;

export function Graph(props: { data: GraphNode[] }) {
  const container = <svg />;

  createEffect(() => {
    const { data } = props;

    const nodes = d3
      .select(container as any as string)
      .attr('viewBox', [0, 0, window.innerWidth, window.innerHeight])
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => 'translate(' + (i * 80 + 50) + ',150)')
      .on('click', clicked)
      .call(drag as any);

    nodes.append('circle').attr('fill', 'white').attr('r', radius);

    nodes
      .append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .attr('font-size', 12)
      .attr('y', 4)
      .style('font-size', '12px');
  });

  return container;

  // const canvas = ref<HTMLCanvasElement>();
  // return <canvas ref={canvas}></canvas>;

  function clicked(this: SVGGElement, event: MouseEvent, d: GraphNode) {
    if (event.defaultPrevented) return; // dragged

    const circle = d3.select(this).selectChild('circle');

    circle
      .transition()
      .attr('r', () => +circle.attr('r') * 2)
      .transition()
      .attr('r', radius);
  }
}

/*

generate D3.js code to render nodes contai

*/

function createDrag() {
  function dragstarted(this: Element, event: DragEvent, d: any) {
    d3.select(this).raise().selectChild('circle').attr('stroke', 'black');
  }

  function dragged(this: Element, event: DragEvent, d: any) {
    d3.select(this).attr(
      'transform',
      () => `translate(${(d.x = event.x)},${(d.y = event.y)})`
    );
  }

  function dragended(this: Element, event: DragEvent, d: any) {
    d3.select(this).selectChild('circle').attr('stroke', null);
  }

  const drag = d3
    .drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
  return drag;
}
