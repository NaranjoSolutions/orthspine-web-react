import React from 'react';
import { Form, Input, Select, Rate, Button, Space } from 'antd';
import type { TestimonialFormData, TestimonialStatus } from '@/features/admin/types/testimonial.types';
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
          status: 'pending' as TestimonialStatus,
        }
      }
      onFinish={handleFinish}
      className={styles.form}
    >
      <Form.Item
        name="patientName"
        label="Patient Name"
        rules={[
          { required: true, message: 'Please enter the patient name' },
          { min: 2, message: 'Name must be at least 2 characters' },
        ]}
      >
        <Input placeholder="Enter patient name" size="large" />
      </Form.Item>

      <Form.Item
        name="message"
        label="Testimonial Message"
        rules={[
          { required: true, message: 'Please enter the testimonial message' },
          { min: 10, message: 'Message must be at least 10 characters' },
          { max: 1000, message: 'Message must not exceed 1000 characters' },
        ]}
      >
        <TextArea
          placeholder="Enter testimonial message"
          rows={6}
          showCount
          maxLength={1000}
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="rating"
        label="Rating"
        rules={[{ required: true, message: 'Please select a rating' }]}
      >
        <Rate allowHalf className={styles.rating} />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select a status' }]}
      >
        <Select placeholder="Select status" size="large">
          <Option value="pending">Pending</Option>
          <Option value="approved">Approved</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
      </Form.Item>

      <Form.Item className={styles.buttonGroup}>
        <Space size="middle">
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} size="large">
            {initialValues ? 'Update' : 'Create'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
