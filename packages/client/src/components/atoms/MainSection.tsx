import { cn } from '../../lib/utils';

function MainSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        'flex flex-col min-h-dvh dark:bg-[#0c1b2a] bg-white py-5 relative w-full',
        className
      )}>
      {children}
    </main>
  );
}

export default MainSection;
