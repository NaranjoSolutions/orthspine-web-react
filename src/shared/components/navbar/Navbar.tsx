import { useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Navbar.module.scss';

const menuItems = [
  { key: 'home', label: <Link to="/">Home</Link> },
  { key: 'services', label: <Link to="/services">Services</Link> },
  { key: 'testimonials', label: <Link to="/testimonials">Testimonials</Link> },
  { key: 'contact', label: <Link to="/contact">Contact</Link> },
  { key: 'about-us', label: <Link to="/about-us">About Us</Link> },
];

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
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          className="hamburger-menu"
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
