import React from 'react';
import styles from './HeroSection.module.scss';

/**
 * HeroSection Component
 * Hero banner for the About Us page
 */
export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>About Us</h1>
      </div>
    </section>
  );
};
