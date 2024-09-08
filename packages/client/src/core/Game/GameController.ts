import { Game } from './Game';
import { Map } from './Map/Map';

class GameController {
  private game: Game | undefined;
  private map: Map | undefined;

  setGame(game: Game) {
    this.game = game;
  }

  setMap(map: Map) {
    this.map = map;
  }

  showMap() {
    if (this.game?.isGameEnd) {
      this.map?.setIsMapOpen(true);
      this.map?.drawMap();
      this.map?.setIsGameStart(false);
    }
  }
}

export const gameController = new GameController();
