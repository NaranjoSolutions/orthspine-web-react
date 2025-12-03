import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Space, Modal, notification } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setPatients,
  setSelectedPatient,
  addPatient,
  updatePatient,
  deletePatient,
  setFilters,
  setPagination,
  setLoadingPatients,
  setErrorPatients,
  selectPatients,
  selectSelectedPatient,
  selectFilters,
  selectPagination,
  selectIsLoading,
} from '@/features/admin/store/patientsSlice';
import { patientService } from '@/features/admin/services/patientService';
import { PatientTable, PatientForm, PatientViewModal } from '@/features/admin/components';
import type { Patient, PatientFormData } from '@/features/admin/types/patient.types';
import styles from './PatientsPage.module.scss';

/**
 * PatientsPage Component
 * Main page for patient management
 *
 * Features:
 * - Patient list with search and filter
 * - Add, edit, view, delete operations
 * - Pagination
 * - Loading states
 */
const PatientsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const patients = useAppSelector(selectPatients);
  const selectedPatient = useAppSelector(selectSelectedPatient);
  const filters = useAppSelector(selectFilters);
  const pagination = useAppSelector(selectPagination);
  const isLoading = useAppSelector(selectIsLoading);

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  /**
   * Load patients on mount and when filters/pagination change
   */
  useEffect(() => {
    loadPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination.page, pagination.pageSize]);

  /**
   * Load patients from service
   */
  const loadPatients = async () => {
    try {
      dispatch(setLoadingPatients(true));
      const result = await patientService.getPatients(filters, pagination.page, pagination.pageSize);
      dispatch(setPatients(result.patients));
      dispatch(setPagination({ total: result.total }));
    } catch {
      dispatch(setErrorPatients('Failed to load patients'));
      notification.error({
        message: 'Error',
        description: 'Failed to load patients. Please try again.',
      });
    } finally {
      dispatch(setLoadingPatients(false));
    }
  };

  /**
   * Handle search
   */
  const handleSearch = () => {
    dispatch(setFilters({ search: searchValue }));
    dispatch(setPagination({ page: 1 })); // Reset to first page
  };

  /**
   * Handle search input change
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      dispatch(setFilters({ search: '' }));
      dispatch(setPagination({ page: 1 }));
    }
  };

  /**
   * Handle view patient
   */
  const handleView = (patient: Patient) => {
    dispatch(setSelectedPatient(patient));
    setViewModalVisible(true);
  };

  /**
   * Handle edit patient
   */
  const handleEdit = (patient: Patient) => {
    dispatch(setSelectedPatient(patient));
    setIsEditing(true);
    setFormModalVisible(true);
  };

  /**
   * Handle delete patient
   */
  const handleDelete = (patient: Patient) => {
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
  };

  /**
   * Handle add new patient
   */
  const handleAddNew = () => {
    dispatch(setSelectedPatient(null));
    setIsEditing(false);
    setFormModalVisible(true);
  };

  /**
   * Handle form submit
   */
  const handleFormSubmit = async (values: PatientFormData) => {
    try {
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
    }
  };

  /**
   * Handle page change
   */
  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setPagination({ page, pageSize }));
  };

  /**
   * Close view modal
   */
  const handleCloseViewModal = () => {
    setViewModalVisible(false);
    dispatch(setSelectedPatient(null));
  };

  /**
   * Close form modal
   */
  const handleCloseFormModal = () => {
    setFormModalVisible(false);
    dispatch(setSelectedPatient(null));
    setIsEditing(false);
  };

  return (
    <div className={styles.patientsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Patient Records</h1>
      </div>

      <Card bordered={false} className={styles.card}>
        <div className={styles.toolbar}>
          <Space size="middle" className={styles.searchSection}>
            <Input
              placeholder="Search by name, email..."
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={handleSearchChange}
              onPressEnter={handleSearch}
              size="large"
              className={styles.searchInput}
              allowClear
            />
            <Button icon={<FilterOutlined />} size="large" disabled>
              Filter
            </Button>
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew} size="large">
            Add New Patient
          </Button>
        </div>

        <PatientTable
          patients={patients}
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={handlePageChange}
        />
      </Card>

      {/* View Modal */}
      <PatientViewModal patient={selectedPatient} visible={viewModalVisible} onClose={handleCloseViewModal} />

      {/* Add/Edit Modal */}
      <Modal
        title={isEditing ? 'Edit Patient' : 'Add New Patient'}
        open={formModalVisible}
        onCancel={handleCloseFormModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <PatientForm
          initialValues={
            isEditing && selectedPatient
              ? {
                  fullName: selectedPatient.fullName,
                  phone: selectedPatient.phone,
                  email: selectedPatient.email,
                  dateOfBirth: selectedPatient.dateOfBirth,
                  address: selectedPatient.address,
                  medicalHistory: selectedPatient.medicalHistory,
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

export default PatientsPage;
