import { Dispatch, SetStateAction } from 'react';
import { NODES, NODE_CONNECTION_TABLE } from './mapConstants';
import { Node } from './Node';

export class Map {
  nodes: Node[];
  nodeConnectionTable: Record<number, number[]>;
  context: CanvasRenderingContext2D;

  background = new Image();
  setIsMapOpen: Dispatch<SetStateAction<boolean>>;
  setIsGameStart: Dispatch<SetStateAction<boolean>>;

  constructor(
    ctx: CanvasRenderingContext2D,
    setIsGameStart: Dispatch<SetStateAction<boolean>>,
    setIsMapOpen: Dispatch<SetStateAction<boolean>>
  ) {
    this.nodes = NODES.map(
      node => new Node({ ...node }, ctx, setIsGameStart, setIsMapOpen)
    );
    this.nodeConnectionTable = { ...NODE_CONNECTION_TABLE };
    this.context = ctx;
    this.background.src = '/map-02.png';
    this.background.onload = () => {
      this.drawMap();
    };
    this.setIsMapOpen = setIsMapOpen;
    this.setIsGameStart = setIsGameStart;
  }

  drawNodes() {
    this.nodes.map(node => node.drawNode());
  }

  drawConnections() {
    const nodeConnectionArr = Object.entries(this.nodeConnectionTable);

    nodeConnectionArr.map(([nodeId, connectionsId]) => {
      const node = this.getNodeById(Number(nodeId));
      const offset = 30;

      connectionsId.map(id => {
        const connectionNode = this.getNodeById(id);

        this.context.beginPath();
        this.context.moveTo(node.x + offset, node.y);
        this.context.lineTo(connectionNode.x - offset, connectionNode.y);
        this.context.setLineDash([10]);
        this.context.lineWidth = 5;
        this.context.strokeStyle = 'white';
        this.context.stroke();
        this.context.closePath();
      });
    });
  }

  getNodeById(id: number) {
    return this.nodes.filter(node => node.id === id)[0];
  }

  drawMap() {
    this.drawBackground();
    this.drawNodes();
    this.drawConnections();
  }

  drawBackground() {
    this.context.drawImage(this.background, 0, 0);
  }
}
