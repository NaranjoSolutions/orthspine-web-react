import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';
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
 * AppointmentViewModal Component
 * Modal for viewing appointment details
 *
 * Features:
 * - Display all appointment information
 * - Status badge
 * - Formatted dates
 * - Read-only view
 */
export const AppointmentViewModal: React.FC<AppointmentViewModalProps> = ({ appointment, visible, onClose }) => {
  if (!appointment) return null;

  return (
    <Modal
      title="Appointment Details"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      className={styles.appointmentViewModal}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Patient">{appointment.patientName}</Descriptions.Item>
        <Descriptions.Item label="Doctor">{appointment.doctorName}</Descriptions.Item>
        <Descriptions.Item label="Date">
          {dayjs(appointment.dateTime).format('MMMM DD, YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Time">{dayjs(appointment.dateTime).format('hh:mm A')}</Descriptions.Item>
        <Descriptions.Item label="Reason for Visit">{appointment.reasonForVisit}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Tag>
        </Descriptions.Item>
        {appointment.notes && <Descriptions.Item label="Notes">{appointment.notes}</Descriptions.Item>}
        <Descriptions.Item label="Created At">
          {dayjs(appointment.createdAt).format('MMMM DD, YYYY hh:mm A')}
        </Descriptions.Item>
        <Descriptions.Item label="Last Updated">
          {dayjs(appointment.updatedAt).format('MMMM DD, YYYY hh:mm A')}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};
