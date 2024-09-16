type ActionType = 'attack' | 'block' | 'heal';

export interface CardInHand {
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

export const fixCardsInPlayerHand: CardInHand[] = [
  {
    name: '/attack.png',
    x: 270,
    y: 600,
    width: 150,
    height: 200,
    action: {
      type: 'attack',
      points: 3,
    },
    actionValue: 1,
  },
  {
    name: '/block.png',
    x: 430,
    y: 600,
    width: 150,
    height: 200,
    action: {
      type: 'block',
      points: 1,
    },
    actionValue: 1,
  },
  {
    name: '/superAttack.png',
    x: 590,
    y: 600,
    width: 150,
    height: 200,
    action: {
      type: 'attack',
      points: 5,
    },
    actionValue: 2,
  },
];

export const optionalHealCardInHand: CardInHand = {
  name: '/heal.png',
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
