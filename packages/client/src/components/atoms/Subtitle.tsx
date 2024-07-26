import { VariantProps, cva } from 'class-variance-authority';
import { cn } from './../../lib/utils';

const subTitleVariants = cva('text-[#f1f5f9] font-bold', {
  variants: {
    variant: {
      h2: 'text-3xl tracking-tighter sm:text-5xl ',
      h3: 'text-lg text-[#ffc107]',
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
