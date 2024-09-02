import { NODE_TYPES } from './mapConstants';

export type NodeType = {
  id: number;
  x: number;
  y: number;
  type: keyof typeof NODE_TYPES;
  src: string;
};
