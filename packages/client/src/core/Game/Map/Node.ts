import { NODE_TYPES } from './mapConstants';
import { NodeType } from './types';

export class Node {
  private imageOffset = 40;
  private context: CanvasRenderingContext2D;
  private imageSize = 80;
  private backgroundSize = 50;

  id: number;
  x: number;
  y: number;
  type: keyof typeof NODE_TYPES;
  src: string;
  visited: boolean;
  active: boolean;
  connectedToActive: boolean;
  changeActiveNode: (id: number) => void;

  constructor(
    { id, x, y, type, src, visited, active, connectedToActive }: NodeType,
    ctx: CanvasRenderingContext2D,
    changeActiveNode: (id: number) => void
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.src = src;
    this.visited = visited;
    this.active = active;
    this.connectedToActive = connectedToActive;
    this.context = ctx;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onClick = this.onClick.bind(this);
    this.changeActiveNode = changeActiveNode;
  }

  drawNode(backgroundColor = 'black', strokeColor = 'black') {
    const image = new Image();
    image.src = this.src;

    if (this.active) {
      backgroundColor = 'DarkGray';
      strokeColor = 'white';
    }

    if (this.connectedToActive) {
      backgroundColor = 'DarkGray';
    }

    image.onload = () => {
      this.context.beginPath();
      this.drawCircleBackground(
        backgroundColor,
        strokeColor,
        this.backgroundSize
      );

      this.context.drawImage(
        image,
        this.x - this.imageOffset,
        this.y - this.imageOffset,
        this.imageSize,
        this.imageSize
      );
      this.context.closePath();
    };
  }

  drawCircleBackground(color: string, strokeColor: string, radius: number) {
    this.context.beginPath();
    this.context.arc(this.x, this.y, radius, 0, 2 * Math.PI);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.setLineDash([]);
    this.context.lineWidth = 3;
    this.context.strokeStyle = strokeColor;
    this.context.stroke();
    this.context.closePath();
  }

  onMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const isOnHoverNode = this.isOnHoverNode(event);

    if (isOnHoverNode) {
      //TODO придумать как выделять только связанные ноды (сотреть по таблице связей NODE_CONNECTION_TABLE)
      if (this.connectedToActive) {
        this.drawNode('DarkGray', 'white');
      } else {
        this.drawNode();
      }
    } else {
      this.drawNode();
    }
  }

  onClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const isOnHoverNode = this.isOnHoverNode(event);

    if (isOnHoverNode && this.connectedToActive) {
      //TODO В зависимости от типа узла делать переход на новый уровень

      this.visited = true;
      this.changeActiveNode(this.id);
      alert(this.type);
    }
  }

  isOnHoverNode(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const { offsetX, offsetY } = event.nativeEvent;
    const isOnHoverNodeX =
      offsetX > this.x - this.backgroundSize &&
      offsetX < this.x + this.backgroundSize;
    const isOnHoverNodeY =
      offsetY > this.y - this.backgroundSize &&
      offsetY < this.y + this.backgroundSize;

    return isOnHoverNodeX && isOnHoverNodeY;
  }
}
