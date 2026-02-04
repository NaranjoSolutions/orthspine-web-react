import React from 'react';
import { Form, Input, Button, Alert, Space } from 'antd';
import { MailOutlined, ReloadOutlined, ArrowLeftOutlined, LockOutlined } from '@ant-design/icons';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import styles from './ForgotPasswordForm.module.scss';

/**
 * ForgotPasswordForm Component
 * Admin-oriented password reset request form with email and numeric captcha
 * Follows Single Responsibility Principle - only renders form UI
 */
export const ForgotPasswordForm: React.FC = () => {
  const { formData, errors, isLoading, captchaSvg, handleChange, handleSubmit, handleBackToLogin, refreshCaptcha } =
    useForgotPassword();

  const [form] = Form.useForm();

  /**
   * Handle form submission
   */
  const onFinish = () => {
    handleSubmit();
  };

  return (
    <div className={styles.forgotPasswordFormWrapper}>
      {/* Security Icon */}
      <div className={styles.iconWrapper}>
        <LockOutlined className={styles.securityIcon} aria-hidden="true" />
      </div>

      {/* Header Section */}
      <h1 className={styles.title}>Admin Password Recovery</h1>
      <p className={styles.subtitle}>
        Enter your registered admin email address to receive password reset instructions
      </p>

      {errors.general && (
        <Alert message={errors.general} type="error" showIcon closable className={styles.errorAlert} />
      )}

      <Form
        form={form}
        name="forgotPassword"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        size="large"
        requiredMark={false}
      >
        {/* Email Field */}
        <Form.Item name="email" label="Email Address" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
          <Input
            prefix={<MailOutlined className={styles.inputIcon} />}
            placeholder="Enter your admin email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={isLoading}
            autoComplete="email"
            autoFocus
            aria-label="Email Address"
          />
        </Form.Item>

        {/* Captcha Display and Input */}
        <Form.Item label="Security Verification">
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <p className={styles.captchaHelperText}>Please enter the numbers shown below to verify your request</p>
            <div className={styles.captchaContainer}>
              <div className={styles.captchaImage} dangerouslySetInnerHTML={{ __html: captchaSvg }} />
              <Button
                icon={<ReloadOutlined />}
                onClick={refreshCaptcha}
                disabled={isLoading}
                className={styles.refreshButton}
                title="Refresh captcha"
                aria-label="Refresh captcha"
              />
            </div>

            <Form.Item name="captcha" validateStatus={errors.captcha ? 'error' : ''} help={errors.captcha}>
              <Input
                placeholder="Enter the numbers shown above"
                value={formData.captcha}
                onChange={(e) => handleChange('captcha', e.target.value)}
                disabled={isLoading}
                maxLength={4}
                autoComplete="off"
                aria-label="Captcha verification code"
              />
            </Form.Item>
          </Space>
        </Form.Item>

        {/* Helper Text */}
        <div className={styles.helperTextSection}>
          <p className={styles.helperText}>
            After clicking the button below, check your email for a secure reset link. The link will be valid for 24
            hours.
          </p>
        </div>

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
            Send Reset Instructions
          </Button>
        </Form.Item>

        {/* Back to Login */}
        <Form.Item>
          <Button
            type="link"
            onClick={handleBackToLogin}
            disabled={isLoading}
            icon={<ArrowLeftOutlined />}
            className={styles.backButton}
            block
          >
            Back to Login
          </Button>
        </Form.Item>
      </Form>

      {/* Security Note */}
      <div className={styles.securityNote}>
        <p>
          🔒 This system is for authorized personnel only. All access and activity is monitored and logged according to
          HIPAA compliance standards.
        </p>
      </div>
    </div>
  );
};
