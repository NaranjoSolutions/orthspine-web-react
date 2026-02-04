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
    confirmed: 'Confirmada',
    pending: 'Pendiente',
    cancelled: 'Cancelada',
    completed: 'Completada',
    rescheduled: 'Reprogramada',
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
      title: 'Paciente',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 180,
      sorter: true,
    },
    {
      title: 'Fecha y Hora',
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
      title: 'Médico',
      dataIndex: 'doctorName',
      key: 'doctorName',
      width: 180,
      sorter: true,
    },
    {
      title: 'Motivo de Consulta',
      dataIndex: 'reasonForVisit',
      key: 'reasonForVisit',
      width: 200,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: AppointmentStatus) => (
        <Tag color={getStatusColor(status)} className={styles.statusTag}>
          {getStatusText(status)}
        </Tag>
      ),
      filters: [
        { text: 'Confirmada', value: 'confirmed' },
        { text: 'Pendiente', value: 'pending' },
        { text: 'Cancelada', value: 'cancelled' },
        { text: 'Completada', value: 'completed' },
        { text: 'Reprogramada', value: 'rescheduled' },
      ],
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 180,
      fixed: 'right' as const,
      render: (_: unknown, record: AdminAppointment) => {
        const canReschedule = record.status !== 'cancelled' && record.status !== 'completed';
        const canCancel = record.status !== 'cancelled' && record.status !== 'completed';

        return (
          <Space size="small">
            <Tooltip title="Ver Detalles">
              <Button type="link" icon={<EyeOutlined />} onClick={() => onView(record)} className={styles.actionButton}>
                Ver
              </Button>
            </Tooltip>
            {canReschedule && (
              <Tooltip title="Reprogramar">
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => onReschedule(record)}
                  className={styles.actionButton}
                >
                  Reprogramar
                </Button>
              </Tooltip>
            )}
            {canCancel && (
              <Tooltip title="Cancelar Cita">
                <Button
                  type="link"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => onCancel(record)}
                  className={styles.actionButton}
                >
                  Cancelar
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
          showTotal: (total, range) => `Mostrando ${range[0]} a ${range[1]} de ${total} resultados`,
          onChange: onPageChange,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        scroll={{ x: 1200 }}
        className={styles.table}
      />
    </div>
  );
};
