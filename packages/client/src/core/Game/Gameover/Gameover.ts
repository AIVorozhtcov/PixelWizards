import getRandomColor from '../../../utils/getRandomColor';
import { Game } from '../Game';

export default class Gameover {
  private game: Game;
  private text: string;
  private fontSize: number;

  constructor(
    game: Game,
    isWin: boolean,
    fontSize: number,
    isLastBossВefeated: boolean
  ) {
    this.game = game;
    this.text = isWin ? 'YOU WIN!' : 'GAME OVER';

    if (isLastBossВefeated) {
      this.text = 'Вы спасли апельсины и ваших друзей!';
    }

    this.fontSize = fontSize;

    const background = new Image();
    background.src = isWin ? '/winGame.webp' : '/endGame.webp';

    background.onload = () => {
      this.game.context.drawImage(
        background,
        0,
        0,
        this.game.width,
        this.game.height
      );
      this.fillAndRenderTextOnCanvas();

      this.game.gameAnimation = requestAnimationFrame(
        this.animation.bind(this, background)
      );
    };
  }

  animation(background: HTMLImageElement) {
    if (this.game.isGameEnd) {
      this.applyGlitch(background);
      this.game.gameAnimation = requestAnimationFrame(
        this.animation.bind(this, background)
      );
    }
  }

  fillAndRenderTextOnCanvas() {
    this.game.context.fillStyle = getRandomColor();

    this.game.context.font = `${this.fontSize}px Arial`;
    this.game.context.textAlign = 'center';
    this.game.context.lineWidth = 2;

    this.game.context.fillText(
      this.text,
      this.game.width / 2,
      this.game.height / 2
    );
  }

  applyGlitch(background: HTMLImageElement) {
    this.game.context.clearRect(
      0,
      this.game.height / 2 - this.fontSize,
      this.game.width,
      this.fontSize * 1.2
    );
    this.game.context.drawImage(
      background,
      0,
      0,
      this.game.width,
      this.game.height
    );
    this.fillAndRenderTextOnCanvas();

    for (let i = 0; i < 10; i++) {
      const x = Math.floor(Math.random() * this.game.width);
      const y = Math.floor(Math.random() * this.fontSize * 1.2);
      const spliceWidth = this.game.width - x;
      const spliceHeight = Math.floor(Math.random() * 10 + 1);
      this.game.context.putImageData(
        this.game.context.getImageData(
          x,
          this.game.height / 2 - this.fontSize + y,
          spliceWidth,
          spliceHeight
        ),
        x + Math.floor(Math.random() * 20 - 10),
        this.game.height / 2 - this.fontSize + y
      );
    }
  }
}
