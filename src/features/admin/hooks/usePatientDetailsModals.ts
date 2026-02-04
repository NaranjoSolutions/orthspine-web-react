import { useState, useCallback, useEffect } from 'react';
import { notification } from 'antd';
import { patientService } from '@/features/admin/services/patientService';
import type { MedicalNote, MedicalNoteFormData, PatientFormData, Patient } from '@/features/admin/types/patient.types';

/**
 * usePatientDetailsModals Hook
 * Manages modal states and actions for patient details
 */
export const usePatientDetailsModals = (patientId: string | undefined, patient: Patient | null) => {
  const [medicalNotes, setMedicalNotes] = useState<MedicalNote[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /**
   * Load medical notes for patient
   */
  const loadMedicalNotes = useCallback(async () => {
    if (!patientId) return;

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
  }, [patientId]);

  /**
   * Load medical notes on mount
   */
  useEffect(() => {
    loadMedicalNotes();
  }, [loadMedicalNotes]);

  /**
   * Handle add medical note
   */
  const handleAddNote = useCallback(
    async (values: MedicalNoteFormData) => {
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
    },
    [patient, medicalNotes],
  );

  /**
   * Handle edit patient
   */
  const handleEditPatient = useCallback(
    async (values: PatientFormData, onSuccess: (updatedPatient: Patient) => void) => {
      if (!patient) return;

      try {
        setSubmitting(true);
        const updatedPatient = await patientService.updatePatient(patient.id, values);
        onSuccess(updatedPatient);
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
    },
    [patient],
  );

  return {
    medicalNotes,
    notesLoading,
    addNoteModalVisible,
    editModalVisible,
    submitting,
    setAddNoteModalVisible,
    setEditModalVisible,
    handleAddNote,
    handleEditPatient,
  };
};
