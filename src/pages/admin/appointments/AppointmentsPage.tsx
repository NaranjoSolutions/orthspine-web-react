import React, { useEffect, useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/store';
import {
  selectAppointments,
  selectSelectedAppointment,
  selectAppointmentIsLoading,
} from '@/features/admin/store/appointmentsSlice';
import { appointmentService } from '@/features/admin/services/appointmentService';
import { AppointmentTable, AppointmentForm, AppointmentViewModal, AppointmentsToolbar } from '@/features/admin/components';
import { useAppointmentModals, useAppointmentFilters } from '@/features/admin/hooks';
import { AppointmentStatus } from '@/features/admin/types/appointment.types';
import type { DoctorOption } from '@/features/admin/types/appointment.types';
import styles from './AppointmentsPage.module.scss';

/**
 * AppointmentsPage Component
 * Main page for appointment management
 *
 * Features:
 * - Appointment list with search and filter
 * - Add, edit, view, reschedule, cancel operations
 * - Date range filtering
 * - Doctor filtering
 * - Status filtering
 * - Pagination
 * - Loading states
 */
const AppointmentsPage: React.FC = () => {
  const appointments = useAppSelector(selectAppointments);
  const selectedAppointment = useAppSelector(selectSelectedAppointment);
  const isLoading = useAppSelector(selectAppointmentIsLoading);

  const [searchValue, setSearchValue] = useState('');
  const [doctors, setDoctors] = useState<DoctorOption[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Custom hooks for modals and filters
  const {
    formModalVisible,
    viewModalVisible,
    rescheduleModalVisible,
    isEditing,
    isLoading: modalLoading,
    handleAddNew,
    handleView,
    handleReschedule,
    handleCancel,
    handleFormSubmit,
    handleRescheduleSubmit,
    handleCloseFormModal,
    handleCloseViewModal,
    handleCloseRescheduleModal,
  } = useAppointmentModals();

  const {
    filters,
    pagination,
    handleSearchFilter,
    handleDoctorFilter,
    handleStatusFilter,
    handleDateRangeFilter,
    handleClearAllFilters,
    handlePageChange,
  } = useAppointmentFilters();

  /**
   * Load doctors for filter dropdown
   */
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const doctorsData = await appointmentService.getDoctors();
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Failed to load doctors:', error);
      }
    };
    loadDoctors();
  }, []);

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

  /**
   * Handle clear filters
   */
  const handleClearFilters = () => {
    setSearchValue('');
    handleClearAllFilters();
  };

  return (
    <div className={styles.appointmentsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Citas</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew} size="large">
          Agregar Nueva Cita
        </Button>
      </div>

      <Card bordered={false} className={styles.card}>
        <AppointmentsToolbar
          searchValue={searchValue}
          showFilters={showFilters}
          filters={filters}
          doctors={doctors}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onClearFilters={handleClearFilters}
          onDoctorFilterChange={handleDoctorFilter}
          onStatusFilterChange={handleStatusFilter}
          onDateRangeChange={handleDateRangeFilter}
        />

        <AppointmentTable
          appointments={appointments}
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onView={handleView}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
          onPageChange={handlePageChange}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={isEditing ? 'Editar Cita' : 'Agregar Nueva Cita'}
        open={formModalVisible}
        onCancel={handleCloseFormModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <AppointmentForm
          initialValues={
            isEditing && selectedAppointment
              ? {
                  patientId: selectedAppointment.patientId,
                  patientName: selectedAppointment.patientName,
                  doctorId: selectedAppointment.doctorId,
                  doctorName: selectedAppointment.doctorName,
                  dateTime: selectedAppointment.dateTime,
                  reasonForVisit: selectedAppointment.reasonForVisit,
                  status: selectedAppointment.status,
                  notes: selectedAppointment.notes,
                }
              : undefined
          }
          onSubmit={(values) => handleFormSubmit(values, selectedAppointment)}
          onCancel={handleCloseFormModal}
          loading={modalLoading}
        />
      </Modal>

      {/* Reschedule Modal */}
      <Modal
        title="Reprogramar Cita"
        open={rescheduleModalVisible}
        onCancel={handleCloseRescheduleModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <AppointmentForm
          initialValues={
            selectedAppointment
              ? {
                  patientId: selectedAppointment.patientId,
                  patientName: selectedAppointment.patientName,
                  doctorId: selectedAppointment.doctorId,
                  doctorName: selectedAppointment.doctorName,
                  dateTime: selectedAppointment.dateTime,
                  reasonForVisit: selectedAppointment.reasonForVisit,
                  status: AppointmentStatus.RESCHEDULED,
                  notes: selectedAppointment.notes,
                }
              : undefined
          }
          onSubmit={(values) => handleRescheduleSubmit(values, selectedAppointment)}
          onCancel={handleCloseRescheduleModal}
          loading={modalLoading}
        />
      </Modal>

      {/* View Modal */}
      <AppointmentViewModal
        appointment={selectedAppointment}
        visible={viewModalVisible}
        onClose={handleCloseViewModal}
        onCancel={handleCancel}
        onReschedule={handleReschedule}
      />
    </div>
  );
};

export default AppointmentsPage;
