import React from 'react';
import { Card, Row, Col, Typography, Space } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { CLINIC_ADDRESS } from '../../config/contact.config';
import { clinicInformation, parseScheduleEntry } from '@/shared/resources/clinic-information';
import styles from './ClinicInformationCards.module.scss';

const { Title, Text, Link } = Typography;

/**
 * Information card type definition
 */
interface InfoCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

/**
 * ClinicInformationCards Component
 * Displays essential clinic information in card format using AntD components
 *
 * Features:
 * - Clinic name and address
 * - Hours of operation
 * - Contact phone number
 * - Email address
 * - Clean, icon-based design using AntD Card
 * - Responsive layout with AntD Grid system
 * - Enhanced visual hierarchy
 */
export const ClinicInformationCards: React.FC = () => {
  const infoCards: InfoCard[] = [
    {
      id: 'address',
      icon: <EnvironmentOutlined />,
      title: 'Ubicación',
      content: (
        <Space direction="vertical" size={4}>
          <Text strong className={styles.clinicName}>
            {clinicInformation.name}
          </Text>
          <Text className={styles.addressText}>{CLINIC_ADDRESS.FULL}</Text>
        </Space>
      ),
    },
    {
      id: 'hours',
      icon: <ClockCircleOutlined />,
      title: 'Horario de Atención',
      content: (
        <Space direction="vertical" size={4}>
          {clinicInformation.schedule.map((scheduleItem, index) => {
            const { label, hours } = parseScheduleEntry(scheduleItem);
            return (
              <div key={index} className={styles.hoursRow}>
                {label && (
                  <Text strong className={styles.hoursLabel}>
                    {label}:
                  </Text>
                )}
                <Text className={styles.hoursValue}>{hours}</Text>
              </div>
            );
          })}
        </Space>
      ),
    },
    {
      id: 'phone',
      icon: <PhoneOutlined />,
      title: 'Teléfono',
      content: (
        <Link href={`tel:${clinicInformation.contact.phones[0]}`} className={styles.contactLink}>
          {clinicInformation.contact.phones[0]}
        </Link>
      ),
    },
    {
      id: 'email',
      icon: <MailOutlined />,
      title: 'Correo Electrónico',
      content: (
        <Link href={`mailto:${clinicInformation.contact.email}`} className={styles.contactLink}>
          {clinicInformation.contact.email}
        </Link>
      ),
    },
  ];

  return (
    <div className={styles.infoCardsContainer}>
      <Title level={2} className={styles.sectionTitle}>
        Información de la Clínica
      </Title>
      <Space direction="vertical" size="middle" className={styles.cardsGrid}>
        {infoCards.map((card) => (
          <Card key={card.id} hoverable className={styles.infoCard}>
            <Row gutter={16} align="middle">
              <Col flex="none">
                <div className={styles.iconWrapper}>{card.icon}</div>
              </Col>
              <Col flex="auto">
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                  <Title level={5} className={styles.cardTitle}>
                    {card.title}
                  </Title>
                  <div className={styles.cardText}>{card.content}</div>
                </Space>
              </Col>
            </Row>
          </Card>
        ))}
      </Space>
    </div>
  );
};
