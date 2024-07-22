import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert">
      <p>Что-то пошло не так:</p>
      <pre className="text-red-600">{error.message}</pre>
      <button onClick={resetErrorBoundary}>Попробовать еще раз</button>
    </div>
  );
}
