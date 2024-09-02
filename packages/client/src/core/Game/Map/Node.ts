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

  constructor(
    { id, x, y, type, src, visited }: NodeType,
    ctx: CanvasRenderingContext2D
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.src = src;
    this.visited = visited;
    this.context = ctx;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  drawNode(backgroundColor = 'black', strokeColor = 'black') {
    const image = new Image();
    image.src = this.src;

    image.onload = () => {
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

    this.context.beginPath();
  }

  onMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const isOnHoverNode = this.isOnHoverNode(event);

    if (isOnHoverNode) {
      if (!this.visited) {
        this.drawNode('#2E2E2E');
      } else {
        this.drawNode('DarkGray', 'white');
      }
    } else {
      if (!this.visited) {
        this.drawNode();
      } else {
        this.drawNode('DarkGray', 'white');
      }
    }
  }

  onClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const isOnHoverNode = this.isOnHoverNode(event);

    if (isOnHoverNode) {
      //TODO В зависимости от типа узла делать переход на новый уровень

      this.visited = true;
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
