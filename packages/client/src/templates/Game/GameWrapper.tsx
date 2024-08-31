import { useState } from 'react';
import Gameplay from './Gameplay';
import GameMap from './GameMap';
// import StartGameScreen from '../../components/organisms/StartGameScreen';

export default function GameWrapper() {
  const [isGameStart, setIsGameStart] = useState(false);

  const changeGameStatus = () => {
    setIsGameStart(prev => !prev);
  };

  return (
    <div>
      {isGameStart ? (
        <Gameplay />
      ) : (
        <GameMap />
        //<StartGameScreen startGame={changeGameStatus} />
      )}
    </div>
  );
}
