import React from 'react';
import { Form, Input, Button, Alert, Space } from 'antd';
import { MailOutlined, ReloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import styles from './ForgotPasswordForm.module.scss';

/**
 * ForgotPasswordForm Component
 * Handles password reset request with email and numeric captcha
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
      <h1 className={styles.title}>Forgot Password?</h1>
      <p className={styles.subtitle}>No problem. Enter your email and we'll send you a reset link.</p>

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
        <Form.Item name="email" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
          <Input
            prefix={<MailOutlined className={styles.inputIcon} />}
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={isLoading}
            autoComplete="email"
            autoFocus
          />
        </Form.Item>

        {/* Captcha Display and Input */}
        <Form.Item label="Please enter the numbers you see below">
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div className={styles.captchaContainer}>
              <div className={styles.captchaImage} dangerouslySetInnerHTML={{ __html: captchaSvg }} />
              <Button
                icon={<ReloadOutlined />}
                onClick={refreshCaptcha}
                disabled={isLoading}
                className={styles.refreshButton}
                title="Refresh captcha"
              />
            </div>

            <Form.Item name="captcha" validateStatus={errors.captcha ? 'error' : ''} help={errors.captcha}>
              <Input
                placeholder="Enter captcha"
                value={formData.captcha}
                onChange={(e) => handleChange('captcha', e.target.value)}
                disabled={isLoading}
                maxLength={4}
                autoComplete="off"
              />
            </Form.Item>
          </Space>
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
            Send Reset Link
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
    </div>
  );
};
