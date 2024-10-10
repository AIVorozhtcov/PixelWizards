import { Game } from '../Game';

export interface CharacterInitProps {
  game: Game;
  initialActionPoints: number;
  characterSkin: string;
  hitPoints: number;
  cardInHand: OmitedCardInHand[];
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface ParticlesType {
  x: number;
  y: number;
  size: number;
  alpha: number;
  velocityX: number;
  velocityY: number;
}

export type ActionType = 'attack' | 'block' | 'heal';

export interface CardInHand {
  src: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  action: {
    type: ActionType;
    points: number;
  };
  actionValue: number;
}

export type OmitedCardInHand = Omit<CardInHand, 'x' | 'y' | 'width' | 'height'>;
