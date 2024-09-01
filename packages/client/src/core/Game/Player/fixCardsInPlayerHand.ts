import { OmitedCardInHand } from '../Character/types';

export const fixCardsInPlayerHand: OmitedCardInHand[] = [
  {
    name: 'Атака',
    src: '/attack.png',
    action: {
      type: 'attack',
      points: 3,
    },
    actionValue: 1,
  },
  {
    name: 'Блок',
    src: '/block.png',
    action: {
      type: 'block',
      points: 1,
    },
    actionValue: 1,
  },
  {
    name: 'Супер-атака',
    src: '/attack.png',
    action: {
      type: 'attack',
      points: 5,
    },
    actionValue: 2,
  },
];
