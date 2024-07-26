import { VariantProps, cva } from 'class-variance-authority';
import { Link as LinkCustom, LinkProps } from 'react-router-dom';
import { cn } from './../../lib/utils';

const linkVariants = cva('', {
  variants: {
    variant: {
      withIcon: 'flex items-center justify-center',
      default:
        'text-sm font-medium hover:underline underline-offset-4 text-[#f1f5f9]',
      custom: '',
      acent:
        'inline-flex h-10 items-center justify-center rounded-md bg-[#ffc107] px-8 text-sm font-medium text-[#0c1b2a] shadow transition-colors hover:bg-[#ffdd5c] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      active:
        'text-sm font-medium hover:underline underline-offset-4 text-[#ffc107]',
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
  isActive?: boolean;
}

export default function Link({
  children,
  className,
  variant = 'default',
  isActive = false,
  ...props
}: LinkPropsCustom) {
  const isActiveVariant = isActive ? 'active' : variant;
  return (
    <LinkCustom
      className={cn(linkVariants({ variant: isActiveVariant }), className)}
      {...props}>
      {children}
    </LinkCustom>
  );
}
