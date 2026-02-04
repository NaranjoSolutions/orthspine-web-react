import React from 'react';
import { Form, Input, Select, Rate, Button, Space } from 'antd';
import type { TestimonialFormData } from '@/features/admin/types/testimonial.types';
import { TestimonialStatus } from '@/features/admin/types/testimonial.types';
import styles from './TestimonialForm.module.scss';

const { TextArea } = Input;
const { Option } = Select;

interface TestimonialFormProps {
  initialValues?: TestimonialFormData;
  onSubmit: (values: TestimonialFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

/**
 * TestimonialForm Component
 * Form for creating or editing testimonial information
 *
 * Features:
 * - Form validation
 * - Rating input
 * - Status selection
 * - Text area for message
 */
export const TestimonialForm: React.FC<TestimonialFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [form] = Form.useForm();

  /**
   * Handle form submission
   */
  const handleFinish = (values: TestimonialFormData) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={
        initialValues || {
          rating: 5,
          status: TestimonialStatus.PENDING,
        }
      }
      onFinish={handleFinish}
      className={styles.form}
    >
      <Form.Item
        name="patientName"
        label="Nombre del Paciente"
        rules={[
          { required: true, message: 'Por favor ingrese el nombre del paciente' },
          { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
        ]}
      >
        <Input placeholder="Ingrese el nombre del paciente" size="large" />
      </Form.Item>

      <Form.Item
        name="message"
        label="Mensaje del Testimonio"
        rules={[
          { required: true, message: 'Por favor ingrese el mensaje del testimonio' },
          { min: 10, message: 'El mensaje debe tener al menos 10 caracteres' },
          { max: 1000, message: 'El mensaje no debe exceder los 1000 caracteres' },
        ]}
      >
        <TextArea placeholder="Ingrese el mensaje del testimonio" rows={6} showCount maxLength={1000} size="large" />
      </Form.Item>

      <Form.Item name="rating" label="Calificación" rules={[{ required: true, message: 'Por favor seleccione una calificación' }]}>
        <Rate allowHalf className={styles.rating} />
      </Form.Item>

      <Form.Item name="status" label="Estado" rules={[{ required: true, message: 'Por favor seleccione un estado' }]}>
        <Select placeholder="Seleccione el estado" size="large">
          <Option value="pending">Pendiente</Option>
          <Option value="approved">Aprobado</Option>
          <Option value="rejected">Rechazado</Option>
        </Select>
      </Form.Item>

      <Form.Item className={styles.buttonGroup}>
        <Space size="middle">
          <Button onClick={onCancel} size="large">
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} size="large">
            {initialValues ? 'Actualizar' : 'Crear'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
