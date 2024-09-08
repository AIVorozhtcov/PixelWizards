import { useState } from 'react';
import Gameplay from './Gameplay';
import GameMap from './GameMap';
import StartGameScreen from '../../components/organisms/StartGameScreen';

export default function GameWrapper() {
  const [isGameStart, setIsGameStart] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div>
      {isMapOpen ? (
        <GameMap setIsGameStart={setIsGameStart} setIsMapOpen={setIsMapOpen} />
      ) : isGameStart ? (
        <Gameplay />
      ) : (
        <StartGameScreen setIsMapOpen={setIsMapOpen} />
      )}
    </div>
  );
}
