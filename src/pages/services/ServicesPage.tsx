import React from 'react';
import { Button } from 'antd';
import { PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { allClinicServices } from '@/shared/resources/services/services';
import { ServiceCard } from '@/features/home/components/ServiceCard';
import { ContactSection } from '@/features/home/components/ContactSection';
import {
  MedicineBoxOutlined,
  HeartOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import styles from './ServicesPage.module.scss';

const serviceIcons: Record<string, React.ReactNode> = {
  spine: <MedicineBoxOutlined />,
  knee: <MedicineBoxOutlined />,
  hip: <MedicineBoxOutlined />,
  shoulder: <MedicineBoxOutlined />,
  'foot-and-hand': <MedicineBoxOutlined />,
  rehabilitation: <HeartOutlined />,
  circulation: <HeartOutlined />,
  sports: <ThunderboltOutlined />,
};

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
          <h1 className={styles.heroTitle}>Nuestros Servicios</h1>
          <p className={styles.heroSubtitle}>
            En Orthopedic Spine ofrecemos atención médica especializada y rehabilitación integral para
            ayudarte a recuperar tu movilidad y calidad de vida. Nuestro equipo de profesionales está
            comprometido con tu bienestar.
          </p>
          <div className={styles.buttonGroup}>
            <Button
              type="primary"
              size="large"
              icon={<PhoneOutlined />}
              className={styles.primaryButton}
              onClick={handleContactNow}
            >
              Contactar Ahora
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<ClockCircleOutlined />}
              className={styles.secondaryButton}
              onClick={handleScheduleAppointment}
            >
              Agendar Cita
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Especialidades Médicas</h2>
            <p className={styles.sectionSubtitle}>
              Descubre nuestras especialidades diseñadas para tratar una amplia gama de condiciones ortopédicas
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
                  icon={serviceIcons[service.serviceId]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact-section">
        <ContactSection />
      </div>
    </div>
  );
};

export default ServicesPage;
