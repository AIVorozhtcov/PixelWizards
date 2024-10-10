import { FC } from 'react';

type SpanProps = Record<string, unknown> &
  React.HTMLAttributes<HTMLSpanElement>;

const Span: FC<SpanProps> = ({ children, ...props }) => {
  return <span {...props}>{children}</span>;
};

export default Span;
