import * as ReactDOM from 'react-dom/client';
import { App } from './app/app.tsx';
import './index.css';

const rootElement = ReactDOM.createRoot(
  document.getElementById('root')! as HTMLElement
);

if (rootElement) {
  rootElement.render(<App />);
} else {
  throw new Error("Can't find the #root element");
}
