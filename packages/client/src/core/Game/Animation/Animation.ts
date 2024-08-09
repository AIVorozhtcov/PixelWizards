import Character from '../Character/Character';
import { Game } from '../Game';
import CharacterAnimation from './CharacterAnimation';
import Particles from './Particles';

export default class Animation {
  game: Game;
  particlesAnimation: Particles;
  charAnimation: CharacterAnimation;
  animating = false;
  character: Character;

  constructor(game: Game, character: Character) {
    this.game = game;
    this.character = character;

    this.particlesAnimation = new Particles();
    this.charAnimation = new CharacterAnimation(game);
  }

  startAnimation() {
    this.animating = true;
    window.requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (this.animating && !this.game.isGameEnd) {
      this.character.draw(this.game.context);
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }

  stopAnimation() {
    this.animating = false;
  }
}
