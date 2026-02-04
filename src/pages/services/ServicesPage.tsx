import React from 'react';
import { allClinicServices } from '@/shared/resources/services/services';
import { ServiceCard } from '@/features/home/components/ServiceCard';
import { ServiceCTA } from '@/features/services/components/ServiceCTA';
import styles from './ServicesPage.module.scss';

/**
 * ServicesPage Component
 * Displays all clinic services with hero section and contact information
 *
 * Features:
 * - Hero section with title, subtitle, and CTA buttons
 * - Grid of all clinic services
 * - Contact section at the bottom
 */
export const ServicesPage: React.FC = () => {
  return (
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Nuestros Servicios de Fisioterapia</h1>
          <p className={styles.heroSubtitle}>
            En Orthopedic Spine, ofrecemos atención médica especializada y rehabilitación integral para ayudarle a
            recuperar su movilidad y calidad de vida. Nuestro equipo de profesionales está comprometido con su bienestar.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.servicesGrid}>
            {allClinicServices.map((service) => (
              <div key={service.serviceId} className={styles.gridItem}>
                <ServiceCard
                  title={service.title}
                  shortDescription={service.shortDescription}
                  image={service.image}
                  alt={service.alt}
                  conditionsTreated={service.conditionsTreated}
                  serviceId={service.serviceId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not Sure Which Service CTA Section */}
      <ServiceCTA />
    </div>
  );
};

export default ServicesPage;
