import React from 'react';
import { Button } from 'antd';
import { QuestionCircleOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { clinicInformation } from '@/shared/resources/clinic-information';
import styles from './ServiceCTA.module.scss';

/**
 * ServiceCTA Component
 * Call-to-action section for users unsure about which service they need
 *
 * Features:
 * - Question icon with descriptive text
 * - Contact Us button (navigates to contact page)
 * - Chat on WhatsApp button (opens WhatsApp chat)
 */
export const ServiceCTA: React.FC = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate(ROUTE_PATHS.CONTACT);
  };

  const handleWhatsAppChat = () => {
    // Validate phone number availability
    const phone = clinicInformation.contact.phones[0];
    if (!phone) {
      console.error('No phone number available for WhatsApp');
      return;
    }

    // Format phone number for WhatsApp (remove + and spaces)
    const phoneNumber = phone.replace(/[+\s-]/g, '');
    const message = encodeURIComponent('¡Hola! Me gustaría saber más sobre sus servicios.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className={styles.serviceCTA}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <QuestionCircleOutlined className={styles.icon} />
        </div>
        <h2 className={styles.title}>¿No está seguro de qué servicio necesita?</h2>
        <p className={styles.description}>
          Hable con nuestros especialistas hoy para encontrar el plan de tratamiento adecuado para su condición. Ofrecemos evaluaciones iniciales para guiar su trayectoria de recuperación.
        </p>
        <div className={styles.buttonGroup}>
          <Button
            type="primary"
            size="large"
            icon={<MailOutlined />}
            className={styles.contactButton}
            onClick={handleContactUs}
          >
            Contáctenos
          </Button>
          <Button
            size="large"
            icon={<WhatsAppOutlined />}
            className={styles.whatsappButton}
            onClick={handleWhatsAppChat}
          >
            Chat por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};
