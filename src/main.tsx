import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from './app/providers';
import { App } from './app/App';

// Import Ant Design reset styles
import 'antd/dist/reset.css';

// Import CSS custom properties (must be before other styles)
import './styles/variables.css';

// Import global styles
import './styles/main.scss';

// Import test utilities in development mode
if (import.meta.env.DEV) {
  import('./features/cookie-consent/utils/testUtils');
}

/**
 * Application Entry Point
 *
 * Architecture:
 * - Composite Pattern: AppProviders wraps all context providers
 * - Single Responsibility: main.tsx only handles React DOM rendering
 * - Error Handling: ErrorBoundary catches all render errors
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure index.html has a <div id="root">');
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
