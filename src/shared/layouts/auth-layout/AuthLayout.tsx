import React from 'react';
import { Layout, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './AuthLayout.module.scss';
import { ROUTE_PATHS } from '@/routing/config/routePaths';

const { Header, Content } = Layout;

export const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === ROUTE_PATHS.AUTH.LOGIN;

  const handleLoginClick = () => {
    navigate(ROUTE_PATHS.AUTH.LOGIN);
  };

  return (
    <Layout className={styles.authLayout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="Orthopedic Spine Logo">
            <defs>
              <linearGradient id="spineGradientAuth" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#1890ff',stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#096dd9',stopOpacity:1}} />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="15" fill="#f0f5ff" stroke="#1890ff" strokeWidth="1"/>
            <path d="M 16 6 L 16 26" stroke="url(#spineGradientAuth)" strokeWidth="2" strokeLinecap="round"/>
            <ellipse cx="16" cy="8" rx="3" ry="1.5" fill="#1890ff" opacity="0.9"/>
            <ellipse cx="16" cy="12" rx="4" ry="2" fill="#1890ff" opacity="0.85"/>
            <ellipse cx="16" cy="16" rx="4" ry="2" fill="#1890ff" opacity="0.8"/>
            <ellipse cx="16" cy="20" rx="4" ry="2" fill="#1890ff" opacity="0.85"/>
            <ellipse cx="16" cy="24" rx="3" ry="1.5" fill="#1890ff" opacity="0.9"/>
            <rect x="15" y="4" width="2" height="4" rx="1" fill="#52c41a"/>
            <rect x="13.5" y="5.5" width="5" height="1.5" rx="0.75" fill="#52c41a"/>
          </svg>
          <span className={styles.logoText}>Orthopedic Spine</span>
        </div>

        <nav className={styles.nav}>
          <a href={ROUTE_PATHS.HOME} className={styles.navLink}>
            Home
          </a>
          <a href={ROUTE_PATHS.SERVICES} className={styles.navLink}>
            Services
          </a>
          <a href={ROUTE_PATHS.TESTIMONIALS} className={styles.navLink}>
            Testimonials
          </a>
          <a href={ROUTE_PATHS.CONTACT} className={styles.navLink}>
            Contact
          </a>
          <a href={ROUTE_PATHS.ABOUT} className={styles.navLink}>
            About Us
          </a>
        </nav>

        {!isLoginPage && (
          <Button type="primary" className={styles.loginButton} onClick={handleLoginClick}>
            Login
          </Button>
        )}
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
