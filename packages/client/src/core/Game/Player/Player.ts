import Character from '../Character/Character';
import { CharacterInitProps } from '../Character/types';

export class Player extends Character {
  private cardImages: Map<string, HTMLImageElement> = new Map();
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

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.preloadCardImages();
  }

  private preloadCardImages() {
    const imagePromises = this.cardInHand.map(card => {
      return new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.src = card.name;
        image.onload = () => {
          this.cardImages.set(card.name, image);
          resolve();
        };
        image.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        console.log('All card images loaded.');
      })
      .catch(err => {
        console.error('Error loading images', err);
      });
  }

  displayAvailableCards(context: CanvasRenderingContext2D) {
    this.cardInHand.forEach(cardInHand => {
      const image = this.cardImages.get(cardInHand.name);
      if (image) {
        context.drawImage(
          image,
          cardInHand.x,
          cardInHand.y,
          cardInHand.width,
          cardInHand.height
        );
      }
    });

    this.animation.particlesAnimation.drawParticles(context);
  }

  onMouseDown(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (this.game.whosTurn === 'player') {
      const { offsetX, offsetY } = event.nativeEvent;

      this.cardInHand.forEach(card => {
        if (
          offsetX >= card.x &&
          offsetX <= card.x + card.width &&
          offsetY >= card.y &&
          offsetY <= card.y + card.height
        ) {
          if (this.actionPoints >= card.actionValue) {
            this.draggingCard = card;
            this.startX = offsetX - card.x;
            this.startY = offsetY - card.y;
            this.initialX = card.x;
            this.initialY = card.y;
          }
        }
      });
    }
  }

  onMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (this.draggingCard && !this.animating) {
      const { offsetX, offsetY } = event.nativeEvent;
      this.draggingCard.x = offsetX - this.startX;
      this.draggingCard.y = offsetY - this.startY;
      this.game.draw(this.game.context);
    }
  }

  onMouseUp() {
    if (this.game.whosTurn === 'player' && this.draggingCard) {
      this.animation.particlesAnimation.createParticles(
        this.draggingCard,
        this.draggingCard.x,
        this.draggingCard.y
      );

      this.draggingCard.x = this.initialX;
      this.draggingCard.y = this.initialY;
      this.animation.particlesAnimation.animateParticles();
      const actionType = this.draggingCard.action.type;

      this.cardInHand = this.cardInHand.filter(
        card => card !== this.draggingCard
      );

      this.actionPoints -= this.draggingCard.actionValue;
      if (actionType === 'block' || actionType === 'heal') {
        this.doAction(actionType, this.draggingCard);
        this.draggingCard = null;

        this.game.draw(this.game.context);
        this.game.updateAfterTurn(this.actionPoints);
      } else {
        this.startAnimation();
        this.animateAttack(() => {
          if (this.draggingCard) {
            this.doAction(actionType, this.draggingCard);

            this.draggingCard = null;
            this.stopAnimation();
            this.game.draw(this.game.context);
            this.game.updateAfterTurn(this.actionPoints);
          }
        });
      }
    }
  }

  animateAttack(callback: () => void) {
    const originalX = this.x;
    const originalY = this.y;

    const targetX =
      this.game.enemy.x + this.game.enemy.width / 2 - this.width / 2;

    const targetY = this.game.enemy.y - 50;
    const attackY = this.game.enemy.y;
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
