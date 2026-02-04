import { useEffect, useCallback } from 'react';
import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setPatients,
  setFilters,
  setPagination,
  setLoadingPatients,
  setErrorPatients,
  selectFilters,
  selectPagination,
} from '@/features/admin/store/patientsSlice';
import { patientService } from '@/features/admin/services/patientService';

/**
 * usePatientFilters Hook
 * Manages patient filters and data loading
 */
export const usePatientFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const pagination = useAppSelector(selectPagination);

  /**
   * Load patients from service
   */
  const loadPatients = useCallback(async () => {
    try {
      dispatch(setLoadingPatients(true));
      const result = await patientService.getPatients(filters, pagination.page, pagination.pageSize);
      dispatch(setPatients(result.patients));
      dispatch(setPagination({ total: result.total }));
    } catch {
      dispatch(setErrorPatients('Failed to load patients'));
      notification.error({
        message: 'Error',
        description: 'Failed to load patients. Please try again.',
      });
    } finally {
      dispatch(setLoadingPatients(false));
    }
  }, [dispatch, filters, pagination.page, pagination.pageSize]);

  /**
   * Load patients on mount and when filters/pagination change
   */
  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  /**
   * Handle search filter
   */
  const handleSearchFilter = useCallback(
    (search: string) => {
      dispatch(setFilters({ search }));
      dispatch(setPagination({ page: 1 }));
    },
    [dispatch],
  );

  /**
   * Handle page change
   */
  const handlePageChange = useCallback(
    (page: number, pageSize: number) => {
      dispatch(setPagination({ page, pageSize }));
    },
    [dispatch],
  );

  return {
    filters,
    pagination,
    handleSearchFilter,
    handlePageChange,
  };
};
