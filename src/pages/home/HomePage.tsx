import React from 'react';
import { Button } from 'antd';
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
 * - Contact Us section with navigation buttons
 * - Patient testimonials carousel section
 */
export const HomePage: React.FC = () => {
  const handleBookAppointment = () => {
    // TODO: Navigate to appointment booking page
    console.log('Book Appointment clicked');
  };

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Your Path to Pain-Free Living</h1>
          <p className={styles.heroSubtitle}>
            At Spine & Joint Clinic, we specialize in comprehensive orthopedic care. Our expert team is dedicated to
            providing personalized treatment plans to help you regain mobility and live a healthier life.
          </p>
          <Button type="primary" size="large" className={styles.heroButton} onClick={handleBookAppointment}>
            Book Appointment
          </Button>
        </div>
      </section>

      <ServicesCarousel />
      <ContactSection />
      <TestimonialsCarousel />
    </div>
  );
};

export default HomePage;
