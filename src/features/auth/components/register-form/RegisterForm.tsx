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
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Create Admin Account</h1>
        <p className={styles.subtitle}>For authorized personnel only</p>
      </div>

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
        requiredMark="optional"
      >
        {/* Full Name Field */}
        <Form.Item
          label="Full Name"
          name="fullname"
          validateStatus={errors.fullname ? 'error' : ''}
          help={errors.fullname}
          required
        >
          <Input
            prefix={<UserOutlined className={styles.inputIcon} />}
            placeholder="Enter full name"
            value={formData.fullname}
            onChange={(e) => handleChange('fullname', e.target.value)}
            disabled={isLoading}
            autoFocus
            aria-label="Full Name"
            aria-required="true"
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Email Address"
          name="email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email}
          required
        >
          <Input
            prefix={<MailOutlined className={styles.inputIcon} />}
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={isLoading}
            autoComplete="username"
            aria-label="Email Address"
            aria-required="true"
          />
        </Form.Item>

        <div className={styles.passwordGroup}>
          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password}
            required
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              disabled={isLoading}
              autoComplete="new-password"
              aria-label="Password"
              aria-required="true"
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            validateStatus={errors.confirmPassword ? 'error' : ''}
            help={errors.confirmPassword}
            required
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              disabled={isLoading}
              autoComplete="new-password"
              aria-label="Confirm Password"
              aria-required="true"
            />
          </Form.Item>

          {/* Password Requirements Helper Text */}
          <div className={styles.passwordHelper}>
            <p>
              Password must contain at least 8 characters, including uppercase, lowercase, number, and special
              character.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Form.Item className={styles.submitButtonWrapper}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            size="large"
            className={styles.submitButton}
          >
            Create Account
          </Button>
          <Button
            type="default"
            block
            onClick={handleLoginRedirect}
            disabled={isLoading}
            size="large"
            className={styles.cancelButton}
          >
            Back to Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
