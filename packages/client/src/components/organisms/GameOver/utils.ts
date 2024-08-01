export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const fillAndRenderTextOnCanvas = ({
  ctx,
  text,
  width,
  height,
}: Omit<GlitchProps, 'fontSize' | 'background'>) => {
  ctx.fillStyle = getRandomColor();
  ctx.fillText(text, width / 2, height / 2);
};

interface GlitchProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  fontSize: number;
  text: string;
  background: HTMLImageElement;
}

export const applyGlitch = ({
  ctx,
  height,
  fontSize,
  width,
  text,
  background,
}: GlitchProps) => {
  ctx.clearRect(0, height / 2 - fontSize, width, fontSize * 1.2);
  ctx.drawImage(background, 0, 0, width, height);
  fillAndRenderTextOnCanvas({ ctx, text, width, height });

  for (let i = 0; i < 10; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * fontSize * 1.2);
    const spliceWidth = width - x;
    const spliceHeight = Math.floor(Math.random() * 10 + 1);
    ctx.putImageData(
      ctx.getImageData(x, height / 2 - fontSize + y, spliceWidth, spliceHeight),
      x + Math.floor(Math.random() * 20 - 10),
      height / 2 - fontSize + y
    );
  }
};
