import { useEffect, useRef, useState } from 'react';
import { Game } from '../../core/Game/Game';
import Button from '../../components/atoms/Button';
import FullscreenToggle from '../../components/molecules/FullscreenToggle';


export default function Gameplay() {
  const [isGameEnd, setIsGameEnd] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        gameRef.current = new Game(canvas.width, canvas.height, ctx, () =>
          setIsGameEnd(prev => !prev)
        );
      }
    }

    return () => {
      gameRef.current?.music.stopAll();
    };
  }, []);

  return (
    <>
      <canvas
        className="m-auto bg-[#4d79bc]"
        ref={canvasRef}
        width={1000}
        height={800}
        onMouseDown={e => gameRef.current?.player.onMouseDown(e)}
        onMouseMove={e => gameRef.current?.player.onMouseMove(e)}
        onMouseUp={() => gameRef.current?.player.onMouseUp()}
      />
      <Button
        onClick={() => {
          if (isGameEnd) {
            gameRef.current?.beginGame();
          } else {
            gameRef.current?.endTurn();
          }
        }}
        className="text-white bg-red-400 w-full h-20">
        {isGameEnd ? 'Начать заново' : 'Закончить ход'}
      </Button>
      <FullscreenToggle className="absolute top-20 left-5 opacity-50 w-20"></FullscreenToggle>

    </>
  );
}
