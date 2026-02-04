import { useEffect, useCallback } from 'react';
import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setTestimonials,
  setTestimonialFilters,
  setTestimonialPagination,
  setLoadingTestimonials,
  setErrorTestimonials,
  selectTestimonialFilters,
  selectTestimonialPagination,
} from '@/features/admin/store/testimonialsSlice';
import { testimonialService } from '@/features/admin/services/testimonialService';
import type { TestimonialStatus } from '@/features/admin/types/testimonial.types';

/**
 * useTestimonialFilters Hook
 * Manages testimonial filters and data loading
 */
export const useTestimonialFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectTestimonialFilters);
  const pagination = useAppSelector(selectTestimonialPagination);

  /**
   * Load testimonials from service
   */
  const loadTestimonials = useCallback(async () => {
    try {
      dispatch(setLoadingTestimonials(true));
      const result = await testimonialService.getTestimonials(filters, pagination.page, pagination.pageSize);
      dispatch(setTestimonials(result.testimonials));
      dispatch(setTestimonialPagination({ total: result.total }));
    } catch {
      dispatch(setErrorTestimonials('Failed to load testimonials'));
      notification.error({
        message: 'Error',
        description: 'Failed to load testimonials. Please try again.',
      });
    } finally {
      dispatch(setLoadingTestimonials(false));
    }
  }, [dispatch, filters, pagination.page, pagination.pageSize]);

  /**
   * Load testimonials on mount and when filters/pagination change
   */
  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  /**
   * Handle search filter
   */
  const handleSearchFilter = useCallback(
    (search: string) => {
      dispatch(setTestimonialFilters({ search }));
      dispatch(setTestimonialPagination({ page: 1 }));
    },
    [dispatch],
  );

  /**
   * Handle status filter change
   */
  const handleStatusFilter = useCallback(
    (status: TestimonialStatus | 'all') => {
      dispatch(setTestimonialFilters({ status }));
      dispatch(setTestimonialPagination({ page: 1 }));
    },
    [dispatch],
  );

  /**
   * Handle page change
   */
  const handlePageChange = useCallback(
    (page: number, pageSize: number) => {
      dispatch(setTestimonialPagination({ page, pageSize }));
    },
    [dispatch],
  );

  return {
    filters,
    pagination,
    handleSearchFilter,
    handleStatusFilter,
    handlePageChange,
  };
};
