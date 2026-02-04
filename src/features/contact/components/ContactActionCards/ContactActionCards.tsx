import React from 'react';
import { Button, Card, Row, Col, Space, Typography } from 'antd';
import { WhatsAppOutlined, MailOutlined, PhoneOutlined, RightOutlined } from '@ant-design/icons';
import { WHATSAPP_CONFIG, CONTACT_PHONE } from '../../config/contact.config';
import styles from './ContactActionCards.module.scss';

const { Title, Paragraph } = Typography;

/**
 * Action card type definition
 */
interface ActionCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonColor: 'whatsapp' | 'primary' | 'teal';
  action: () => void;
}

/**
 * ContactActionCards Component
 * Displays three action cards for different contact methods using AntD Card
 *
 * Features:
 * - WhatsApp quick contact
 * - Scroll to contact form
 * - Direct phone call
 * - Responsive layout using AntD Grid system
 * - Hover effects and smooth interactions
 */
export const ContactActionCards: React.FC = () => {
  /**
   * Smooth scroll to the inquiry form section
   * Logs a warning if the form element is not found
   */
  const handleScrollToForm = () => {
    const formElement = document.getElementById('inquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn('Inquiry form element not found (id="inquiry-form")');
    }
  };

  /**
   * Open WhatsApp chat in a new window
   */
  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_CONFIG.URL, '_blank', 'noopener,noreferrer');
  };

  /**
   * Initiate phone call
   */
  const handlePhoneClick = () => {
    window.location.href = `tel:${CONTACT_PHONE.PRIMARY}`;
  };

  const actionCards: ActionCard[] = [
    {
      id: 'whatsapp',
      icon: <WhatsAppOutlined />,
      title: 'Chatea en WhatsApp',
      subtitle: 'Obtén respuestas rápidas a tus preguntas',
      buttonText: 'Enviar Mensaje',
      buttonColor: 'whatsapp',
      action: handleWhatsAppClick,
    },
    {
      id: 'email',
      icon: <MailOutlined />,
      title: 'Envíanos un Mensaje',
      subtitle: 'Llena nuestro formulario de contacto abajo',
      buttonText: 'Ir al Formulario',
      buttonColor: 'primary',
      action: handleScrollToForm,
    },
    {
      id: 'phone',
      icon: <PhoneOutlined />,
      title: 'Llámanos',
      subtitle: CONTACT_PHONE.DISPLAY,
      buttonText: 'Llamar Ahora',
      buttonColor: 'teal',
      action: handlePhoneClick,
    },
  ];

  return (
    <div className={styles.actionCardsContainer}>
      <Row gutter={[24, 24]}>
        {actionCards.map((card) => (
          <Col key={card.id} xs={24} md={8}>
            <Card hoverable className={styles.actionCard}>
              <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
                <div className={`${styles.iconWrapper} ${styles[`iconWrapper--${card.buttonColor}`]}`}>{card.icon}</div>

                <div>
                  <Title level={4} className={styles.cardTitle}>
                    {card.title}
                  </Title>
                  <Paragraph className={styles.cardSubtitle}>{card.subtitle}</Paragraph>
                </div>

                <Button
                  type="primary"
                  size="large"
                  icon={<RightOutlined />}
                  iconPosition="end"
                  onClick={card.action}
                  className={`${styles.actionButton} ${styles[`actionButton--${card.buttonColor}`]}`}
                  block
                >
                  {card.buttonText}
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
