import ErrorBoundaryCustom from './ErrorBoundaryCustom';
import ErrorFallback from './ErrorFallback';

export default function ErrorBoundaryDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundaryCustom FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundaryCustom>
  );
}
