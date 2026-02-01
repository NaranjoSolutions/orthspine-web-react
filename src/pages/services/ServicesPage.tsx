import React from 'react';
import { Button } from 'antd';
import { PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { allClinicServices } from '@/shared/resources/services/services';
import { ServiceCard } from '@/features/home/components/ServiceCard';
import { VisitOurClinic } from '@/features/home/components/VisitOurClinic';
import { MedicineBoxOutlined } from '@ant-design/icons';
import styles from './ServicesPage.module.scss';

/**
 * ServicesPage Component
 * Displays all clinic services with hero section and contact information
 *
 * Features:
 * - Hero section with title, subtitle, and CTA buttons
 * - Grid of all clinic services
 * - Contact section at the bottom
 */
export const ServicesPage: React.FC = () => {
  const handleContactNow = () => {
    // Scroll to contact section
    const contactSection = document.querySelector('#contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScheduleAppointment = () => {
    // TODO: Navigate to appointment booking or open scheduling modal
    console.log('Schedule appointment clicked');
  };

  return (
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.iconWrapper}>
            <MedicineBoxOutlined className={styles.heroIcon} />
          </div>
          <h1 className={styles.heroTitle}>Our Services</h1>
          <p className={styles.heroSubtitle}>
            At Orthopedic Spine, we offer specialized medical care and comprehensive rehabilitation to help you regain
            your mobility and quality of life. Our team of professionals is committed to your well-being.
          </p>
          <div className={styles.buttonGroup}>
            <Button
              type="primary"
              size="large"
              icon={<PhoneOutlined />}
              className={styles.primaryButton}
              onClick={handleContactNow}
            >
              Contact Now
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<ClockCircleOutlined />}
              className={styles.secondaryButton}
              onClick={handleScheduleAppointment}
            >
              Schedule Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Medical Specialties</h2>
            <p className={styles.sectionSubtitle}>
              Discover our specialties designed to treat a wide range of orthopedic conditions
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {allClinicServices.map((service) => (
              <div key={service.serviceId} className={styles.gridItem}>
                <ServiceCard
                  title={service.title}
                  shortDescription={service.shortDescription}
                  image={service.image}
                  alt={service.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact-section">
        <VisitOurClinic />
      </div>
    </div>
  );
};

export default ServicesPage;
