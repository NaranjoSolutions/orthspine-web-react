import React from 'react';
import { Layout, Button } from 'antd';
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
 * - Book Appointment button in top right corner
 */
export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate(ROUTE_PATHS.BOOK_APPOINTMENT);
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
          <a href={ROUTE_PATHS.CONTACT} className={styles.navLink}>
            Contact
          </a>
          <a href={ROUTE_PATHS.ABOUT} className={styles.navLink}>
            About Us
          </a>
          <a href={ROUTE_PATHS.TESTIMONIALS} className={styles.navLink}>
            Testimonials
          </a>
        </nav>

        <Button type="primary" className={styles.bookButton} onClick={handleBookAppointment}>
          Book Appointment
        </Button>
      </div>
    </Header>
  );
};
