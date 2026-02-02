import React from 'react';
import { Card } from 'antd';
import { HeartOutlined, ExperimentOutlined, RiseOutlined } from '@ant-design/icons';
import styles from './ValuesSection.module.scss';

interface ValueCardProps {
  icon: 'patient-centered' | 'evidence-based' | 'continuous-improvement';
  title: string;
  description: string;
}

const iconMap = {
  'patient-centered': HeartOutlined,
  'evidence-based': ExperimentOutlined,
  'continuous-improvement': RiseOutlined,
};

/**
 * ValueCard Component
 * Individual card for displaying a clinic value
 * @param icon - The icon identifier for the value
 * @param title - The title of the value
 * @param description - The description of the value
 * @returns React component displaying a value card
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
 * @returns React component with core values cards
 */
export const ValuesSection: React.FC = () => {
  return (
    <section className={styles.valuesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          <ValueCard
            icon="patient-centered"
            title="Patient-Centered Care"
            description="Tailoring every treatment plan to align with your personal lifestyle goals and recovery journey."
          />
          <ValueCard
            icon="evidence-based"
            title="Evidence-Based"
            description="Our methods are grounded in the latest clinical research and orthopedic studies for proven results."
          />
          <ValueCard
            icon="continuous-improvement"
            title="Continuous Improvement"
            description="Investing in ongoing staff education and state-of-the-art medical technology every year."
          />
        </div>
      </div>
    </section>
  );
};
