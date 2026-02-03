import React from 'react';
import styles from './HeroSection.module.scss';

/**
 * HeroSection Component
 * Hero banner for the About Us page with centered content
 * @returns React component with title and subtitle
 */
export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>About Orthopedic Spine</h1>
        <p className={styles.heroDescription}>
          Dedicated to your spinal health and recovery with expert physiotherapy care, evidence-based treatments, and a compassionate clinical team.
        </p>
      </div>
    </section>
  );
};
