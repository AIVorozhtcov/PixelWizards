import { VariantProps, cva } from 'class-variance-authority';
import { cn } from './../../lib/utils';

const textVariants = cva('dark:text-[#94a3b8] text-[#738392]', {
  variants: {
    variant: {
      default: 'text-sm',
      description:
        'max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed',
      custom: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface TextPropsCustom
  extends React.AnchorHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  children: React.ReactNode;
}
export default function Text({
  children,
  variant = 'default',
  className,
  ...props
}: TextPropsCustom) {
  return (
    <p className={cn(textVariants({ variant }), className)} {...props}>
      {children}
    </p>
  );
}
