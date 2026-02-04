import React from 'react';
import { clinicInformation } from '@/shared/resources/clinic-information';
import styles from './TermsOfServicePage.module.scss';

/**
 * TermsOfServicePage Component
 * Terms of Service page for the clinic website
 *
 * Features:
 * - Terms of Service content with structured sections
 * - Effective date
 * - Contact information for terms-related inquiries
 * - Responsive design
 */
export const TermsOfServicePage: React.FC = () => {
  return (
    <div className={styles.termsOfServicePage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.effectiveDate}>EFFECTIVE DATE - JANUARY 1, 2025</p>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.subtitle}>
            Please read these terms carefully before using our services. Your agreement with Orthopedic Spine starts
            here.
          </p>
        </div>

        {/* Section 1: Acceptance of Terms */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
          <p className={styles.paragraph}>
            By accessing, visiting, or using this website or mobile app (the "Platform") owned by Orthopedic Spine
            ("we", "us", or "our") and/or by scheduling an appointment, making use of or receiving our clinic services,
            you agree to these Terms of Service and all applicable laws and regulations. If you do not agree with any of
            these terms, you are prohibited from using or accessing this Platform or receiving our clinic services. The
            materials contained in this Platform are protected by applicable copyright and trademark law. We reserve the
            right to modify these terms at any time. Changes will be effective immediately upon posting to this site.
            Your continued use or receipt of our clinic services following such changes constitutes your acceptance of
            the new terms.
          </p>
        </div>

        {/* Section 2: Services Provided */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Services Provided</h2>
          <p className={styles.paragraph}>
            Orthopedic Spine provides specialized physiotherapy services, including but not limited to spinal alignment,
            pain management, recovery sports injury rehabilitation, and chronic pain treatment when necessary.
          </p>
          <ul className={styles.list}>
            <li>Comprehensive physical assessments and diagnosis</li>
            <li>Dedicated treatment planning and goal setting</li>
            <li>Manual therapy, therapeutic exercises, and education</li>
            <li>Referral to other healthcare professionals when necessary.</li>
          </ul>
        </div>

        {/* Section 3: Patient Responsibilities */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Patient Responsibilities</h2>
          <p className={styles.paragraph}>
            Effective treatment requires a collaborative effort. As a patient of Orthopedic Spine, you agree to:
          </p>
          <ul className={styles.list}>
            <li>Provide accurate and complete information about your medical history and current conditions</li>
            <li>Follow the prescribed treatment plan and home exercise programs to the best of your ability</li>
            <li>
              Inform your Physiotherapist immediately of any unexpected changes to your condition or if any prescribed
              treatment worsens your symptoms or causes significant distress/discomfort/pain or other adverse reaction
            </li>
            <li>Respect the clinic environment and other patients.</li>
          </ul>
        </div>

        {/* Section 4: Cancellation Policy */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Cancellation Policy</h2>
          <p className={styles.paragraph}>
            We have limited first and last appointment slots for all patients, we have established the following policy:
          </p>
          <div className={styles.policySection}>
            <p className={styles.policyLabel}>Notice Period:</p>
            <p className={styles.paragraph}>
              A minimum of 24 hours notice is required for any appointment cancellation or rescheduling.
            </p>
          </div>
          <div className={styles.policySection}>
            <p className={styles.policyLabel}>Fees:</p>
            <p className={styles.paragraph}>
              Cancellations made with less than 24 hours' notice or failure to attend a scheduled appointment will
              result in a cancellation/missed appointment fee, equal to the full cost of the scheduled appointment,
              which you must pay/remit before your next scheduled appointment.
            </p>
          </div>
        </div>

        {/* Section 5: Privacy & Data Protection */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Privacy & Data Protection</h2>
          <p className={styles.paragraph}>
            Your privacy is of paramount importance to us. All personal health information is handled in strict
            accordance with Healthcare privacy regulations. Please refer to our{' '}
            <a href="/privacy-policy" className={styles.link}>
              Privacy Policy
            </a>{' '}
            for detailed information on how we collect, use, and protect your data.
          </p>
        </div>

        {/* Section 6: Limitation of Liability */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Limitation of Liability</h2>
          <p className={styles.paragraph}>
            To the maximum extent permitted by law, Orthopedic Spine and our employees shall not be liable for any
            indirect, incidental, special, consequential or punitive damages resulting from your use of our service or
            website.
          </p>
        </div>

        {/* Footer - Contact Information */}
        <div className={styles.footer}>
          <p className={styles.paragraph}>
            If you have any questions regarding these Terms of Service, please contact us at:{' '}
            <a href={`mailto:${clinicInformation.contact.email}`} className={styles.link}>
              {clinicInformation.contact.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
