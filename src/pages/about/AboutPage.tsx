import React from 'react';
import {
  HeroSection,
  StorySection,
  ValuesSection,
  TeamSection,
  // CertificationsSection,
  CTASection,
} from '@/features/about-us/components';
import styles from './AboutPage.module.scss';

/**
 * AboutPage Component
 * About Us page for the clinic website showcasing clinic story, values, team, and certifications
 *
 * Features:
 * - Hero section with page title and subtitle
 * - Story section with clinic history and mission
 * - Core values section (Patient-Centered Care, Evidence-Based, Continuous Improvement)
 * - Team section with specialist information
 * - Professional certifications display
 * - Call-to-action section for booking appointments
 */
export const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      {/* <CertificationsSection /> */}
      <CTASection />
    </div>
  );
};

export default AboutPage;
