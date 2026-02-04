import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { patientService } from '@/features/admin/services/patientService';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import type { Patient, Physician } from '@/features/admin/types/patient.types';

/**
 * usePatientData Hook
 * Manages loading patient data and physician info
 */
export const usePatientData = (patientId: string | undefined) => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [primaryPhysician, setPrimaryPhysician] = useState<Physician | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Load patient data on mount
   */
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!patientId) return;

      try {
        setLoading(true);

        // Load patient details
        const patientData = await patientService.getPatientById(patientId);

        if (!isMounted) return;

        if (!patientData) {
          notification.error({
            message: 'Patient Not Found',
            description: 'The requested patient could not be found.',
          });
          navigate(ROUTE_PATHS.ADMIN.PATIENTS);
          return;
        }

        setPatient(patientData);

        // Load primary physician if assigned
        if (patientData.primaryPhysicianId) {
          const physician = await patientService.getPhysicianById(patientData.primaryPhysicianId);
          if (isMounted) {
            setPrimaryPhysician(physician);
          }
        }
      } catch (error) {
        if (isMounted) {
          notification.error({
            message: 'Error',
            description: 'Failed to load patient data. Please try again.',
          });
          console.error('Failed to load patient:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [patientId, navigate]);

  /**
   * Update patient state
   */
  const updatePatientData = useCallback((updatedPatient: Patient) => {
    setPatient(updatedPatient);
  }, []);

  return {
    patient,
    primaryPhysician,
    loading,
    updatePatientData,
  };
};
