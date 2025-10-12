import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, CommentOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useLogout } from '@/features/auth/hooks';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './AdminLayout.module.scss';

const { Header, Sider, Content } = Layout;

/**
 * AdminLayout Component
 * Layout wrapper for admin dashboard pages
 *
 * Features:
 * - Collapsible sidebar navigation
 * - Role-based menu items
 * - Active route highlighting
 * - Logout functionality
 *
 * Design Principles:
 * - Single Responsibility: Handles admin layout only
 * - Open/Closed: Easy to add new menu items
 * - Separation of Concerns: Navigation logic separate from content
 */
export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useLogout();
  const [collapsed, setCollapsed] = useState(false);

  /**
   * Menu items configuration
   */
  const menuItems = [
    {
      key: ROUTE_PATHS.ADMIN.DASHBOARD,
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate(ROUTE_PATHS.ADMIN.DASHBOARD),
    },
    {
      key: ROUTE_PATHS.ADMIN.TESTIMONIALS,
      icon: <CommentOutlined />,
      label: 'Testimonials',
      onClick: () => navigate(ROUTE_PATHS.ADMIN.TESTIMONIALS),
    },
    {
      key: 'divider-1',
      type: 'divider' as const,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => {},
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Layout className={styles.adminLayout}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className={styles.sider} width={250}>
        <div className={styles.logo}>
          <h2>{collapsed ? 'OS' : 'OrthSpine Admin'}</h2>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>

      <Layout>
        <Header className={styles.header}>
          <h1 className={styles.pageTitle}>Admin Dashboard</h1>
          <div className={styles.userInfo}>
            <UserOutlined />
            <span>Admin User</span>
          </div>
        </Header>

        <Content className={styles.content}>
          <div className={styles.contentInner}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
