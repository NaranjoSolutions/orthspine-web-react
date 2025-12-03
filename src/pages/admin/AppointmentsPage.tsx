import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Space, Modal, Select, DatePicker, notification } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setAppointments,
  setSelectedAppointment,
  addAppointment,
  updateAppointment,
  setAppointmentFilters,
  clearAppointmentFilters,
  setAppointmentPagination,
  setLoadingAppointments,
  setErrorAppointments,
  selectAppointments,
  selectSelectedAppointment,
  selectAppointmentFilters,
  selectAppointmentPagination,
  selectAppointmentIsLoading,
} from '@/features/admin/store/appointmentsSlice';
import { appointmentService } from '@/features/admin/services/appointmentService';
import { AppointmentTable, AppointmentForm, AppointmentViewModal } from '@/features/admin/components';
import type { AdminAppointment, AppointmentFormData, DoctorOption } from '@/features/admin/types/appointment.types';
import { AppointmentStatus } from '@/features/admin/types/appointment.types';
import dayjs from 'dayjs';
import styles from './AppointmentsPage.module.scss';

const { RangePicker } = DatePicker;

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
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(selectAppointments);
  const selectedAppointment = useAppSelector(selectSelectedAppointment);
  const filters = useAppSelector(selectAppointmentFilters);
  const pagination = useAppSelector(selectAppointmentPagination);
  const isLoading = useAppSelector(selectAppointmentIsLoading);

  const [formModalVisible, setFormModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [doctors, setDoctors] = useState<DoctorOption[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  /**
   * Load appointments on mount and when filters/pagination change
   */
  useEffect(() => {
    loadAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination.page, pagination.pageSize]);

  /**
   * Load doctors for filter dropdown
   */
  useEffect(() => {
    loadDoctors();
  }, []);

  /**
   * Load appointments from service
   */
  const loadAppointments = async () => {
    try {
      dispatch(setLoadingAppointments(true));
      const result = await appointmentService.getAppointments(filters, pagination.page, pagination.pageSize);
      dispatch(setAppointments(result.appointments));
      dispatch(setAppointmentPagination({ total: result.total }));
    } catch {
      dispatch(setErrorAppointments('Failed to load appointments'));
      notification.error({
        message: 'Error',
        description: 'Failed to load appointments. Please try again.',
      });
    } finally {
      dispatch(setLoadingAppointments(false));
    }
  };

  /**
   * Load doctors for filter dropdown
   */
  const loadDoctors = async () => {
    try {
      const doctorsData = await appointmentService.getDoctors();
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Failed to load doctors:', error);
    }
  };

  /**
   * Handle search
   */
  const handleSearch = () => {
    dispatch(setAppointmentFilters({ search: searchValue }));
    dispatch(setAppointmentPagination({ page: 1 }));
  };

  /**
   * Handle search input change
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      dispatch(setAppointmentFilters({ search: '' }));
      dispatch(setAppointmentPagination({ page: 1 }));
    }
  };

  /**
   * Handle doctor filter change
   */
  const handleDoctorFilterChange = (doctorId: string) => {
    dispatch(setAppointmentFilters({ doctorId: doctorId === 'all' ? undefined : doctorId }));
    dispatch(setAppointmentPagination({ page: 1 }));
  };

  /**
   * Handle status filter change
   */
  const handleStatusFilterChange = (status: string) => {
    dispatch(setAppointmentFilters({ status: status as AppointmentStatus | 'all' }));
    dispatch(setAppointmentPagination({ page: 1 }));
  };

  /**
   * Handle date range filter change
   */
  const handleDateRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      dispatch(
        setAppointmentFilters({
          dateRange: {
            start: dates[0].toISOString(),
            end: dates[1].toISOString(),
          },
        })
      );
    } else {
      dispatch(setAppointmentFilters({ dateRange: undefined }));
    }
    dispatch(setAppointmentPagination({ page: 1 }));
  };

  /**
   * Handle clear filters
   */
  const handleClearFilters = () => {
    dispatch(clearAppointmentFilters());
    setSearchValue('');
    dispatch(setAppointmentPagination({ page: 1 }));
  };

  /**
   * Handle view appointment
   */
  const handleView = (appointment: AdminAppointment) => {
    dispatch(setSelectedAppointment(appointment));
    setViewModalVisible(true);
  };

  /**
   * Handle reschedule appointment
   */
  const handleReschedule = (appointment: AdminAppointment) => {
    dispatch(setSelectedAppointment(appointment));
    setRescheduleModalVisible(true);
  };

  /**
   * Handle cancel appointment
   */
  const handleCancel = (appointment: AdminAppointment) => {
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
  };

  /**
   * Handle add new appointment
   */
  const handleAddNew = () => {
    dispatch(setSelectedAppointment(null));
    setIsEditing(false);
    setFormModalVisible(true);
  };

  /**
   * Handle form submit
   */
  const handleFormSubmit = async (values: AppointmentFormData) => {
    try {
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
    }
  };

  /**
   * Handle reschedule submit
   */
  const handleRescheduleSubmit = async (values: AppointmentFormData) => {
    if (!selectedAppointment) return;

    try {
      const updatedAppointment = await appointmentService.rescheduleAppointment(
        selectedAppointment.id,
        dayjs(values.dateTime).toISOString()
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
    }
  };

  /**
   * Handle page change
   */
  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setAppointmentPagination({ page, pageSize }));
  };

  /**
   * Close form modal
   */
  const handleCloseFormModal = () => {
    setFormModalVisible(false);
    dispatch(setSelectedAppointment(null));
    setIsEditing(false);
  };

  /**
   * Close view modal
   */
  const handleCloseViewModal = () => {
    setViewModalVisible(false);
    dispatch(setSelectedAppointment(null));
  };

  /**
   * Close reschedule modal
   */
  const handleCloseRescheduleModal = () => {
    setRescheduleModalVisible(false);
    dispatch(setSelectedAppointment(null));
  };

  return (
    <div className={styles.appointmentsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Appointments Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew} size="large">
          Add New Appointment
        </Button>
      </div>

      <Card bordered={false} className={styles.card}>
        <div className={styles.toolbar}>
          <Space size="middle" className={styles.searchSection}>
            <Input
              placeholder="Search patients, doctors..."
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={handleSearchChange}
              onPressEnter={handleSearch}
              size="large"
              className={styles.searchInput}
              allowClear
            />
            <Button
              icon={<FilterOutlined />}
              size="large"
              onClick={() => setShowFilters(!showFilters)}
              type={showFilters ? 'primary' : 'default'}
            >
              Filter
            </Button>
            {(filters.doctorId || filters.status !== 'all' || filters.dateRange) && (
              <Button icon={<CloseCircleOutlined />} size="large" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            )}
          </Space>
        </div>

        {showFilters && (
          <div className={styles.filters}>
            <Space size="middle" wrap>
              <div className={styles.filterItem}>
                <label>Date Range:</label>
                <RangePicker
                  value={
                    filters.dateRange
                      ? [dayjs(filters.dateRange.start), dayjs(filters.dateRange.end)]
                      : null
                  }
                  onChange={handleDateRangeChange}
                  style={{ width: 280 }}
                />
              </div>
              <div className={styles.filterItem}>
                <label>Doctor:</label>
                <Select
                  value={filters.doctorId || 'all'}
                  onChange={handleDoctorFilterChange}
                  style={{ width: 200 }}
                >
                  <Select.Option value="all">All Doctors</Select.Option>
                  {doctors.map((doctor) => (
                    <Select.Option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className={styles.filterItem}>
                <label>Status:</label>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusFilterChange}
                  style={{ width: 160 }}
                >
                  <Select.Option value="all">All Status</Select.Option>
                  <Select.Option value={AppointmentStatus.CONFIRMED}>Confirmed</Select.Option>
                  <Select.Option value={AppointmentStatus.PENDING}>Pending</Select.Option>
                  <Select.Option value={AppointmentStatus.CANCELLED}>Cancelled</Select.Option>
                  <Select.Option value={AppointmentStatus.COMPLETED}>Completed</Select.Option>
                  <Select.Option value={AppointmentStatus.RESCHEDULED}>Rescheduled</Select.Option>
                </Select>
              </div>
            </Space>
          </div>
        )}

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
        title={isEditing ? 'Edit Appointment' : 'Add New Appointment'}
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
          onSubmit={handleFormSubmit}
          onCancel={handleCloseFormModal}
          loading={isLoading}
        />
      </Modal>

      {/* Reschedule Modal */}
      <Modal
        title="Reschedule Appointment"
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
          onSubmit={handleRescheduleSubmit}
          onCancel={handleCloseRescheduleModal}
          loading={isLoading}
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
