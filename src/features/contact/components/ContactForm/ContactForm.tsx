import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import styles from './ContactForm.module.scss';

const { TextArea } = Input;

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * ContactForm Component
 * Form for users to send messages to the clinic
 *
 * Features:
 * - Form validation
 * - User-friendly error messages
 * - Loading state during submission
 */
export const ContactForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      // TODO: Implement actual email sending logic
      console.log('Form submitted:', values);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      message.success('Message sent successfully! We will get back to you soon.');
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactForm}>
      <h2 className={styles.title}>Send Us a Message</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        requiredMark={false}
      >
        <div className={styles.formRow}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Please enter your name' },
              { min: 2, message: 'Name must be at least 2 characters' },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Name" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>
        </div>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: 'Please enter your phone number' },
          ]}
        >
          <Input placeholder="Phone" size="large" />
        </Form.Item>

        <Form.Item
          name="subject"
          label="Subject"
          rules={[
            { required: true, message: 'Please enter a subject' },
            { min: 3, message: 'Subject must be at least 3 characters' },
          ]}
        >
          <Input placeholder="Subject" size="large" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[
            { required: true, message: 'Please enter your message' },
            { min: 10, message: 'Message must be at least 10 characters' },
          ]}
        >
          <TextArea
            placeholder="Message"
            rows={6}
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className={styles.submitButton}
            block
          >
            Submit Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
