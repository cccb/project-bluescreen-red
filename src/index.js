import './style/main.css';

import './polyfills';

import { createRoot } from 'react-dom/client';

import Main           from './app/Main';

const root = createRoot(document.getElementById('app'));
root.render(
  <Main />
);
