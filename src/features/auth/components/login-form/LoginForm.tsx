import React from 'react';
import { Form, Input, Button, Checkbox, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLogin } from '../../hooks/useLogin';
import styles from './LoginForm.module.scss';

/**
 * LoginForm Component
 * Handles user authentication using Ant Design components
 * Follows Single Responsibility Principle - only renders form UI
 */
export const LoginForm: React.FC = () => {
  const { formData, errors, isLoading, handleChange, handleLogin, handleForgotPassword, handleRegisterRedirect } = useLogin();

  const [form] = Form.useForm();

  /**
   * Handle form submission
   */
  const onFinish = () => {
    handleLogin();
  };

  return (
    <div className={styles.loginFormWrapper}>
      <h1 className={styles.title}>Sign in to your account</h1>
      <p className={styles.subtitle}>
        Don't have an account?{' '}
        <Button type="link" onClick={handleRegisterRedirect} disabled={isLoading} className={styles.registerLink}>
          Sign up
        </Button>
      </p>

      {errors.general && (
        <Alert message={errors.general} type="error" showIcon closable className={styles.errorAlert} />
      )}

      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        size="large"
        requiredMark={false}
      >
        {/* Email Field */}
        <Form.Item name="email" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
          <Input
            prefix={<UserOutlined className={styles.inputIcon} />}
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={isLoading}
            autoComplete="username"
            autoFocus
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
            autoComplete="current-password"
          />
        </Form.Item>

        {/* Remember Me & Forgot Password */}
        <Form.Item>
          <Space className={styles.formOptions}>
            <Checkbox
              checked={formData.rememberMe}
              onChange={(e) => handleChange('rememberMe', e.target.checked)}
              disabled={isLoading}
            >
              Remember me?
            </Checkbox>

            <Button type="link" onClick={handleForgotPassword} disabled={isLoading} className={styles.forgotPassword}>
              Forgot your password?
            </Button>
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
