import Character from '../Character/Character';
import { CharacterInitProps } from '../Character/types';

export class Player extends Character {
  private cardImages: Map<string, HTMLImageElement> = new Map();
  private isCardsLoaded: boolean | Error = false;

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
    const imagePromises = this.cards.currentCardsInHand.map(card => {
      return new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.src = card.src;
        image.onload = () => {
          this.cardImages.set(card.src, image);

          resolve();
        };
        image.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        this.isCardsLoaded = true;
        console.info('All card images loaded.');
      })
      .catch(err => {
        this.isCardsLoaded = new Error(err);
        console.error('Error loading images', err);
      });
  }

  displayAvailableCards(context: CanvasRenderingContext2D) {
    this.cards.currentCardsInHand.forEach(cardInHand => {
      const image = this.cardImages.get(cardInHand.src);
      if (image) {
        context.drawImage(
          image,
          cardInHand.x,
          cardInHand.y,
          cardInHand.width,
          cardInHand.height
        );

        context.font = '14px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.fillText(
          cardInHand.name,
          cardInHand.x + cardInHand.width / 2,
          cardInHand.y + cardInHand.height / 1.35
        );

        context.font = '14px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.fillText(
          String(cardInHand.actionValue),
          cardInHand.x + cardInHand.width / 4.8,
          cardInHand.y + cardInHand.height / 5.8
        );

        context.font = '14px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.fillText(
          String(cardInHand.action.points),
          cardInHand.x + cardInHand.width / 4.8,
          cardInHand.y + cardInHand.height / 1.16
        );
      }
    });

    this.animation.particlesAnimation.drawParticles(context);
  }

  onMouseDown(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (this.game.whosTurn === 'player' && !this.animation.animating) {
      const { offsetX, offsetY } = event.nativeEvent;

      this.cards.currentCardsInHand.forEach(card => {
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
    if (this.draggingCard) {
      const { offsetX, offsetY } = event.nativeEvent;
      this.draggingCard.x = offsetX - this.startX;
      this.draggingCard.y = offsetY - this.startY;
    }
  }

  onMouseUp() {
    if (
      this.game.whosTurn === 'player' &&
      this.draggingCard &&
      !this.animation.animating
    ) {
      this.animation.particlesAnimation.createParticles(
        this.draggingCard,
        this.draggingCard.x,
        this.draggingCard.y
      );

      this.animation.particlesAnimation.animateParticles();
      const actionType = this.draggingCard.action.type;

      this.cards.currentCardsInHand = this.cards.currentCardsInHand.filter(
        card => card !== this.draggingCard
      );

      this.actionPoints -= this.draggingCard.actionValue;
      if (actionType === 'block' || actionType === 'heal') {
        this.draggingCard.x = this.initialX;
        this.draggingCard.y = this.initialY;
        this.doAction(actionType, this.draggingCard);
        this.draggingCard = null;

        this.game.updateAfterTurn(this.actionPoints);
      } else {
        this.animation.startAnimation();
        this.animation.charAnimation.animateAttack(
          this.game.enemy,
          this,
          () => {
            if (this.draggingCard) {
              this.draggingCard.x = this.initialX;
              this.draggingCard.y = this.initialY;
              this.doAction(actionType, this.draggingCard);

              this.draggingCard = null;
              this.animation.stopAnimation();
              this.game.updateAfterTurn(this.actionPoints);
            }
          }
        );
      }
    }
  }
}
