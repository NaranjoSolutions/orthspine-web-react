import React from 'react';
import { Input, Button, Space, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { TestimonialStatus } from '@/features/admin/types/testimonial.types';
import styles from './TestimonialsToolbar.module.scss';

const { Option } = Select;

/**
 * TestimonialsToolbar Component
 * Search, filter, and action controls for testimonials
 */
interface TestimonialsToolbarProps {
  searchValue: string;
  statusFilter: TestimonialStatus | 'all' | undefined;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onStatusFilterChange: (value: TestimonialStatus | 'all') => void;
  onAddNew: () => void;
}

export const TestimonialsToolbar: React.FC<TestimonialsToolbarProps> = ({
  searchValue,
  statusFilter,
  onSearchChange,
  onSearch,
  onStatusFilterChange,
  onAddNew,
}) => {
  return (
    <div className={styles.toolbar}>
      <Space size="middle" className={styles.searchSection}>
        <Input
          placeholder="Find by patient name"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={onSearchChange}
          onPressEnter={onSearch}
          size="large"
          className={styles.searchInput}
          allowClear
        />
        <Select
          placeholder="All Statuses"
          value={statusFilter}
          onChange={onStatusFilterChange}
          size="large"
          className={styles.statusFilter}
        >
          <Option value="all">All Statuses</Option>
          <Option value="pending">Pending</Option>
          <Option value="approved">Approved</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
      </Space>
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddNew} size="large">
        Add New Testimonial
      </Button>
    </div>
  );
};
