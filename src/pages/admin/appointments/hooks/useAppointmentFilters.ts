import { useEffect, useCallback } from 'react';
import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setAppointments,
  setAppointmentFilters,
  clearAppointmentFilters,
  setAppointmentPagination,
  setLoadingAppointments,
  setErrorAppointments,
  selectAppointmentFilters,
  selectAppointmentPagination,
} from '@/features/admin/store/appointmentsSlice';
import { appointmentService } from '@/features/admin/services/appointmentService';
import type { AppointmentStatus } from '@/features/admin/types/appointment.types';
import dayjs from 'dayjs';

/**
 * useAppointmentFilters Hook
 * Manages appointment filters and data loading
 */
export const useAppointmentFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectAppointmentFilters);
  const pagination = useAppSelector(selectAppointmentPagination);

  /**
   * Load appointments from service
   */
  const loadAppointments = useCallback(async () => {
    try {
      dispatch(setLoadingAppointments(true));
      const result = await appointmentService.getAppointments(filters, pagination.page, pagination.pageSize);
      dispatch(setAppointments(result.appointments));
      dispatch(setAppointmentPagination({ total: result.total }));
    } catch {
      dispatch(setErrorAppointments('Failed to load appointments'));
      notification.error({
        message: 'Error',
        description: 'Failed to load appointments. Please try again.',
      });
    } finally {
      dispatch(setLoadingAppointments(false));
    }
  }, [dispatch, filters, pagination.page, pagination.pageSize]);

  /**
   * Load appointments on mount and when filters/pagination change
   */
  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  /**
   * Handle search filter
   */
  const handleSearchFilter = useCallback(
    (search: string) => {
      dispatch(setAppointmentFilters({ search }));
      dispatch(setAppointmentPagination({ page: 1 }));
    },
    [dispatch],
  );

  /**
   * Handle doctor filter change
   */
  const handleDoctorFilter = useCallback(
    (doctorId: string) => {
      dispatch(setAppointmentFilters({ doctorId: doctorId === 'all' ? undefined : doctorId }));
      dispatch(setAppointmentPagination({ page: 1 }));
    },
    [dispatch],
  );

  /**
   * Handle status filter change
   */
  const handleStatusFilter = useCallback(
    (status: string) => {
      dispatch(setAppointmentFilters({ status: status as AppointmentStatus | 'all' }));
      dispatch(setAppointmentPagination({ page: 1 }));
    },
    [dispatch],
  );

  /**
   * Handle date range filter change
   */
  const handleDateRangeFilter = useCallback(
    (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
      if (dates && dates[0] && dates[1]) {
        dispatch(
          setAppointmentFilters({
            dateRange: {
              start: dates[0].toISOString(),
              end: dates[1].toISOString(),
            },
          }),
        );
      } else {
        dispatch(setAppointmentFilters({ dateRange: undefined }));
      }
      dispatch(setAppointmentPagination({ page: 1 }));
    },
    [dispatch],
  );

  /**
   * Handle clear filters
   */
  const handleClearAllFilters = useCallback(() => {
    dispatch(clearAppointmentFilters());
    dispatch(setAppointmentPagination({ page: 1 }));
  }, [dispatch]);

  /**
   * Handle page change
   */
  const handlePageChange = useCallback(
    (page: number, pageSize: number) => {
      dispatch(setAppointmentPagination({ page, pageSize }));
    },
    [dispatch],
  );

  return {
    filters,
    pagination,
    handleSearchFilter,
    handleDoctorFilter,
    handleStatusFilter,
    handleDateRangeFilter,
    handleClearAllFilters,
    handlePageChange,
  };
};
