import Character from '../Character/Charachter';
import { CharacterInitProps } from '../Character/types';

export class Player extends Character {
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
  }

  displayAwailableCards(context: CanvasRenderingContext2D) {
    this.cardInHand.forEach(cardInHand => {
      context.fillStyle = 'green';
      context.fillRect(
        cardInHand.x,
        cardInHand.y,
        cardInHand.width,
        cardInHand.height
      );

      const fontSize = 18;
      const paddingY = 10;

      context.fillStyle = 'white';
      context.font = `${fontSize}px Arial`;

      const textWidth = context.measureText(cardInHand.name).width;
      const textX = cardInHand.x + (cardInHand.width - textWidth) / 2;
      const textY = cardInHand.y + paddingY + fontSize;

      context.fillText(cardInHand.name, textX, textY);
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
    if (this.draggingCard) {
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

      const actionType = this.draggingCard.action.type;

      this.doAction(actionType, this.draggingCard);

      this.animation.particlesAnimation.animateParticles();
      this.cardInHand = this.cardInHand.filter(
        card => card !== this.draggingCard
      );

      this.actionPoints -= this.draggingCard.actionValue;

      this.draggingCard = null;
      this.game.draw(this.game.context);
      this.game.updateAfterTurn(this.actionPoints);
    }
  }
}
