import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { MedicalNoteCategory, type MedicalNoteFormData } from '@/features/admin/types/patient.types';
import styles from './AddMedicalNoteModal.module.scss';

interface AddMedicalNoteModalProps {
  visible: boolean;
  loading: boolean;
  onSubmit: (values: MedicalNoteFormData) => Promise<void>;
  onCancel: () => void;
}

/**
 * AddMedicalNoteModal Component
 * Modal form for adding new medical notes
 *
 * Features:
 * - Category selection
 * - Content textarea
 * - Form validation
 * - Loading state
 */
export const AddMedicalNoteModal: React.FC<AddMedicalNoteModalProps> = ({ visible, loading, onSubmit, onCancel }) => {
  const [form] = Form.useForm<MedicalNoteFormData>();

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      // Form validation failed, errors are shown automatically
      console.error('Validation failed:', error);
    }
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  /**
   * Category options
   */
  const categoryOptions = Object.values(MedicalNoteCategory).map((category) => ({
    label: category,
    value: category,
  }));

  return (
    <Modal
      title="Agregar Nueva Nota Médica"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
      className={styles.modal}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className={styles.form}>
        <Form.Item name="category" label="Categoría" rules={[{ required: true, message: 'Por favor seleccione una categoría' }]}>
          <Select placeholder="Seleccione la categoría de la nota" options={categoryOptions} size="large" disabled={loading} />
        </Form.Item>

        <Form.Item
          name="content"
          label="Contenido de la Nota"
          rules={[
            { required: true, message: 'Por favor ingrese el contenido de la nota' },
            { min: 10, message: 'La nota debe tener al menos 10 caracteres' },
          ]}
        >
          <Input.TextArea
            placeholder="Ingrese la nota médica detallada..."
            rows={6}
            showCount
            maxLength={1000}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item className={styles.formActions}>
          <Button onClick={handleCancel} size="large" disabled={loading}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" size="large" loading={loading}>
            Agregar Nota
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
