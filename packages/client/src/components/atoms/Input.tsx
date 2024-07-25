import { forwardRef } from 'react';

type InputProps = Record<string, unknown> &
  React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default Input;
