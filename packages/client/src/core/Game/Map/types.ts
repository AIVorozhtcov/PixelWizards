import { NODE_TYPES } from './mapConstants';

export type NodeKeyofType = keyof typeof NODE_TYPES;

export type NodeType = {
  id: number;
  x: number;
  y: number;
  type?: NodeKeyofType;
  src?: string;
  visited: boolean;
  active: boolean;
  connectedToActive: boolean;
};
