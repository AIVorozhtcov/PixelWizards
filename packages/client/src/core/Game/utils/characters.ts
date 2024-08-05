import { cardsInEnemyHand } from '../Enemy/cardsInEnemyHand';
import { fixCardsInPlayerHand } from '../Player/fixCardsInPlayerHand';

export const playerObj = {
  cardInHand: fixCardsInPlayerHand,
  x: 20,
  y: 100,
  width: 120,
  height: 190,
  hitPoints: 100,
  initialActionPoints: 2,
  characterSkin: '/character.png',
};

export const enemyObj = {
  cardInHand: cardsInEnemyHand,
  x: 860,
  y: 100,
  width: 120,
  height: 190,
  hitPoints: 1,
  initialActionPoints: 2,
  characterSkin: '/enemy.png',
};
