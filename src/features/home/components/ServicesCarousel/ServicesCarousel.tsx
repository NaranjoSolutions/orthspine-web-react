import React, { useState, useRef, useCallback, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ServiceCard } from '../ServiceCard';
import { allClinicServices } from '@/shared/resources/services/services';

import styles from './ServicesCarousel.module.scss';

// Carousel constants
const CARD_WIDTH = 350; // Base card width in pixels
const CARD_GAP = 24; // Gap between cards (spacing-lg)
const SCROLL_DISTANCE = CARD_WIDTH + CARD_GAP; // Total scroll distance per navigation
const RESUME_DELAY = 3000; // Resume autoplay after 3 seconds of manual interaction

/**
 * ServicesCarousel Component
 * Auto-scrolling horizontal carousel of clinic services
 *
 * Features:
 * - Auto-scrolls from left to right continuously
 * - Manual navigation with Previous/Next buttons
 * - Pauses animation on hover (resumes on mouse leave)
 * - Pauses animation on manual navigation (resumes after 3 seconds)
 * - Infinite loop by duplicating service cards
 */
export const ServicesCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Triple the services for truly seamless infinite scroll
  const extendedServices = [...allClinicServices, ...allClinicServices, ...allClinicServices];

  // Clear any existing resume timer
  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  // Resume autoplay after delay
  const scheduleResume = useCallback(() => {
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => {
      setIsManuallyPaused(false);
    }, RESUME_DELAY);
  }, [clearResumeTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      clearResumeTimer();
    };
  }, [clearResumeTimer]);

  const handlePrevious = useCallback(() => {
    if (trackRef.current) {
      setIsManuallyPaused(true);
      const currentScroll = trackRef.current.scrollLeft;
      trackRef.current.scrollTo({
        left: currentScroll - SCROLL_DISTANCE,
        behavior: 'smooth',
      });
      scheduleResume();
    }
  }, [scheduleResume]);

  const handleNext = useCallback(() => {
    if (trackRef.current) {
      setIsManuallyPaused(true);
      const currentScroll = trackRef.current.scrollLeft;
      trackRef.current.scrollTo({
        left: currentScroll + SCROLL_DISTANCE,
        behavior: 'smooth',
      });
      scheduleResume();
    }
  }, [scheduleResume]);

  return (
    <section id="services-section" className={styles.servicesSection}>
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
