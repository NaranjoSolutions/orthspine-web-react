import React from 'react';
import { Layout } from 'antd';
import styles from './AuthLayout.module.scss';

const { Header, Content } = Layout;

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * AuthLayout Component
 * Layout wrapper for authentication pages using Ant Design Layout
 * Follows Single Responsibility - handles layout structure only
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Layout className={styles.authLayout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L4 8v12c0 7.3 5.3 14.1 12 16 6.7-1.9 12-8.7 12-16V8L16 2z" fill="#007BB9" />
            </svg>
          </div>
          <span className={styles.logoText}>Orthopedic Spine</span>
        </div>
      </Header>

      <Content className={styles.content}>
        <div className={styles.contentInner}>{children}</div>
      </Content>
    </Layout>
  );
};
