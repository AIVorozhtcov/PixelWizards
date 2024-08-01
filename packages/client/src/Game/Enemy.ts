import { Game } from '.';

export class Enemy {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  hitPoints = 100;

  constructor(game: Game) {
    this.game = game;
    this.width = 120;
    this.height = 190;

    this.x = 860;
    this.y = 100;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);

    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y * 3, this.width, 20);

    context.fillStyle = 'black';
    context.font = '18px Arial';

    context.fillText(String(this.hitPoints), this.x, this.y * 3 + 15);
  }

  getDamage(damage: number) {
    this.hitPoints -= damage;
  }
}
