import { Game } from '../Game';
import Particles from './Particles';

export default class Animation {
  game: Game;
  particlesAnimation: Particles;

  constructor(game: Game) {
    this.game = game;

    this.particlesAnimation = new Particles(game);
  }
}
