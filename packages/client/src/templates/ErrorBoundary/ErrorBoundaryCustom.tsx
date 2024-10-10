import {
  ErrorBoundary as ErrorBoundaryLib,
  ErrorBoundaryProps,
} from 'react-error-boundary';

export default function ErrorBoundaryCustom(props: ErrorBoundaryProps) {
  return <ErrorBoundaryLib {...props}>{props.children}</ErrorBoundaryLib>;
}
