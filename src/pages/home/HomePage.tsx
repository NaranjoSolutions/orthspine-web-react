import React from 'react';
import { HomeHeroSection } from '@/features/home/components/HomeHeroSection';
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
  return (
    <div className={styles.homePage}>
      <HomeHeroSection />
      <ServicesCarousel />
      <TestimonialsCarousel />
      <ContactSection />
    </div>
  );
};

export default HomePage;
