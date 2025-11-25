import React from 'react';
import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearAuth } from '@/features/auth/store/authSlice';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
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

  const handleSettings = () => {
    navigate(ROUTE_PATHS.ADMIN.DASHBOARD);
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: handleSettings,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  if (!user) {
    return null;
  }

  const displayName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
      <div className={styles.userMenu}>
        <Avatar
          size={36}
          src={user.avatar}
          icon={!user.avatar && <UserOutlined />}
          className={styles.avatar}
        >
          {!user.avatar && initials}
        </Avatar>
        <span className={styles.userName}>{displayName}</span>
      </div>
    </Dropdown>
  );
};
