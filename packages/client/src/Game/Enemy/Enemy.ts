import { Game } from '..';
import { cardsInEnemyHand } from './cardsInEnemyHand';

export class Enemy {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  hitPoints = 100;
  cardsInHand = cardsInEnemyHand;
  actionPoints = 2;
  initialActionPoints = 2;
  targetX: number; // местоположение игрока по Х
  targetY: number; // местоположение игрока по Y
  originalX: number; // местоположение врага
  originalY: number; // местоположение врага

  constructor(game: Game) {
    this.game = game;
    this.width = 120;
    this.height = 190;

    this.x = 860;
    this.y = 100;

    this.targetX = game.player.x;
    this.targetY = game.player.y;
    this.originalX = this.x;
    this.originalY = this.y;
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

  beginTurn() {
    this.game.startAnimation();
    this.animateAttack(() => {
      while (this.actionPoints) {
        const randomIndex = Math.floor(Math.random() * this.cardsInHand.length);
        const randomCard = this.cardsInHand[randomIndex];
        // Бред, нужно что-то придумать, чтобы правильно выходить из цикла
        // Ибо если сейчас рандомно возьмется карта стоимостью 3,
        // а у него доступно только 2 - сразу скипнется ход
        if (this.actionPoints >= randomCard.actionValue) {
          this.game.dealDamage('player', randomCard.action.points);
          this.actionPoints -= randomCard.actionValue;
          this.cardsInHand = this.cardsInHand.filter(
            card => card !== randomCard
          );
        }
        break;
      }

      this.game.stopAnimation();
      this.game.endTurn();
    });
  }

  animateAttack(callback: () => void) {
    const originalX = this.x;
    const originalY = this.y;
    const targetX =
      this.game.player.x + this.game.player.width / 2 - this.width / 2;
    const targetY = this.game.player.y - 50; // Враг подпрыгивает
    const attackY = this.game.player.y;
    const duration = 60;
    let frame = 0;

    const animate = () => {
      if (frame < duration) {
        if (frame < duration / 3) {
          this.x = originalX + (targetX - originalX) * (frame / (duration / 3));
          this.y = originalY + (targetY - originalY) * (frame / (duration / 3));
        } else if (frame < (2 * duration) / 3) {
          this.y =
            targetY +
            (attackY - targetY) * ((frame - duration / 3) / (duration / 3));
        } else {
          this.x =
            targetX +
            (originalX - targetX) *
              ((frame - (2 * duration) / 3) / (duration / 3));
          this.y =
            attackY +
            (originalY - attackY) *
              ((frame - (2 * duration) / 3) / (duration / 3));
        }
        frame++;
        requestAnimationFrame(animate);
      } else {
        this.x = originalX;
        this.y = originalY;
        callback();
      }
    };

    animate();
  }

  getDamage(damage: number) {
    this.hitPoints -= damage;
  }

  refreshActionPoints() {
    this.actionPoints = this.initialActionPoints;
  }

  refreshCardsInHand() {
    this.cardsInHand = Array.from(
      new Set(this.cardsInHand.concat(cardsInEnemyHand))
    );
  }
}
