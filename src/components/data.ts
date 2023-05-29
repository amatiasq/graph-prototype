type GraphNodeId = number & 'snowflake GraphNodeId';

export interface GraphNode {
  id: GraphNodeId;
  kind: 'Person' | 'Product';
  name: string;
  properties: Record<string, any>;
  links: Record<string, GraphNodeId | GraphNodeId[]>;
}

export const data = read() ?? defaultData();

function read() {
  const stored = localStorage.getItem('graph-data');
  return stored ? (JSON.parse(stored) as GraphNode[]) : null;
}

export function write(data: GraphNode[]) {
  localStorage.setItem('graph-data', JSON.stringify(data));
}

function defaultData() {
  const yo = 1 as GraphNodeId;
  const mica = 2 as GraphNodeId;
  const facu = 3 as GraphNodeId;
  const cami = 4 as GraphNodeId;

  return [
    {
      id: yo,
      kind: 'Person',
      name: 'YO',
      properties: {
        age: 33,
      },
      links: {
        partner: mica,
      },
    },
    {
      id: mica,
      kind: 'Person',
      name: 'Mica',
      properties: {
        age: 31,
      },
      links: {
        partner: yo,
      },
    },
    {
      id: facu,
      kind: 'Person',
      name: 'Facu',
      properties: {
        age: 5,
      },
      links: {
        father: yo,
        mother: mica,
      },
    },
    {
      id: cami,
      kind: 'Person',
      name: 'Cami',
      properties: {
        age: 2,
      },
      links: {
        father: yo,
        mother: mica,
      },
    },
  ] as GraphNode[];
}
