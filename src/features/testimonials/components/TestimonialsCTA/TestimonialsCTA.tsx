import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { clinicInformation } from '@/shared/resources/clinic-information';
import styles from './TestimonialsCTA.module.scss';

/**
 * TestimonialsCTA Component
 * Call-to-action section encouraging users to share their success story
 *
 * Features:
 * - Prominent heading and description
 * - Contact Us button
 * - WhatsApp button for quick contact
 * - Responsive design with mobile optimization
 */
export const TestimonialsCTA: React.FC = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate(ROUTE_PATHS.CONTACT);
  };

  const handleWhatsAppClick = () => {
    // Format phone number for WhatsApp (remove spaces and special characters)
    const phoneNumber = clinicInformation.contact.phones[0].replace(/[\s-]/g, '');
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <h2 className={styles.heading}>Ready to Write Your Success Story?</h2>
        <p className={styles.description}>
          Our specialists are ready to help you navigate your journey back to a pain-free life. Book your initial
          assessment today.
        </p>
        <div className={styles.buttonGroup}>
          <Button type="default" size="large" className={styles.contactButton} onClick={handleContactClick}>
            Contact Us
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<WhatsAppOutlined />}
            className={styles.whatsappButton}
            onClick={handleWhatsAppClick}
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};
