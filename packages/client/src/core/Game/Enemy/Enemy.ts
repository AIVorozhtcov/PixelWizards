import Character from '../Character/Charachter';
import { CharacterInitProps } from '../Character/types';

export class Enemy extends Character {
  targetX: number; // местоположение игрока по Х
  targetY: number; // местоположение игрока по Y
  originalX: number; // местоположение врага
  originalY: number; // местоположение врага
  animating = false;

  constructor({
    game,
    initialActionPoints,
    characterSkin,
    hitPoints,
    cardInHand,
    width,
    height,
    x,
    y,
  }: CharacterInitProps) {
    super({
      game,
      initialActionPoints,
      characterSkin,
      hitPoints,
      cardInHand,
      width,
      height,
      x,
      y,
    });

    this.targetX = game.player.x;
    this.targetY = game.player.y;
    this.originalX = this.x;
    this.originalY = this.y;
  }

  beginTurn() {
    this.startAnimation();
    this.animateAttack(() => {
      while (this.actionPoints) {
        const randomIndex = Math.floor(Math.random() * this.cardInHand.length);
        const randomCard = this.cardInHand[randomIndex];
        // Бред, нужно что-то придумать, чтобы правильно выходить из цикла
        // Ибо если сейчас рандомно возьмется карта стоимостью 3,
        // а у него доступно только 2 - сразу скипнется ход
        if (this.actionPoints >= randomCard.actionValue) {
          this.game.dealDamage('player', randomCard.action.points);
          this.actionPoints -= randomCard.actionValue;
          this.cardInHand = this.cardInHand.filter(card => card !== randomCard);
        }
        break;
      }

      this.stopAnimation();
      this.game.player.refreshCardsInHand();
      this.game.player.refreshActionPoints();
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

  startAnimation() {
    this.animating = true;
    window.requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (this.animating && !this.game.isGameEnd) {
      this.draw(this.game.context);
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }

  stopAnimation() {
    this.animating = false;
  }
}
