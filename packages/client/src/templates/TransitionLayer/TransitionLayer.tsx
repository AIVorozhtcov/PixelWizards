import { gsap, Power3, Power4 } from 'gsap';
import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider/ThemeProvider';

function TransitionLayer({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const screen = useRef<HTMLDivElement | null>(null);
  const body = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(screen.current, {
      duration: 0.4,
      css: {
        width: '100%',
        left: '0%',
      },
      ease: Power3.easeInOut,
      onStart: () => {
        gsap.to('body', {
          background: theme === 'dark' ? '#0c1b2a' : 'white',
        });
      },
    });
    tl.to(screen.current, {
      duration: 0.6,
      css: {
        left: '100%',
      },
      ease: Power3.easeInOut,
      delay: 0.3,
    });
    tl.set(screen.current, {
      left: '-100%',
    });
    gsap
      .to(body.current, {
        duration: 0.3,
        css: {
          opacity: '1',
          pointerEvents: 'auto',
        },
        ease: Power4.easeInOut,
      })
      .delay(0.3);
    return () => {
      gsap.to(body.current, {
        duration: 1,
        css: {
          opacity: '0',
          pointerEvents: 'none',
        },
      });
    };
  }, []);

  return (
    <>
      <div className="load-container">
        <div className="load-screen" ref={screen}></div>
      </div>
      <div data-barba="container">
        <div ref={body} className="Headd">
          {children}
        </div>
      </div>
    </>
  );
}

export default TransitionLayer;
