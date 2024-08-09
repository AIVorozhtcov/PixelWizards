import Character from '../Character/Character';
import { Game } from '../Game';

export default class CharacterAnimation {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  animateAttack(target: Character, self: Character, callback: () => void) {
    const originalX = self.x;
    const originalY = self.y;

    const targetX = target.x + target.width / 2 - self.width / 2;

    const targetY = target.y - 50;
    const attackY = target.y;
    const duration = 60;
    let frame = 0;

    const animate = () => {
      if (frame < duration) {
        if (frame < duration / 3) {
          self.x = originalX + (targetX - originalX) * (frame / (duration / 3));
          self.y = originalY + (targetY - originalY) * (frame / (duration / 3));
        } else if (frame < (2 * duration) / 3) {
          self.y =
            targetY +
            (attackY - targetY) * ((frame - duration / 3) / (duration / 3));
        } else {
          self.x =
            targetX +
            (originalX - targetX) *
              ((frame - (2 * duration) / 3) / (duration / 3));
          self.y =
            attackY +
            (originalY - attackY) *
              ((frame - (2 * duration) / 3) / (duration / 3));
        }
        frame++;
        requestAnimationFrame(animate);
      } else {
        self.x = originalX;
        self.y = originalY;
        callback();
      }
    };

    animate();
  }
}
