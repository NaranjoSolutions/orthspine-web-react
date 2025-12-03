import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Tabs, Button, notification, Spin, Modal } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { patientService } from '@/features/admin/services/patientService';
import {
  PatientHeader,
  PatientSummaryCards,
  MedicalNoteTimeline,
  AddMedicalNoteModal,
  PatientForm,
} from '@/features/admin/components';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import type {
  Patient,
  MedicalNote,
  Physician,
  MedicalNoteFormData,
  PatientFormData,
} from '@/features/admin/types/patient.types';
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

  // State management
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicalNotes, setMedicalNotes] = useState<MedicalNote[]>([]);
  const [primaryPhysician, setPrimaryPhysician] = useState<Physician | null>(null);
  const [loading, setLoading] = useState(true);
  const [notesLoading, setNotesLoading] = useState(false);
  const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /**
   * Load patient data on mount
   */
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (id) {
        try {
          setLoading(true);

          // Load patient details
          const patientData = await patientService.getPatientById(id);

          if (!isMounted) return;

          if (!patientData) {
            notification.error({
              message: 'Patient Not Found',
              description: 'The requested patient could not be found.',
            });
            navigate(ROUTE_PATHS.ADMIN.PATIENTS);
            return;
          }

          setPatient(patientData);

          // Load medical notes
          loadMedicalNotes(id);

          // Load primary physician if assigned
          if (patientData.primaryPhysicianId) {
            const physician = await patientService.getPhysicianById(patientData.primaryPhysicianId);
            if (isMounted) {
              setPrimaryPhysician(physician);
            }
          }
        } catch (error) {
          if (isMounted) {
            notification.error({
              message: 'Error',
              description: 'Failed to load patient data. Please try again.',
            });
            console.error('Failed to load patient:', error);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /**
   * Load medical notes for patient
   */
  const loadMedicalNotes = async (patientId: string) => {
    try {
      setNotesLoading(true);
      const notes = await patientService.getMedicalNotes(patientId);
      setMedicalNotes(notes);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to load medical notes.',
      });
      console.error('Failed to load medical notes:', error);
    } finally {
      setNotesLoading(false);
    }
  };

  /**
   * Handle add medical note
   */
  const handleAddNote = async (values: MedicalNoteFormData) => {
    if (!patient) return;

    try {
      setSubmitting(true);
      const newNote = await patientService.addMedicalNote(patient.id, values);
      setMedicalNotes([newNote, ...medicalNotes]);
      setAddNoteModalVisible(false);
      notification.success({
        message: 'Success',
        description: 'Medical note added successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add medical note. Please try again.',
      });
      console.error('Failed to add note:', error);
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Handle edit patient
   */
  const handleEditPatient = async (values: PatientFormData) => {
    if (!patient) return;

    try {
      setSubmitting(true);
      const updatedPatient = await patientService.updatePatient(patient.id, values);
      setPatient(updatedPatient);
      setEditModalVisible(false);
      notification.success({
        message: 'Success',
        description: 'Patient updated successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update patient. Please try again.',
      });
      console.error('Failed to update patient:', error);
    } finally {
      setSubmitting(false);
    }
  };

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
        <div className={styles.tabContent}>
          <div className={styles.tabHeader}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setAddNoteModalVisible(true)}
              size="large"
            >
              Add New Note
            </Button>
          </div>
          <MedicalNoteTimeline notes={medicalNotes} loading={notesLoading} />
        </div>
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
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
        className={styles.backButton}
        size="large"
      >
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
          onSubmit={handleEditPatient}
          onCancel={() => setEditModalVisible(false)}
          loading={submitting}
        />
      </Modal>
    </div>
  );
};

export default PatientDetailsPage;
