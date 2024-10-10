import { OmitedCardInHand } from '../Character/types';

export const cardsInEnemyHand: OmitedCardInHand[] = [
  {
    name: 'Атака',
    src: '',
    action: {
      type: 'attack',
      points: 3,
    },
    actionValue: 1,
  },
  {
    name: 'Супер-атака',
    src: '',
    action: {
      type: 'attack',
      points: 5,
    },
    actionValue: 2,
  },
];
