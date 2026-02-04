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
        <h1 className={styles.title}>Crear cuenta de administrador</h1>
        <p className={styles.subtitle}>Solo para personal autorizado</p>
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
          label="Nombre completo"
          name="fullname"
          validateStatus={errors.fullname ? 'error' : ''}
          help={errors.fullname}
          required
        >
          <Input
            prefix={<UserOutlined className={styles.inputIcon} />}
            placeholder="Ingrese nombre completo"
            value={formData.fullname}
            onChange={(e) => handleChange('fullname', e.target.value)}
            disabled={isLoading}
            autoFocus
            aria-label="Nombre completo"
            aria-required="true"
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Correo electrónico"
          name="email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email}
          required
        >
          <Input
            prefix={<MailOutlined className={styles.inputIcon} />}
            placeholder="Ingrese correo electrónico"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={isLoading}
            autoComplete="username"
            aria-label="Correo electrónico"
            aria-required="true"
          />
        </Form.Item>

        <div className={styles.passwordGroup}>
          {/* Password Field */}
          <Form.Item
            label="Contraseña"
            name="password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password}
            required
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="Ingrese contraseña"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              disabled={isLoading}
              autoComplete="new-password"
              aria-label="Contraseña"
              aria-required="true"
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            label="Confirmar contraseña"
            name="confirmPassword"
            validateStatus={errors.confirmPassword ? 'error' : ''}
            help={errors.confirmPassword}
            required
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="Reingrese contraseña"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              disabled={isLoading}
              autoComplete="new-password"
              aria-label="Confirmar contraseña"
              aria-required="true"
            />
          </Form.Item>

          {/* Password Requirements Helper Text */}
          <div className={styles.passwordHelper}>
            <p>
              La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.
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
            Crear cuenta
          </Button>
          <Button
            type="default"
            block
            onClick={handleLoginRedirect}
            disabled={isLoading}
            size="large"
            className={styles.cancelButton}
          >
            Volver a inicio de sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
