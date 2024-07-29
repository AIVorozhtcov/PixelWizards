import { useEffect, useRef } from 'react';
import Button from '../../atoms/Button';
import { applyGlitch, fillAndRenderTextOnCanvas } from './utils';

export default function GameOverScreen() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;

        const text = 'GAME OVER';
        const fontSize = 50;

        const background = new Image();
        background.src = '/endGame.webp';
        background.onload = () => {
          ctx.drawImage(background, 0, 0, width, height);
          fillAndRenderTextOnCanvas({ ctx, text, width, height });
          animate();
        };

        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.lineWidth = 2;

        const animate = () => {
          applyGlitch({
            ctx,
            background,
            fontSize,
            height,
            text,
            width,
          });
          animationFrame.current = requestAnimationFrame(animate);
        };
      }
    }

    return () => {
      if (animationFrame.current) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <canvas className="m-auto" ref={canvasRef} width={1000} height={800} />
      <Button
        onClick={() => {
          alert('Переход на начало игры');
        }}
        variant="acent"
        className="bg-red-600 absolute bottom-[32%] left-1/2 transform -translate-x-1/2">
        Начать заново
      </Button>
      <Button
        onClick={() => {
          alert('Переход в главное меню');
        }}
        variant="acent"
        className="bg-red-600 absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
        В главное меню
      </Button>
    </div>
  );
}
