import React from 'react';
import { ContactInformation } from '@/features/contact/components/ContactInformation';
import { OperationalHours } from '@/features/contact/components/OperationalHours';
import { ContactForm } from '@/features/contact/components/ContactForm';
import { LocationMap } from '@/features/contact/components/LocationMap';
import styles from './ContactPage.module.scss';

/**
 * ContactPage Component
 * Contact Us page for the clinic website
 *
 * Features:
 * - Header with title and subtitle
 * - Contact information (phone, email, address)
 * - Operational hours
 * - Contact form for sending messages
 * - Interactive location map
 * - Responsive design
 */
export const ContactPage: React.FC = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            We're here to help. Get in touch with us using the information below.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Left Column - Contact Info & Hours */}
          <div className={styles.leftColumn}>
            <ContactInformation />
            <OperationalHours />
          </div>

          {/* Right Column - Contact Form */}
          <div className={styles.rightColumn}>
            <ContactForm />
          </div>
        </div>

        {/* Location Map */}
        <LocationMap />
      </div>
    </div>
  );
};

export default ContactPage;
