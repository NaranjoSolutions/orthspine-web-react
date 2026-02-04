import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import { useAppSelector } from '@/store';
import {
  selectTestimonials,
  selectSelectedTestimonial,
  selectTestimonialIsLoading,
} from '@/features/admin/store/testimonialsSlice';
import { TestimonialTable, TestimonialForm } from '@/features/admin/components';
import { TestimonialsToolbar } from './components/TestimonialsToolbar';
import { useTestimonialModals } from './hooks/useTestimonialModals';
import { useTestimonialFilters } from './hooks/useTestimonialFilters';
import styles from './TestimonialsPage.module.scss';

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
  const testimonials = useAppSelector(selectTestimonials);
  const selectedTestimonial = useAppSelector(selectSelectedTestimonial);
  const isLoading = useAppSelector(selectTestimonialIsLoading);

  const [searchValue, setSearchValue] = useState('');

  // Custom hooks for modals and filters
  const {
    formModalVisible,
    isEditing,
    isLoading: modalLoading,
    handleAddNew,
    handleEdit,
    handleDelete,
    handleApprove,
    handleReject,
    handleFormSubmit,
    handleCloseFormModal,
  } = useTestimonialModals();

  const { filters, pagination, handleSearchFilter, handleStatusFilter, handlePageChange } = useTestimonialFilters();

  /**
   * Handle search input change
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      handleSearchFilter('');
    }
  };

  /**
   * Handle search
   */
  const handleSearch = () => {
    handleSearchFilter(searchValue);
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
        <TestimonialsToolbar
          searchValue={searchValue}
          statusFilter={filters.status}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
          onStatusFilterChange={handleStatusFilter}
          onAddNew={handleAddNew}
        />

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
          onSubmit={(values) => handleFormSubmit(values, selectedTestimonial)}
          onCancel={handleCloseFormModal}
          loading={modalLoading}
        />
      </Modal>
    </div>
  );
};

export default TestimonialsPage;
