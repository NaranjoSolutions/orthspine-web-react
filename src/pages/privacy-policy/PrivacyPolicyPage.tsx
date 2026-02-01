import React from 'react';
import { clinicInformation } from '@/shared/resources/clinic-information';
import styles from './PrivacyPolicyPage.module.scss';

/**
 * PrivacyPolicyPage Component
 * Privacy Policy page for the clinic website
 *
 * Features:
 * - Privacy policy content with structured sections
 * - Last updated date
 * - Contact information for privacy-related inquiries
 * - Responsive design
 */
export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className={styles.privacyPolicyPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: October 24, 2024</p>
        </div>

        {/* Introduction */}
        <div className={styles.section}>
          <p className={styles.paragraph}>
            At Orthopedic Spine, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our clinic or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </div>

        {/* Section 1: Collection of Your Information */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Collection of Your Information</h2>
          <p className={styles.paragraph}>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address and browser type.
            </li>
            <li>
              <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.
            </li>
            <li>
              <strong>Medical Information:</strong> Details regarding your physical health or conditions provided through our contact forms or during consultations.
            </li>
          </ul>
        </div>

        {/* Section 2: Use of Your Information */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Use of Your Information</h2>
          <p className={styles.paragraph}>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul className={styles.list}>
            <li>Provide and manage healthcare services.</li>
            <li>Process appointments, payments, and other transactions.</li>
            <li>Send you administrative information regarding promotions and the Site.</li>
            <li>
              Respond to inquiries and provide customer support. If you are a new user, We may also use the information to fulfill and manage appointments, payments, and other transactions related to the Site.
            </li>
            <li>Improve our services and develop new features.</li>
          </ul>
        </div>

        {/* Section 3: Disclosure of Your Information */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Disclosure of Your Information</h2>
          <p className={styles.paragraph}>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </li>
            <li>
              <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </li>
            <li>
              <strong>Professional Advisors:</strong> We may share your information with our lawyers, accountants, and other professional advisors.
            </li>
          </ul>
        </div>

        {/* Section 4: Security of Your Information */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Security of Your Information</h2>
          <p className={styles.paragraph}>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </div>

        {/* Section 5: Your Privacy Rights */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Your Privacy Rights</h2>
          <p className={styles.paragraph}>
            Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete the personal information we hold about you. You may also have the right to object to or limit certain types of processing.
          </p>
        </div>

        {/* Section 6: Contact Us */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Contact Us</h2>
          <p className={styles.paragraph}>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <div className={styles.contactInfo}>
            <p className={styles.paragraph}>
              <strong>{clinicInformation.name}</strong>
            </p>
            <p className={styles.paragraph}>{clinicInformation.location.address}</p>
            <p className={styles.paragraph}>
              Email: <a href={`mailto:${clinicInformation.contact.email}`}>{clinicInformation.contact.email}</a>
            </p>
            <p className={styles.paragraph}>
              Phone: <a href={`tel:${clinicInformation.contact.phones[0]}`}>{clinicInformation.contact.phones[0]}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
