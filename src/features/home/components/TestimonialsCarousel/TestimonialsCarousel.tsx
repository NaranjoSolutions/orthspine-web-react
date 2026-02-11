import React, { useState, useRef, useCallback, useEffect } from 'react';
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
const RESUME_DELAY = 3000; // Resume autoplay after 3 seconds of manual interaction
const SWIPE_THRESHOLD = 40; // Minimum swipe distance to trigger navigation

/**
 * TestimonialsCarousel Component
 * Displays patient testimonials in a horizontal scrolling carousel
 *
 * Features:
 * - Horizontal scrolling display
 * - Manual navigation with Previous/Next buttons
 * - Pauses animation on hover (resumes on mouse leave)
 * - Pauses animation on manual navigation (resumes after 3 seconds)
 * - "View more" link to testimonials page
 */
export const TestimonialsCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Triple the testimonials for seamless infinite scroll
  const extendedTestimonials = [...patientTestimonials, ...patientTestimonials, ...patientTestimonials];

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

  const getScrollDistance = useCallback(() => {
    const card = trackRef.current?.querySelector<HTMLElement>(`.${styles.cardWrapper}`);

    if (!card) {
      return SCROLL_DISTANCE;
    }

    return card.getBoundingClientRect().width + CARD_GAP;
  }, []);

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
      const scrollDistance = getScrollDistance();
      trackRef.current.scrollTo({
        left: currentScroll - scrollDistance,
        behavior: 'smooth',
      });
      scheduleResume();
    }
  }, [getScrollDistance, scheduleResume]);

  const handleNext = useCallback(() => {
    if (trackRef.current) {
      setIsManuallyPaused(true);
      const currentScroll = trackRef.current.scrollLeft;
      const scrollDistance = getScrollDistance();
      trackRef.current.scrollTo({
        left: currentScroll + scrollDistance,
        behavior: 'smooth',
      });
      scheduleResume();
    }
  }, [getScrollDistance, scheduleResume]);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      touchStartXRef.current = touch.clientX;
      touchStartYRef.current = touch.clientY;
      setIsManuallyPaused(true);
      clearResumeTimer();
    },
    [clearResumeTimer],
  );

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.changedTouches[0];
      const startX = touchStartXRef.current;
      const startY = touchStartYRef.current;

      touchStartXRef.current = null;
      touchStartYRef.current = null;

      if (!touch || startX === null || startY === null) {
        return;
      }

      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) {
        scheduleResume();
        return;
      }

      if (deltaX > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    },
    [handleNext, handlePrevious, scheduleResume],
  );

  return (
    <section id="testimonials-section" className={styles.testimonialsSection}>
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
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
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
