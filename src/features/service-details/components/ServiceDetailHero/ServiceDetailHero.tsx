import React from 'react';
import styles from './ServiceDetailHero.module.scss';

interface ServiceDetailHeroProps {
  title: string;
  shortDescription: string;
}

/**
 * ServiceDetailHero Component
 * Displays the hero section with service title and short description
 *
 * @param title - Service title
 * @param shortDescription - Brief description of the service
 */
export const ServiceDetailHero: React.FC<ServiceDetailHeroProps> = ({ title, shortDescription }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{shortDescription}</p>
      </div>
    </section>
  );
};
