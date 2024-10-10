import { useState } from 'react';
import Button from '../atoms/Button';

export default function FullscreenToggle({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <Button onClick={toggleFullScreen} className={className} {...props}>
      <img
        src={isFullscreen ? '/exitFullscreen.webp' : '/enterFullscreen.webp'}
        alt="Fullscreen Toggle"
      />
    </Button>
  );
}
