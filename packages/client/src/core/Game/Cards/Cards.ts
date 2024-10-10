import Animation from '../Animation/Animation';
import { CardInHand, OmitedCardInHand } from '../Character/types';
import { Game } from '../Game';

export default class Cards {
  gameCanvasWidth: number;
  gameCanvasHeight: number;
  cardWidth = 150;
  cardHeight = 200;
  currentCardsInHand: CardInHand[];
  defaultCardsInHand: CardInHand[];
  totalCardsLength: number;
  totalCardsWidth: number;
  spacingBetweenCards = 5;

  constructor(game: Game, initialCards: OmitedCardInHand[]) {
    this.gameCanvasWidth = game.width;
    this.gameCanvasHeight = game.height;

    this.totalCardsLength = initialCards.length;
    this.totalCardsWidth = this.calculateTotalCardsWidth();

    this.defaultCardsInHand = this.createInitialCards(initialCards);
    this.currentCardsInHand = [...this.defaultCardsInHand];
  }

  private createInitialCards(fixCards: OmitedCardInHand[]): CardInHand[] {
    return fixCards.map((card, index) => {
      const { x, y } = this.calculateAxiosLocationOfCard(index);
      return {
        ...card,
        width: this.cardWidth,
        height: this.cardHeight,
        x,
        y,
      };
    });
  }

  private recalculateCardsInfo() {
    this.totalCardsLength = this.defaultCardsInHand.length;
    this.totalCardsWidth = this.calculateTotalCardsWidth();
  }

  addCardInHand(card: OmitedCardInHand) {
    this.defaultCardsInHand.push({
      ...card,
      width: this.cardWidth,
      height: this.cardHeight,
      x: 0,
      y: 0,
    });

    this.recalculateCardsInfo();
    this.recalculatePositionOfCards();
  }

  private recalculatePositionOfCards() {
    this.defaultCardsInHand = this.defaultCardsInHand.map((card, index) => {
      const { x, y } = this.calculateAxiosLocationOfCard(index);
      return {
        ...card,
        x,
        y,
      };
    });
  }

  protected setDefaultCardsInHand(listOfCard: OmitedCardInHand[]) {
    this.defaultCardsInHand = this.createInitialCards(listOfCard);
    this.currentCardsInHand = [...this.defaultCardsInHand];
  }

  removePlayedCard(draggingCard: CardInHand) {
    return this.currentCardsInHand.filter(card => card !== draggingCard);
  }

  animateDestroyingRemainingCards(animation: Animation) {
    this.currentCardsInHand.forEach(cardInHand => {
      animation.particlesAnimation.createParticles(
        cardInHand,
        cardInHand.x,
        cardInHand.y
      );
    });
    this.currentCardsInHand = [];
    animation.particlesAnimation.animateParticles();
  }

  refreshCardsInHand() {
    this.currentCardsInHand = [...this.defaultCardsInHand];
  }

  private calculateTotalCardsWidth(cardsLength = this.totalCardsLength) {
    return (
      cardsLength * this.cardWidth +
      (cardsLength - 1) * this.spacingBetweenCards
    );
  }

  private calculateAxiosLocationOfCard(index: number) {
    const startX = (this.gameCanvasWidth - this.totalCardsWidth) / 2;
    const y = this.gameCanvasHeight - this.cardHeight - 20;
    return {
      x: startX + index * (this.cardWidth + this.spacingBetweenCards),
      y,
    };
  }
}
