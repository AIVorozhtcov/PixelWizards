import { useEffect, useRef } from 'react';
import { Game } from '../../Game';

export default function Gameplay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        gameRef.current = new Game(canvas.width, canvas.height);

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (gameRef.current) {
            gameRef.current.drawCharacters(ctx);
            gameRef.current.drawCardInHand(ctx);
            gameRef.current.update();
          }
          requestAnimationFrame(animate);
        };

        animate();
      }
    }
  }, []);

  return (
    <canvas
      className="m-auto bg-[#4d79bc]"
      ref={canvasRef}
      width={1000}
      height={800}
    />
  );
}
