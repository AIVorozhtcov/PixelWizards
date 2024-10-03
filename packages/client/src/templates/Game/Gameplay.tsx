import { useEffect, useRef, useState } from 'react';
import Button from '../../components/atoms/Button';
import FullscreenToggle from '../../components/molecules/FullscreenToggle';

import { Game } from '../../core/Game/Game';

export default function Gameplay() {
  const [isGameEnd, setIsGameEnd] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<Game | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        const game = new Game(
          canvas.width,
          canvas.height,
          ctx,
          setIsGameEnd,
          setIsMapOpen
        );
        gameRef.current = game;
        gameRef.current?.showMap();
        setIsMapOpen(true);
      }
    }

    return () => {
      gameRef.current?.music.stopAll();
    };
  }, []);

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto h-full items-center">
      <canvas
        className="m-auto"
        ref={canvasRef}
        width={1000}
        height={600}
        onMouseDown={e => {
          if (gameRef.current?.currentGameStage === 'battle') {
            gameRef.current?.player?.onMouseDown(e);
          }
        }}
        onMouseMove={e => {
          if (gameRef.current?.currentGameStage === 'battle') {
            gameRef.current?.player?.onMouseMove(e);
          } else {
            gameRef.current?.map?.nodes.map(node => node.onMouseMove(e));
          }
        }}
        onMouseUp={() => {
          if (gameRef.current?.currentGameStage === 'battle') {
            gameRef.current?.player?.onMouseUp();
          }
        }}
        onClick={e => {
          if (gameRef.current?.currentGameStage === 'map') {
            gameRef.current?.map?.nodes.map(node => node.onClick(e));
          }
        }}
      />
      {!isMapOpen && (
        <Button
          onClick={() => {
            if (isGameEnd) {
              setIsMapOpen(true);
              setIsGameEnd(false);
              gameRef.current?.showMap();
            } else {
              gameRef.current?.endTurn();
            }
          }}
          className="text-white hover:bg-[#b05656] bg-red-400 w-full h-20 mx-auto">
          {isGameEnd ? gameRef.current?.gameStatusText : 'Закончить ход'}
        </Button>
      )}
      <FullscreenToggle className="absolute top-5 left-3 opacity-50 w-10 dark:bg-opacity-0 bg-red-700"></FullscreenToggle>
    </div>
  );
}
