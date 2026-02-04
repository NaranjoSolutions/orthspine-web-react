import React, { useState } from 'react';
import { Form, Input, Button, message, Select, Radio, DatePicker } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import styles from './ContactForm.module.scss';

const { TextArea } = Input;

/**
 * Contact form field values
 */
interface ContactFormValues {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  contactMethod: 'phone' | 'email' | 'text';
  preferredDateTime: string;
  message: string;
}

/**
 * Department options for the contact form
 */
const DEPARTMENT_OPTIONS = [
  { value: 'general', label: 'Consulta General' },
  { value: 'appointment', label: 'Solicitud de Cita' },
  { value: 'records', label: 'Registros Médicos' },
  { value: 'billing', label: 'Facturación' },
  { value: 'other', label: 'Otro' },
];

/**
 * ContactForm Component
 * Comprehensive inquiry form for clinic contact
 *
 * Features:
 * - Two-column responsive layout
 * - Department selection
 * - Preferred contact method
 * - Date/time scheduling
 * - Form validation
 * - User-friendly error messages
 * - Loading state during submission
 * - Accessibility support
 */
export const ContactForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  /**
   * Handle form submission
   * @param values - Form field values
   */
  const handleSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      // TODO: Implement actual email sending logic
      console.log('Form submitted:', values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.');
      form.resetFields();
    } catch (error) {
      message.error('Error al enviar el mensaje. Por favor intente nuevamente.');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="inquiry-form" className={styles.contactForm}>
      <div className={styles.formHeader}>
        <h2 className={styles.title}>Formulario de Consulta</h2>
        <p className={styles.subtitle}>
          Complete los detalles a continuación y un especialista se pondrá en contacto con usted.
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        requiredMark={false}
        initialValues={{
          contactMethod: 'email',
        }}
      >
        {/* Row 1: Full Name & Email */}
        <div className={styles.formRow}>
          <Form.Item
            name="fullName"
            label="Nombre Completo"
            rules={[
              { required: true, message: 'Por favor ingrese su nombre completo' },
              { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
              {
                pattern: /^[a-zA-Z\s]+$/,
                message: 'El nombre solo puede contener letras y espacios',
              },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Aaron Fallas" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Correo Electrónico"
            rules={[
              { required: true, message: 'Por favor ingrese su correo electrónico' },
              { type: 'email', message: 'Por favor ingrese un correo electrónico válido' },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="aaron.fallas@example.com" size="large" />
          </Form.Item>
        </div>

        {/* Row 2: Phone & Department */}
        <div className={styles.formRow}>
          <Form.Item
            name="phone"
            label="Número de Teléfono"
            rules={[
              { required: true, message: 'Por favor ingrese su número de teléfono' },
              {
                pattern: /^[\d\s\-+()]+$/,
                message: 'Por favor ingrese un número de teléfono válido',
              },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="8888 8888" size="large" />
          </Form.Item>

          <Form.Item
            name="department"
            label="Departamento"
            rules={[{ required: true, message: 'Por favor seleccione un departamento' }]}
            className={styles.formItem}
          >
            <Select placeholder="Seleccione un departamento" size="large" options={DEPARTMENT_OPTIONS} />
          </Form.Item>
        </div>

        {/* Preferred Contact Method */}
        <Form.Item
          name="contactMethod"
          label="Método de Contacto Preferido"
          rules={[{ required: true, message: 'Por favor seleccione un método de contacto' }]}
        >
          <Radio.Group className={styles.radioGroup}>
            <Radio value="phone">Teléfono</Radio>
            <Radio value="email">Correo Electrónico</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Preferred Date/Time */}
        <Form.Item
          name="preferredDateTime"
          label="Fecha/Hora Preferida"
          rules={[
            {
              required: true,
              message: 'Por favor seleccione su fecha y hora preferida',
            },
            {
              validator: (_, value: Dayjs) => {
                if (!value) return Promise.resolve();

                const now = dayjs();

                // Check if selected date/time is in the past
                if (value.isBefore(now)) {
                  return Promise.reject(new Error('Por favor seleccione una fecha y hora futura'));
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Seleccione fecha y hora"
            size="large"
            className={styles.dateTimePicker}
            disabledDate={(current: Dayjs) => {
              // Disable past dates
              return current && current < dayjs().startOf('day');
            }}
            showNow={false}
          />
        </Form.Item>

        {/* Message */}
        <Form.Item
          name="message"
          label="Mensaje"
          rules={[
            { required: true, message: 'Por favor ingrese su mensaje' },
            { min: 10, message: 'El mensaje debe tener al menos 10 caracteres' },
            { max: 1000, message: 'El mensaje no debe exceder 1000 caracteres' },
          ]}
        >
          <TextArea
            placeholder="Por favor describa su consulta en detalle..."
            rows={6}
            size="large"
            showCount
            maxLength={1000}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            icon={<RightOutlined />}
            iconPosition="end"
            className={styles.submitButton}
            block
          >
            Enviar Mensaje
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
