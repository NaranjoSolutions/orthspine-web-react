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
  { value: 'general', label: 'General Inquiry' },
  { value: 'appointment', label: 'Appointment Request' },
  { value: 'records', label: 'Medical Records' },
  { value: 'billing', label: 'Billing' },
  { value: 'other', label: 'Other' },
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

      message.success('Message sent successfully! We will get back to you soon.');
      form.resetFields();
    } catch (error) {
      message.error('Failed to send message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="inquiry-form" className={styles.contactForm}>
      <div className={styles.formHeader}>
        <h2 className={styles.title}>Inquiry Form</h2>
        <p className={styles.subtitle}>Fill out the details below and a specialist will contact you.</p>
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
            label="Full Name"
            rules={[
              { required: true, message: 'Please enter your full name' },
              { min: 2, message: 'Name must be at least 2 characters' },
              {
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Name can only contain letters and spaces',
              },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Aaron  Fallas" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
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
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              {
                pattern: /^[\d\s\-+()]+$/,
                message: 'Please enter a valid phone number',
              },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="8888 8888" size="large" />
          </Form.Item>

          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select a department' }]}
            className={styles.formItem}
          >
            <Select placeholder="Select a department" size="large" options={DEPARTMENT_OPTIONS} />
          </Form.Item>
        </div>

        {/* Preferred Contact Method */}
        <Form.Item
          name="contactMethod"
          label="Preferred Contact Method"
          rules={[{ required: true, message: 'Please select a contact method' }]}
        >
          <Radio.Group className={styles.radioGroup}>
            <Radio value="phone">Phone</Radio>
            <Radio value="email">Email</Radio>
            <Radio value="text">Text Message</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Preferred Date/Time */}
        <Form.Item
          name="preferredDateTime"
          label="Preferred Date/Time"
          rules={[
            {
              required: true,
              message: 'Please select your preferred date and time',
            },
            {
              validator: (_, value: Dayjs) => {
                if (!value) return Promise.resolve();

                const now = dayjs();

                // Check if selected date/time is in the past
                if (value.isBefore(now)) {
                  return Promise.reject(new Error('Please select a future date and time'));
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Select date and time"
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
          label="Message"
          rules={[
            { required: true, message: 'Please enter your message' },
            { min: 10, message: 'Message must be at least 10 characters' },
            { max: 1000, message: 'Message must not exceed 1000 characters' },
          ]}
        >
          <TextArea
            placeholder="Please describe your inquiry in detail..."
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
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
