import React from 'react';
import { HeroSection } from '@/features/about-us/components/HeroSection';
import { ValuesSection } from '@/features/about-us/components/ValuesSection';
import { TeamSection } from '@/features/about-us/components/TeamSection';
import { CTASection } from '@/features/about-us/components/CTASection';
import styles from './AboutPage.module.scss';

/**
 * AboutPage Component
 * About Us page for the clinic website
 *
 * Features:
 * - Hero section with page title
 * - Three core values (History, Philosophy, Commitment)
 * - Team section with physiotherapist information
 * - Call-to-action section
 */
export const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <HeroSection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </div>
  );
};

export default AboutPage;
