import React from 'react';
import { TestimonialsOverview } from '@/features/testimonials/components/TestimonialsOverview';
import { TestimonialsList } from '@/features/testimonials/components/TestimonialsList';
import { TestimonialsCTA } from '@/features/testimonials/components/TestimonialsCTA';
import { patientTestimonials } from '@/shared/resources/testimonials/testimonials';
import { useScrollToSection } from '@/shared/hooks';
import styles from './TestimonialsPage.module.scss';

/**
 * TestimonialsPage Component
 * Dedicated page for displaying all patient testimonials
 *
 * Features:
 * - Overview section with average rating and rating breakdown
 * - Filterable and sortable testimonials list
 * - Pagination support
 * - Responsive design
 */
export const TestimonialsPage: React.FC = () => {
  // Initialize scroll hook to handle page navigation
  useScrollToSection();

  // Calculate rating statistics
  const totalReviews = patientTestimonials.length;

  const ratingCounts = patientTestimonials.reduce(
    (acc, testimonial) => {
      acc[testimonial.rating as keyof typeof acc] += 1;
      return acc;
    },
    { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  );

  const totalRatingPoints = patientTestimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
  const averageRating = totalReviews > 0 ? totalRatingPoints / totalReviews : 0;

  return (
    <div className={styles.testimonialsPage}>
      <div className={styles.container}>
        <TestimonialsOverview averageRating={averageRating} totalReviews={totalReviews} ratingCounts={ratingCounts} />

        <TestimonialsList testimonials={patientTestimonials} />

        <TestimonialsCTA />
      </div>
    </div>
  );
};

export default TestimonialsPage;
