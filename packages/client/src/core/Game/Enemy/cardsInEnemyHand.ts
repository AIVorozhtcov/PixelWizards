import { CardInHand } from '../Player/fixCardsInPlayerHand';

export const cardsInEnemyHand: CardInHand[] = [
  {
    name: 'Атака',
    x: 300,
    y: 600,
    width: 120,
    height: 190,
    action: {
      type: 'attack',
      points: 3,
    },
    actionValue: 1,
  },
  {
    name: 'Супер-атака',
    x: 600,
    y: 600,
    width: 120,
    height: 190,
    action: {
      type: 'attack',
      points: 5,
    },
    actionValue: 2,
  },
];
