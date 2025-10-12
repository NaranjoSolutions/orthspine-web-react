import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { store } from '@/store/redux/store';
import { antdTheme } from '@/shared/theme/antd-theme';
import { ThemeProvider } from '@/shared/theme/ThemeContext';
import { ErrorBoundary } from '@/shared/components/error-boundary/ErrorBoundary';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * AppProviders - Composite Pattern
 * Combines all application providers in a single, reusable component
 *
 * Design Principles:
 * - Single Responsibility: Manages provider composition
 * - Open/Closed: Easy to add new providers without modifying existing code
 * - Dependency Inversion: Components depend on provider abstractions
 *
 * @example
 * ```tsx
 * <AppProviders>
 *   <App />
 * </AppProviders>
 * ```
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <ConfigProvider theme={antdTheme}>
            <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};
