import React from 'react';
import { Modal, Descriptions } from 'antd';
import type { Patient } from '@/features/admin/types/patient.types';
import styles from './PatientViewModal.module.scss';

interface PatientViewModalProps {
  patient: Patient | null;
  visible: boolean;
  onClose: () => void;
}

/**
 * PatientViewModal Component
 * Modal for viewing patient details
 *
 * Features:
 * - Read-only patient information display
 * - Formatted dates
 */
export const PatientViewModal: React.FC<PatientViewModalProps> = ({ patient, visible, onClose }) => {
  if (!patient) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Modal
      title="Patient Details"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      className={styles.modal}
    >
      <Descriptions bordered column={1} className={styles.descriptions}>
        <Descriptions.Item label="Full Name">{patient.fullName}</Descriptions.Item>
        <Descriptions.Item label="Phone">{patient.phone}</Descriptions.Item>
        <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">{formatDate(patient.dateOfBirth)}</Descriptions.Item>
        {patient.address && <Descriptions.Item label="Address">{patient.address}</Descriptions.Item>}
        {patient.medicalHistory && (
          <Descriptions.Item label="Medical History">{patient.medicalHistory}</Descriptions.Item>
        )}
        <Descriptions.Item label="Created At">{formatDate(patient.createdAt)}</Descriptions.Item>
        <Descriptions.Item label="Last Updated">{formatDate(patient.updatedAt)}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};
