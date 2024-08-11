import Button from '../atoms/Button';
import fullscreenToggle from '../../../public/fullscreenToggle.webp';

export default function FullscreenToggle({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <Button onClick={toggleFullScreen} className={className} {...props}>
      <img
        className="fill-white"
        src={fullscreenToggle}
        alt="Fullscreen Toggle"
      />
    </Button>
  );
}
