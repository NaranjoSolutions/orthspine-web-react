import { useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import styles from './Navbar.module.scss';
import { menuItems } from '../menu/Menu';

export function Navbar() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerVisible((prev) => !prev);
  };

  return (
    <header className={styles.navbar}>
      {/* Desktop Menu */}
      <nav className={styles.navbarDesktop}>
        <Menu mode="horizontal" items={menuItems} />
      </nav>

      {/* Mobile Menu */}
      <nav className={styles.navbarMobile}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          className={styles.hamburgerMenu}
          aria-label="Open menu"
        />
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
          </Drawer>
        )}
      </nav>
    </header>
  );
}
