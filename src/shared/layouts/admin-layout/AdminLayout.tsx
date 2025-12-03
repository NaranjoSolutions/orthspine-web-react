import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  CommentOutlined,
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearAuth } from '@/features/auth/store/authSlice';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './AdminLayout.module.scss';
import { UserRole } from '@/features/auth/types';

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
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  /**
   * Handle logout
   */
  const handleLogout = () => {
    dispatch(clearAuth());
    navigate(ROUTE_PATHS.AUTH.LOGIN);
  };

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
      key: ROUTE_PATHS.ADMIN.PATIENTS,
      icon: <TeamOutlined />,
      label: 'Patients',
      onClick: () => navigate(ROUTE_PATHS.ADMIN.PATIENTS),
    },
    {
      key: ROUTE_PATHS.ADMIN.APPOINTMENTS,
      icon: <CalendarOutlined />,
      label: 'Appointments',
      onClick: () => navigate(ROUTE_PATHS.ADMIN.APPOINTMENTS),
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
      key: ROUTE_PATHS.ADMIN.SETTINGS,
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate(ROUTE_PATHS.ADMIN.SETTINGS),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
      danger: true,
    },
  ];

  /**
   * Get current page name from pathname
   */
  const getCurrentPageName = (): string => {
    const path = location.pathname;
    if (path === ROUTE_PATHS.ADMIN.DASHBOARD) return 'Dashboard';
    if (path === ROUTE_PATHS.ADMIN.PATIENTS) return 'Patients';
    if (path === ROUTE_PATHS.ADMIN.APPOINTMENTS) return 'Appointments';
    if (path === ROUTE_PATHS.ADMIN.TESTIMONIALS) return 'Testimonials';
    if (path === ROUTE_PATHS.ADMIN.SETTINGS) return 'Settings';
    return 'Dashboard';
  };

  return (
    <Layout className={styles.adminLayout}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className={styles.sider} width={250}>
        <div className={styles.logo}>
          <MedicineBoxOutlined className={styles.logoIcon} />
          <h2>{collapsed ? 'OSC' : 'Ortho Spine Clinic'}</h2>
          {!collapsed && <p className={styles.logoSubtitle}>Admin Panel</p>}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>

      <Layout>
        <Header className={styles.header}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbItem}>Home</span>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbItem}>{getCurrentPageName()}</span>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                <UserOutlined />
              </div>
              <div className={styles.userDetails}>
                <span className={styles.userName}>
                  {user?.firstName} {user?.lastName}
                </span>
                <span className={styles.userRole}>{user?.userRole === UserRole.ADMIN ? 'Administrator' : 'User'}</span>
              </div>
            </div>
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
