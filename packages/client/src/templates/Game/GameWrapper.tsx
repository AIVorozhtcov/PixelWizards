import { useState } from 'react';
import Gameplay from './Gameplay';
import StartGameScreen from '../../components/organisms/StartGameScreen';

export default function GameWrapper() {
  const [isGameStart, setIsGameStart] = useState(false);

  return (
    <div>
      {isGameStart ? (
        <Gameplay />
      ) : (
        <StartGameScreen setIsMapOpen={setIsGameStart} />
      )}
    </div>
  );
}
