import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { CheckCircleOutlined, FileTextOutlined, MedicineBoxOutlined, RocketOutlined, TrophyOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { allClinicServices } from '@/shared/resources/services/services';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './ServiceDetailPage.module.scss';

/**
 * ServiceDetailPage Component
 * Displays detailed information about a specific clinic service
 *
 * Features:
 * - Dynamic service loading based on URL parameter
 * - Hero section with title and short description
 * - Comprehensive description section
 * - Conditions treated list with icons
 * - Treatment approach with numbered steps
 * - Call-to-action section
 *
 * @returns Service detail page or redirect if service not found
 */
export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  // Find the service by ID
  const service = allClinicServices.find((s) => s.serviceId === serviceId);

  // Redirect to services page if service not found
  if (!service) {
    return <Navigate to={ROUTE_PATHS.SERVICES} replace />;
  }

  // Handle CTA button clicks
  const handleScheduleAppointment = () => {
    navigate(ROUTE_PATHS.BOOK_APPOINTMENT);
  };

  const handleViewTeam = () => {
    navigate(ROUTE_PATHS.ABOUT);
  };

  // Icons for treatment approach steps
  const approachIcons = [
    <FileTextOutlined />,
    <MedicineBoxOutlined />,
    <RocketOutlined />,
    <TrophyOutlined />,
  ];

  return (
    <div className={styles.serviceDetailPage}>
      {/* Hero Section with Title and Short Description */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{service.title}</h1>
          <p className={styles.heroSubtitle}>{service.shortDescription}</p>
        </div>
      </section>

      {/* Service Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          {/* Comprehensive Description */}
          <div className={styles.comprehensiveSection}>
            <h2 className={styles.comprehensiveTitle}>Comprehensive Care</h2>
            <div className={styles.comprehensiveDescription}>
              <p>{service.description}</p>
            </div>
          </div>

          {/* Conditions We Treat Section */}
          {service.conditionsTreated && service.conditionsTreated.length > 0 && (
            <div className={styles.conditionsSection}>
              <h2 className={styles.sectionTitle}>Conditions We Treat</h2>
              <div className={styles.conditionsGrid}>
                {service.conditionsTreated.map((condition, index) => (
                  <div key={index} className={styles.conditionItem}>
                    <CheckCircleOutlined className={styles.conditionIcon} />
                    <span className={styles.conditionText}>{condition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Our Treatment Approach Section */}
          {service.treatmentApproaches && service.treatmentApproaches.length > 0 && (
            <div className={styles.approachSection}>
              <h2 className={styles.sectionTitle}>Our Treatment Approach</h2>
              <div className={styles.approachGrid}>
                {service.treatmentApproaches.map((approach, index) => (
                  <div key={index} className={styles.approachCard}>
                    <div className={styles.approachNumber}>
                      <span className={styles.numberText}>{String(index + 1).padStart(2, '0')}</span>
                      <div className={styles.approachIcon}>
                        {approachIcons[index] || <MedicineBoxOutlined />}
                      </div>
                    </div>
                    <h3 className={styles.approachTitle}>{approach}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Don't Let an Injury Keep You Out of the Game</h2>
          <p className={styles.ctaSubtitle}>
            Our specialists are here to help you navigate every step of your recovery journey with confidence.
          </p>
          <div className={styles.ctaButtons}>
            <Button
              type="primary"
              size="large"
              icon={<CalendarOutlined />}
              className={styles.scheduleButton}
              onClick={handleScheduleAppointment}
            >
              Schedule Appointment Now
            </Button>
            <Button
              size="large"
              icon={<TeamOutlined />}
              className={styles.teamButton}
              onClick={handleViewTeam}
            >
              View Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
