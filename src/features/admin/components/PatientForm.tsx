import React from 'react';
import { Form, Input, DatePicker, Button, Space } from 'antd';
import dayjs from 'dayjs';
import type { PatientFormData } from '@/features/admin/types/patient.types';
import styles from './PatientForm.module.scss';

interface PatientFormProps {
  initialValues?: PatientFormData;
  onSubmit: (values: PatientFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

/**
 * PatientForm Component
 * Form for creating or editing patient information
 *
 * Features:
 * - Form validation
 * - Date picker for date of birth
 * - Optional fields support
 */
export const PatientForm: React.FC<PatientFormProps> = ({ initialValues, onSubmit, onCancel, loading = false }) => {
  const [form] = Form.useForm();

  /**
   * Handle form submission
   */
  const handleFinish = (values: PatientFormData & { dateOfBirth: dayjs.Dayjs }) => {
    const formData: PatientFormData = {
      ...values,
      dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
    };
    onSubmit(formData);
  };

  /**
   * Prepare initial values for form
   */
  const getInitialValues = () => {
    if (!initialValues) return undefined;

    return {
      ...initialValues,
      dateOfBirth: dayjs(initialValues.dateOfBirth),
    };
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={getInitialValues()}
      onFinish={handleFinish}
      className={styles.form}
    >
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[
          { required: true, message: "Please enter the patient's full name" },
          { min: 2, message: 'Name must be at least 2 characters' },
        ]}
      >
        <Input placeholder="Enter full name" size="large" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: 'Please enter phone number' },
          { pattern: /^\(\d{3}\) \d{3}-\d{4}$/, message: 'Phone must be in format (555) 123-4567' },
        ]}
      >
        <Input placeholder="(555) 123-4567" size="large" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter email address' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input placeholder="example@email.com" size="large" />
      </Form.Item>

      <Form.Item
        name="dateOfBirth"
        label="Date of Birth"
        rules={[{ required: true, message: 'Please select date of birth' }]}
      >
        <DatePicker
          placeholder="Select date"
          size="large"
          style={{ width: '100%' }}
          format="MM/DD/YYYY"
          disabledDate={(current) => current && current > dayjs().endOf('day')}
        />
      </Form.Item>

      <Form.Item name="address" label="Address">
        <Input placeholder="Enter address (optional)" size="large" />
      </Form.Item>

      <Form.Item name="medicalHistory" label="Medical History">
        <Input.TextArea placeholder="Enter medical history (optional)" rows={4} size="large" />
      </Form.Item>

      <Form.Item className={styles.actions}>
        <Space size="middle">
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} size="large">
            {initialValues ? 'Update Patient' : 'Add Patient'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
