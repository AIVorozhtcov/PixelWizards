import AudioPlayer from './Audio/Audio';
import { CharacterInitProps } from './Character/types';
import { cardsInEnemyHand } from './Enemy/cardsInEnemyHand';
import { Enemy } from './Enemy/Enemy';
import Gameover from './Gameover/Gameover';
import { Map as GameMap } from './Map/Map';
import { NodeKeyofType } from './Map/types';
import {
  fixCardsInPlayerHand,
  optionalHealCardInHand,
} from './Player/fixCardsInPlayerHand';
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
  setIsGameEnd: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMapOpen: React.Dispatch<React.SetStateAction<boolean>>;
  background = new Image();
  music = new AudioPlayer();
  map: GameMap;
  currentGameStage: 'battle' | 'map' = 'map';
  gameStatusText: 'Выбрать следующий этап' | 'Начать заново' =
    'Выбрать следующий этап';
  enemyType: 'enemy' | 'boss' = 'enemy';

  constructor(
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    setIsGameEnd: React.Dispatch<React.SetStateAction<boolean>>,
    setIsMapOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.width = width;
    this.height = height;
    this.setIsGameEnd = setIsGameEnd;
    this.setIsMapOpen = setIsMapOpen;
    this.context = ctx;
    this.map = new GameMap(
      this.context,
      this.beginAndDrawGame.bind(this),
      this.setIsMapOpen,
      this.width,
      this.height
    );
    this.background.src = '/backgroundGame.webp';
  }

  showMap() {
    if (this.gameAnimation) {
      window.cancelAnimationFrame(this.gameAnimation);
      this.gameAnimation = undefined;
    }
    this.currentGameStage = 'map';

    this.context.clearRect(0, 0, this.width, this.height);

    this.map.drawMap();
  }

  private createEnemy(props: CharacterInitProps) {
    return new Enemy(props);
  }

  private isGameContinue() {
    const isBossLosed = this.enemyType === 'boss' && this.enemy.hitPoints <= 0;
    const isEnemyLosed =
      this.enemyType === 'enemy' && this.enemy.hitPoints <= 0;

    if (this.player.hitPoints <= 0) {
      this.gameStatusText = 'Начать заново';
      this.endGame();
      this.createPlayer(false);

      this.map = new GameMap(
        this.context,
        this.beginAndDrawGame.bind(this),
        this.setIsMapOpen,
        this.width,
        this.height
      );

      return false;
    } else if (isBossLosed) {
      this.createPlayer(false);
      this.endGame(true);

      this.map = new GameMap(
        this.context,
        this.beginAndDrawGame.bind(this),
        this.setIsMapOpen,
        this.width,
        this.height
      );
    } else if (isEnemyLosed) {
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

    this.setIsGameEnd(true);

    new Gameover(this, isWin, 50);
  }

  createEnemyByNodeType(nodeType: NodeKeyofType) {
    let enemySkin = '/enemy.png';
    let enemyHitPoints = 10;
    let enemyWidth = 180;
    let enemyX = 800;

    this.enemyType = 'enemy';
    this.gameStatusText = 'Выбрать следующий этап';

    if (nodeType === 'boss') {
      enemySkin = '/boss.png';
      enemyHitPoints = 13;
      enemyWidth = 260;
      enemyX = 720;

      this.enemyType = 'boss';
      this.gameStatusText = 'Начать заново';
    }

    this.enemy = this.createEnemy({
      cardInHand: cardsInEnemyHand,
      x: enemyX,
      y: 100,
      width: enemyWidth,
      height: 210,
      hitPoints: enemyHitPoints,
      initialActionPoints: 2,
      characterSkin: enemySkin,
      game: this,
    });
  }

  createPlayer(isCardInHandDefault = true) {
    const mapHeal = this.map.mapHeal;
    const numOptionCard = this.map.numOptionCard;
    const cardInHand = [...fixCardsInPlayerHand];
    let playerHitPoints = 10;

    if (mapHeal !== 0) {
      playerHitPoints += mapHeal;
    }

    if (numOptionCard !== 0 && isCardInHandDefault) {
      for (let i = 0; i < numOptionCard; i++) {
        cardInHand.push(optionalHealCardInHand);
      }
      this.map.numOptionCard--;
    }

    this.player = new Player({
      cardInHand,
      x: 20,
      y: 100,
      width: 140,
      height: 190,
      hitPoints: playerHitPoints,
      initialActionPoints: 2,
      characterSkin: '/character.png',
      game: this,
    });
  }

  beginGame(nodeType: NodeKeyofType) {
    this.isGameEnd = false;
    this.currentGameStage = 'battle';

    if (this.gameAnimation) {
      window.cancelAnimationFrame(this.gameAnimation);
      this.gameAnimation = undefined;
      this.setIsGameEnd(false);
    }

    this.context.clearRect(0, 0, this.width, this.height);

    this.music.stopEndGameSong();
    this.music.playBackgroundSong();

    this.createPlayer();
    this.createEnemyByNodeType(nodeType);

    this.whosTurn = 'player';
    this.gameAnimation = requestAnimationFrame(this.initialDraw.bind(this));
  }

  beginAndDrawGame(nodeType: NodeKeyofType = 'battle') {
    this.beginGame(nodeType);
    this.draw(this.context);
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
