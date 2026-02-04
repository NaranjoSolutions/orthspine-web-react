import React from 'react';
import { Input, Button, Space, Select, DatePicker } from 'antd';
import { SearchOutlined, FilterOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AppointmentStatus } from '@/features/admin/types/appointment.types';
import type { DoctorOption } from '@/features/admin/types/appointment.types';
import type { AppointmentFilters } from '@/features/admin/types/appointment.types';
import dayjs from 'dayjs';
import styles from './AppointmentsToolbar.module.scss';

const { RangePicker } = DatePicker;

/**
 * AppointmentsToolbar Component
 * Search, filter, and action controls for appointments
 */
interface AppointmentsToolbarProps {
  searchValue: string;
  showFilters: boolean;
  filters: AppointmentFilters;
  doctors: DoctorOption[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onToggleFilters: () => void;
  onClearFilters: () => void;
  onDoctorFilterChange: (doctorId: string) => void;
  onStatusFilterChange: (status: string) => void;
  onDateRangeChange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => void;
}

export const AppointmentsToolbar: React.FC<AppointmentsToolbarProps> = ({
  searchValue,
  showFilters,
  filters,
  doctors,
  onSearchChange,
  onSearch,
  onToggleFilters,
  onClearFilters,
  onDoctorFilterChange,
  onStatusFilterChange,
  onDateRangeChange,
}) => {
  const hasActiveFilters = filters.doctorId || filters.status !== 'all' || filters.dateRange;

  return (
    <>
      <div className={styles.toolbar}>
        <Space size="middle" className={styles.searchSection}>
          <Input
            placeholder="Buscar pacientes, médicos..."
            prefix={<SearchOutlined />}
            value={searchValue}
            onChange={onSearchChange}
            onPressEnter={onSearch}
            size="large"
            className={styles.searchInput}
            allowClear
          />
          <Button
            icon={<FilterOutlined />}
            size="large"
            onClick={onToggleFilters}
            type={showFilters ? 'primary' : 'default'}
          >
            Filtro
          </Button>
          {hasActiveFilters && (
            <Button icon={<CloseCircleOutlined />} size="large" onClick={onClearFilters}>
              Limpiar Filtros
            </Button>
          )}
        </Space>
      </div>

      {showFilters && (
        <div className={styles.filters}>
          <Space size="middle" wrap>
            <div className={styles.filterItem}>
              <label>Rango de Fechas:</label>
              <RangePicker
                value={filters.dateRange ? [dayjs(filters.dateRange.start), dayjs(filters.dateRange.end)] : null}
                onChange={onDateRangeChange}
                style={{ width: 280 }}
              />
            </div>
            <div className={styles.filterItem}>
              <label>Médico:</label>
              <Select value={filters.doctorId || 'all'} onChange={onDoctorFilterChange} style={{ width: 200 }}>
                <Select.Option value="all">Todos los Médicos</Select.Option>
                {doctors.map((doctor) => (
                  <Select.Option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className={styles.filterItem}>
              <label>Estado:</label>
              <Select value={filters.status || 'all'} onChange={onStatusFilterChange} style={{ width: 160 }}>
                <Select.Option value="all">Todos los Estados</Select.Option>
                <Select.Option value={AppointmentStatus.CONFIRMED}>Confirmada</Select.Option>
                <Select.Option value={AppointmentStatus.PENDING}>Pendiente</Select.Option>
                <Select.Option value={AppointmentStatus.CANCELLED}>Cancelada</Select.Option>
                <Select.Option value={AppointmentStatus.COMPLETED}>Completada</Select.Option>
                <Select.Option value={AppointmentStatus.RESCHEDULED}>Reprogramada</Select.Option>
              </Select>
            </div>
          </Space>
        </div>
      )}
    </>
  );
};
