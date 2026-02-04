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
          placeholder="Buscar por nombre de paciente"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={onSearchChange}
          onPressEnter={onSearch}
          size="large"
          className={styles.searchInput}
          allowClear
        />
        <Select
          placeholder="Todos los Estados"
          value={statusFilter}
          onChange={onStatusFilterChange}
          size="large"
          className={styles.statusFilter}
        >
          <Option value="all">Todos los Estados</Option>
          <Option value="pending">Pendiente</Option>
          <Option value="approved">Aprobado</Option>
          <Option value="rejected">Rechazado</Option>
        </Select>
      </Space>
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddNew} size="large">
        Agregar Nuevo Testimonio
      </Button>
    </div>
  );
};
