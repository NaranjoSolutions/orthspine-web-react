import React from 'react';
import { Card } from 'antd';
import styles from './ServiceCard.module.scss';

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  image: string;
  alt: string;
  icon?: React.ReactNode;
}

/**
 * ServiceCard Component
 * Displays a single service card with image, icon, title and description
 *
 * @param title - Service title
 * @param shortDescription - Brief description of the service
 * @param image - Service image URL
 * @param alt - Image alt text
 * @param icon - Optional icon to display
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({ title, shortDescription, image, alt, icon }) => {
  return (
    <Card className={styles.serviceCard} hoverable cover={<img alt={alt} src={image} className={styles.cardImage} />}>
      <div className={styles.cardContent}>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{shortDescription}</p>
      </div>
    </Card>
  );
};
