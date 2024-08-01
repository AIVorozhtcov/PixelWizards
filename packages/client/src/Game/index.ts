import { Enemy } from './Enemy';
import { CardInHand } from './fixCardsInHand';
import { Player } from './Player';

export class Game {
  width: number;
  height: number;
  player: Player;
  enemy: Enemy;
  context: CanvasRenderingContext2D;

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;

    this.context = ctx;

    this.player = new Player(this);
    this.enemy = new Enemy(this);
  }

  update() {
    return;
  }

  draw(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, this.width, this.height);
    this.drawCharacters(context);
    this.drawCardInHand(context);
  }

  drawCharacters(context: CanvasRenderingContext2D) {
    this.player.draw(context);
    this.enemy.draw(context);
  }

  drawCardInHand(context: CanvasRenderingContext2D) {
    this.player.displayAwailableCards(context);
  }

  addCardInHand(card: CardInHand) {
    this.player.addCardInHand(card);
    this.player.displayAwailableCards(this.context);
  }

  dealDamage(toWhom: 'player' | 'enemy', damageSize: number) {
    if (toWhom === 'player') {
      this.player.getDamage(damageSize);
    } else {
      this.enemy.getDamage(damageSize);
    }
  }

  endPlayerTurn() {
    this.player.refreshCardsInHand();
  }
}
