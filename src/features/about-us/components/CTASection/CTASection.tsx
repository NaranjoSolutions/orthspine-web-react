import React from 'react';
import { Button } from 'antd';
import styles from './CTASection.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';

/**
 * CTASection Component
 * Call-to-action section to book an appointment or view pricing
 * @returns React component with CTA buttons
 */
export const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBookAppointment = () => {
    navigate(ROUTE_PATHS.BOOK_APPOINTMENT);
  };

  const handleViewPricing = () => {
    // TODO: Create dedicated pricing page route
    // 1. Add PRICING: '/pricing' to ROUTE_PATHS in src/routing/config/routePaths.ts
    // 2. Create PricingPage component in src/pages/pricing/
    // 3. Add route configuration in routing setup
    // For now, navigate to services page as a reasonable alternative
    navigate(ROUTE_PATHS.SERVICES);
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to start your recovery?</h2>
        <p className={styles.description}>
          Join hundreds of patients who have found relief through our expert care. 
          Schedule your initial consultation today.
        </p>
        <div className={styles.buttonGroup}>
          <Button 
            type="primary" 
            size="large" 
            className={styles.primaryButton} 
            onClick={handleBookAppointment}
          >
            Book Appointment Now
          </Button>
          <Button 
            size="large" 
            className={styles.secondaryButton} 
            onClick={handleViewPricing}
          >
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};
