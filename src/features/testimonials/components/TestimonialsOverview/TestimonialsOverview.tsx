import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { RatingBreakdown } from '../RatingBreakdown';
import { TestimonialSubmissionForm } from '../TestimonialSubmissionForm';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderStars = () => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarFilled key={star} className={styles.star} />
        ))}
      </div>
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.overviewContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Historias de Éxito de Pacientes</h1>
          <p className={styles.subtitle}>
            Escuche a quienes recuperaron su movilidad y vida a través de nuestra atención especializada de columna vertebral y programas expertos de rehabilitación.
          </p>
        </div>

        <div className={styles.ratingSection}>
          <div className={styles.averageRating}>
            <div className={styles.ratingNumber}>{averageRating.toFixed(1)}</div>
            {renderStars()}
            <div className={styles.reviewCount}>Basado en {totalReviews.toLocaleString()}+ reseñas</div>
          </div>

          <div className={styles.ratingBreakdownWrapper}>
            <RatingBreakdown totalReviews={totalReviews} ratingCounts={ratingCounts} />
          </div>

          <div className={styles.actionSection}>
            <Button type="primary" size="large" className={styles.leaveReviewButton} onClick={handleOpenModal}>
              Dejar una Reseña
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
        centered
        className={styles.testimonialModal}
      >
        <TestimonialSubmissionForm onSuccess={handleCloseModal} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
};
