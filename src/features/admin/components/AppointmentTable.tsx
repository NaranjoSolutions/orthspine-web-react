import React from 'react';
import { Table, Tag, Space, Button, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import type { AdminAppointment, AppointmentStatus } from '@/features/admin/types/appointment.types';
import dayjs from 'dayjs';
import styles from './AppointmentTable.module.scss';

/**
 * AppointmentTable Props
 */
interface AppointmentTableProps {
  appointments: AdminAppointment[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  onView: (appointment: AdminAppointment) => void;
  onReschedule: (appointment: AdminAppointment) => void;
  onCancel: (appointment: AdminAppointment) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

/**
 * Get status tag color based on appointment status
 */
const getStatusColor = (status: AppointmentStatus): string => {
  const statusColors: Record<AppointmentStatus, string> = {
    confirmed: 'green',
    pending: 'orange',
    cancelled: 'red',
    completed: 'blue',
    rescheduled: 'cyan',
  };
  return statusColors[status] || 'default';
};

/**
 * Get status display text
 */
const getStatusText = (status: AppointmentStatus): string => {
  const statusText: Record<AppointmentStatus, string> = {
    confirmed: 'Confirmed',
    pending: 'Pending',
    cancelled: 'Cancelled',
    completed: 'Completed',
    rescheduled: 'Rescheduled',
  };
  return statusText[status] || status;
};

/**
 * AppointmentTable Component
 * Displays appointments in a table with actions
 *
 * Features:
 * - Sortable columns
 * - Status badges with colors
 * - Action buttons (view, reschedule, cancel)
 * - Pagination
 * - Loading state
 * - Responsive design
 *
 * Design Principles:
 * - Single Responsibility: Only displays appointment data
 * - Separation of Concerns: Actions handled by parent
 */
export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  loading,
  pagination,
  onView,
  onReschedule,
  onCancel,
  onPageChange,
}) => {
  const columns = [
    {
      title: 'Patient',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 180,
      sorter: true,
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
      width: 200,
      render: (dateTime: string) => (
        <div className={styles.dateTime}>
          <div className={styles.date}>{dayjs(dateTime).format('MMM DD, YYYY')}</div>
          <div className={styles.time}>{dayjs(dateTime).format('hh:mm A')}</div>
        </div>
      ),
      sorter: true,
    },
    {
      title: 'Doctor',
      dataIndex: 'doctorName',
      key: 'doctorName',
      width: 180,
      sorter: true,
    },
    {
      title: 'Reason for Visit',
      dataIndex: 'reasonForVisit',
      key: 'reasonForVisit',
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: AppointmentStatus) => (
        <Tag color={getStatusColor(status)} className={styles.statusTag}>
          {getStatusText(status)}
        </Tag>
      ),
      filters: [
        { text: 'Confirmed', value: 'confirmed' },
        { text: 'Pending', value: 'pending' },
        { text: 'Cancelled', value: 'cancelled' },
        { text: 'Completed', value: 'completed' },
        { text: 'Rescheduled', value: 'rescheduled' },
      ],
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      fixed: 'right' as const,
      render: (_: unknown, record: AdminAppointment) => {
        const canReschedule = record.status !== 'cancelled' && record.status !== 'completed';
        const canCancel = record.status !== 'cancelled' && record.status !== 'completed';

        return (
          <Space size="small">
            <Tooltip title="View Details">
              <Button
                type="link"
                icon={<EyeOutlined />}
                onClick={() => onView(record)}
                className={styles.actionButton}
              >
                View
              </Button>
            </Tooltip>
            {canReschedule && (
              <Tooltip title="Reschedule">
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => onReschedule(record)}
                  className={styles.actionButton}
                >
                  Reschedule
                </Button>
              </Tooltip>
            )}
            {canCancel && (
              <Tooltip title="Cancel Appointment">
                <Button
                  type="link"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => onCancel(record)}
                  className={styles.actionButton}
                >
                  Cancel
                </Button>
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className={styles.appointmentTable}>
      <Table
        columns={columns}
        dataSource={appointments}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} results`,
          onChange: onPageChange,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        scroll={{ x: 1200 }}
        className={styles.table}
      />
    </div>
  );
};
