import Gameover from './Gameover/Gameover';
import { CharacterInitProps } from './Character/types';
import { cardsInEnemyHand } from './Enemy/cardsInEnemyHand';
import { Enemy } from './Enemy/Enemy';
import { fixCardsInPlayerHand } from './Player/fixCardsInPlayerHand';
import { Player } from './Player/Player';

export class Game {
  width: number;
  height: number;
  player!: Player;
  enemy!: Enemy;
  context: CanvasRenderingContext2D;
  whosTurn: 'player' | 'enemy' = 'player';
  isGameEnd = false;
  gameAnimation: number | undefined = undefined;
  changeGameStateFunc: () => void;
  background = new Image();

  constructor(
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    changeGameStateFunc: () => void
  ) {
    this.width = width;
    this.height = height;
    this.changeGameStateFunc = changeGameStateFunc;

    this.context = ctx;

    this.background.src = '/backgroundGame.webp';

    this.background.onload = () => {
      this.beginGame();
    };
  }

  createEnemy(props: CharacterInitProps) {
    return new Enemy(props);
  }

  isGameContinue() {
    if (this.player.hitPoints <= 0) {
      this.endGame();
      return false;
    } else if (this.enemy.hitPoints <= 0) {
      this.endGame(true);
      return false;
    } else {
      return true;
    }
  }

  updateAfterTurn(actionPoints: number) {
    if (this.isGameContinue()) {
      if (actionPoints <= 0) {
        this.endTurn();
      }
    }
  }

  draw(context: CanvasRenderingContext2D) {
    if (!this.isGameEnd) {
      context.clearRect(0, 0, this.width, this.height);

      this.drawEverything(context);
    }
  }

  drawCharacters(context: CanvasRenderingContext2D) {
    if (!this.isGameEnd) {
      this.player.draw(context);
      this.enemy.draw(context);
    }
  }

  drawCardInHand(context: CanvasRenderingContext2D) {
    if (!this.isGameEnd) {
      this.player.displayAwailableCards(context);
    }
  }

  drawBackground(context: CanvasRenderingContext2D) {
    context.drawImage(this.background, 0, 0, this.width, this.height);
  }

  drawEverything(context: CanvasRenderingContext2D) {
    this.drawBackground(context);
    this.drawCharacters(context);
    this.drawCardInHand(context);
  }

  dealDamage(toWhom: 'player' | 'enemy', damageSize: number) {
    if (toWhom === 'player') {
      this.player.getDamage(damageSize);
    } else {
      this.enemy.getDamage(damageSize);
    }
  }

  endTurn() {
    if (this.isGameContinue()) {
      if (this.whosTurn === 'player') {
        this.endPlayerTurn();
      } else {
        this.endEnemyTurn();
      }
    }
  }

  endGame(isWin = false) {
    if (this.gameAnimation) {
      window.cancelAnimationFrame(this.gameAnimation);
      this.gameAnimation = undefined;
    }

    this.context.clearRect(0, 0, this.width, this.height);

    this.isGameEnd = true;

    this.changeGameStateFunc();

    new Gameover(this, isWin, 50);
  }

  beginGame() {
    this.isGameEnd = false;

    if (this.gameAnimation) {
      window.cancelAnimationFrame(this.gameAnimation);
      this.gameAnimation = undefined;
      this.changeGameStateFunc();
    }

    this.context.clearRect(0, 0, this.width, this.height);

    this.player = new Player({
      cardInHand: fixCardsInPlayerHand,
      x: 20,
      y: 100,
      width: 120,
      height: 190,
      hitPoints: 1,
      initialActionPoints: 2,
      characterSkin: '/character.png',
      game: this,
    });

    this.enemy = this.createEnemy({
      cardInHand: cardsInEnemyHand,
      x: 860,
      y: 100,
      width: 120,
      height: 190,
      hitPoints: 1,
      initialActionPoints: 2,
      characterSkin: '/enemy.png',
      game: this,
    });

    this.whosTurn = 'player';
    this.gameAnimation = requestAnimationFrame(this.initialDraw.bind(this));
  }

  private initialDraw() {
    if (!this.isGameEnd) {
      this.context.clearRect(0, 0, this.width, this.height);

      this.drawEverything(this.context);

      this.gameAnimation = window.requestAnimationFrame(
        this.initialDraw.bind(this)
      );
    }
  }

  private endPlayerTurn() {
    this.player.refreshCardsInHand();
    this.player.refreshActionPoints();
    this.whosTurn = 'enemy';
    this.enemy.beginTurn();
  }

  private endEnemyTurn() {
    this.enemy.refreshCardsInHand();
    this.enemy.refreshActionPoints();
    this.whosTurn = 'player';
  }
}
