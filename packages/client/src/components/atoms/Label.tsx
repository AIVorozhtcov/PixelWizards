import { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const labelVariants = cva('', {
  variants: {
    variant: {
      default: '',
      basic: 'block text-sm font-medium text-[#ffc107]',
      profile:
        'flex flex-row justify-between gap-2 border-2 rounded-md border-[#2c435c] py-1 pl-2 pr-1 whitespace-nowrap text-white',
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
    <label {...props} className={labelVariants({ variant, className })}>
      {children}
    </label>
  );
};

export default Label;
