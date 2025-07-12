import { useState } from 'react';
import { Menu, Drawer, Button, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import './Navbar.scss';
import { menuItems } from '../menu/Menu';
import { ThemeToggle } from '../../theme-toggle/ThemeToggle';

export function Navbar() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerVisible((prev) => !prev);
  };

  return (
    <header className="navbar">
      {/* Desktop Menu */}
      <nav className="navbar-desktop">
        <Menu mode="horizontal" items={menuItems} />
      </nav>

      {/* Mobile Menu */}
      <nav className="navbar-mobile">
        <Space size="large" align="center">
          <ThemeToggle />

          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            className="hamburger-menu"
            aria-label="Open menu"
          />
        </Space>

        {isDrawerVisible && (
          <Drawer
            title="Menu"
            placement="right"
            onClose={toggleDrawer}
            open={isDrawerVisible}
            closable
            aria-label="Mobile menu"
          >
            <Menu mode="vertical" items={menuItems} />
            <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
              <ThemeToggle />
            </div>
          </Drawer>
        )}
      </nav>
    </header>
  );
}
