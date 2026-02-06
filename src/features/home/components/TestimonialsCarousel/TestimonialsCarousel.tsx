import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { TestimonialCard } from '../TestimonialCard';
import { patientTestimonials } from '@/shared/resources/testimonials/testimonials';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './TestimonialsCarousel.module.scss';

// Carousel constants
const CARD_WIDTH = 420; // Base card width in pixels (desktop)
const CARD_GAP = 24; // Gap between cards (spacing-lg)
const SCROLL_DISTANCE = CARD_WIDTH + CARD_GAP; // Total scroll distance per navigation

/**
 * TestimonialsCarousel Component
 * Displays patient testimonials in a horizontal scrolling carousel
 *
 * Features:
 * - Horizontal scrolling display
 * - Manual navigation with Previous/Next buttons
 * - Pauses animation on hover or manual interaction
 * - "View more" link to testimonials page
 */
export const TestimonialsCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Triple the testimonials for seamless infinite scroll
  const extendedTestimonials = [...patientTestimonials, ...patientTestimonials, ...patientTestimonials];

  const handlePrevious = useCallback(() => {
    if (trackRef.current) {
      setIsManuallyPaused(true);
      const currentScroll = trackRef.current.scrollLeft;
      trackRef.current.scrollTo({
        left: currentScroll - SCROLL_DISTANCE,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleNext = useCallback(() => {
    if (trackRef.current) {
      setIsManuallyPaused(true);
      const currentScroll = trackRef.current.scrollLeft;
      trackRef.current.scrollTo({
        left: currentScroll + SCROLL_DISTANCE,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Testimonios de Pacientes</h2>
        </div>

        <div className={styles.carouselContainer}>
          <button
            className={styles.navButton}
            onClick={handlePrevious}
            aria-label="Previous testimonial"
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
              {extendedTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className={styles.cardWrapper}>
                  <TestimonialCard
                    patientName={testimonial.patientName}
                    rating={testimonial.rating}
                    testimonial={testimonial.testimonial}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className={styles.navButton}
            onClick={handleNext}
            aria-label="Next testimonial"
            type="button"
          >
            <RightOutlined />
          </button>
        </div>

        <div className={styles.footer}>
          <Link to={ROUTE_PATHS.TESTIMONIALS} className={styles.viewMoreLink}>
            Ver más
          </Link>
        </div>
      </div>
    </section>
  );
};
