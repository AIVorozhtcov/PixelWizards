import { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva('', {
  variants: {
    variant: {
      default: '',
      basic:
        'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
      profile:
        'w-full text-end pl-2 pr-1 rounded-sm text-[#ffc107] bg-transparent hover:bg-[#2f4154] focus:outline-none transition-colors',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={inputVariants({ variant, className })}
        {...props}
      />
    );
  }
);

export default Input;
