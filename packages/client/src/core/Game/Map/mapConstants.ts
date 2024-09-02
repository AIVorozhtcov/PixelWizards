import { NodeType } from './types';

export const NODE_TYPES = {
  heal: 'heal',
  battle: 'battle',
  treasure: 'treasure',
  boss: 'boss',
};

export const NODE_CONNECTION_TABLE = {
  1: [2, 3, 4],
  2: [5],
  3: [6],
  4: [6],
  5: [7],
  6: [7],
};

export const NODES: NodeType[] = [
  {
    id: 1,
    x: 100,
    y: 300,
    type: 'battle',
    src: '/map-battle-01.png',
  },
  {
    id: 2,
    x: 350,
    y: 180,
    type: 'battle',
    src: '/map-battle-01.png',
  },
  {
    id: 3,
    x: 350,
    y: 300,
    type: 'battle',
    src: '/map-battle-01.png',
  },
  {
    id: 4,
    x: 350,
    y: 420,
    type: 'heal',
    src: '/map-heal.png',
  },
  {
    id: 5,
    x: 600,
    y: 180,
    type: 'heal',
    src: '/map-heal.png',
  },
  {
    id: 6,
    x: 600,
    y: 360,
    type: 'treasure',
    src: '/map-treasure.png',
  },
  {
    id: 7,
    x: 850,
    y: 300,
    type: 'boss',
    src: '/map-boss.png',
  },
];
