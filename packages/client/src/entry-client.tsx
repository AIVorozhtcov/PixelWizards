import ReactDOM from 'react-dom/client';
import '../index.css';
import App from './App';
import startServiceWorker from './startServiceWorker';

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />);

startServiceWorker();
