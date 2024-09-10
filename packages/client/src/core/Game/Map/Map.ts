import { NODES, NODE_CONNECTION_TABLE } from './mapConstants';
import { Node } from './Node';

export class Map {
  nodes: Node[];
  nodeConnectionTable: Record<number, number[]>;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  background = new Image();

  constructor(
    ctx: CanvasRenderingContext2D,
    createBattle: () => void,
    width: number,
    height: number
  ) {
    this.nodes = NODES.map(
      node =>
        new Node(
          { ...node },
          ctx,
          this.changeActiveNode.bind(this),
          createBattle
        )
    );
    this.width = width;
    this.height = height;
    this.nodeConnectionTable = { ...NODE_CONNECTION_TABLE };
    this.context = ctx;
    this.background.src = '/map-02.png';
    this.background.onload = () => this.drawMap();

    const activeNode = this.nodes.find(node => node.active);
    if (!activeNode) {
      this.getNodeById(1).active = true;
      this.setConnectedToActive(1);
    } else {
      this.setConnectedToActive(activeNode.id);
    }
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

  setConnectedToActive(id: number) {
    this.nodes.forEach(node => {
      node.connectedToActive = false;
    });
    this.nodeConnectionTable[id]?.map(id => {
      this.getNodeById(id).connectedToActive = true;
    });
  }

  getNodeById(id: number) {
    return this.nodes.filter(node => node.id === id)[0];
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
    this.setConnectedToActive(id);
  }

  drawMap() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawBackground();
    this.drawNodes();
    this.drawConnections();
  }

  drawBackground() {
    this.context.drawImage(this.background, 0, 0);
  }
}
