import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/shared/components/header';
import { AppFooter } from '@/shared/components/footer';
import { WhatsAppFloat } from '@/shared/components/whatsapp-float/WhatsAppFloat';
import { ScrollToTop } from '@/shared/components/scroll-to-top/ScrollToTop';
import styles from './MainLayout.module.scss';

const { Content } = Layout;

/**
 * MainLayout Component
 * Layout wrapper for public pages (Home, About, Services, Contact, etc.)
 *
 * Design Pattern: Composite Pattern
 * - Composes multiple components (Navbar, Content, Footer, Widgets)
 * - Each child component is independently testable and reusable
 *
 * Design Principles:
 * - Single Responsibility: Handles main layout structure only
 * - Open/Closed: Easy to add new widgets without modification
 * - Dependency Inversion: Uses Outlet (React Router abstraction) for content
 *
 * @example
 * ```tsx
 * // In routes configuration
 * {
 *   element: <MainLayout />,
 *   children: [
 *     { path: '/', element: <HomePage /> },
 *     { path: '/about', element: <AboutPage /> },
 *   ]
 * }
 * ```
 */
export const MainLayout: React.FC = () => {
  return (
    <Layout className={styles.mainLayout}>
      <Navbar />
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <AppFooter />

      {/* Floating widgets */}
      <WhatsAppFloat />
      <ScrollToTop />
    </Layout>
  );
};
