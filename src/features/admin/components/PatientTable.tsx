import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { Patient } from '@/features/admin/types/patient.types';
import { ROUTE_PATHS, buildRoute } from '@/routing/config/routePaths';
import styles from './PatientTable.module.scss';

interface PatientTableProps {
  patients: Patient[];
  loading: boolean;
  pagination: TablePaginationConfig;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

/**
 * PatientTable Component
 * Displays patients in a table with actions
 *
 * Features:
 * - Sortable columns
 * - Pagination
 * - Action buttons (view, edit, delete)
 * - Responsive design
 * - Navigation to patient details page
 */
export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  loading,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
}) => {
  const navigate = useNavigate();

  /**
   * Handle view patient - navigate to details page
   */
  const handleView = (patient: Patient) => {
    const detailsPath = buildRoute(ROUTE_PATHS.ADMIN.PATIENT_DETAILS, { id: patient.id });
    navigate(detailsPath);
  };

  /**
   * Table columns configuration
   */
  const columns: ColumnsType<Patient> = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      className: styles.nameColumn,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      className: styles.phoneColumn,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: styles.emailColumn,
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      sorter: (a, b) => new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      className: styles.dateColumn,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
              className={styles.actionButton}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              className={styles.actionButton}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
              className={styles.actionButton}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <Table
        columns={columns}
        dataSource={patients}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          onChange: onPageChange,
          showSizeChanger: false,
          showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} records`,
        }}
        className={styles.table}
        scroll={{ x: 800 }}
      />
    </div>
  );
};
