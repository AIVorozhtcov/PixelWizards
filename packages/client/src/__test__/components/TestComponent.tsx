import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

export default function TestComponent({
  withError = false,
  withFetchError = false,
}) {
  if (withError) throw new Error('Cannot display Component');

  const [data, setData] = useState([] as any[]);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = withFetchError
          ? await fetch(
              'https://jsonplace12412sadasholder.typicode.com/todos?_limit=5'
            )
          : await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');

        const data = await response.json();

        setData(data);
      } catch (error) {
        showBoundary(error);
        throw new Error('Fetch error');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      Component works fine
      {data.map(item => (
        <p className="text-blue-500">{item.title}</p>
      ))}
    </div>
  );
}
