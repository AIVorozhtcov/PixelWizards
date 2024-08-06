import { Game } from '../Game';
import Animation from '../Animation/Animation';
import { ActionType, CardInHand, CharacterInitProps } from './types';

export default abstract class Character {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  initialCardInHand: CardInHand[];
  cardInHand: CardInHand[];
  draggingCard: CardInHand | null = null;
  startX = 0;
  startY = 0;
  initialX = 0;
  initialY = 0;
  initialHitPoints: number;
  hitPoints: number;
  tempResist = 0; //Временный резист - сюда прокидываю блок
  resist = 0; // Постоянный резист - сюда можно будет кидать бафы от шмоток и тд
  initialActionPoints: number; // Фиксированное количество доступных действий
  actionPoints: number; // Количество доступных действий
  characterSkin: HTMLImageElement | null = null;
  animation: Animation;
  isCharacterAlive = true;

  constructor({
    game,
    initialActionPoints,
    characterSkin,
    hitPoints,
    cardInHand,
    width,
    height,
    x,
    y,
  }: CharacterInitProps) {
    this.game = game;

    this.initialActionPoints = initialActionPoints;
    this.actionPoints = this.initialActionPoints;

    this.hitPoints = hitPoints;
    this.initialHitPoints = hitPoints;

    this.cardInHand = cardInHand;
    this.initialCardInHand = cardInHand;

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.setSkinForCharacter(characterSkin);
    this.animation = new Animation(game);
  }

  protected setActionPoints(points: number) {
    this.actionPoints = points;
  }

  protected setDefaultHitPoints(points: number) {
    this.hitPoints = points;
  }

  protected setDefaultCardsInHand(listOfCard: CardInHand[]) {
    this.cardInHand = listOfCard;
  }

  protected setSkinForCharacter(source: string) {
    const image = new Image();
    image.src = source;
    image.onload = () => {
      this.characterSkin = image;
    };
  }

  protected drawHealthBar(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    context.clearRect(x, y, width, height);

    const greenBarWidth = (this.hitPoints / this.initialHitPoints) * width;
    const redWidth = width - greenBarWidth;

    context.fillStyle = 'green';
    context.fillRect(x, y, greenBarWidth, height);

    context.fillStyle = 'red';
    context.fillRect(x + greenBarWidth, y, redWidth, height);

    context.fillStyle = 'black';
    context.textAlign = 'start';
    context.textBaseline = 'alphabetic';
    context.font = '18px Arial';
    context.fillText(String(this.hitPoints), this.x, this.y * 3 + 15);
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.characterSkin) {
      context.drawImage(
        this.characterSkin,
        this.x,
        this.y,
        this.width,
        this.height
      );

      this.drawHealthBar(context, this.x, this.y * 3, this.width, 20);
      this.drawShield(context, this.x, this.y * 3.3, 50, 50);
    }
  }

  drawShield(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    context.beginPath();
    context.moveTo(x + width / 2, y + height);
    context.lineTo(x + width, y + height * 0.6);
    context.lineTo(x + width, y);
    context.lineTo(x, y);
    context.lineTo(x, y + height * 0.6);
    context.closePath();

    context.fillStyle = '#709CCB';
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = '#003366';
    context.stroke();

    const fontSize = 24;
    context.font = `bold ${fontSize}px Arial`;
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const textX = x + width / 2;
    const textY = y + (height * 0.6 + height * 0.4) / 2;

    context.fillText(String(this.resist + this.tempResist), textX, textY);
  }

  addCardInHand(card: CardInHand) {
    this.cardInHand.push(card);
  }

  refreshCardsInHand() {
    this.cardInHand = Array.from(
      new Set(this.cardInHand.concat(this.initialCardInHand))
    );
  }

  getDamage(damage: number) {
    const damageThroughResist = damage - (this.resist + this.tempResist);
    this.hitPoints -= damageThroughResist;

    if (this.hitPoints <= 0) {
      this.isCharacterAlive = false;
    }
  }

  getHeal(heal: number) {
    this.hitPoints = Math.min(this.hitPoints + heal, this.initialHitPoints);
  }

  getBlock(block: number) {
    this.tempResist += block;
  }

  refreshResist() {
    this.resist = 0;
    this.tempResist = 0;
  }

  refreshActionPoints() {
    this.actionPoints = this.initialActionPoints;
  }

  doAction(action: ActionType, playedCard: CardInHand) {
    switch (action) {
      case 'attack':
        this.game.dealDamage('enemy', playedCard.action.points);
        break;
      case 'block':
        this.getBlock(playedCard.action.points);
        break;
      case 'heal':
        this.getHeal(playedCard.action.points);
        break;
      default:
        break;
    }
  }
}
