import React, { useState, useRef, useCallback, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ServiceCard } from '../ServiceCard';
import { allClinicServices } from '@/shared/resources/services/services';

import styles from './ServicesCarousel.module.scss';

// Carousel constants
const CARD_GAP = 24; // Gap between cards (spacing-lg)
const RESUME_DELAY = 3000; // Resume autoplay after 3 seconds of manual interaction
const AUTO_SCROLL_DURATION = 40000; // Match previous 40s animation timing
const SWIPE_THRESHOLD = 40; // Minimum swipe distance to trigger navigation

/**
 * ServicesCarousel Component
 * Auto-scrolling horizontal carousel of clinic services
 *
 * Features:
 * - Auto-scrolls from left to right continuously using JS-based scrolling
 * - Manual navigation with Previous/Next buttons
 * - Pauses animation on hover (resumes on mouse leave)
 * - Pauses animation on touch/drag interaction (resumes after delay)
 * - Pauses animation on manual navigation (resumes after 3 seconds)
 * - Infinite loop by duplicating service cards with seamless wrapping
 */
export const ServicesCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const scrollDistanceRef = useRef<number>(0);
  const wrapPointRef = useRef<number>(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Use refs for pause states to avoid recreating autoScroll callback
  const isPausedRef = useRef(false);
  const isManuallyPausedRef = useRef(false);
  const isTouchingRef = useRef(false);

  // Triple the services for truly seamless infinite scroll
  const extendedServices = [...allClinicServices, ...allClinicServices, ...allClinicServices];

  // Sync state with refs
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isManuallyPausedRef.current = isManuallyPaused;
  }, [isManuallyPaused]);

  useEffect(() => {
    isTouchingRef.current = isTouching;
  }, [isTouching]);

  // Calculate card width and scroll distance from actual DOM elements
  const calculateScrollMetrics = useCallback(() => {
    if (!trackRef.current) {
      return;
    }

    const firstCard = trackRef.current.querySelector(`.${styles.cardWrapper}`) as HTMLElement | null;
    if (firstCard) {
      // Use subpixel-accurate width for vw-based cards to keep wrap calculations seamless.
      const cardWidth = firstCard.getBoundingClientRect().width;
      const scrollDistance = cardWidth + CARD_GAP;
      scrollDistanceRef.current = scrollDistance;
      wrapPointRef.current = scrollDistance * allClinicServices.length;

      if (wrapperRef.current && wrapperRef.current.scrollLeft === 0) {
        wrapperRef.current.scrollLeft = wrapPointRef.current;
      }
    }
  }, []);

  // Auto-scroll animation using requestAnimationFrame
  // Note: allClinicServices is a constant array that doesn't change during component lifetime
  const autoScroll = useCallback(() => {
    if (!wrapperRef.current || wrapPointRef.current === 0) {
      animationFrameRef.current = requestAnimationFrame(autoScroll);
      return;
    }

    const timestamp = performance.now();
    const lastTimestamp = lastTimestampRef.current ?? timestamp;
    const delta = timestamp - lastTimestamp;
    lastTimestampRef.current = timestamp;

    // Continue the animation loop even when paused to allow smooth resume
    if (isPausedRef.current || isManuallyPausedRef.current || isTouchingRef.current) {
      animationFrameRef.current = requestAnimationFrame(autoScroll);
      return;
    }

    const wrapper = wrapperRef.current;
    const scrollSpeed = wrapPointRef.current / AUTO_SCROLL_DURATION;
    wrapper.scrollLeft += scrollSpeed * delta;

    // Seamless wrap around: when we reach the wrap point, jump back to the start of the second set
    if (wrapper.scrollLeft >= wrapPointRef.current * 2) {
      wrapper.scrollLeft -= wrapPointRef.current;
    } else if (wrapper.scrollLeft <= 0) {
      wrapper.scrollLeft += wrapPointRef.current;
    }

    // Schedule next frame
    animationFrameRef.current = requestAnimationFrame(autoScroll);
  }, []);

  // Start auto-scroll on mount
  useEffect(() => {
    calculateScrollMetrics();

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      lastTimestampRef.current = null;
      animationFrameRef.current = requestAnimationFrame(autoScroll);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoScroll, calculateScrollMetrics]);

  // Recalculate metrics on window resize
  useEffect(() => {
    const handleResize = () => {
      calculateScrollMetrics();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateScrollMetrics]);

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

  const normalizeScrollPosition = useCallback(() => {
    if (!wrapperRef.current || wrapPointRef.current === 0) {
      return;
    }

    if (wrapperRef.current.scrollLeft >= wrapPointRef.current * 2) {
      wrapperRef.current.scrollLeft -= wrapPointRef.current;
    } else if (wrapperRef.current.scrollLeft <= 0) {
      wrapperRef.current.scrollLeft += wrapPointRef.current;
    }
  }, []);

  const handlePrevious = useCallback((shouldScheduleResume = true) => {
    if (wrapperRef.current && scrollDistanceRef.current > 0) {
      setIsManuallyPaused(true);
      normalizeScrollPosition();
      const currentScroll = wrapperRef.current.scrollLeft;
      wrapperRef.current.scrollTo({
        left: currentScroll - scrollDistanceRef.current,
        behavior: 'smooth',
      });
      if (shouldScheduleResume) {
        scheduleResume();
      }
    }
  }, [normalizeScrollPosition, scheduleResume]);

  const handleNext = useCallback((shouldScheduleResume = true) => {
    if (wrapperRef.current && scrollDistanceRef.current > 0) {
      setIsManuallyPaused(true);
      normalizeScrollPosition();
      const currentScroll = wrapperRef.current.scrollLeft;
      wrapperRef.current.scrollTo({
        left: currentScroll + scrollDistanceRef.current,
        behavior: 'smooth',
      });
      if (shouldScheduleResume) {
        scheduleResume();
      }
    }
  }, [normalizeScrollPosition, scheduleResume]);

  // Handle touch events for mobile
  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      touchStartXRef.current = touch.clientX;
      touchStartYRef.current = touch.clientY;
      setIsTouching(true);
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
      const shouldResume = Boolean(touch);

      setIsTouching(false);

      let shouldNavigatePrevious = false;
      let shouldNavigateNext = false;

      if (touch && startX !== null && startY !== null) {
        touchStartXRef.current = null;
        touchStartYRef.current = null;

        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        const meetsSwipeThreshold = absDeltaX >= SWIPE_THRESHOLD;
        const isHorizontalSwipe = absDeltaX > absDeltaY;

        if (meetsSwipeThreshold && isHorizontalSwipe) {
          shouldNavigatePrevious = deltaX > 0;
          shouldNavigateNext = deltaX < 0;
        }
      }

      if (shouldNavigatePrevious) {
        handlePrevious(false);
      } else if (shouldNavigateNext) {
        handleNext(false);
      }

      if (shouldResume) {
        scheduleResume();
      }
    },
    [handleNext, handlePrevious, scheduleResume],
  );

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
            ref={wrapperRef}
            className={styles.carouselWrapper}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <div ref={trackRef} className={styles.carouselTrack}>
              {extendedServices.map((service, index) => (
                <div key={`${service.serviceId}-${index}`} className={styles.cardWrapper}>
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
