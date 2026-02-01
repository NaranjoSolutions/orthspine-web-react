import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
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
  serviceId 
}) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <Card className={styles.serviceCard} hoverable cover={<img alt={alt} src={image} className={styles.cardImage} />}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{shortDescription}</p>
        {conditionsTreated && conditionsTreated.length > 0 && (
          <div className={styles.conditionsSection}>
            <h4 className={styles.conditionsTitle}>CONDITIONS TREATED</h4>
            <ul className={styles.conditionsList}>
              {conditionsTreated.slice(0, 3).map((condition, index) => (
                <li key={index} className={styles.conditionItem}>
                  {condition}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button 
          type="link" 
          className={styles.learnMoreButton}
          onClick={handleLearnMore}
          icon={<ArrowRightOutlined />}
          iconPosition="end"
        >
          Learn More
        </Button>
      </div>
    </Card>
  );
};
