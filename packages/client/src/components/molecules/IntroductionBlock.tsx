import { cn } from '../../lib/utils';
import Subtitle from '../atoms/Subtitle';
import Text from '../atoms/Text';

interface IntroductionBlockProps {
  title?: string;
  subtitle: string;
  text: string;
  className?: string;
}

export default function IntroductionBlock({
  className,
  title,
  subtitle,
  text,
}: IntroductionBlockProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-4 text-center',
        className
      )}>
      <div className="space-y-2">
        {title && (
          <div className="inline-block rounded-lg dark:bg-[#1e293b] bg-[#fcdfdf] px-3 py-1 text-sm dark:text-[#ffc107] text-red-700">
            {title}
          </div>
        )}
        <Subtitle as="h2" variant="h2">
          {subtitle}
        </Subtitle>
        <Text variant="description">{text}</Text>
      </div>
    </div>
  );
}
