import { useState, useEffect } from 'react';
import { Menu, Drawer, Button, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { ThemeToggle } from '../../theme-toggle/ThemeToggle';
import { mainMenuItems } from '../menu/MainMenu';
import { useTheme } from '../../../theme/ThemeContext';
import { useResponsive } from '../../../hooks/useResponsive';

import './Navbar.scss';
import logo from './images/clinic-icon.png';

export function Navbar() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { theme } = useTheme();
  const isMobile = useResponsive();

  const toggleDrawer = () => {
    setIsDrawerVisible((prev) => !prev);
  };

  // Close drawer when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile && isDrawerVisible) {
      setIsDrawerVisible(false);
    }
  }, [isMobile, isDrawerVisible]);

  // Handle keyboard navigation for hamburger menu
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDrawer();
    }
  };

  return (
    <header className="navbar" data-theme={theme.mode}>
      {isMobile ? (
        <nav className="navbar-mobile">
          <Space size="large" align="center" className="mobile-content">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Clinic Logo" className="clinic-logo" />
            </Link>

            <Space size={16} align="center">
              <Link to="/book-appointment">
                <Button type="primary" className="book-appointment-button">
                  Agendar Cita
                </Button>
              </Link>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={toggleDrawer}
                onKeyDown={handleKeyDown}
                className="hamburger-menu"
                aria-label="Open navigation menu"
                aria-expanded={isDrawerVisible}
              />
            </Space>
          </Space>

          <Drawer
            title="Navegación"
            placement="right"
            onClose={toggleDrawer}
            open={isDrawerVisible}
            closable
            aria-label="Mobile navigation menu"
            className="mobile-drawer"
          >
            <Menu
              mode="vertical"
              items={mainMenuItems}
              theme={theme.mode === 'dark' ? 'dark' : 'light'}
              className="mobile-menu"
              onClick={toggleDrawer} // Close drawer when menu item is clicked
            />

            <div className="drawer-footer">
              <Link to="/book-appointment" onClick={toggleDrawer}>
                <Button type="primary" className="book-appointment-button" block>
                  Agendar Cita
                </Button>
              </Link>
            </div>
          </Drawer>
        </nav>
      ) : (
        <nav className="navbar-desktop">
          <div className="desktop-logo">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Clinic Logo" className="clinic-logo" />
            </Link>
          </div>

          <div className="desktop-menu">
            <Menu
              mode="horizontal"
              items={mainMenuItems}
              theme={theme.mode === 'dark' ? 'dark' : 'light'}
              className="main-menu"
            />
          </div>

          <div className="desktop-actions">
            <Space size={16} align="center">
              <ThemeToggle />
              <Link to="/book-appointment">
                <Button type="primary" className="book-appointment-button">
                  Agendar Cita
                </Button>
              </Link>
            </Space>
          </div>
        </nav>
      )}
    </header>
  );
}
