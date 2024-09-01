import Animation from '../Animation/Animation';
import Cards from '../Cards/Cards';
import Effect from '../Effect/Effect';
import { Game } from '../Game';
import CharacterInfo from './CharacterInfo';
import { ActionType, CardInHand, CharacterInitProps } from './types';

export interface CharacterState {
  resist: number;
  tempResist: number;
  hitPoints: number;
  readonly initialHitPoints: number;
  isCharacterAlive: boolean;
  readonly initialActionPoints: number;
  actionPoints: number;
}

export default abstract class Character {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  draggingCard: CardInHand | null = null;
  startX = 0;
  startY = 0;
  initialX = 0;
  initialY = 0;
  resist: number;
  tempResist: number;
  hitPoints: number;
  readonly initialHitPoints: number;
  isCharacterAlive: boolean;
  readonly initialActionPoints: number;
  actionPoints: number;
  characterSkin: HTMLImageElement | null = null;
  animation: Animation;
  effects: Effect;
  charInfo: CharacterInfo;
  isLoaded = false;
  cards: Cards;

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

    this.resist = 0;
    this.tempResist = 0;
    this.hitPoints = hitPoints;
    this.initialHitPoints = hitPoints;
    this.isCharacterAlive = true;
    this.actionPoints = initialActionPoints;
    this.initialActionPoints = initialActionPoints;

    this.effects = new Effect(this);
    this.charInfo = new CharacterInfo(this);
    this.cards = new Cards(this.game, cardInHand);

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.setSkinForCharacter(characterSkin);
    this.animation = new Animation(game, this);
  }

  protected setActionPoints(points: number) {
    this.actionPoints = points;
  }

  protected setDefaultHitPoints(points: number) {
    this.hitPoints = points;
  }

  protected setSkinForCharacter(source: string) {
    const image = new Image();
    image.src = source;
    image.onload = () => {
      this.characterSkin = image;

      this.isLoaded = true;
    };
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

      this.charInfo.drawHealthBar(context, this.x, this.y * 3, this.width, 20);
      this.charInfo.drawShield(context, this.x, this.y * 3.3, 50, 50);
    }
  }

  doAction(action: ActionType, playedCard: CardInHand) {
    switch (action) {
      case 'attack':
        this.game.dealDamage('enemy', playedCard.action.points);
        break;
      case 'block':
        this.effects.getBlock(playedCard.action.points);
        break;
      case 'heal':
        this.effects.getHeal(playedCard.action.points);
        break;
      default:
        break;
    }
  }
}
