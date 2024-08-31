import Character from '../Character/Character';
import { CharacterInitProps } from '../Character/types';

export class Enemy extends Character {
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
  }

  beginTurn() {
    this.animation.startAnimation();
    this.animation.charAnimation.animateAttack(this.game.player, this, () => {
      while (this.state.actionPoints) {
        const randomIndex = Math.floor(
          Math.random() * this.cards.currentCardsInHand.length
        );
        const randomCard = this.cards.currentCardsInHand[randomIndex];
        if (this.state.actionPoints >= randomCard.actionValue) {
          this.game.dealDamage('player', randomCard.action.points);
          this.state.actionPoints -= randomCard.actionValue;
          this.cards.currentCardsInHand = this.cards.currentCardsInHand.filter(
            card => card !== randomCard
          );
        }
        const playableCards = this.cards.currentCardsInHand.some(
          card => this.state.actionPoints >= card.actionValue
        );
        if (!playableCards) {
          break;
        }
      }

      this.animation.stopAnimation();
      this.game.player.cards.refreshCardsInHand();
      this.game.player.effects.refreshActionPoints();
      this.game.endTurn();
    });
  }
}
