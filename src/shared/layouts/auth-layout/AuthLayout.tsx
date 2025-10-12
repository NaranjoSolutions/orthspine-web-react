import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

const { Header, Content } = Layout;

export const AuthLayout: React.FC = () => {
  return (
    <Layout className={styles.authLayout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 8v12c0 7.3 5.3 14.1 12 16 6.7-1.9 12-8.7 12-16V8L16 2z" fill="#007BB9" />
          </svg>
          <span className={styles.logoText}>Orthopedic Spine</span>
        </div>
      </Header>

      <Content className={styles.content}>
        <div className={styles.contentInner}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
