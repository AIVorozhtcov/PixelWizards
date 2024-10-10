import Character from '../Character/Character';

export default class Effect {
  character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  getDamage(damage: number) {
    const damageThroughResist =
      damage - (this.character.resist + this.character.tempResist);
    this.character.hitPoints -= damageThroughResist;

    if (this.character.hitPoints <= 0) {
      this.character.isCharacterAlive = false;
    }
  }

  getHeal(heal: number) {
    this.character.hitPoints = Math.min(
      this.character.hitPoints + heal,
      this.character.initialHitPoints
    );
  }

  getBlock(block: number) {
    this.character.tempResist = block;
  }

  refreshResist() {
    this.character.resist = 0;
    this.character.tempResist = 0;
  }

  refreshActionPoints() {
    this.character.actionPoints = this.character.initialActionPoints;
  }
}
