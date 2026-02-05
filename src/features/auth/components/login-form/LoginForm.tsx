import React from 'react';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLogin } from '../../hooks/useLogin';
import styles from './LoginForm.module.scss';

/**
 * LoginForm Component
 * Handles user authentication using Ant Design components
 * Follows Single Responsibility Principle - only renders form UI
 */
export const LoginForm: React.FC = () => {
  const { formData, errors, isLoading, handleChange, handleLogin, handleForgotPassword, handleRegisterRedirect } =
    useLogin();

  const [form] = Form.useForm();

  /**
   * Handle form submission
   */
  const onFinish = () => {
    handleLogin();
  };

  return (
    <div className={styles.loginFormWrapper}>
      <h1 className={styles.title}>Portal Administrativo</h1>
      <p className={styles.subtitle}>Solo para personal y administradores</p>

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
        <Form.Item name="email" label="Correo electrónico" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
          <Input
            prefix={<UserOutlined className={styles.inputIcon} />}
            placeholder="Ingrese su correo electrónico"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={isLoading}
            autoComplete="username"
            autoFocus
            aria-label="Correo electrónico"
          />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          name="password"
          label="Contraseña"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.inputIcon} />}
            placeholder="Ingrese su contraseña"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            disabled={isLoading}
            autoComplete="current-password"
            aria-label="Contraseña"
          />
        </Form.Item>

        {/* Remember Me */}
        <Form.Item className={styles.rememberMeItem}>
          <Checkbox
            checked={formData.rememberMe}
            onChange={(e) => handleChange('rememberMe', e.target.checked)}
            disabled={isLoading}
          >
            Recordarme
          </Checkbox>
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
            Iniciar sesión
          </Button>
        </Form.Item>

        {/* Forgot Password Link */}
        <div className={styles.forgotPasswordWrapper}>
          <Button type="link" onClick={handleForgotPassword} disabled={isLoading} className={styles.forgotPassword}>
            ¿Olvidó su contraseña?
          </Button>
        </div>

        {/* Create Account Link */}
        <div className={styles.createAccountWrapper}>
          <span className={styles.createAccountText}>¿Necesita crear una cuenta de administrador?</span>
          <Button
            type="link"
            onClick={handleRegisterRedirect}
            disabled={isLoading}
            className={styles.createAccountLink}
          >
            Crear cuenta
          </Button>
        </div>

        {/* Security Note */}
        <div className={styles.securityNote}>
          <p>🔒 Este es un portal administrativo seguro. Toda actividad es monitoreada y registrada.</p>
        </div>
      </Form>
    </div>
  );
};
