import { useState, useCallback } from 'react';
import { Modal, notification } from 'antd';
import { useAppDispatch } from '@/store';
import {
  setSelectedPatient,
  addPatient,
  updatePatient,
  deletePatient,
} from '@/features/admin/store/patientsSlice';
import { patientService } from '@/features/admin/services/patientService';
import type { Patient, PatientFormData } from '@/features/admin/types/patient.types';

/**
 * usePatientModals Hook
 * Manages modal states and actions for patients
 */
export const usePatientModals = () => {
  const dispatch = useAppDispatch();
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle add new patient
   */
  const handleAddNew = useCallback(() => {
    dispatch(setSelectedPatient(null));
    setIsEditing(false);
    setFormModalVisible(true);
  }, [dispatch]);

  /**
   * Handle edit patient
   */
  const handleEdit = useCallback(
    (patient: Patient) => {
      dispatch(setSelectedPatient(patient));
      setIsEditing(true);
      setFormModalVisible(true);
    },
    [dispatch],
  );

  /**
   * Handle delete patient
   */
  const handleDelete = useCallback(
    (patient: Patient) => {
      Modal.confirm({
        title: 'Delete Patient',
        content: `Are you sure you want to delete ${patient.fullName}? This action cannot be undone.`,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            await patientService.deletePatient(patient.id);
            dispatch(deletePatient(patient.id));
            notification.success({
              message: 'Success',
              description: 'Patient deleted successfully.',
            });
          } catch {
            notification.error({
              message: 'Error',
              description: 'Failed to delete patient. Please try again.',
            });
          }
        },
      });
    },
    [dispatch],
  );

  /**
   * Handle form submit
   */
  const handleFormSubmit = useCallback(
    async (values: PatientFormData, selectedPatient: Patient | null) => {
      try {
        setIsLoading(true);
        if (isEditing && selectedPatient) {
          // Update existing patient
          const updatedPatient = await patientService.updatePatient(selectedPatient.id, values);
          dispatch(updatePatient(updatedPatient));
          notification.success({
            message: 'Success',
            description: 'Patient updated successfully.',
          });
        } else {
          // Create new patient
          const newPatient = await patientService.createPatient(values);
          dispatch(addPatient(newPatient));
          notification.success({
            message: 'Success',
            description: 'Patient added successfully.',
          });
        }
        setFormModalVisible(false);
        dispatch(setSelectedPatient(null));
      } catch {
        notification.error({
          message: 'Error',
          description: `Failed to ${isEditing ? 'update' : 'add'} patient. Please try again.`,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, isEditing],
  );

  /**
   * Close form modal
   */
  const handleCloseFormModal = useCallback(() => {
    setFormModalVisible(false);
    dispatch(setSelectedPatient(null));
    setIsEditing(false);
  }, [dispatch]);

  return {
    formModalVisible,
    isEditing,
    isLoading,
    handleAddNew,
    handleEdit,
    handleDelete,
    handleFormSubmit,
    handleCloseFormModal,
  };
};
