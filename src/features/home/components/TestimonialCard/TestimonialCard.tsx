import React from 'react';
import { Card } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import styles from './TestimonialCard.module.scss';

interface TestimonialCardProps {
  patientName: string;
  rating: number;
  testimonial: string;
  condition?: string;
  date?: string;
}

/**
 * TestimonialCard Component
 * Displays a single patient testimonial with rating and quote
 *
 * @param patientName - Name of the patient
 * @param rating - Rating out of 5 stars
 * @param testimonial - Patient testimonial text
 * @param condition - Patient's condition or treatment (optional)
 * @param date - Date of the testimonial (optional)
 */
export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  patientName,
  rating,
  testimonial,
  condition,
  date,
}) => {
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
        <div className={styles.authorInfo}>
          <div className={styles.authorDetails}>
            <p className={styles.patientName}>{patientName}</p>
            {condition && <p className={styles.condition}>{condition}</p>}
          </div>
          {date && <p className={styles.date}>{date}</p>}
        </div>
      </div>
    </Card>
  );
};
