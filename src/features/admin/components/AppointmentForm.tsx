import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Space } from 'antd';
import {
  AppointmentStatus,
  type AppointmentFormData,
  type DoctorOption,
  type PatientOption,
} from '@/features/admin/types/appointment.types';
import { appointmentService } from '@/features/admin/services/appointmentService';
import dayjs from 'dayjs';
import styles from './AppointmentForm.module.scss';

const { TextArea } = Input;
const { Option } = Select;

/**
 * AppointmentForm Props
 */
interface AppointmentFormProps {
  initialValues?: Partial<AppointmentFormData>;
  onSubmit: (values: AppointmentFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

/**
 * AppointmentForm Component
 * Form for creating or editing appointments
 *
 * Features:
 * - Patient selection
 * - Doctor selection
 * - Date and time picker
 * - Reason for visit
 * - Status selection
 * - Notes field
 * - Form validation
 *
 * Design Principles:
 * - Controlled components
 * - Validation on submit
 * - Loading states
 */

/**
 * Helper function for filtering select options
 */
const filterSelectOption = (input: string, option: unknown): boolean => {
  const opt = option as { label?: unknown; children?: unknown };
  const label = opt?.label || opt?.children;
  const labelStr = typeof label === 'string' ? label : String(label);
  return labelStr.toLowerCase().includes(input.toLowerCase());
};

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [doctors, setDoctors] = useState<DoctorOption[]>([]);
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  /**
   * Load doctors and patients on mount
   */
  useEffect(() => {
    loadFormData();
  }, []);

  /**
   * Load doctors and patients from service
   */
  const loadFormData = async () => {
    try {
      setLoadingData(true);
      const [doctorsData, patientsData] = await Promise.all([
        appointmentService.getDoctors(),
        appointmentService.getPatientOptions(),
      ]);
      setDoctors(doctorsData);
      setPatients(patientsData);
    } catch (error) {
      console.error('Failed to load form data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (values: AppointmentFormData) => {
    await onSubmit(values);
  };

  /**
   * Handle patient selection
   */
  const handlePatientChange = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      form.setFieldsValue({
        patientName: patient.name,
      });
    }
  };

  /**
   * Handle doctor selection
   */
  const handleDoctorChange = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (doctor) {
      form.setFieldsValue({
        doctorName: doctor.name,
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={
        initialValues
          ? {
              ...initialValues,
              dateTime: initialValues.dateTime ? dayjs(initialValues.dateTime) : undefined,
            }
          : {
              status: AppointmentStatus.PENDING,
            }
      }
      className={styles.appointmentForm}
    >
      {/* Patient Selection */}
      <Form.Item name="patientId" label="Patient" rules={[{ required: true, message: 'Please select a patient' }]}>
        <Select
          placeholder="Select patient"
          showSearch
          loading={loadingData}
          filterOption={filterSelectOption}
          onChange={handlePatientChange}
        >
          {patients.map((patient) => (
            <Option key={patient.id} value={patient.id}>
              {patient.name} ({patient.email})
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Hidden field for patient name */}
      <Form.Item name="patientName" hidden>
        <Input />
      </Form.Item>

      {/* Doctor Selection */}
      <Form.Item name="doctorId" label="Doctor" rules={[{ required: true, message: 'Please select a doctor' }]}>
        <Select
          placeholder="Select doctor"
          showSearch
          loading={loadingData}
          filterOption={filterSelectOption}
          onChange={handleDoctorChange}
        >
          {doctors.map((doctor) => (
            <Option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialty}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Hidden field for doctor name */}
      <Form.Item name="doctorName" hidden>
        <Input />
      </Form.Item>

      {/* Date and Time */}
      <Form.Item
        name="dateTime"
        label="Date & Time"
        rules={[{ required: true, message: 'Please select date and time' }]}
      >
        <DatePicker showTime format="YYYY-MM-DD hh:mm A" placeholder="Select date and time" style={{ width: '100%' }} />
      </Form.Item>

      {/* Reason for Visit */}
      <Form.Item
        name="reasonForVisit"
        label="Reason for Visit"
        rules={[
          { required: true, message: 'Please enter reason for visit' },
          { min: 3, message: 'Reason must be at least 3 characters' },
        ]}
      >
        <Input placeholder="e.g., Initial Consultation, Follow-up, Post-Op Check" />
      </Form.Item>

      {/* Status */}
      <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select status' }]}>
        <Select placeholder="Select status">
          <Option value={AppointmentStatus.PENDING}>Pending</Option>
          <Option value={AppointmentStatus.CONFIRMED}>Confirmed</Option>
          <Option value={AppointmentStatus.RESCHEDULED}>Rescheduled</Option>
          <Option value={AppointmentStatus.COMPLETED}>Completed</Option>
          <Option value={AppointmentStatus.CANCELLED}>Cancelled</Option>
        </Select>
      </Form.Item>

      {/* Notes */}
      <Form.Item name="notes" label="Notes (Optional)">
        <TextArea rows={3} placeholder="Add any additional notes about this appointment..." maxLength={500} showCount />
      </Form.Item>

      {/* Form Actions */}
      <Form.Item className={styles.formActions}>
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? 'Update Appointment' : 'Create Appointment'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
