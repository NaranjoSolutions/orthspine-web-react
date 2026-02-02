import React from 'react';
import { Button } from 'antd';
import {
  WhatsAppOutlined,
  MailOutlined,
  PhoneOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { WHATSAPP_CONFIG, CONTACT_PHONE } from '../../config/contact.config';
import styles from './ContactActionCards.module.scss';

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
 * Displays three action cards for different contact methods
 *
 * Features:
 * - WhatsApp quick contact
 * - Scroll to contact form
 * - Direct phone call
 * - Responsive layout (horizontal on desktop, stacked on mobile)
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
      console.warn('Inquiry form element with id="inquiry-form" not found. Please ensure ContactForm component has the correct ID.');
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
      title: 'Chat on WhatsApp',
      subtitle: 'Get quick answers to your questions',
      buttonText: 'Message Now',
      buttonColor: 'whatsapp',
      action: handleWhatsAppClick,
    },
    {
      id: 'email',
      icon: <MailOutlined />,
      title: 'Send Us a Message',
      subtitle: 'Fill out our contact form below',
      buttonText: 'Scroll to Form',
      buttonColor: 'primary',
      action: handleScrollToForm,
    },
    {
      id: 'phone',
      icon: <PhoneOutlined />,
      title: 'Call Us',
      subtitle: CONTACT_PHONE.DISPLAY,
      buttonText: 'Call Now',
      buttonColor: 'teal',
      action: handlePhoneClick,
    },
  ];

  return (
    <div className={styles.actionCardsContainer}>
      <div className={styles.cardsGrid}>
        {actionCards.map((card) => (
          <div key={card.id} className={styles.actionCard}>
            <div
              className={`${styles.iconWrapper} ${
                styles[`iconWrapper--${card.buttonColor}`]
              }`}
            >
              {card.icon}
            </div>

            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardSubtitle}>{card.subtitle}</p>

            <Button
              type="primary"
              size="large"
              icon={<RightOutlined />}
              iconPosition="end"
              onClick={card.action}
              className={`${styles.actionButton} ${
                styles[`actionButton--${card.buttonColor}`]
              }`}
              block
            >
              {card.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
