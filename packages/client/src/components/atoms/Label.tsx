import { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const labelVariants = cva('', {
  variants: {
    variant: {
      default: '',
      basic: 'block text-sm font-medium text-[#ffc107]',
      profile:
        'flex flex-row justify-between gap-2 border-2 rounded-md border-[#2c435c] py-1 pl-2 pr-1 whitespace-nowrap text-white hover:bg-[#2c435c]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label: FC<LabelProps> = ({ variant, className, children, ...props }) => {
  return (
    <label {...props} className={cn(labelVariants({ variant }), className)}>
      {children}
    </label>
  );
};

export default Label;
