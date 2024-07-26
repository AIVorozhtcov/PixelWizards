import { useEffect, useRef } from 'react';
import Bg from '../../public/endGame.webp';
import Button from '../components/atoms/Button';

export default function GameOverScreen() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

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
        background.src = Bg;
        background.onload = () => {
          ctx.drawImage(background, 0, 0, width, height);
          renderText();
          animate();
        };

        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.lineWidth = 2;

        const getRandomColor = () => {
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        };

        const renderText = () => {
          ctx.fillStyle = getRandomColor();
          ctx.fillText(text, width / 2, height / 2);
        };

        const applyGlitch = () => {
          ctx.clearRect(0, height / 2 - fontSize, width, fontSize * 1.2);
          ctx.drawImage(background, 0, 0, width, height);
          renderText();

          for (let i = 0; i < 10; i++) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * fontSize * 1.2);
            const spliceWidth = width - x;
            const spliceHeight = Math.floor(Math.random() * 10 + 1);
            ctx.putImageData(
              ctx.getImageData(
                x,
                height / 2 - fontSize + y,
                spliceWidth,
                spliceHeight
              ),
              x + Math.floor(Math.random() * 20 - 10),
              height / 2 - fontSize + y
            );
          }
        };

        const animate = () => {
          animationTimeout.current = setTimeout(() => {
            applyGlitch();
            requestAnimationFrame(animate);
          }, 1000 / 30);
        };
      }
    }

    return () => {
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={800} height={600} />
      <Button variant="acent" className="bg-red-600">
        Начать заново
      </Button>
      <Button variant="acent" className="bg-red-600">
        В главное меню
      </Button>
    </div>
  );
}
