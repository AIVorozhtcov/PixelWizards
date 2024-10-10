import { cn } from '../../lib/utils';
import TransitionLayer from '../../templates/TransitionLayer/TransitionLayer';

function MainSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TransitionLayer>
      <main
        className={cn(
          'flex flex-col min-h-dvh dark:bg-[#0c1b2a] bg-white py-5 relative w-full',
          className
        )}>
        {children}
      </main>
    </TransitionLayer>
  );
}

export default MainSection;
