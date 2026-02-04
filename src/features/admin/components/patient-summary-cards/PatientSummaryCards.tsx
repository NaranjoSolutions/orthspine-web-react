import React from 'react';
import { Card, Badge } from 'antd';
import { ClockCircleOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { PatientStatus } from '@/features/admin/types/patient.types';
import styles from './PatientSummaryCards.module.scss';

interface PatientSummaryCardsProps {
  status?: PatientStatus;
  nextAppointmentDate?: string;
  primaryPhysician?: string;
}

/**
 * PatientSummaryCards Component
 * Displays three summary cards with patient status, next appointment, and primary physician
 *
 * Features:
 * - Status badge with color coding
 * - Next appointment date
 * - Primary physician name
 * - Icon indicators
 */
export const PatientSummaryCards: React.FC<PatientSummaryCardsProps> = ({
  status = 'active' as PatientStatus,
  nextAppointmentDate,
  primaryPhysician,
}) => {
  /**
   * Format date for display
   */
  const formatAppointmentDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  /**
   * Get status badge configuration
   */
  const getStatusBadge = (currentStatus: PatientStatus) => {
    const statusConfig: Record<PatientStatus, { text: string; status: 'success' | 'default' | 'warning' }> = {
      [PatientStatus.ACTIVE]: { text: 'Activo', status: 'success' },
      [PatientStatus.INACTIVE]: { text: 'Inactivo', status: 'default' },
      [PatientStatus.DISCHARGED]: { text: 'Dado de Alta', status: 'warning' },
    };
    return statusConfig[currentStatus] || statusConfig[PatientStatus.ACTIVE];
  };

  const statusBadge = getStatusBadge(status);

  return (
    <div className={styles.summaryCards}>
      {/* Patient Status Card */}
      <Card className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.iconWrapper}>
            <CheckCircleOutlined className={styles.icon} />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.label}>Estado del Paciente</div>
            <div className={styles.value}>
              <Badge status={statusBadge.status} text={statusBadge.text} />
            </div>
          </div>
        </div>
      </Card>

      {/* Next Appointment Card */}
      <Card className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.iconWrapper}>
            <ClockCircleOutlined className={styles.icon} />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.label}>Próxima Cita</div>
            <div className={styles.value}>
              {nextAppointmentDate ? formatAppointmentDate(nextAppointmentDate) : 'No Programada'}
            </div>
          </div>
        </div>
      </Card>

      {/* Primary Physician Card */}
      <Card className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.iconWrapper}>
            <UserOutlined className={styles.icon} />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.label}>Médico de Cabecera</div>
            <div className={styles.value}>{primaryPhysician || 'No Asignado'}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
