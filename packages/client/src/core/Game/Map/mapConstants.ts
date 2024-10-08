import { NodeType } from './types';

export const NODE_TYPES = {
  heal: 'heal',
  battle: 'battle',
  treasure: 'treasure',
  boss: 'boss',
  start: 'start',
};

export const NODE_CONNECTION_TABLE = {
  1: [2, 3, 4],
  2: [5],
  3: [6],
  4: [6],
  5: [7],
  6: [7],
};

export const AVAILABLE_EVENTS: {
  type: NodeType['type'];
  src: NodeType['src'];
  count?: number;
}[] = [
  {
    type: 'battle',
    src: '/map-battle-01.png',
  },
  { type: 'treasure', src: '/map-treasure.png', count: 1 },
  { type: 'heal', src: '/map-heal.png', count: 2 },
];

export const NODES: NodeType[] = [
  {
    id: 1,
    x: 100,
    y: 300,
    type: 'start',
    src: '/start-map-capibara-01.png',
    visited: true,
    active: true,
    connectedToActive: false,
  },
  {
    id: 2,
    x: 350,
    y: 180,
    visited: false,
    active: false,
    connectedToActive: false,
  },
  {
    id: 3,
    x: 350,
    y: 300,
    visited: false,
    active: false,
    connectedToActive: false,
  },
  {
    id: 4,
    x: 350,
    y: 420,
    visited: false,
    active: false,
    connectedToActive: false,
  },
  {
    id: 5,
    x: 600,
    y: 180,
    visited: false,
    active: false,
    connectedToActive: false,
  },
  {
    id: 6,
    x: 600,
    y: 360,
    visited: false,
    active: false,
    connectedToActive: false,
  },
  {
    id: 7,
    x: 850,
    y: 300,
    type: 'boss',
    src: '/map-boss.png',
    visited: false,
    active: false,
    connectedToActive: false,
  },
];
