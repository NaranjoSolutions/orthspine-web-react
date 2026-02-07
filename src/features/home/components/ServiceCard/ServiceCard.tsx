import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
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
 * Enhanced ServiceCard Component
 * Displays a service card with full-width image, gradient overlay, improved typography,
 * icon-based bullet list, and ghost/outlined button for navigation
 *
 * Features:
 * - Full-width image with fixed height and top rounded corners
 * - Bottom gradient overlay on image
 * - Improved typography and spacing
 * - Sentence-case section label
 * - Icon-based bullet list using CheckOutlined
 * - Ghost/outlined "Saber Más" button for navigation (border in brand color, subtle hover)
 * - Card hover effects (elevation, translate, image scale)
 * - Consistent padding, background, border, shadow for medical aesthetic
 * - Accessible: semantic structure, focus states, keyboard navigation
 * - Single interactive element (button only) to avoid nested interactive element issues
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

  const handleButtonClick = () => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <article className={styles.serviceCard}>
      {/* Full-width image with gradient overlay */}
      <div className={styles.imageContainer}>
        <img src={image} alt={alt} className={styles.cardImage} />
        <div className={styles.imageGradient} aria-hidden="true" />
      </div>

      {/* Card content */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{shortDescription}</p>

        {conditionsTreated && conditionsTreated.length > 0 && (
          <div className={styles.conditionsSection}>
            <p className={styles.conditionsTitle}>Condiciones tratadas</p>
            <ul className={styles.conditionsList} aria-label="Lista de condiciones tratadas">
              {conditionsTreated.slice(0, 3).map((condition, index) => (
                <li key={index} className={styles.conditionItem}>
                  <CheckOutlined className={styles.conditionIcon} aria-hidden="true" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className={styles.ctaButton}
          onClick={handleButtonClick}
          aria-label={`Ver más sobre ${title}`}
        >
          Saber Más
        </button>
      </div>
    </article>
  );
};
