import { Game } from '../Game';
import Particales from './Particles';

export default class Animation {
  game: Game;
  particlesAnimation: Particales;

  constructor(game: Game) {
    this.game = game;

    this.particlesAnimation = new Particales(game);
  }
}
