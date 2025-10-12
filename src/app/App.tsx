import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Spin } from 'antd';
import { routes } from '@/routing/routes';
import './App.scss';

/**
 * App Component - Application Root
 *
 * Design Principles:
 * - Single Responsibility: Only handles route rendering
 * - Separation of Concerns: Layout logic moved to route configuration
 * - Open/Closed: Easy to extend routes without modifying this component
 *
 * Architecture:
 * - Routes are lazy-loaded for optimal performance
 * - Suspense boundary provides loading state
 * - Layout components wrapped at route level (not here)
 */
export const App: React.FC = () => {
  const element = useRoutes(routes);

  return (
    <Suspense
      fallback={
        <div className="app-loading">
          <Spin size="large" tip="Loading..." />
        </div>
      }
    >
      {element}
    </Suspense>
  );
};
