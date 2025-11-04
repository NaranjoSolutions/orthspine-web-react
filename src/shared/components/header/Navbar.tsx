import React, { useState } from 'react';
import { Layout, Button, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './Navbar.module.scss';

const { Header } = Layout;

/**
 * Navbar Component
 * Main navigation header for public pages
 *
 * Features:
 * - Logo with clinic name
 * - Navigation links (Home, Services, Contact, About Us, Testimonials)
 * - Login button
 * - Book Appointment button in top right corner
 * - Responsive hamburger menu for mobile
 */
export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBookAppointment = () => {
    navigate(ROUTE_PATHS.BOOK_APPOINTMENT);
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate(ROUTE_PATHS.AUTH.LOGIN);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <Header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate(ROUTE_PATHS.HOME)}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 8v12c0 7.3 5.3 14.1 12 16 6.7-1.9 12-8.7 12-16V8L16 2z" fill="#007BB9" />
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

        <div className={styles.actions}>
          <Button type="default" className={styles.loginButton} onClick={handleLoginClick}>
            Login
          </Button>
          <Button type="primary" className={styles.bookButton} onClick={handleBookAppointment}>
            Book Appointment
          </Button>
        </div>

        <Button
          type="text"
          icon={<MenuOutlined />}
          className={styles.hamburgerButton}
          onClick={() => setMobileMenuOpen(true)}
        />
      </div>

      <Drawer
        title={
          <div className={styles.drawerHeader}>
            <div className={styles.logo}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 8v12c0 7.3 5.3 14.1 12 16 6.7-1.9 12-8.7 12-16V8L16 2z" fill="#007BB9" />
              </svg>
              <span className={styles.logoText}>Orthopedic Spine</span>
            </div>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className={styles.mobileDrawer}
        closeIcon={<CloseOutlined />}
        width={280}
      >
        <div className={styles.mobileMenu}>
          <a onClick={() => handleNavClick(ROUTE_PATHS.HOME)} className={styles.mobileNavLink}>
            Home
          </a>
          <a onClick={() => handleNavClick(ROUTE_PATHS.SERVICES)} className={styles.mobileNavLink}>
            Services
          </a>
          <a onClick={() => handleNavClick(ROUTE_PATHS.CONTACT)} className={styles.mobileNavLink}>
            Contact
          </a>
          <a onClick={() => handleNavClick(ROUTE_PATHS.ABOUT)} className={styles.mobileNavLink}>
            About Us
          </a>
          <a onClick={() => handleNavClick(ROUTE_PATHS.TESTIMONIALS)} className={styles.mobileNavLink}>
            Testimonials
          </a>
          <div className={styles.mobileActions}>
            <Button type="default" className={styles.mobileLoginButton} onClick={handleLoginClick} block>
              Login
            </Button>
            <Button type="primary" className={styles.mobileBookButton} onClick={handleBookAppointment} block>
              Book Appointment
            </Button>
          </div>
        </div>
      </Drawer>
    </Header>
  );
};
