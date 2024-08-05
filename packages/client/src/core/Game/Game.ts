import { CharacterInitProps } from './Character/types';
import { cardsInEnemyHand } from './Enemy/cardsInEnemyHand';
import { Enemy } from './Enemy/Enemy';
import { fixCardsInPlayerHand } from './Player/fixCardsInPlayerHand';
import { Player } from './Player/Player';
import CharacterPNG from '../../public/character.png';
import EnemyPNG from '../../public/enemy.png';

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

    this.player = new Player({
      game: this,
      cardInHand: fixCardsInPlayerHand,
      x: 20,
      y: 100,
      width: 120,
      height: 190,
      hitPoints: 100,
      initialActionPoints: 2,
      characterSkin: CharacterPNG,
    });

    this.enemy = this.createEnemy({
      game: this,
      cardInHand: cardsInEnemyHand,
      x: 860,
      y: 100,
      width: 120,
      height: 190,
      hitPoints: 100,
      initialActionPoints: 2,
      characterSkin: EnemyPNG,
    });
  }

  createEnemy(props: CharacterInitProps) {
    return new Enemy(props);
  }

  updateAfterTurn(actionPoints: number) {
    if (this.player.hitPoints <= 0 || this.enemy.hitPoints <= 0) {
      this.endGame();
    } else {
      if (actionPoints <= 0) {
        this.endTurn();
      }
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
    } else {
      this.endEnemyTurn();
    }
  }

  endGame() {
    return;
  }

  private endPlayerTurn() {
    this.player.refreshCardsInHand();
    this.player.refreshActionPoints();
    this.whosTurn = 'enemy';
    this.enemy.beginTurn();
  }

  private endEnemyTurn() {
    this.enemy.refreshCardsInHand();
    this.enemy.refreshActionPoints();
    this.whosTurn = 'player';
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
