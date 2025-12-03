import React, { useState } from 'react';
import { Layout, Button, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { useAppSelector } from '@/store';
import { UserMenu } from './user-menu';
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
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleBookAppointment = () => {
    navigate(ROUTE_PATHS.BOOK_APPOINTMENT);
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate(ROUTE_PATHS.AUTH.LOGIN);
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
          <Link 
            to={ROUTE_PATHS.HOME} 
            className={`${styles.navLink} ${location.pathname === ROUTE_PATHS.HOME ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            to={ROUTE_PATHS.SERVICES} 
            className={`${styles.navLink} ${location.pathname === ROUTE_PATHS.SERVICES ? styles.active : ''}`}
          >
            Services
          </Link>
          <Link 
            to={ROUTE_PATHS.TESTIMONIALS} 
            className={`${styles.navLink} ${location.pathname === ROUTE_PATHS.TESTIMONIALS ? styles.active : ''}`}
          >
            Testimonials
          </Link>
          <Link 
            to={ROUTE_PATHS.CONTACT} 
            className={`${styles.navLink} ${location.pathname === ROUTE_PATHS.CONTACT ? styles.active : ''}`}
          >
            Contact
          </Link>
          <Link 
            to={ROUTE_PATHS.ABOUT} 
            className={`${styles.navLink} ${location.pathname === ROUTE_PATHS.ABOUT ? styles.active : ''}`}
          >
            About Us
          </Link>
        </nav>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Button type="default" className={styles.loginButton} onClick={handleLoginClick}>
                Login
              </Button>
              <Button type="primary" className={styles.bookButton} onClick={handleBookAppointment}>
                Book Appointment
              </Button>
            </>
          )}
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
          <Link 
            to={ROUTE_PATHS.HOME} 
            onClick={() => setMobileMenuOpen(false)} 
            className={`${styles.mobileNavLink} ${location.pathname === ROUTE_PATHS.HOME ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            to={ROUTE_PATHS.SERVICES} 
            onClick={() => setMobileMenuOpen(false)} 
            className={`${styles.mobileNavLink} ${location.pathname === ROUTE_PATHS.SERVICES ? styles.active : ''}`}
          >
            Services
          </Link>
          <Link 
            to={ROUTE_PATHS.CONTACT} 
            onClick={() => setMobileMenuOpen(false)} 
            className={`${styles.mobileNavLink} ${location.pathname === ROUTE_PATHS.CONTACT ? styles.active : ''}`}
          >
            Contact
          </Link>
          <Link 
            to={ROUTE_PATHS.ABOUT} 
            onClick={() => setMobileMenuOpen(false)} 
            className={`${styles.mobileNavLink} ${location.pathname === ROUTE_PATHS.ABOUT ? styles.active : ''}`}
          >
            About Us
          </Link>
          <Link 
            to={ROUTE_PATHS.TESTIMONIALS} 
            onClick={() => setMobileMenuOpen(false)} 
            className={`${styles.mobileNavLink} ${location.pathname === ROUTE_PATHS.TESTIMONIALS ? styles.active : ''}`}
          >
            Testimonials
          </Link>
          <div className={styles.mobileActions}>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button type="default" className={styles.mobileLoginButton} onClick={handleLoginClick} block>
                  Login
                </Button>
                <Button type="primary" className={styles.mobileBookButton} onClick={handleBookAppointment} block>
                  Book Appointment
                </Button>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </Header>
  );
};
