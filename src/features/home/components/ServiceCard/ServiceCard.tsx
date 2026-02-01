import React from 'react';
import { Card } from 'antd';
import styles from './ServiceCard.module.scss';

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  image: string;
  alt: string;
  conditionsTreated?: string[];
}

/**
 * ServiceCard Component
 * Displays a single service card with image, title and description
 *
 * @param title - Service title
 * @param shortDescription - Brief description of the service
 * @param image - Service image URL
 * @param alt - Image alt text
 * @param conditionsTreated - List of conditions treated by the service
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({ title, shortDescription, image, alt, conditionsTreated }) => {
  return (
    <Card className={styles.serviceCard} hoverable cover={<img alt={alt} src={image} className={styles.cardImage} />}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{shortDescription}</p>
        {conditionsTreated && conditionsTreated.length > 0 && (
          <div className={styles.conditionsSection}>
            <h4 className={styles.conditionsTitle}>Conditions Treated:</h4>
            <ul className={styles.conditionsList}>
              {conditionsTreated.slice(0, 3).map((condition, index) => (
                <li key={index} className={styles.conditionItem}>
                  {condition}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};
