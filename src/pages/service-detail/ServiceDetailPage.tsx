import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { allClinicServices } from '@/shared/resources/services/services';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './ServiceDetailPage.module.scss';

/**
 * ServiceDetailPage Component
 * Displays detailed information about a specific clinic service
 *
 * Features:
 * - Dynamic service loading based on URL parameter
 * - Service image, title, and full description
 * - Conditions treated list
 * - Placeholder content for future expansion
 *
 * @returns Service detail page or redirect if service not found
 */
export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  // Find the service by ID
  const service = allClinicServices.find((s) => s.serviceId === serviceId);

  // Redirect to services page if service not found
  if (!service) {
    return <Navigate to={ROUTE_PATHS.SERVICES} replace />;
  }

  return (
    <div className={styles.serviceDetailPage}>
      {/* Hero Section with Service Image */}
      <section className={styles.hero}>
        <div className={styles.heroImageContainer}>
          <img src={service.image} alt={service.alt} className={styles.heroImage} />
        </div>
      </section>

      {/* Service Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>{service.title}</h1>
          
          <div className={styles.description}>
            <p>{service.description}</p>
          </div>

          {/* Conditions Treated Section */}
          {service.conditionsTreated && service.conditionsTreated.length > 0 && (
            <div className={styles.conditionsSection}>
              <h2 className={styles.sectionTitle}>Conditions Treated</h2>
              <ul className={styles.conditionsList}>
                {service.conditionsTreated.map((condition, index) => (
                  <li key={index} className={styles.conditionItem}>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Placeholder Section for Future Content */}
          <div className={styles.placeholderSection}>
            <div className={styles.placeholderCard}>
              <h3 className={styles.placeholderTitle}>More Details Coming Soon</h3>
              <p className={styles.placeholderText}>
                We're working on providing more comprehensive information about this service, including treatment
                approaches, expected outcomes, and frequently asked questions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
