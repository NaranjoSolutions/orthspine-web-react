import React, { useState } from 'react';
import { Form, Input, Button, message, Select, DatePicker, Rate, Checkbox } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { allClinicServices } from '@/shared/resources/services/services';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { SuccessFeedbackModal } from '../SuccessFeedbackModal';
import styles from './TestimonialSubmissionForm.module.scss';

const { TextArea } = Input;

/**
 * Testimonial submission form field values
 */
interface TestimonialSubmissionFormValues {
  fullName: string;
  email: string;
  service: string;
  dateOfService: Dayjs;
  rating: number;
  review: string;
  consent: boolean;
}

interface TestimonialSubmissionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

/**
 * TestimonialSubmissionForm Component
 * Public-facing form for patients to submit testimonials
 *
 * Features:
 * - Star rating input
 * - Two-column responsive layout
 * - Service selection dropdown
 * - Date picker for service date
 * - Comprehensive text area for review
 * - Privacy consent checkbox
 * - Form validation
 * - User-friendly error messages
 * - Loading state during submission
 * - Accessibility support
 */
export const TestimonialSubmissionForm: React.FC<TestimonialSubmissionFormProps> = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Prepare service options from clinic services
  const serviceOptions = allClinicServices.map((service) => ({
    value: service.serviceId,
    label: service.title,
  }));

  /**
   * Handle form submission
   * @param values - Form field values
   */
  const handleSubmit = async (values: TestimonialSubmissionFormValues) => {
    setLoading(true);
    try {
      // TODO: Implement actual submission logic when backend is ready
      console.log('Testimonial submitted:', values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and show success modal
      form.resetFields();
      setShowSuccessModal(true);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      message.error('Error al enviar el testimonio. Por favor, inténtelo de nuevo.');
      console.error('Testimonial submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle success modal close
   */
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  /**
   * Handle cancel action
   */
  const handleCancel = () => {
    form.resetFields();

    // Call onCancel callback if provided
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <>
      <div id="testimonial-form" className={styles.testimonialForm}>
        <div className={styles.formHeader}>
          <h2 className={styles.title}>Comparta Su Experiencia</h2>
          <p className={styles.subtitle}>Sus comentarios nos ayudan a proporcionar la mejor atención posible para nuestros pacientes.</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          requiredMark={false}
          initialValues={{
            rating: 5,
          }}
        >
          {/* Overall Rating */}
          <Form.Item
            name="rating"
            label="Calificación General"
            rules={[{ required: true, message: 'Por favor, seleccione una calificación' }]}
            className={styles.ratingItem}
          >
            <Rate className={styles.rating} />
          </Form.Item>

          {/* Row 1: Full Name & Email */}
          <div className={styles.formRow}>
            <Form.Item
              name="fullName"
              label="Nombre Completo"
              rules={[
                { required: true, message: 'Por favor, ingrese su nombre completo' },
                { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
                {
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: 'El nombre solo puede contener letras y espacios',
                },
              ]}
              className={styles.formItem}
            >
              <Input placeholder="Juan Pérez" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Correo Electrónico"
              rules={[
                { required: true, message: 'Por favor, ingrese su correo electrónico' },
                { type: 'email', message: 'Por favor, ingrese un correo electrónico válido' },
              ]}
              className={styles.formItem}
            >
              <Input placeholder="juan@ejemplo.com" size="large" />
            </Form.Item>
          </div>

          {/* Row 2: Service Received & Date of Service */}
          <div className={styles.formRow}>
            <Form.Item
              name="service"
              label="Servicio Recibido"
              rules={[{ required: true, message: 'Por favor, seleccione un servicio' }]}
              className={styles.formItem}
            >
              <Select placeholder="Seleccione un servicio" size="large" options={serviceOptions} />
            </Form.Item>

            <Form.Item
              name="dateOfService"
              label="Fecha del Servicio"
              rules={[
                {
                  required: true,
                  message: 'Por favor, seleccione la fecha del servicio',
                },
                {
                  validator: (_, value: Dayjs) => {
                    if (!value) return Promise.resolve();

                    const now = dayjs();

                    // Check if selected date is in the future
                    if (value.isAfter(now)) {
                      return Promise.reject(new Error('La fecha del servicio no puede ser futura'));
                    }

                    return Promise.resolve();
                  },
                },
              ]}
              className={styles.formItem}
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="dd/mm/aaaa"
                size="large"
                className={styles.datePicker}
                disabledDate={(current: Dayjs) => {
                  // Disable future dates
                  return current && current > dayjs().endOf('day');
                }}
              />
            </Form.Item>
          </div>

          {/* Your Review */}
          <Form.Item
            name="review"
            label="Su Reseña"
            rules={[
              { required: true, message: 'Por favor, ingrese su reseña' },
              { min: 20, message: 'La reseña debe tener al menos 20 caracteres' },
              { max: 1000, message: 'La reseña no debe exceder 1000 caracteres' },
            ]}
          >
            <TextArea
              placeholder="Cuéntenos sobre su trayectoria de recuperación..."
              rows={6}
              size="large"
              showCount
              maxLength={1000}
            />
          </Form.Item>

          {/* Consent Checkbox */}
          <Form.Item
            name="consent"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Por favor, acepte que su reseña sea publicada')),
              },
            ]}
          >
            <Checkbox className={styles.consent}>
              Consiento que esta reseña sea publicada en el sitio web de acuerdo con la{' '}
              <a href={ROUTE_PATHS.PRIVACY_POLICY} target="_blank" rel="noopener noreferrer" className={styles.link}>
                Política de Privacidad
              </a>
              .
            </Checkbox>
          </Form.Item>

          {/* Action Buttons */}
          <div className={styles.buttonGroup}>
            <Button size="large" onClick={handleCancel} className={styles.cancelButton}>
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              icon={<RightOutlined />}
              iconPosition="end"
              className={styles.submitButton}
            >
              Enviar Reseña
            </Button>
          </div>
        </Form>
      </div>

      {/* Success Feedback Modal */}
      <SuccessFeedbackModal open={showSuccessModal} onClose={handleCloseSuccessModal} />
    </>
  );
};
