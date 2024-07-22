import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Link as LinkCustom, LinkProps } from 'react-router-dom';

const linkVariants = cva('', {
  variants: {
    variant: {
      withIcon: 'flex items-center justify-center',
      default:
        'text-sm font-medium hover:underline underline-offset-4 text-[#f1f5f9]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface LinkPropsCustom
  extends LinkProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  children: React.ReactNode;
}

export default function Link({
  children,
  className,
  variant = 'default',
  ...props
}: LinkPropsCustom) {
  return (
    <LinkCustom className={cn(linkVariants({ variant }))} {...props}>
      {children}
    </LinkCustom>
  );
}
