import { VariantProps, cva } from 'class-variance-authority';
import { cn } from './../../lib/utils';

const subTitleVariants = cva('dark:text-[#f1f5f9] text-[#1e293b] font-bold', {
  variants: {
    variant: {
      h2: 'text-3xl tracking-tighter sm:text-5xl ',
      h3: 'text-lg dark:text-[#ffc107] text-red-700',
      custom: '',
    },
  },
  defaultVariants: {
    variant: 'custom',
  },
});

interface SubtitleProps
  extends React.AnchorHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof subTitleVariants> {
  children: React.ReactNode;
  as: 'h2' | 'h3';
}

export default function Subtitle({
  as,
  children,
  className,
  variant,
  ...props
}: SubtitleProps) {
  const Slot = as;
  return (
    <Slot className={cn(subTitleVariants({ variant }), className)} {...props}>
      {children}
    </Slot>
  );
}
