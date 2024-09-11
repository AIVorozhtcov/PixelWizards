import AudioPlayer from './Audio/Audio';
import { CharacterInitProps } from './Character/types';
import { cardsInEnemyHand } from './Enemy/cardsInEnemyHand';
import { Enemy } from './Enemy/Enemy';
import Gameover from './Gameover/Gameover';
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
  music = new AudioPlayer();

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

  private createEnemy(props: CharacterInitProps) {
    return new Enemy(props);
  }

  private createHero(props: CharacterInitProps) {
    return new Player(props);
  }

  private isGameContinue() {
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

  private drawCharacters(context: CanvasRenderingContext2D) {
    if (!this.isGameEnd) {
      this.player.draw(context);
      this.enemy.draw(context);
    }
  }

  private drawCardInHand(context: CanvasRenderingContext2D) {
    if (!this.isGameEnd) {
      this.player.displayAvailableCards(context);
    }
  }

  private drawBackground(context: CanvasRenderingContext2D) {
    context.drawImage(this.background, 0, 0, this.width, this.height);
  }

  private drawAmountOfActionPoints(context: CanvasRenderingContext2D) {
    const angle = Math.PI / 3;
    const hexRadius = 50;
    const padding = 20;
    const centerX = padding + hexRadius;
    const centerY = this.height - padding - hexRadius;
    const fontSize = 24;

    context.fillStyle = '#709CCB';
    context.strokeStyle = '#000';
    context.lineWidth = 2;
    context.beginPath();
    for (let i = 0; i < 6; i++) {
      context.lineTo(
        centerX + hexRadius * Math.cos(angle * i),
        centerY + hexRadius * Math.sin(angle * i)
      );
    }
    context.closePath();
    context.stroke();
    context.fill();

    context.font = `bold ${fontSize}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = 'white';
    context.fillText(String(this.player.actionPoints), centerX, centerY);
  }

  private drawEverything(context: CanvasRenderingContext2D) {
    this.drawBackground(context);
    this.drawCharacters(context);
    this.drawCardInHand(context);
    this.drawAmountOfActionPoints(context);
  }

  dealDamage(toWhom: 'player' | 'enemy', damageSize: number) {
    if (toWhom === 'player') {
      this.player.effects.getDamage(damageSize);
    } else {
      this.enemy.effects.getDamage(damageSize);
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

  private endGame(isWin = false) {
    if (this.gameAnimation) {
      window.cancelAnimationFrame(this.gameAnimation);
      this.gameAnimation = undefined;
    }

    this.context.clearRect(0, 0, this.width, this.height);

    this.music.stopBackgroundSong();
    this.music.playEndGameSong();

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

    this.music.stopEndGameSong();
    this.music.playBackgroundSong();

    this.player = this.createHero({
      cardInHand: fixCardsInPlayerHand,
      x: 20,
      y: 100,
      width: 120,
      height: 190,
      hitPoints: 10,
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
      hitPoints: 10,
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
    this.whosTurn = 'enemy';
    this.enemy.beginTurn();
  }

  private endEnemyTurn() {
    this.enemy.cards.refreshCardsInHand();
    this.enemy.effects.refreshActionPoints();
    this.player.effects.refreshResist();
    this.whosTurn = 'player';
  }
}
