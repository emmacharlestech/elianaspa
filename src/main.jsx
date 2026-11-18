import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/cinematic.css';
import './styles/mobile.css';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

// Production HTML is pre-rendered at build time → hydrate it.
// The dev server serves an empty shell → render from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
