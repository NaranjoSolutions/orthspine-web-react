import { useState, useCallback } from 'react';
import { Modal, notification } from 'antd';
import { useAppDispatch } from '@/store';
import {
  setSelectedTestimonial,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '@/features/admin/store/testimonialsSlice';
import { testimonialService } from '@/features/admin/services/testimonialService';
import { TestimonialStatus } from '@/features/admin/types/testimonial.types';
import type { Testimonial, TestimonialFormData } from '@/features/admin/types/testimonial.types';

/**
 * useTestimonialModals Hook
 * Manages modal states and actions for testimonials
 */
export const useTestimonialModals = () => {
  const dispatch = useAppDispatch();
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle add new testimonial
   */
  const handleAddNew = useCallback(() => {
    dispatch(setSelectedTestimonial(null));
    setIsEditing(false);
    setFormModalVisible(true);
  }, [dispatch]);

  /**
   * Handle edit testimonial
   */
  const handleEdit = useCallback(
    (testimonial: Testimonial) => {
      dispatch(setSelectedTestimonial(testimonial));
      setIsEditing(true);
      setFormModalVisible(true);
    },
    [dispatch],
  );

  /**
   * Handle delete testimonial
   */
  const handleDelete = useCallback(
    (testimonial: Testimonial) => {
      Modal.confirm({
        title: 'Delete Testimonial',
        content: `Are you sure you want to delete the testimonial from ${testimonial.patientName}? This action cannot be undone.`,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            await testimonialService.deleteTestimonial(testimonial.id);
            dispatch(deleteTestimonial(testimonial.id));
            notification.success({
              message: 'Success',
              description: 'Testimonial deleted successfully.',
            });
          } catch {
            notification.error({
              message: 'Error',
              description: 'Failed to delete testimonial. Please try again.',
            });
          }
        },
      });
    },
    [dispatch],
  );

  /**
   * Handle approve testimonial
   */
  const handleApprove = useCallback(
    async (testimonial: Testimonial) => {
      try {
        const updated = await testimonialService.updateTestimonialStatus(testimonial.id, TestimonialStatus.APPROVED);
        dispatch(updateTestimonial(updated));
        notification.success({
          message: 'Success',
          description: 'Testimonial approved successfully.',
        });
      } catch {
        notification.error({
          message: 'Error',
          description: 'Failed to approve testimonial. Please try again.',
        });
      }
    },
    [dispatch],
  );

  /**
   * Handle reject testimonial
   */
  const handleReject = useCallback(
    async (testimonial: Testimonial) => {
      try {
        const updated = await testimonialService.updateTestimonialStatus(testimonial.id, TestimonialStatus.REJECTED);
        dispatch(updateTestimonial(updated));
        notification.success({
          message: 'Success',
          description: 'Testimonial rejected.',
        });
      } catch {
        notification.error({
          message: 'Error',
          description: 'Failed to reject testimonial. Please try again.',
        });
      }
    },
    [dispatch],
  );

  /**
   * Handle form submit
   */
  const handleFormSubmit = useCallback(
    async (values: TestimonialFormData, selectedTestimonial: Testimonial | null) => {
      try {
        setIsLoading(true);
        if (isEditing && selectedTestimonial) {
          // Update existing testimonial
          const updatedTestimonial = await testimonialService.updateTestimonial(selectedTestimonial.id, values);
          dispatch(updateTestimonial(updatedTestimonial));
          notification.success({
            message: 'Success',
            description: 'Testimonial updated successfully.',
          });
        } else {
          // Create new testimonial
          const newTestimonial = await testimonialService.createTestimonial(values);
          dispatch(addTestimonial(newTestimonial));
          notification.success({
            message: 'Success',
            description: 'Testimonial added successfully.',
          });
        }
        setFormModalVisible(false);
        dispatch(setSelectedTestimonial(null));
      } catch {
        notification.error({
          message: 'Error',
          description: `Failed to ${isEditing ? 'update' : 'add'} testimonial. Please try again.`,
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
    dispatch(setSelectedTestimonial(null));
    setIsEditing(false);
  }, [dispatch]);

  return {
    formModalVisible,
    isEditing,
    isLoading,
    handleAddNew,
    handleEdit,
    handleDelete,
    handleApprove,
    handleReject,
    handleFormSubmit,
    handleCloseFormModal,
  };
};
