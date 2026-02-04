import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Tabs, Button, Modal, Spin } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { PatientHeader, PatientSummaryCards, AddMedicalNoteModal, PatientForm } from '@/features/admin/components';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { MedicalNotesTab } from './components/MedicalNotesTab';
import { usePatientData } from './hooks/usePatientData';
import { usePatientDetailsModals } from './hooks/usePatientDetailsModals';
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
      label: 'Medical Notes',
      children: (
        <MedicalNotesTab notes={medicalNotes} loading={notesLoading} onAddNote={() => setAddNoteModalVisible(true)} />
      ),
    },
    {
      key: 'appointment-history',
      label: 'Appointment History',
      children: (
        <div className={styles.tabContent}>
          <div className={styles.placeholder}>
            <p>Appointment history will be displayed here.</p>
          </div>
        </div>
      ),
    },
    {
      key: 'contact-insurance',
      label: 'Contact & Insurance Info',
      children: (
        <div className={styles.tabContent}>
          <div className={styles.placeholder}>
            <p>Contact and insurance information will be displayed here.</p>
          </div>
        </div>
      ),
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" tip="Loading patient details..." />
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
        Back to Patients
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
        title="Edit Patient"
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
