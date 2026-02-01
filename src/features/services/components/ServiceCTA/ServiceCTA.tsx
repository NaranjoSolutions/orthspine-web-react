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
    // Format phone number for WhatsApp (remove + and spaces)
    const phoneNumber = clinicInformation.contact.phones[0].replace(/[+\s-]/g, '');
    const message = encodeURIComponent('Hello! I would like to know more about your services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className={styles.serviceCTA}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <QuestionCircleOutlined className={styles.icon} />
        </div>
        <h2 className={styles.title}>Not sure which service you need?</h2>
        <p className={styles.description}>
          Speak with our specialists today to find the right treatment plan for your condition. 
          We offer initial assessments to guide your recovery journey.
        </p>
        <div className={styles.buttonGroup}>
          <Button
            type="primary"
            size="large"
            icon={<MailOutlined />}
            className={styles.contactButton}
            onClick={handleContactUs}
          >
            Contact Us
          </Button>
          <Button
            size="large"
            icon={<WhatsAppOutlined />}
            className={styles.whatsappButton}
            onClick={handleWhatsAppChat}
          >
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};
