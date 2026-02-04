import React from 'react';
import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearAuth } from '@/features/auth/store/authSlice';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { UserRole } from '@/features/auth/types';
import styles from './UserMenu.module.scss';

/**
 * UserMenu Component
 * Displays user avatar and name with dropdown menu when user is logged in
 */
export const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate(ROUTE_PATHS.HOME);
  };

  const handleDashboard = () => {
    navigate(ROUTE_PATHS.ADMIN.DASHBOARD);
  };

  // Build menu items based on user role
  const menuItems: MenuProps['items'] = [];

  // Add dashboard link for admin users
  if (user?.userRole === UserRole.ADMIN) {
    menuItems.push({
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Admin Dashboard',
      onClick: handleDashboard,
    });
  }

  // Add logout option for all users
  menuItems.push({
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Logout',
    onClick: handleLogout,
  });

  if (!user) {
    return null;
  }

  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const displayName = `${firstName} ${lastName}`.trim() || 'User';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
      <div className={styles.userMenu}>
        <Avatar size={36} src={user.avatar} icon={!user.avatar && <UserOutlined />} className={styles.avatar}>
          {!user.avatar && initials}
        </Avatar>
        <span className={styles.userName}>{displayName}</span>
      </div>
    </Dropdown>
  );
};
