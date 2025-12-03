import React from 'react';
import { Button, Avatar, Dropdown, Space } from 'antd';
import { EditOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './PatientHeader.module.scss';

interface PatientHeaderProps {
  fullName: string;
  patientId?: string;
  dateOfBirth: string;
  avatarUrl?: string;
  onEdit: () => void;
}

/**
 * PatientHeader Component
 * Displays patient profile header with avatar, basic info, and actions
 *
 * Features:
 * - Patient avatar (placeholder if not provided)
 * - Patient name and ID
 * - Date of birth
 * - Edit button
 * - More actions dropdown menu
 */
export const PatientHeader: React.FC<PatientHeaderProps> = ({
  fullName,
  patientId,
  dateOfBirth,
  avatarUrl,
  onEdit,
}) => {
  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /**
   * More actions menu items
   */
  const menuItems: MenuProps['items'] = [
    {
      key: 'export',
      label: 'Export Records',
    },
    {
      key: 'print',
      label: 'Print Summary',
    },
    {
      type: 'divider',
    },
    {
      key: 'archive',
      label: 'Archive Patient',
      danger: true,
    },
  ];

  return (
    <div className={styles.patientHeader}>
      <div className={styles.patientInfo}>
        <Avatar size={80} src={avatarUrl} icon={<UserOutlined />} className={styles.avatar} />
        <div className={styles.details}>
          <h1 className={styles.name}>{fullName}</h1>
          <div className={styles.metadata}>
            {patientId && <span className={styles.patientId}>Patient ID: {patientId}</span>}
            <span className={styles.separator}>•</span>
            <span className={styles.dob}>DOB: {formatDate(dateOfBirth)}</span>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={onEdit} size="large">
            Edit Patient
          </Button>
          <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
            <Button icon={<MoreOutlined />} size="large" />
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};
