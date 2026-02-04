import React from 'react';
import { Table, Button, Space, Tooltip, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { Testimonial, TestimonialStatus } from '@/features/admin/types/testimonial.types';
import styles from './TestimonialTable.module.scss';

interface TestimonialTableProps {
  testimonials: Testimonial[];
  loading: boolean;
  pagination: TablePaginationConfig;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (testimonial: Testimonial) => void;
  onApprove: (testimonial: Testimonial) => void;
  onReject: (testimonial: Testimonial) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

/**
 * TestimonialTable Component
 * Displays testimonials in a table with actions
 *
 * Features:
 * - Sortable columns
 * - Pagination
 * - Action buttons (approve, reject, edit, delete)
 * - Status badges
 * - Responsive design
 */
export const TestimonialTable: React.FC<TestimonialTableProps> = ({
  testimonials,
  loading,
  pagination,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  onPageChange,
}) => {
  /**
   * Get status tag color
   */
  const getStatusColor = (status: TestimonialStatus): string => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  /**
   * Get status label
   */
  const getStatusLabel = (status: TestimonialStatus): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  /**
   * Truncate text for message preview
   */
  const truncateText = (text: string, maxLength: number = 60): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  /**
   * Table columns configuration
   */
  const columns: ColumnsType<Testimonial> = [
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
      sorter: (a, b) => a.patientName.localeCompare(b.patientName),
      className: styles.nameColumn,
      width: 180,
    },
    {
      title: 'Message Preview',
      dataIndex: 'message',
      key: 'message',
      className: styles.messageColumn,
      render: (message: string) => <span className={styles.messagePreview}>{truncateText(message)}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: TestimonialStatus) => (
        <Tag color={getStatusColor(status)} className={styles.statusTag}>
          {getStatusLabel(status)}
        </Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Date Added',
      dataIndex: 'dateAdded',
      key: 'dateAdded',
      width: 130,
      sorter: (a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime(),
      render: (date: string) =>
        new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      className: styles.dateColumn,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          {record.status === 'pending' && (
            <>
              <Tooltip title="Approve">
                <Button
                  type="text"
                  icon={<CheckOutlined />}
                  onClick={() => onApprove(record)}
                  className={styles.approveButton}
                />
              </Tooltip>
              <Tooltip title="Reject">
                <Button
                  type="text"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => onReject(record)}
                  className={styles.rejectButton}
                />
              </Tooltip>
            </>
          )}
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} className={styles.editButton} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
              className={styles.deleteButton}
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
        dataSource={testimonials}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          onChange: onPageChange,
          showSizeChanger: false,
          showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total}`,
        }}
        className={styles.table}
        scroll={{ x: 900 }}
      />
    </div>
  );
};
