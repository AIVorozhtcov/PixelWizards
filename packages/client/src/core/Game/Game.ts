import AudioPlayer from './Audio/Audio';
import { CharacterInitProps } from './Character/types';
import { cardsInEnemyHand } from './Enemy/cardsInEnemyHand';
import { Enemy } from './Enemy/Enemy';
import Gameover from './Gameover/Gameover';
import { Map as GameMap } from './Map/Map';
import { NodeKeyofType, NodeType } from './Map/types';
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
  setIsGameEnd: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMapOpen: React.Dispatch<React.SetStateAction<boolean>>;
  background = new Image();
  music = new AudioPlayer();
  map: GameMap;
  currentGameStage: 'battle' | 'map' = 'map';

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

  createEnemy(props: CharacterInitProps) {
    return new Enemy(props);
  }

  isGameContinue() {
    if (this.player.state.hitPoints <= 0) {
      this.endGame();
      //При проигрыше сбрасываем прогресс на начало карты
      this.map = new GameMap(
        this.context,
        this.beginAndDrawGame.bind(this),
        this.setIsMapOpen,
        this.width,
        this.height
      );
      return false;
    } else if (this.enemy.state.hitPoints <= 0) {
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
      this.player.displayAvailableCards(context);
    }
  }

  drawBackground(context: CanvasRenderingContext2D) {
    context.drawImage(this.background, 0, 0, this.width, this.height);
  }

  drawAmountOfActionPoints(context: CanvasRenderingContext2D) {
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
    context.fillText(String(this.player.state.actionPoints), centerX, centerY);
  }

  drawEverything(context: CanvasRenderingContext2D) {
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

  endGame(isWin = false) {
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

    if (nodeType === 'boss') {
      enemySkin = '/boss.png';
      enemyHitPoints = 13;
      enemyWidth = 260;
      enemyX = 720;
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

    this.player = new Player({
      cardInHand: fixCardsInPlayerHand,
      x: 20,
      y: 100,
      width: 140,
      height: 190,
      hitPoints: 10,
      initialActionPoints: 2,
      characterSkin: '/character.png',
      game: this,
    });

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
    this.enemy.refreshCardsInHand();
    this.enemy.effects.refreshActionPoints();
    this.player.effects.refreshResist();
    this.whosTurn = 'player';
  }
}
