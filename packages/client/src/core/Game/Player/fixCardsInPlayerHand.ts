import { CardInHand, OmitedCardInHand } from '../Character/types';

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

export const optionalHealCardInHand: CardInHand = {
  name: '',
  src: '/heal.png',
  x: 750,
  y: 600,
  width: 150,
  height: 200,
  action: {
    type: 'heal',
    points: 2,
  },
  actionValue: 1,
};
