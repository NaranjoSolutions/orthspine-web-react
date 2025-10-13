import React, { useState } from 'react';
import { ServiceCard } from '../ServiceCard';
import { allClinicServices } from '@/shared/resources/services/services';
import { MedicineBoxOutlined, HeartOutlined, ThunderboltOutlined } from '@ant-design/icons';
import styles from './ServicesCarousel.module.scss';

/**
 * Map service IDs to icons for visual representation
 */
const serviceIcons: Record<string, React.ReactNode> = {
  spine: <MedicineBoxOutlined />,
  knee: <MedicineBoxOutlined />,
  hip: <MedicineBoxOutlined />,
  shoulder: <MedicineBoxOutlined />,
  'foot-and-hand': <MedicineBoxOutlined />,
  rehabilitation: <HeartOutlined />,
  circulation: <HeartOutlined />,
  sports: <ThunderboltOutlined />,
};

/**
 * ServicesCarousel Component
 * Auto-scrolling horizontal carousel of clinic services
 *
 * Features:
 * - Auto-scrolls from left to right continuously
 * - Pauses animation on hover
 * - Resumes animation when mouse leaves
 * - Infinite loop by duplicating service cards
 */
export const ServicesCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the services for truly seamless infinite scroll
  const extendedServices = [...allClinicServices, ...allClinicServices, ...allClinicServices];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Services</h2>
          <p className={styles.subtitle}>
            We offer a wide range of specialized services to address your orthopedic needs.
          </p>
        </div>

        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`${styles.carouselTrack} ${isPaused ? styles.paused : ''}`}>
            {extendedServices.map((service, index) => (
              <div key={`${service.serviceId}-${index}`} className={styles.cardWrapper}>
                <ServiceCard
                  title={service.title}
                  shortDescription={service.shortDescription}
                  image={service.image}
                  alt={service.alt}
                  icon={serviceIcons[service.serviceId]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
