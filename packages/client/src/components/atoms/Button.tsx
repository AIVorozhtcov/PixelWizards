import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: '',
      acent:
        'bg-transparent inline-flex items-center justify-center rounded-md border border-red-600 p-2 text-sm font-medium dark:text-white text-[#0c1b2a] shadow transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      acentNotTransparent:
        'inline-flex items-center justify-center rounded-md border border-red-600 p-2 text-sm font-medium text-white shadow transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      yellow:
        'block dark:bg-[#ffc107] bg-red-700 rounded-md p-1 hover:cursor-pointer dark:hover:bg-[#ae8305] hover:bg-[#7d2626] dark:text-[#0c1b2a] text-white transition-colors',
      red: 'block bg-red-600 text-white rounded-md p-2 hover:cursor-pointer hover:bg-red-800 hover:text-gray-300 transition-colors',
      contained:
        'inline-flex h-10 items-center justify-center rounded-md bg-[#ffc107] px-8 text-sm font-medium text-[#0c1b2a] shadow transition-colors hover:bg-[#ffdd5c] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type ButtonVariants = typeof buttonVariants;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<ButtonVariants> {
  children: React.ReactNode;
}

const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
