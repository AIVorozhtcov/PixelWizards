import Button from '../atoms/Button';
import fullscreenToggle from '../../../public/fullscreenToggle.webp';

export default function FullscreenToggle() {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <Button variant="contained" onClick={toggleFullScreen}>
      <img src={fullscreenToggle} alt="Fullscreen Toggle" />
    </Button>
  );
}
