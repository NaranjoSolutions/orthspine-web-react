import React, { useState, useRef, useCallback } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ServiceCard } from '../ServiceCard';
import { allClinicServices } from '@/shared/resources/services/services';

import styles from './ServicesCarousel.module.scss';

/**
 * ServicesCarousel Component
 * Auto-scrolling horizontal carousel of clinic services
 *
 * Features:
 * - Auto-scrolls from left to right continuously
 * - Manual navigation with Previous/Next buttons
 * - Pauses animation on hover or manual interaction
 * - Resumes animation when mouse leaves
 * - Infinite loop by duplicating service cards
 */
export const ServicesCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Triple the services for truly seamless infinite scroll
  const extendedServices = [...allClinicServices, ...allClinicServices, ...allClinicServices];

  const handlePrevious = useCallback(() => {
    if (trackRef.current) {
      setIsManuallyPaused(true);
      const cardWidth = 374; // Card width + gap
      const currentScroll = trackRef.current.scrollLeft;
      trackRef.current.scrollTo({
        left: currentScroll - cardWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleNext = useCallback(() => {
    if (trackRef.current) {
      setIsManuallyPaused(true);
      const cardWidth = 374; // Card width + gap
      const currentScroll = trackRef.current.scrollLeft;
      trackRef.current.scrollTo({
        left: currentScroll + cardWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros Servicios</h2>
          <p className={styles.subtitle}>
            Ofrecemos una amplia gama de servicios especializados para atender sus necesidades ortopédicas.
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <button
            className={styles.navButton}
            onClick={handlePrevious}
            aria-label="Previous service"
            type="button"
          >
            <LeftOutlined />
          </button>

          <div
            ref={trackRef}
            className={styles.carouselWrapper}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={`${styles.carouselTrack} ${isPaused || isManuallyPaused ? styles.paused : ''}`}>
              {extendedServices.map((service, index) => (
                <div key={`${service.serviceId}-${index}`} className={styles.cardWrapper}>
                  <ServiceCard
                    title={service.title}
                    shortDescription={service.shortDescription}
                    image={service.image}
                    alt={service.alt}
                    serviceId={service.serviceId}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className={styles.navButton}
            onClick={handleNext}
            aria-label="Next service"
            type="button"
          >
            <RightOutlined />
          </button>
        </div>
      </div>
    </section>
  );
};
