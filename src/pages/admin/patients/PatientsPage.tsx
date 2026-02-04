import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import { useAppSelector } from '@/store';
import { selectPatients, selectSelectedPatient, selectIsLoading } from '@/features/admin/store/patientsSlice';
import { PatientTable, PatientForm, PatientsToolbar } from '@/features/admin/components';
import { usePatientModals, usePatientFilters } from '@/features/admin/hooks';
import styles from './PatientsPage.module.scss';

/**
 * PatientsPage Component
 * Main page for patient management
 *
 * Features:
 * - Patient list with search and filter
 * - Add, edit, delete operations
 * - Pagination
 * - Loading states
 * - Navigation to patient details via table
 */
const PatientsPage: React.FC = () => {
  const patients = useAppSelector(selectPatients);
  const selectedPatient = useAppSelector(selectSelectedPatient);
  const isLoading = useAppSelector(selectIsLoading);

  const [searchValue, setSearchValue] = useState('');

  // Custom hooks for modals and filters
  const {
    formModalVisible,
    isEditing,
    isLoading: modalLoading,
    handleAddNew,
    handleEdit,
    handleDelete,
    handleFormSubmit,
    handleCloseFormModal,
  } = usePatientModals();

  const { pagination, handleSearchFilter, handlePageChange } = usePatientFilters();

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
    <div className={styles.patientsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Expedientes de Pacientes</h1>
      </div>

      <Card bordered={false} className={styles.card}>
        <PatientsToolbar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
          onAddNew={handleAddNew}
        />

        <PatientTable
          patients={patients}
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={handlePageChange}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={isEditing ? 'Editar Paciente' : 'Agregar Nuevo Paciente'}
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
          onSubmit={(values) => handleFormSubmit(values, selectedPatient)}
          onCancel={handleCloseFormModal}
          loading={modalLoading}
        />
      </Modal>
    </div>
  );
};

export default PatientsPage;
