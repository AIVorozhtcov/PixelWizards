import { CharacterState } from '../Character/Character';
import Dependent from '../DependentClass/Dependent';

export default class Effect extends Dependent<CharacterState> {
  constructor(state: CharacterState) {
    super(state);
  }

  getDamage(damage: number) {
    const damageThroughResist =
      damage - (this.state.resist + this.state.tempResist);
    this.state.hitPoints -= damageThroughResist;

    if (this.state.hitPoints <= 0) {
      this.state.isCharacterAlive = false;
    }
  }

  getHeal(heal: number) {
    this.state.hitPoints = Math.min(
      this.state.hitPoints + heal,
      this.state.initialHitPoints
    );
  }

  getBlock(block: number) {
    this.state.resist += block;
  }

  refreshResist() {
    this.state.resist = 0;
    this.state.tempResist = 0;
  }

  refreshActionPoints() {
    this.state.actionPoints = this.state.initialActionPoints;
  }
}
