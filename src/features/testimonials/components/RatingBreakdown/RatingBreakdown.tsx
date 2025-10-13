import React from 'react';
import { Progress } from 'antd';
import styles from './RatingBreakdown.module.scss';

interface RatingBreakdownProps {
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
 * RatingBreakdown Component
 * Displays a breakdown of ratings with progress bars
 *
 * @param totalReviews - Total number of reviews
 * @param ratingCounts - Count of reviews for each rating (1-5 stars)
 */
export const RatingBreakdown: React.FC<RatingBreakdownProps> = ({ totalReviews, ratingCounts }) => {
  const calculatePercentage = (count: number): number => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  const ratings = [5, 4, 3, 2, 1] as const;

  return (
    <div className={styles.ratingBreakdown}>
      {ratings.map((rating) => {
        const count = ratingCounts[rating];
        const percentage = calculatePercentage(count);

        return (
          <div key={rating} className={styles.ratingRow}>
            <span className={styles.starLabel}>{rating}</span>
            <Progress
              percent={percentage}
              showInfo={false}
              strokeColor="#fadb14"
              trailColor="#e8e8e8"
              className={styles.progressBar}
            />
            <span className={styles.percentage}>{percentage}%</span>
          </div>
        );
      })}
    </div>
  );
};
