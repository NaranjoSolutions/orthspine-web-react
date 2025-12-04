import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Space, Modal, notification, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setTestimonials,
  setSelectedTestimonial,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  setTestimonialFilters,
  setTestimonialPagination,
  setLoadingTestimonials,
  setErrorTestimonials,
  selectTestimonials,
  selectSelectedTestimonial,
  selectTestimonialFilters,
  selectTestimonialPagination,
  selectTestimonialIsLoading,
} from '@/features/admin/store/testimonialsSlice';
import { testimonialService } from '@/features/admin/services/testimonialService';
import { TestimonialTable, TestimonialForm } from '@/features/admin/components';
import type { Testimonial, TestimonialFormData } from '@/features/admin/types/testimonial.types';
import { TestimonialStatus } from '@/features/admin/types/testimonial.types';
import styles from './TestimonialsPage.module.scss';

const { Option } = Select;

/**
 * TestimonialsPage Component
 * Main page for testimonial management
 *
 * Features:
 * - Testimonial list with search and filter
 * - Add, edit, delete operations
 * - Approve/Reject testimonials
 * - Pagination
 * - Loading states
 */
const TestimonialsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const testimonials = useAppSelector(selectTestimonials);
  const selectedTestimonial = useAppSelector(selectSelectedTestimonial);
  const filters = useAppSelector(selectTestimonialFilters);
  const pagination = useAppSelector(selectTestimonialPagination);
  const isLoading = useAppSelector(selectTestimonialIsLoading);

  const [formModalVisible, setFormModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  /**
   * Load testimonials on mount and when filters/pagination change
   */
  useEffect(() => {
    loadTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination.page, pagination.pageSize]);

  /**
   * Load testimonials from service
   */
  const loadTestimonials = async () => {
    try {
      dispatch(setLoadingTestimonials(true));
      const result = await testimonialService.getTestimonials(filters, pagination.page, pagination.pageSize);
      dispatch(setTestimonials(result.testimonials));
      dispatch(setTestimonialPagination({ total: result.total }));
    } catch {
      dispatch(setErrorTestimonials('Failed to load testimonials'));
      notification.error({
        message: 'Error',
        description: 'Failed to load testimonials. Please try again.',
      });
    } finally {
      dispatch(setLoadingTestimonials(false));
    }
  };

  /**
   * Handle search
   */
  const handleSearch = () => {
    dispatch(setTestimonialFilters({ search: searchValue }));
    dispatch(setTestimonialPagination({ page: 1 })); // Reset to first page
  };

  /**
   * Handle search input change
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      dispatch(setTestimonialFilters({ search: '' }));
      dispatch(setTestimonialPagination({ page: 1 }));
    }
  };

  /**
   * Handle status filter change
   */
  const handleStatusFilterChange = (value: TestimonialStatus | 'all') => {
    dispatch(setTestimonialFilters({ status: value }));
    dispatch(setTestimonialPagination({ page: 1 }));
  };

  /**
   * Handle edit testimonial
   */
  const handleEdit = (testimonial: Testimonial) => {
    dispatch(setSelectedTestimonial(testimonial));
    setIsEditing(true);
    setFormModalVisible(true);
  };

  /**
   * Handle delete testimonial
   */
  const handleDelete = (testimonial: Testimonial) => {
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
  };

  /**
   * Handle approve testimonial
   */
  const handleApprove = async (testimonial: Testimonial) => {
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
  };

  /**
   * Handle reject testimonial
   */
  const handleReject = async (testimonial: Testimonial) => {
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
  };

  /**
   * Handle add new testimonial
   */
  const handleAddNew = () => {
    dispatch(setSelectedTestimonial(null));
    setIsEditing(false);
    setFormModalVisible(true);
  };

  /**
   * Handle form submit
   */
  const handleFormSubmit = async (values: TestimonialFormData) => {
    try {
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
    }
  };

  /**
   * Handle page change
   */
  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setTestimonialPagination({ page, pageSize }));
  };

  /**
   * Close form modal
   */
  const handleCloseFormModal = () => {
    setFormModalVisible(false);
    dispatch(setSelectedTestimonial(null));
    setIsEditing(false);
  };

  return (
    <div className={styles.testimonialsPage}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>Testimonials Management</h1>
            <p className={styles.subtitle}>View, manage, and add patient testimonials.</p>
          </div>
        </div>
      </div>

      <Card bordered={false} className={styles.card}>
        <div className={styles.toolbar}>
          <Space size="middle" className={styles.searchSection}>
            <Input
              placeholder="Find by patient name"
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={handleSearchChange}
              onPressEnter={handleSearch}
              size="large"
              className={styles.searchInput}
              allowClear
            />
            <Select
              placeholder="All Statuses"
              value={filters.status}
              onChange={handleStatusFilterChange}
              size="large"
              className={styles.statusFilter}
            >
              <Option value="all">All Statuses</Option>
              <Option value="pending">Pending</Option>
              <Option value="approved">Approved</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew} size="large">
            Add New Testimonial
          </Button>
        </div>

        <TestimonialTable
          testimonials={testimonials}
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onReject={handleReject}
          onPageChange={handlePageChange}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
        open={formModalVisible}
        onCancel={handleCloseFormModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <TestimonialForm
          initialValues={
            isEditing && selectedTestimonial
              ? {
                  patientName: selectedTestimonial.patientName,
                  message: selectedTestimonial.message,
                  rating: selectedTestimonial.rating,
                  status: selectedTestimonial.status,
                }
              : undefined
          }
          onSubmit={handleFormSubmit}
          onCancel={handleCloseFormModal}
          loading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default TestimonialsPage;
