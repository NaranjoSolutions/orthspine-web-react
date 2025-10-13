import React from 'react';
import { Card } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import styles from './TestimonialCard.module.scss';

interface TestimonialCardProps {
  patientName: string;
  rating: number;
  testimonial: string;
}

/**
 * TestimonialCard Component
 * Displays a single patient testimonial with rating and quote
 *
 * @param patientName - Name of the patient
 * @param rating - Rating out of 5 stars
 * @param testimonial - Patient testimonial text
 */
export const TestimonialCard: React.FC<TestimonialCardProps> = ({ patientName, rating, testimonial }) => {
  const renderStars = () => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) =>
          star <= rating ? (
            <StarFilled key={star} className={styles.starFilled} />
          ) : (
            <StarOutlined key={star} className={styles.starOutlined} />
          )
        )}
      </div>
    );
  };

  return (
    <Card className={styles.testimonialCard}>
      <div className={styles.cardContent}>
        {renderStars()}
        <p className={styles.testimonial}>"{testimonial}"</p>
        <p className={styles.patientName}>- {patientName}</p>
      </div>
    </Card>
  );
};
