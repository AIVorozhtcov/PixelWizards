export const NODE_TYPES = {
  heal: 'heal',
  battle: 'battle',
  treasure: 'treasure',
  boss: 'boss',
};

export class Node {
  private imageOffset = 40;
  private context: CanvasRenderingContext2D;
  private imageSize = 80;

  id: number;
  x: number;
  y: number;
  type: keyof typeof NODE_TYPES;
  src: string;

  constructor(
    id: number,
    x: number,
    y: number,
    type: keyof typeof NODE_TYPES,
    src: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.src = src;
    this.context = ctx;
  }

  drawNode() {
    const image = new Image();
    image.src = this.src;

    image.onload = () => {
      this.context.beginPath();
      this.context.arc(this.x, this.y, 50, 0, 2 * Math.PI);
      this.context.fillStyle = 'white';
      this.context.fill();
      this.context.closePath();

      this.context.beginPath();
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
}
