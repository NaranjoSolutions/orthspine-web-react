import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Rate, Checkbox } from 'antd';
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
          <h2 className={styles.title}>Share Your Experience</h2>
          <p className={styles.subtitle}>Your feedback helps us provide the best possible care for our patients.</p>
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
          label="Overall Rating"
          rules={[{ required: true, message: 'Please select a rating' }]}
          className={styles.ratingItem}
        >
          <Rate className={styles.rating} />
        </Form.Item>

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
            <Input placeholder="John Doe" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="john@example.com" size="large" />
          </Form.Item>
        </div>

        {/* Row 2: Service Received & Date of Service */}
        <div className={styles.formRow}>
          <Form.Item
            name="service"
            label="Service Received"
            rules={[{ required: true, message: 'Please select a service' }]}
            className={styles.formItem}
          >
            <Select placeholder="Select a service" size="large" options={serviceOptions} />
          </Form.Item>

          <Form.Item
            name="dateOfService"
            label="Date of Service"
            rules={[
              {
                required: true,
                message: 'Please select the date of service',
              },
              {
                validator: (_, value: Dayjs) => {
                  if (!value) return Promise.resolve();

                  const now = dayjs();

                  // Check if selected date is in the future
                  if (value.isAfter(now)) {
                    return Promise.reject(new Error('Date of service cannot be in the future'));
                  }

                  return Promise.resolve();
                },
              },
            ]}
            className={styles.formItem}
          >
            <DatePicker
              format="MM/DD/YYYY"
              placeholder="mm/dd/yyyy"
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
          label="Your Review"
          rules={[
            { required: true, message: 'Please enter your review' },
            { min: 20, message: 'Review must be at least 20 characters' },
            { max: 1000, message: 'Review must not exceed 1000 characters' },
          ]}
        >
          <TextArea
            placeholder="Tell us about your recovery journey..."
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
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Please agree to have your review published')),
            },
          ]}
        >
          <Checkbox className={styles.consent}>
            I consent to having this review published on the website in accordance with the{' '}
            <a href={ROUTE_PATHS.PRIVACY_POLICY} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Privacy Policy
            </a>
            .
          </Checkbox>
        </Form.Item>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <Button size="large" onClick={handleCancel} className={styles.cancelButton}>
            Cancel
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
            Submit Review
          </Button>
        </div>
      </Form>
    </div>

      {/* Success Feedback Modal */}
      <SuccessFeedbackModal open={showSuccessModal} onClose={handleCloseSuccessModal} />
    </>
  );
};
