const Span = ({
  children,
  ...props
}: Record<string, unknown> & React.HTMLAttributes<HTMLSpanElement>) => {
  return <span {...props}>{children}</span>;
};

export default Span;
