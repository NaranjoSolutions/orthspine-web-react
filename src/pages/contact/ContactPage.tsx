import React from 'react';
import { ContactActionCards } from '@/features/contact/components/ContactActionCards';
import { ContactForm } from '@/features/contact/components/ContactForm';
import { LocationMap } from '@/features/contact/components/LocationMap';
import { ClinicInformationCards } from '@/features/contact/components/ClinicInformationCards';
import styles from './ContactPage.module.scss';

/**
 * ContactPage Component
 * Redesigned Contact Us page for the clinic website
 *
 * Features:
 * - Hero header with updated subtitle
 * - Quick action cards (WhatsApp, Email, Phone)
 * - Comprehensive inquiry form with scheduling
 * - Interactive location map
 * - Clinic information cards (address, hours, parking, accessibility)
 * - Fully responsive design
 * - Accessibility compliant
 */
export const ContactPage: React.FC = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            Our team is here to help you get back to your active lifestyle. Reach out via your preferred method or visit
            our clinic.
          </p>
        </div>

        {/* Action Cards Section */}
        <ContactActionCards />

        {/* Contact Form Section */}
        <div className={styles.formSection}>
          <ContactForm />
        </div>

        {/* Bottom Section: Map + Info Cards */}
        <div className={styles.bottomSection}>
          <div className={styles.mapColumn}>
            <LocationMap />
          </div>
          <div className={styles.infoColumn}>
            <ClinicInformationCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
