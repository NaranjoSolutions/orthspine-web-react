import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TestimonialCard } from '../TestimonialCard';
import { patientTestimonials } from '@/shared/resources/testimonials/testimonials';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './TestimonialsCarousel.module.scss';

/**
 * TestimonialsCarousel Component
 * Displays patient testimonials in a horizontal scrolling carousel
 *
 * Features:
 * - Horizontal scrolling display
 * - Pauses animation on hover
 * - "View more" link to testimonials page
 */
export const TestimonialsCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the testimonials for seamless infinite scroll
  const extendedTestimonials = [...patientTestimonials, ...patientTestimonials, ...patientTestimonials];

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Testimonios de Pacientes</h2>
        </div>

        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`${styles.carouselTrack} ${isPaused ? styles.paused : ''}`}>
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

        <div className={styles.footer}>
          <Link to={ROUTE_PATHS.TESTIMONIALS} className={styles.viewMoreLink}>
            Ver más
          </Link>
        </div>
      </div>
    </section>
  );
};
