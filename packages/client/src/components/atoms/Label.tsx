import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const labelVariants = cva('', {
  variants: {
    variant: {
      default: '',
      basic: 'block text-sm font-medium dark:text-[#ffc107] text-[#0c1b2a]',
      profile:
        'flex flex-row justify-between gap-2 border-2 rounded-md dark:border-[#2c435c] border-slate-100 py-1 pl-2 pr-1 whitespace-nowrap dark:text-white text-red-700 dark:hover:bg-[#2c435c] hover:bg-slate-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = ({ variant, className, children, ...props }: LabelProps) => {
  return (
    <label {...props} className={cn(labelVariants({ variant }), className)}>
      {children}
    </label>
  );
};

export default Label;
