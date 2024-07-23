import { FC } from 'react';

type LabelPropsType = Record<string, unknown> &
  React.LabelHTMLAttributes<HTMLLabelElement>;

const Label: FC<LabelPropsType> = ({ children, ...props }) => {
  return <label {...props}>{children}</label>;
};

export default Label;
