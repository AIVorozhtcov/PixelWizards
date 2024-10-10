import Character from '../Character/Character';
import { CharacterInitProps } from '../Character/types';

export class Enemy extends Character {
  constructor(props: CharacterInitProps) {
    super(props);
  }

  beginTurn() {
    this.animation.startAnimation();
    this.animation.charAnimation.animateAttack(this.game.player, this, () => {
      while (this.actionPoints) {
        const randomIndex = Math.floor(
          Math.random() * this.cards.currentCardsInHand.length
        );
        const randomCard = this.cards.currentCardsInHand[randomIndex];
        if (this.actionPoints >= randomCard.actionValue) {
          this.game.dealDamage('player', randomCard.action.points);
          this.actionPoints -= randomCard.actionValue;
          this.cards.currentCardsInHand = this.cards.currentCardsInHand.filter(
            card => card !== randomCard
          );
        }
        const playableCards = this.cards.currentCardsInHand.some(
          card => this.actionPoints >= card.actionValue
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
