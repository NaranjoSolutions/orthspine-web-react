import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { allClinicServices } from '@/shared/resources/services/services';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { ServiceDetailHero } from '@/features/service-details/components/ServiceDetailHero';
import { ComprehensiveDescription } from '@/features/service-details/components/ComprehensiveDescription';
import { ConditionsTreated } from '@/features/service-details/components/ConditionsTreated';
import { TreatmentApproach } from '@/features/service-details/components/TreatmentApproach';
import { ServiceDetailCTA } from '@/features/service-details/components/ServiceDetailCTA';
import { useScrollToSection } from '@/shared/hooks';
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

  // Initialize scroll hook to handle page navigation
  useScrollToSection();

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

  return (
    <div className={styles.serviceDetailPage}>
      <ServiceDetailHero title={service.title} shortDescription={service.shortDescription} />

      {/* Service Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <ComprehensiveDescription description={service.description} />
          <ConditionsTreated conditions={service.conditionsTreated} />
          <TreatmentApproach approaches={service.treatmentApproaches} />
        </div>
      </section>

      <ServiceDetailCTA onScheduleAppointment={handleScheduleAppointment} onViewTeam={handleViewTeam} />
    </div>
  );
};

export default ServiceDetailPage;
