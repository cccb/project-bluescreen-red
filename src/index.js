
import './style/main.css';

// Polyfills for mqtt lib
import 'polyfill/buffer';
import 'polyfill/process';

import { createRoot } from 'react-dom/client';

import Main           from './app/Main';

const root = createRoot(document.getElementById('app'));

root.render(
  <Main />
);
