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
        <h1 className={styles.heroTitle}>Acerca de Orthopedic Spine</h1>
        <p className={styles.heroDescription}>
          Dedicados a su salud espinal y recuperación con atención fisioterapéutica especializada, tratamientos basados en evidencia y un equipo clínico compasivo.
        </p>
      </div>
    </section>
  );
};
