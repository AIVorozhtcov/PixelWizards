import { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const inputVariants = cva('', {
  variants: {
    variant: {
      default: '',
      basic:
        'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
      profile:
        'w-full text-end pl-2 pr-1 dark:text-[#ffc107] text-[#0c1b2a] bg-transparent focus:outline-none transition-colors',
      typeFile:
        ' block w-full text-sm dark:text-[#ffc107] text-red-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold dark:file:bg-white file:bg-slate-200 file:text-[#152f48] dark:hover:file:bg-gray-300 hover:file:bg-slate-300 file:hover:cursor-pointer',
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
        className={cn(inputVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

export default Input;
