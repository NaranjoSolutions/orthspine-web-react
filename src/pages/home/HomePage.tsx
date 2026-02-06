import React from 'react';
import { HomeHeroSection } from '@/features/home/components/HomeHeroSection';
import { TestimonialsCarousel } from '@/features/home/components/TestimonialsCarousel';
import { ServicesCarousel } from '@/features/home/components/ServicesCarousel';
import styles from './HomePage.module.scss';
import { VisitOurClinic } from '@/features/home/components/VisitOurClinic';
import { RecoveryJourney } from '@/features/home/components/RecoveryJourney';
import { useScrollToSection } from '@/shared/hooks';

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
 * - Visit Our Clinic section with map and navigation buttons
 * - Recovery Journey call-to-action section
 */
export const HomePage: React.FC = () => {
  // Initialize scroll hook to handle hash-based navigation
  useScrollToSection();

  return (
    <div className={styles.homePage}>
      <HomeHeroSection />
      <ServicesCarousel />
      <TestimonialsCarousel />
      <VisitOurClinic />
      <RecoveryJourney />
    </div>
  );
};

export default HomePage;
