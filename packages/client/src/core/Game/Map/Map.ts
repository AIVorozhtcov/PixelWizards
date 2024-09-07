import { NODES, NODE_CONNECTION_TABLE } from './mapConstants';
import { Node } from './Node';

export class Map {
  nodes: Node[];
  nodeConnectionTable: Record<number, number[]>;
  context: CanvasRenderingContext2D;

  background = new Image();

  constructor(ctx: CanvasRenderingContext2D) {
    this.nodes = NODES.map(
      node =>
        new Node(
          { ...node },
          ctx,
          this.isConnectedToActiveNode.bind(this),
          this.changeActiveNode.bind(this)
        )
    );
    const hasActiveNode = this.nodes.some(node => node.active);
    if (!hasActiveNode) {
      this.getNodeById(1).active = true;
    }
    this.nodeConnectionTable = { ...NODE_CONNECTION_TABLE };
    this.context = ctx;
    this.background.src = '/map-02.png';
    this.background.onload = () => {
      this.drawMap();
    };
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

  isConnectedToActiveNode(id: number) {
    const activeNode = this.nodes.find(node => node.active);
    if (!activeNode) {
      throw new Error('No active node found');
    }
    const connectedNodes = this.nodeConnectionTable[activeNode.id] || [];
    return connectedNodes.includes(id);
  }

  changeActiveNode(id: number) {
    const newActiveNode = this.getNodeById(id);
    const lastActiveNode = this.nodes.find(node => node.active);
    if (!newActiveNode) {
      throw new Error('Wrong id given');
    }
    if (!lastActiveNode) {
      throw new Error('No active node found');
    }
    lastActiveNode.active = false;
    newActiveNode.active = true;
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
