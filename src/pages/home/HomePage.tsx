import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { TestimonialsCarousel } from '@/features/home/components/TestimonialsCarousel';
import { ServicesCarousel } from '@/features/home/components/ServicesCarousel';
import { ContactSection } from '@/features/home/components/ContactSection';
import styles from './HomePage.module.scss';

/**
 * HomePage Component
 * Landing page for the clinic website
 *
 * Features:
 * - Hero section with background image
 * - Main heading and subtitle
 * - Call-to-action button
 * - Services carousel section
 * - Patient testimonials carousel section
 * - Contact Us section with map and navigation buttons
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate(ROUTE_PATHS.BOOK_APPOINTMENT);
  };

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Your Path to Pain-Free Living</h1>
          <p className={styles.heroSubtitle}>
            At Orthopedic Spine, we specialize in comprehensive orthopedic care. Our expert team is dedicated to
            providing personalized treatment plans to help you regain mobility and live a healthier life.
          </p>
          <Button type="primary" size="large" className={styles.heroButton} onClick={handleBookAppointment}>
            Book Appointment
          </Button>
        </div>
      </section>

      <ServicesCarousel />
      <TestimonialsCarousel />
      <ContactSection />
    </div>
  );
};

export default HomePage;
