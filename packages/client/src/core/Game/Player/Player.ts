import Character from '../Character/Character';
import { CharacterInitProps } from '../Character/types';

export class Player extends Character {
  private cardImages: Map<string, HTMLImageElement> = new Map();
  isCardsLoaded: boolean | Error = false;

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
        this.isCardsLoaded = true;
        console.log('All card images loaded.');
      })
      .catch(err => {
        this.isCardsLoaded = new Error(err);
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
          if (this.state.actionPoints >= card.actionValue) {
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
    if (this.game.whosTurn === 'player' && this.draggingCard) {
      this.animation.particlesAnimation.createParticles(
        this.draggingCard,
        this.draggingCard.x,
        this.draggingCard.y
      );

      this.animation.particlesAnimation.animateParticles();
      const actionType = this.draggingCard.action.type;

      this.cardInHand = this.cardInHand.filter(
        card => card !== this.draggingCard
      );

      this.state.actionPoints -= this.draggingCard.actionValue;
      if (actionType === 'block' || actionType === 'heal') {
        this.draggingCard.x = this.initialX;
        this.draggingCard.y = this.initialY;
        this.doAction(actionType, this.draggingCard);
        this.draggingCard = null;

        this.game.updateAfterTurn(this.state.actionPoints);
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
              this.game.updateAfterTurn(this.state.actionPoints);
            }
          }
        );
      }
    }
  }
}
