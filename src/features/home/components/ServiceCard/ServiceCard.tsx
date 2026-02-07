import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './ServiceCard.module.scss';

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  image: string;
  alt: string;
  conditionsTreated?: string[];
  serviceId: string;
}

/**
 * ServiceCard Component
 * Displays a single service card with image, title, description, and Learn More action
 * Features full-card clickability with accessibility support and modern design
 *
 * @param title - Service title
 * @param shortDescription - Brief description of the service
 * @param image - Service image URL
 * @param alt - Image alt text
 * @param conditionsTreated - List of conditions treated by the service
 * @param serviceId - Unique service identifier for navigation
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  shortDescription,
  image,
  alt,
  conditionsTreated,
  serviceId,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/services/${serviceId}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className={styles.serviceCard}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${title}`}
    >
      {/* Image Section with Gradient Overlay */}
      <div className={styles.imageWrapper}>
        <img src={image} alt={alt} className={styles.cardImage} />
        <div className={styles.imageOverlay} aria-hidden="true" />
      </div>

      {/* Card Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{shortDescription}</p>

        {/* Conditions Treated Section */}
        {conditionsTreated && conditionsTreated.length > 0 && (
          <div className={styles.conditionsSection}>
            <h4 className={styles.conditionsTitle}>Condiciones tratadas</h4>
            <ul className={styles.conditionsList}>
              {conditionsTreated.slice(0, 3).map((condition, index) => (
                <li key={index} className={styles.conditionItem}>
                  <CheckOutlined className={styles.checkIcon} aria-hidden="true" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <Button
          type="default"
          ghost
          className={styles.learnMoreButton}
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          tabIndex={-1}
          aria-hidden="true"
        >
          Saber Más
        </Button>
      </div>
    </article>
  );
};
