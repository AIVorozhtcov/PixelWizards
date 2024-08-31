const NODE_TYPES = {
  heal: 'heal',
  battle: 'battle',
  treasure: 'treasure',
  boss: 'boss',
};

const NODE_CONNECTION_TABLE = {
  1: [2, 3, 4],
  2: [5],
  3: [6],
  4: [6],
  5: [7],
  6: [7],
};

const NODES: Node[] = [
  {
    id: 1,
    x: 100,
    y: 300,
    type: 'battle',
    src: '/map-battle.png',
  },
  {
    id: 2,
    x: 350,
    y: 180,
    type: 'battle',
    src: '/map-battle.png',
  },
  {
    id: 3,
    x: 350,
    y: 300,
    type: 'battle',
    src: '/map-battle.png',
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

type Node = {
  id: number;
  x: number;
  y: number;
  type: keyof typeof NODE_TYPES;
  src: string;
};

export class Map {
  nodes: Node[];
  nodeConnectionTable: Record<number, number[]>;
  context: CanvasRenderingContext2D;

  background = new Image();

  constructor(ctx: CanvasRenderingContext2D) {
    this.nodes = [...NODES];
    this.nodeConnectionTable = { ...NODE_CONNECTION_TABLE };
    this.context = ctx;
    this.background.src = '/map-02.png';
    this.background.onload = () => {
      this.drawMap();
    };
  }

  drawNodes() {
    this.nodes.map(node => {
      const imageOffset = 40;
      const image = new Image();
      image.src = node.src;

      image.onload = () => {
        this.context.beginPath();
        this.context.arc(node.x, node.y, 50, 0, 2 * Math.PI);
        this.context.fillStyle = 'white';
        this.context.fill();
        this.context.closePath();

        this.context.beginPath();
        this.context.drawImage(
          image,
          node.x - imageOffset,
          node.y - imageOffset,
          80,
          80
        );
        this.context.closePath();
      };
    });
  }

  drawConnections() {
    const nodeConnectionArr = Object.entries(this.nodeConnectionTable);

    nodeConnectionArr.map(([nodeId, connectionsId]) => {
      const node = this.getNodeById(Number(nodeId));
      const NodeRadius = 30;

      connectionsId.map(id => {
        const connectionNode = this.getNodeById(id);

        this.context.beginPath();
        this.context.moveTo(node.x + NodeRadius, node.y);
        this.context.lineTo(connectionNode.x - NodeRadius, connectionNode.y);
        this.context.setLineDash([10]);
        this.context.lineWidth = 5;
        this.context.strokeStyle = 'black';
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
