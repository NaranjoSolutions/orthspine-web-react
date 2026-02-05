import { useState, useCallback } from 'react';
import { Modal, notification } from 'antd';
import { useAppDispatch } from '@/store';
import {
  setSelectedAppointment,
  addAppointment,
  updateAppointment,
} from '@/features/admin/store/appointmentsSlice';
import { appointmentService } from '@/features/admin/services/appointmentService';
import { AppointmentStatus } from '@/features/admin/types/appointment.types';
import type { AdminAppointment, AppointmentFormData } from '@/features/admin/types/appointment.types';
import dayjs from 'dayjs';

/**
 * useAppointmentModals Hook
 * Manages modal states and actions for appointments
 */
export const useAppointmentModals = () => {
  const dispatch = useAppDispatch();
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle add new appointment
   */
  const handleAddNew = useCallback(() => {
    dispatch(setSelectedAppointment(null));
    setIsEditing(false);
    setFormModalVisible(true);
  }, [dispatch]);

  /**
   * Handle view appointment
   */
  const handleView = useCallback(
    (appointment: AdminAppointment) => {
      dispatch(setSelectedAppointment(appointment));
      setViewModalVisible(true);
    },
    [dispatch],
  );

  /**
   * Handle reschedule appointment
   */
  const handleReschedule = useCallback(
    (appointment: AdminAppointment) => {
      dispatch(setSelectedAppointment(appointment));
      setRescheduleModalVisible(true);
    },
    [dispatch],
  );

  /**
   * Handle cancel appointment
   */
  const handleCancel = useCallback(
    (appointment: AdminAppointment) => {
      Modal.confirm({
        title: 'Cancel Appointment',
        content: `Are you sure you want to cancel the appointment for ${appointment.patientName}?`,
        okText: 'Yes, Cancel',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          try {
            await appointmentService.cancelAppointment(appointment.id);
            dispatch(updateAppointment({ ...appointment, status: AppointmentStatus.CANCELLED }));
            notification.success({
              message: 'Success',
              description: 'Appointment cancelled successfully.',
            });
          } catch {
            notification.error({
              message: 'Error',
              description: 'Failed to cancel appointment. Please try again.',
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
    async (values: AppointmentFormData, selectedAppointment: AdminAppointment | null) => {
      try {
        setIsLoading(true);
        if (isEditing && selectedAppointment) {
          // Update existing appointment
          const updatedAppointment = await appointmentService.updateAppointment(selectedAppointment.id, values);
          dispatch(updateAppointment(updatedAppointment));
          notification.success({
            message: 'Success',
            description: 'Appointment updated successfully.',
          });
        } else {
          // Create new appointment
          const newAppointment = await appointmentService.createAppointment({
            ...values,
            dateTime: dayjs(values.dateTime).toISOString(),
          });
          dispatch(addAppointment(newAppointment));
          notification.success({
            message: 'Success',
            description: 'Appointment created successfully.',
          });
        }
        setFormModalVisible(false);
        dispatch(setSelectedAppointment(null));
      } catch {
        notification.error({
          message: 'Error',
          description: `Failed to ${isEditing ? 'update' : 'create'} appointment. Please try again.`,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, isEditing],
  );

  /**
   * Handle reschedule submit
   */
  const handleRescheduleSubmit = useCallback(
    async (values: AppointmentFormData, selectedAppointment: AdminAppointment | null) => {
      if (!selectedAppointment) return;

      try {
        setIsLoading(true);
        const updatedAppointment = await appointmentService.rescheduleAppointment(
          selectedAppointment.id,
          dayjs(values.dateTime).toISOString(),
        );
        dispatch(updateAppointment(updatedAppointment));
        notification.success({
          message: 'Success',
          description: 'Appointment rescheduled successfully.',
        });
        setRescheduleModalVisible(false);
        dispatch(setSelectedAppointment(null));
      } catch {
        notification.error({
          message: 'Error',
          description: 'Failed to reschedule appointment. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  /**
   * Close modals
   */
  const handleCloseFormModal = useCallback(() => {
    setFormModalVisible(false);
    dispatch(setSelectedAppointment(null));
    setIsEditing(false);
  }, [dispatch]);

  const handleCloseViewModal = useCallback(() => {
    setViewModalVisible(false);
    dispatch(setSelectedAppointment(null));
  }, [dispatch]);

  const handleCloseRescheduleModal = useCallback(() => {
    setRescheduleModalVisible(false);
    dispatch(setSelectedAppointment(null));
  }, [dispatch]);

  return {
    formModalVisible,
    viewModalVisible,
    rescheduleModalVisible,
    isEditing,
    isLoading,
    handleAddNew,
    handleView,
    handleReschedule,
    handleCancel,
    handleFormSubmit,
    handleRescheduleSubmit,
    handleCloseFormModal,
    handleCloseViewModal,
    handleCloseRescheduleModal,
  };
};
