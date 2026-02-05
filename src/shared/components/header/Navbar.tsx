import React, { useState } from 'react';
import { Layout, Button, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { useAppSelector } from '@/store';
import { UserMenu } from './user-menu';
import styles from './Navbar.module.scss';
import logoSvg from '@/assets/logo/logo.svg';

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

  /**
   * Helper function to get nav link class with active state
   */
  const getNavLinkClass = (path: string, isMobile: boolean = false): string => {
    const baseClass = isMobile ? styles.mobileNavLink : styles.navLink;
    const isActive = location.pathname === path;
    return `${baseClass} ${isActive ? styles.active : ''}`;
  };

  /**
   * Helper function to navigate and close mobile menu
   */
  const navigateAndCloseMobile = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleBookAppointment = () => navigateAndCloseMobile(ROUTE_PATHS.BOOK_APPOINTMENT);
  // const handleLoginClick = () => navigateAndCloseMobile(ROUTE_PATHS.AUTH.LOGIN);

  return (
    <Header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate(ROUTE_PATHS.HOME)}>
          <img src={logoSvg} alt="Orthopedic Spine Logo" className={styles.logoImage} />
          <span className={styles.logoText}>Orthopedic Spine</span>
        </div>

        <nav className={styles.nav}>
          <Link to={ROUTE_PATHS.HOME} className={getNavLinkClass(ROUTE_PATHS.HOME)}>
            Inicio
          </Link>
          <Link to={ROUTE_PATHS.SERVICES} className={getNavLinkClass(ROUTE_PATHS.SERVICES)}>
            Servicios
          </Link>
          <Link to={ROUTE_PATHS.TESTIMONIALS} className={getNavLinkClass(ROUTE_PATHS.TESTIMONIALS)}>
            Testimonios
          </Link>
          <Link to={ROUTE_PATHS.CONTACT} className={getNavLinkClass(ROUTE_PATHS.CONTACT)}>
            Contacto
          </Link>
          <Link to={ROUTE_PATHS.ABOUT} className={getNavLinkClass(ROUTE_PATHS.ABOUT)}>
            Sobre Nosotros
          </Link>
        </nav>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              {/* <Button type="default" className={styles.loginButton} onClick={handleLoginClick}>
                Login
              </Button> */}
              <Button type="primary" className={styles.bookButton} onClick={handleBookAppointment}>
                Reservar Cita
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
            className={getNavLinkClass(ROUTE_PATHS.HOME, true)}
          >
            Inicio
          </Link>
          <Link
            to={ROUTE_PATHS.SERVICES}
            onClick={() => setMobileMenuOpen(false)}
            className={getNavLinkClass(ROUTE_PATHS.SERVICES, true)}
          >
            Servicios
          </Link>
          <Link
            to={ROUTE_PATHS.CONTACT}
            onClick={() => setMobileMenuOpen(false)}
            className={getNavLinkClass(ROUTE_PATHS.CONTACT, true)}
          >
            Contacto
          </Link>
          <Link
            to={ROUTE_PATHS.ABOUT}
            onClick={() => setMobileMenuOpen(false)}
            className={getNavLinkClass(ROUTE_PATHS.ABOUT, true)}
          >
            Sobre Nosotros
          </Link>
          <Link
            to={ROUTE_PATHS.TESTIMONIALS}
            onClick={() => setMobileMenuOpen(false)}
            className={getNavLinkClass(ROUTE_PATHS.TESTIMONIALS, true)}
          >
            Testimonios
          </Link>
          <div className={styles.mobileActions}>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                {/* <Button type="default" className={styles.mobileLoginButton} onClick={handleLoginClick} block>
                  Login
                </Button> */}
                <Button type="primary" className={styles.mobileBookButton} onClick={handleBookAppointment} block>
                  Reservar Cita
                </Button>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </Header>
  );
};
