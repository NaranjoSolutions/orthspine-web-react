import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useRegister } from '../../hooks/useRegister';
import styles from './RegisterForm.module.scss';

/**
 * RegisterForm Component
 * Handles user registration using Ant Design components
 * Follows Single Responsibility Principle - only renders form UI
 */
export const RegisterForm: React.FC = () => {
  const { formData, errors, isLoading, handleChange, handleRegister, handleLoginRedirect } = useRegister();

  const [form] = Form.useForm();

  /**
   * Handle form submission
   */
  const onFinish = () => {
    handleRegister();
  };

  return (
    <div className={styles.registerFormWrapper}>
      <h1 className={styles.title}>Create your account</h1>
      <p className={styles.subtitle}>
        Already have an account?{' '}
        <Button type="link" onClick={handleLoginRedirect} disabled={isLoading} className={styles.loginLink}>
          Log in
        </Button>
      </p>

      {errors.general && (
        <Alert message={errors.general} type="error" showIcon closable className={styles.errorAlert} />
      )}

      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        size="large"
        requiredMark={false}
      >
        {/* Full Name Field */}
        <Form.Item name="fullname" validateStatus={errors.fullname ? 'error' : ''} help={errors.fullname}>
          <Input
            prefix={<UserOutlined className={styles.inputIcon} />}
            placeholder="Full Name"
            value={formData.fullname}
            onChange={(e) => handleChange('fullname', e.target.value)}
            disabled={isLoading}
            autoFocus
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item name="email" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
          <Input
            prefix={<MailOutlined className={styles.inputIcon} />}
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={isLoading}
            autoComplete="username"
          />
        </Form.Item>

        {/* Password Field */}
        <Form.Item name="password" validateStatus={errors.password ? 'error' : ''} help={errors.password}>
          <Input.Password
            prefix={<LockOutlined className={styles.inputIcon} />}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            disabled={isLoading}
            autoComplete="new-password"
          />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          name="confirmPassword"
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.inputIcon} />}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            disabled={isLoading}
            autoComplete="new-password"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            size="large"
            className={styles.submitButton}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
