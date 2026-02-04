import React from 'react';
import { Input, Button, Space } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import styles from './PatientsToolbar.module.scss';

/**
 * PatientsToolbar Component
 * Search and action controls for patients
 */
interface PatientsToolbarProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onAddNew: () => void;
}

export const PatientsToolbar: React.FC<PatientsToolbarProps> = ({
  searchValue,
  onSearchChange,
  onSearch,
  onAddNew,
}) => {
  return (
    <div className={styles.toolbar}>
      <Space size="middle" className={styles.searchSection}>
        <Input
          placeholder="Search by name, email..."
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={onSearchChange}
          onPressEnter={onSearch}
          size="large"
          className={styles.searchInput}
          allowClear
        />
        <Button icon={<FilterOutlined />} size="large" disabled>
          Filter
        </Button>
      </Space>
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddNew} size="large">
        Add New Patient
      </Button>
    </div>
  );
};
