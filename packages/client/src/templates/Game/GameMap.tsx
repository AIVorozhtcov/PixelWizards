import { useRef, useEffect } from 'react';
import { Map } from '../../core/Game/Map/Map';

export default function GameMap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (ctx) {
        new Map(ctx);
      }
    }
  }, []);

  return (
    <canvas className="m-auto" ref={canvasRef} width={1000} height={800} />
  );
}
