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
        <h2 className={styles.sectionTitle}>Nuestros Valores Fundamentales</h2>
        <div className={styles.valuesGrid}>
          <ValueCard
            icon="patient-centered"
            title="Atención Centrada en el Paciente"
            description="Adaptamos cada plan de tratamiento para alinearse con sus objetivos de estilo de vida personal y trayectoria de recuperación."
          />
          <ValueCard
            icon="evidence-based"
            title="Basado en Evidencia"
            description="Nuestros métodos se fundamentan en las últimas investigaciones clínicas y estudios ortopédicos para resultados comprobados."
          />
          <ValueCard
            icon="continuous-improvement"
            title="Mejora Continua"
            description="Invertimos en educación continua del personal y tecnología médica de vanguardia cada año."
          />
        </div>
      </div>
    </section>
  );
};
