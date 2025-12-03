import React from 'react';
import { Modal, Tag, Button, Avatar } from 'antd';
import {
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import type { AdminAppointment, AppointmentStatus } from '@/features/admin/types/appointment.types';
import dayjs from 'dayjs';
import styles from './AppointmentViewModal.module.scss';

/**
 * AppointmentViewModal Props
 */
interface AppointmentViewModalProps {
  appointment: AdminAppointment | null;
  visible: boolean;
  onClose: () => void;
  onCancel?: (appointment: AdminAppointment) => void;
  onReschedule?: (appointment: AdminAppointment) => void;
}

/**
 * Get status tag color based on appointment status
 */
const getStatusColor = (status: AppointmentStatus): string => {
  const statusColors: Record<AppointmentStatus, string> = {
    confirmed: 'green',
    pending: 'orange',
    cancelled: 'red',
    completed: 'blue',
    rescheduled: 'cyan',
  };
  return statusColors[status] || 'default';
};

/**
 * Get status display text
 */
const getStatusText = (status: AppointmentStatus): string => {
  const statusText: Record<AppointmentStatus, string> = {
    confirmed: 'Confirmed',
    pending: 'Pending',
    cancelled: 'Cancelled',
    completed: 'Completed',
    rescheduled: 'Rescheduled',
  };
  return statusText[status] || status;
};

/**
 * Get initials from full name
 */
const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Check if appointment can be cancelled or rescheduled
 */
const canModifyAppointment = (status: AppointmentStatus): boolean => {
  return status !== 'cancelled' && status !== 'completed';
};

/**
 * Get status icon based on appointment status
 */
const getStatusIcon = (status: AppointmentStatus) => {
  const statusIcons: Record<AppointmentStatus, React.ReactNode> = {
    confirmed: <CheckCircleOutlined />,
    pending: <ClockCircleOutlined />,
    cancelled: <CloseOutlined />,
    completed: <CheckCircleOutlined />,
    rescheduled: <ClockCircleOutlined />,
  };
  return statusIcons[status] || <CheckCircleOutlined />;
};

/**
 * AppointmentViewModal Component
 * Modal for viewing appointment details
 *
 * Features:
 * - Display all appointment information
 * - Status badge
 * - Formatted dates
 * - Patient contact information
 * - Action buttons (Cancel, Reschedule)
 * - Modern card-based design
 */
export const AppointmentViewModal: React.FC<AppointmentViewModalProps> = ({
  appointment,
  visible,
  onClose,
  onCancel,
  onReschedule,
}) => {
  if (!appointment) return null;

  const canModify = canModifyAppointment(appointment.status);

  const handleCancel = () => {
    if (onCancel) {
      onCancel(appointment);
      onClose();
    }
  };

  const handleReschedule = () => {
    if (onReschedule) {
      onReschedule(appointment);
      onClose();
    }
  };

  return (
    <Modal
      title={<div className={styles.modalTitle}>Appointment Details</div>}
      open={visible}
      onCancel={onClose}
      footer={
        <div className={styles.footer}>
          <Button size="large" onClick={onClose}>
            Close
          </Button>
          {canModify && (
            <>
              <Button danger size="large" onClick={handleCancel}>
                Cancel Appointment
              </Button>
              <Button type="primary" size="large" onClick={handleReschedule}>
                Reschedule
              </Button>
            </>
          )}
        </div>
      }
      width={700}
      className={styles.appointmentViewModal}
      centered
    >
      {/* Patient Header */}
      <div className={styles.patientHeader}>
        <div className={styles.patientInfo}>
          <Avatar size={64} className={styles.avatar}>
            {getInitials(appointment.patientName)}
          </Avatar>
          <div className={styles.patientDetails}>
            <h2 className={styles.patientName}>{appointment.patientName}</h2>
            <p className={styles.patientId}>
              Patient ID: {appointment.patientDisplayId || appointment.patientId}
            </p>
          </div>
        </div>
        <Tag color={getStatusColor(appointment.status)} className={styles.statusBadge} icon={getStatusIcon(appointment.status)}>
          {getStatusText(appointment.status)}
        </Tag>
      </div>

      {/* Appointment Details Grid */}
      <div className={styles.detailsGrid}>
        <div className={styles.detailRow}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <UserOutlined className={styles.icon} />
              <span>Doctor</span>
            </div>
            <div className={styles.detailValue}>{appointment.doctorName}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <MedicineBoxOutlined className={styles.icon} />
              <span>Service</span>
            </div>
            <div className={styles.detailValue}>{appointment.serviceType || 'Consultation'}</div>
          </div>
        </div>

        <div className={styles.detailRow}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <CalendarOutlined className={styles.icon} />
              <span>Date</span>
            </div>
            <div className={styles.detailValue}>{dayjs(appointment.dateTime).format('MMMM DD, YYYY')}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <ClockCircleOutlined className={styles.icon} />
              <span>Time</span>
            </div>
            <div className={styles.detailValue}>{dayjs(appointment.dateTime).format('hh:mm A')}</div>
          </div>
        </div>

        <div className={styles.detailRow}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <PhoneOutlined className={styles.icon} />
              <span>Phone</span>
            </div>
            <div className={styles.detailValue}>{appointment.patientPhone || 'N/A'}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <MailOutlined className={styles.icon} />
              <span>Email</span>
            </div>
            <div className={styles.detailValue}>{appointment.patientEmail || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Reason for Visit */}
      <div className={styles.reasonSection}>
        <h3 className={styles.reasonTitle}>Reason for Visit</h3>
        <p className={styles.reasonText}>{appointment.reasonForVisit}</p>
      </div>
    </Modal>
  );
};
