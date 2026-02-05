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
    <Modal title="Detalles del Paciente" open={visible} onCancel={onClose} footer={null} width={700} className={styles.modal}>
      <Descriptions bordered column={1} className={styles.descriptions}>
        <Descriptions.Item label="Nombre Completo">{patient.fullName}</Descriptions.Item>
        <Descriptions.Item label="Teléfono">{patient.phone}</Descriptions.Item>
        <Descriptions.Item label="Correo Electrónico">{patient.email}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Nacimiento">{formatDate(patient.dateOfBirth)}</Descriptions.Item>
        {patient.address && <Descriptions.Item label="Dirección">{patient.address}</Descriptions.Item>}
        {patient.medicalHistory && (
          <Descriptions.Item label="Historial Médico">{patient.medicalHistory}</Descriptions.Item>
        )}
        <Descriptions.Item label="Fecha de Registro">{formatDate(patient.createdAt)}</Descriptions.Item>
        <Descriptions.Item label="Última Actualización">{formatDate(patient.updatedAt)}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};
