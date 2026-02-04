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
      <h1 className={styles.title}>Recuperación de contraseña administrativa</h1>
      <p className={styles.subtitle}>
        Ingrese su correo electrónico de administrador registrado para recibir instrucciones de restablecimiento de contraseña
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
        <Form.Item name="email" label="Correo electrónico" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
          <Input
            prefix={<MailOutlined className={styles.inputIcon} />}
            placeholder="Ingrese su correo electrónico de administrador"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={isLoading}
            autoComplete="email"
            autoFocus
            aria-label="Correo electrónico"
          />
        </Form.Item>

        {/* Captcha Display and Input */}
        <Form.Item label="Verificación de seguridad">
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <p className={styles.captchaHelperText}>Por favor ingrese los números mostrados a continuación para verificar su solicitud</p>
            <div className={styles.captchaContainer}>
              <div className={styles.captchaImage} dangerouslySetInnerHTML={{ __html: captchaSvg }} />
              <Button
                icon={<ReloadOutlined />}
                onClick={refreshCaptcha}
                disabled={isLoading}
                className={styles.refreshButton}
                title="Actualizar captcha"
                aria-label="Actualizar captcha"
              />
            </div>

            <Form.Item name="captcha" validateStatus={errors.captcha ? 'error' : ''} help={errors.captcha}>
              <Input
                placeholder="Ingrese los números mostrados arriba"
                value={formData.captcha}
                onChange={(e) => handleChange('captcha', e.target.value)}
                disabled={isLoading}
                maxLength={4}
                autoComplete="off"
                aria-label="Código de verificación captcha"
              />
            </Form.Item>
          </Space>
        </Form.Item>

        {/* Helper Text */}
        <div className={styles.helperTextSection}>
          <p className={styles.helperText}>
            Después de hacer clic en el botón a continuación, revise su correo electrónico para encontrar un enlace de restablecimiento seguro. El enlace será válido por 24 horas.
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
            Enviar instrucciones de restablecimiento
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
            Volver a inicio de sesión
          </Button>
        </Form.Item>
      </Form>

      {/* Security Note */}
      <div className={styles.securityNote}>
        <p>
          🔒 Este sistema es solo para personal autorizado. Todo acceso y actividad es monitoreado y registrado de acuerdo con los estándares de cumplimiento HIPAA.
        </p>
      </div>
    </div>
  );
};
