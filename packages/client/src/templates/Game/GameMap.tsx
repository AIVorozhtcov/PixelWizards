import { useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { Map } from '../../core/Game/Map/Map';
import { gameController } from '../../core/Game/GameController';

type GameMapProps = {
  setIsGameStart: Dispatch<SetStateAction<boolean>>;
  setIsMapOpen: Dispatch<SetStateAction<boolean>>;
};

export default function GameMap({
  setIsGameStart,
  setIsMapOpen,
}: GameMapProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        const map = new Map(ctx, setIsGameStart, setIsMapOpen);
        mapRef.current = map;

        gameController.setMap(map);
      }
    }
  }, []);

  return (
    <canvas
      className="m-auto"
      ref={canvasRef}
      width={1000}
      height={800}
      onMouseMove={e => mapRef.current?.nodes.map(node => node.onMouseMove(e))}
      onClick={e => mapRef.current?.nodes.map(node => node.onClick(e))}
    />
  );
}
