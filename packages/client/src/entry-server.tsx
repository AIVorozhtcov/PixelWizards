import ReactDOM from 'react-dom/server';
import '../index.css';
import App from './App';

export const render = () => ReactDOM.renderToString(<App />);
