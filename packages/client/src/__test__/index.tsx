import ErrorBoundaryDefault from '../common/ErrorBoundary';
import TestComponent from './components/TestComponent';

export default function Test() {
  return (
    <div className="flex flex-col gap-10">
      Testing components
      <ErrorBoundaryDefault>
        <TestComponent withError />
      </ErrorBoundaryDefault>
      <ErrorBoundaryDefault>
        <TestComponent />
      </ErrorBoundaryDefault>
      <ErrorBoundaryDefault>
        <TestComponent withFetchError />
      </ErrorBoundaryDefault>
    </div>
  );
}
