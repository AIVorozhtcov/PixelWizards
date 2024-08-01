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
    name: 'Блок',
    x: 450,
    y: 600,
    width: 120,
    height: 190,
    action: {
      type: 'block',
      points: 1,
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
