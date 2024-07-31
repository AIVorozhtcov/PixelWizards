import { fixCardsInHand } from './fixCardsInHand';

class Player {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  cardInHand = fixCardsInHand;

  constructor(game: Game) {
    this.game = game;
    this.width = 120;
    this.height = 190;

    this.x = 20;
    this.y = 100;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'blue';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  addCardInHand(card: typeof this.cardInHand[number]) {
    this.cardInHand.push(card);
  }

  displayAwailableCards(context: CanvasRenderingContext2D) {
    this.cardInHand.forEach(cardInHand => {
      context.fillStyle = 'green';
      context.fillRect(
        cardInHand.x,
        cardInHand.y,
        cardInHand.width,
        cardInHand.height
      );

      context.fillStyle = 'white';
      context.fillText(cardInHand.name, cardInHand.x + 40, cardInHand.y + 20);
    });
  }
}

class Enemy {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  constructor(game: Game) {
    this.game = game;
    this.width = 120;
    this.height = 190;

    this.x = 860;
    this.y = 100;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class Game {
  width: number;
  height: number;
  player: Player;
  enemy: Enemy;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.player = new Player(this);
    this.enemy = new Enemy(this);
  }

  update() {
    return;
  }

  drawCharacters(context: CanvasRenderingContext2D) {
    this.player.draw(context);
    this.enemy.draw(context);
  }

  drawCardInHand(context: CanvasRenderingContext2D) {
    this.player.displayAwailableCards(context);
  }
}
