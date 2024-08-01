import { Enemy } from './Enemy/Enemy';
import { CardInHand } from './Player/fixCardsInPlayerHand';
import { Player } from './Player/Player';

export class Game {
  width: number;
  height: number;
  player: Player;
  enemy: Enemy;
  context: CanvasRenderingContext2D;
  whosTurn: 'player' | 'enemy' = 'player';
  animating = false;

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;

    this.context = ctx;

    this.player = new Player(this);
    this.enemy = new Enemy(this);
  }

  updateAfterTurn(actionPoints: number) {
    if (actionPoints <= 0) {
      this.endTurn();
    }
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

  endTurn() {
    if (this.whosTurn === 'player') {
      this.endPlayerTurn();
      this.player.refreshActionPoints();
      this.whosTurn = 'enemy';
      this.enemy.beginTurn();
    } else {
      this.enemy.refreshCardsInHand();
      this.enemy.refreshActionPoints();
      this.whosTurn = 'player';
    }
  }

  endPlayerTurn() {
    this.player.refreshCardsInHand();
  }

  startAnimation() {
    this.animating = true;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.draw(this.context);
    if (this.animating) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  stopAnimation() {
    this.animating = false;
    this.draw(this.context);
  }
}
