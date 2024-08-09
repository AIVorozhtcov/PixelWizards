import Animation from '../Animation/Animation';
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
  readonly initialCardInHand: CardInHand[];
  cardInHand: CardInHand[];
  draggingCard: CardInHand | null = null;
  startX = 0;
  startY = 0;
  initialX = 0;
  initialY = 0;
  state: CharacterState;
  characterSkin: HTMLImageElement | null = null;
  animation: Animation;
  effects: Effect;
  charInfo: CharacterInfo;
  isLoaded = false;

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

    this.state = {
      resist: 0,
      tempResist: 0,
      hitPoints: hitPoints,
      initialHitPoints: hitPoints,
      isCharacterAlive: true,
      actionPoints: initialActionPoints,
      initialActionPoints,
    };

    this.effects = new Effect(this.state);
    this.charInfo = new CharacterInfo(this.state);

    this.cardInHand = cardInHand;
    this.initialCardInHand = cardInHand;

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.setSkinForCharacter(characterSkin);
    this.animation = new Animation(game, this);
  }

  protected setActionPoints(points: number) {
    this.state.actionPoints = points;
  }

  protected setDefaultHitPoints(points: number) {
    this.state.hitPoints = points;
  }

  protected setDefaultCardsInHand(listOfCard: CardInHand[]) {
    this.cardInHand = listOfCard;
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

  addCardInHand(card: CardInHand) {
    this.cardInHand.push(card);
  }

  refreshCardsInHand() {
    this.cardInHand = Array.from(
      new Set(this.cardInHand.concat(this.initialCardInHand))
    );
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
