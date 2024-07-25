import { VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: '',
      acent:
        'bg-transparent inline-flex items-center justify-center rounded-md border border-red-600 p-2 text-sm font-medium text-white shadow transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
