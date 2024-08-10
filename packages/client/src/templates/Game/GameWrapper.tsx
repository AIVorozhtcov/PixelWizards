import { useState } from 'react';
import Gameplay from './Gameplay';
import StartGameScreen from '../../components/organisms/StartGameScreen';

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
        <StartGameScreen startGame={changeGameStatus} />
      )}
    </div>
  );
}
