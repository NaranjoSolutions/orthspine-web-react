import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Tabs, Button, Modal, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PatientHeader, PatientSummaryCards, AddMedicalNoteModal, PatientForm, MedicalNotesTab } from '@/features/admin/components';
import { usePatientData, usePatientDetailsModals } from '@/features/admin/hooks';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './PatientDetailsPage.module.scss';

/**
 * PatientDetailsPage Component
 * Full-page patient details view with comprehensive information
 *
 * Features:
 * - Patient header with avatar and basic info
 * - Summary cards (status, next appointment, primary physician)
 * - Tabbed content (medical notes, appointment history, contact & insurance)
 * - Add medical note functionality
 * - Edit patient functionality
 * - Navigation back to patient list
 */
const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Load patient data
  const { patient, primaryPhysician, loading, updatePatientData } = usePatientData(id);

  // Manage modals
  const {
    medicalNotes,
    notesLoading,
    addNoteModalVisible,
    editModalVisible,
    submitting,
    setAddNoteModalVisible,
    setEditModalVisible,
    handleAddNote,
    handleEditPatient,
  } = usePatientDetailsModals(id, patient);

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    navigate(ROUTE_PATHS.ADMIN.PATIENTS);
  };

  /**
   * Tab items configuration
   */
  const tabItems = [
    {
      key: 'medical-notes',
      label: 'Notas Médicas',
      children: (
        <MedicalNotesTab notes={medicalNotes} loading={notesLoading} onAddNote={() => setAddNoteModalVisible(true)} />
      ),
    },
    {
      key: 'appointment-history',
      label: 'Historial de Citas',
      children: (
        <div className={styles.tabContent}>
          <div className={styles.placeholder}>
            <p>El historial de citas se mostrará aquí.</p>
          </div>
        </div>
      ),
    },
    {
      key: 'contact-insurance',
      label: 'Información de Contacto y Seguro',
      children: (
        <div className={styles.tabContent}>
          <div className={styles.placeholder}>
            <p>La información de contacto y seguro se mostrará aquí.</p>
          </div>
        </div>
      ),
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" tip="Cargando detalles del paciente..." />
      </div>
    );
  }

  // Patient not found
  if (!patient) {
    return null;
  }

  return (
    <div className={styles.patientDetailsPage}>
      {/* Back button */}
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack} className={styles.backButton} size="large">
        Volver a Pacientes
      </Button>

      {/* Patient Header */}
      <PatientHeader
        fullName={patient.fullName}
        patientId={patient.patientId}
        dateOfBirth={patient.dateOfBirth}
        avatarUrl={patient.avatarUrl}
        onEdit={() => setEditModalVisible(true)}
      />

      {/* Summary Cards */}
      <PatientSummaryCards
        status={patient.status}
        nextAppointmentDate={patient.nextAppointmentDate}
        primaryPhysician={primaryPhysician?.name}
      />

      {/* Tabbed Content */}
      <Card bordered={false} className={styles.mainCard}>
        <Tabs defaultActiveKey="medical-notes" items={tabItems} className={styles.tabs} />
      </Card>

      {/* Add Medical Note Modal */}
      <AddMedicalNoteModal
        visible={addNoteModalVisible}
        loading={submitting}
        onSubmit={handleAddNote}
        onCancel={() => setAddNoteModalVisible(false)}
      />

      {/* Edit Patient Modal */}
      <Modal
        title="Editar Paciente"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={600}
        destroyOnClose
      >
        <PatientForm
          initialValues={{
            fullName: patient.fullName,
            phone: patient.phone,
            email: patient.email,
            dateOfBirth: patient.dateOfBirth,
            address: patient.address,
            medicalHistory: patient.medicalHistory,
          }}
          onSubmit={(values) => handleEditPatient(values, updatePatientData)}
          onCancel={() => setEditModalVisible(false)}
          loading={submitting}
        />
      </Modal>
    </div>
  );
};

export default PatientDetailsPage;
