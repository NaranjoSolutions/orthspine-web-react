import React from 'react';
import { Card } from 'antd';
import { ClockCircleOutlined, BulbOutlined, SafetyOutlined } from '@ant-design/icons';
import styles from './ValuesSection.module.scss';

interface ValueCardProps {
  icon: 'history' | 'philosophy' | 'commitment';
  title: string;
  description: string;
}

const iconMap = {
  history: ClockCircleOutlined,
  philosophy: BulbOutlined,
  commitment: SafetyOutlined,
};

/**
 * ValueCard Component
 * Individual card for displaying a clinic value
 */
const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  const IconComponent = iconMap[icon];

  return (
    <Card className={styles.valueCard} bordered={false}>
      <div className={styles.iconWrapper}>
        <IconComponent className={styles.icon} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </Card>
  );
};

/**
 * ValuesSection Component
 * Displays the three core values of the clinic
 */
export const ValuesSection: React.FC = () => {
  return (
    <section className={styles.valuesSection}>
      <div className={styles.container}>
        <div className={styles.valuesGrid}>
          <ValueCard
            icon="history"
            title="Our History"
            description="Founded with the vision of transforming spinal care, our clinic has grown from a small consulting office to a spine orthopedics reference center, always pioneers in technology and personalized care."
          />
          <ValueCard
            icon="philosophy"
            title="Our Philosophy"
            description="We believe in a holistic approach, treating the patient, not just the pathology. Education, prevention, and empathy are the pillars of our daily practice to ensure the comprehensive well-being of those who trust us."
          />
          <ValueCard
            icon="commitment"
            title="Our Commitment"
            description="We are committed to clinical excellence, constant innovation, and above all, to the recovery and quality of life of our patients. Your trust is our greatest responsibility."
          />
        </div>
      </div>
    </section>
  );
};
