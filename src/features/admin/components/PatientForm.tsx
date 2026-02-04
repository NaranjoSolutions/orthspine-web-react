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
        label="Nombre Completo"
        rules={[
          { required: true, message: 'Por favor ingrese el nombre completo del paciente' },
          { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
        ]}
      >
        <Input placeholder="Ingrese el nombre completo" size="large" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Teléfono"
        rules={[
          { required: true, message: 'Por favor ingrese el número de teléfono' },
          { pattern: /^\(\d{3}\) \d{3}-\d{4}$/, message: 'El teléfono debe estar en formato (555) 123-4567' },
        ]}
      >
        <Input placeholder="(555) 123-4567" size="large" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Correo Electrónico"
        rules={[
          { required: true, message: 'Por favor ingrese el correo electrónico' },
          { type: 'email', message: 'Por favor ingrese un correo electrónico válido' },
        ]}
      >
        <Input placeholder="ejemplo@correo.com" size="large" />
      </Form.Item>

      <Form.Item
        name="dateOfBirth"
        label="Fecha de Nacimiento"
        rules={[{ required: true, message: 'Por favor seleccione la fecha de nacimiento' }]}
      >
        <DatePicker
          placeholder="Seleccione fecha"
          size="large"
          style={{ width: '100%' }}
          format="MM/DD/YYYY"
          disabledDate={(current) => current && current > dayjs().endOf('day')}
        />
      </Form.Item>

      <Form.Item name="address" label="Dirección">
        <Input placeholder="Ingrese la dirección (opcional)" size="large" />
      </Form.Item>

      <Form.Item name="medicalHistory" label="Historial Médico">
        <Input.TextArea placeholder="Ingrese el historial médico (opcional)" rows={4} size="large" />
      </Form.Item>

      <Form.Item className={styles.actions}>
        <Space size="middle">
          <Button onClick={onCancel} size="large">
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} size="large">
            {initialValues ? 'Actualizar Paciente' : 'Agregar Paciente'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
