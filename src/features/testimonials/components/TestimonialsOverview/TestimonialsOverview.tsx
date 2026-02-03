import React from 'react';
import { Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { RatingBreakdown } from '../RatingBreakdown';
import styles from './TestimonialsOverview.module.scss';

interface TestimonialsOverviewProps {
  averageRating: number;
  totalReviews: number;
  ratingCounts: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

/**
 * TestimonialsOverview Component
 * Displays the overall rating statistics and breakdown
 *
 * @param averageRating - Average rating score (e.g., 4.8)
 * @param totalReviews - Total number of reviews
 * @param ratingCounts - Count of reviews for each rating (1-5 stars)
 */
export const TestimonialsOverview: React.FC<TestimonialsOverviewProps> = ({
  averageRating,
  totalReviews,
  ratingCounts,
}) => {
  const renderStars = () => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarFilled key={star} className={styles.star} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Patient Success Stories</h1>
        <p className={styles.subtitle}>
          Hear from those who reclaimed their mobility and life through our specialized spine care and expert
          rehabilitation programs.
        </p>
      </div>

      <div className={styles.ratingSection}>
        <div className={styles.averageRating}>
          <div className={styles.ratingNumber}>{averageRating.toFixed(1)}</div>
          {renderStars()}
          <div className={styles.reviewCount}>Based on {totalReviews.toLocaleString()}+ reviews</div>
        </div>

        <div className={styles.ratingBreakdownWrapper}>
          <RatingBreakdown totalReviews={totalReviews} ratingCounts={ratingCounts} />
        </div>

        <div className={styles.actionSection}>
          <Button type="primary" size="large" className={styles.leaveReviewButton}>
            Leave a Review
          </Button>
        </div>
      </div>
    </div>
  );
};
