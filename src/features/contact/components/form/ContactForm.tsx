import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  message,
  Progress,
  Row,
  Typography,
  Space,
  Alert,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChangeEvent } from 'react';
import {
  SendOutlined,
  ReloadOutlined,
  MailOutlined,
  UserOutlined,
  MessageOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

import { useTheme } from '../../../../shared/theme/ThemeContext';
import { isValidEmail } from '../../../../shared/utils/validateEmail';
import { useSendContactEmailMutation, useSendVerificationCodeMutation } from '../../../../api/clinicApi/emailApi';
import './ContactForm.scss';

const { Title, Text, Link } = Typography;
const { Content } = Layout;

interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  message: string;
  confirm: boolean;
}

const initialFormValues: ContactFormValues = { name: '', email: '', phone: '', message: '', confirm: false };
const maxCodeDuration = 300000; // 5 minutes

export function ContactForm() {
  const { theme } = useTheme();
  const [form] = Form.useForm<ContactFormValues>();

  const [receiveEmail, { isLoading: isSendingEmail }] = useSendContactEmailMutation();
  const [sendVerificationCodeEmail, { isLoading: isSendingCode }] = useSendVerificationCodeMutation();

  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [codeExpirationTime, setCodeExpirationTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [showSendCodeVerification, setShowSendCodeVerification] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendEmailDisabled, setIsSendEmailDisabled] = useState(true);

  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const onValuesChange = useCallback(
    (_: unknown, allValues: ContactFormValues) => {
      setIsSendEmailDisabled(
        !allValues.name || !allValues.email || !allValues.message || !allValues.confirm || !isEmailVerified,
      );

      if (allValues.email && isValidEmail(allValues.email)) {
        setShowSendCodeVerification(true);
      } else {
        setShowSendCodeVerification(false);
        setIsEmailVerified(false);
        setVerificationCodeSent(false);
        setVerificationCode('');
        setCodeExpirationTime(null);
        setRemainingTime(null);
      }
    },
    [isEmailVerified],
  );

  const handleReset = useCallback(() => {
    form.resetFields();
    setVerificationCode('');
    setVerificationCodeSent(false);
    setCodeExpirationTime(null);
    setRemainingTime(null);
    setShowSendCodeVerification(false);
    setIsEmailVerified(false);
    setIsSendEmailDisabled(true);
  }, [form]);

  const onSendVerificationCode = useCallback(async () => {
    try {
      const email = form.getFieldValue('email');
      if (!email || !isValidEmail(email)) {
        message.error('Por favor ingrese un email válido primero.');
        return;
      }

      const response = await sendVerificationCodeEmail({ email }).unwrap();

      if (!response.success) {
        message.error(response.message || 'Error al enviar el código de verificación. Inténtelo de nuevo.');
        return;
      }

      // For demo purposes, generate a simple 4-digit code
      // In a real implementation, the backend would send the actual code via email
      const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
      setVerificationCodeSent(true);
      setVerificationCode(generatedCode);
      setCodeExpirationTime(Date.now() + maxCodeDuration);

      message.success(`Código de verificación enviado: ${generatedCode} (para demostración)`);
    } catch (error) {
      console.error('Error sending verification code:', error);
      message.error('Error al enviar el código de verificación. Inténtelo de nuevo.');
    }
  }, [form, sendVerificationCodeEmail]);

  const onSubmitContactForm = useCallback(
    async (values: ContactFormValues) => {
      try {
        const payload = {
          name: values.name,
          email: values.email,
          phone: values.phone || '',
          subject: `Mensaje de contacto de ${values.name}`,
          message: values.message,
        };
        const response = await receiveEmail(payload).unwrap();

        if (!response.success) {
          message.error(response.message || 'Error al enviar el mensaje. Inténtelo de nuevo.');
          return;
        }

        message.success('Mensaje enviado con éxito. Nos contactaremos pronto con usted.');
        handleReset();
      } catch (error) {
        console.error('Error sending contact form:', error);
        message.error('Error al enviar el mensaje. Inténtelo de nuevo.');
      }
    },
    [receiveEmail, handleReset],
  );

  const onVerificationCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputCode = String(event.target.value).trim();
    if (inputCode === String(verificationCode).trim()) {
      setIsEmailVerified(true);
      message.success('Email verificado correctamente.');
    } else {
      setIsEmailVerified(false);
    }
  };

  useEffect(() => {
    if (codeExpirationTime) {
      const interval = setInterval(() => {
        const timeLeft = codeExpirationTime - Date.now();
        setRemainingTime(timeLeft > 0 ? timeLeft : 0);

        if (timeLeft <= 0) {
          clearInterval(interval);
          setVerificationCodeSent(false);
          setVerificationCode('');
          setCodeExpirationTime(null);
          setRemainingTime(null);
          setIsEmailVerified(false);
          message.warning('Código expirado. Solicite uno nuevo.');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [codeExpirationTime]);

  return (
    <Content className="contact-form-content" data-theme={theme.mode}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="form-container"
      >
        <Card className="contact-form-card" bordered={false} data-theme={theme.mode}>
          <div className="form-header" data-theme={theme.mode}>
            <Title level={3} className="form-title" data-theme={theme.mode}>
              <MessageOutlined className="title-icon" />
              Envíanos un Mensaje
            </Title>
            <Text type="secondary" className="form-subtitle" data-theme={theme.mode}>
              Completa el formulario y nos pondremos en contacto contigo pronto.
            </Text>
            <Text type="secondary" className="required-note" data-theme={theme.mode}>
              Los campos marcados con "*" son obligatorios.
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmitContactForm}
            onValuesChange={onValuesChange}
            autoComplete="off"
            initialValues={initialFormValues}
            className="contact-form"
            size="large"
          >
            <Form.Item
              label="Nombre completo"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese su nombre completo',
                },
                {
                  min: 2,
                  message: 'El nombre debe tener al menos 2 caracteres',
                },
                {
                  pattern: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
                  message: 'El nombre debe contener solo letras (2-50 caracteres)',
                },
              ]}
            >
              <Input
                placeholder="Ingrese su nombre completo"
                prefix={<UserOutlined className="input-icon" data-theme={theme.mode} />}
                aria-label="Nombre completo"
                data-theme={theme.mode}
              />
            </Form.Item>

            <Form.Item
              label="Correo electrónico"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese su correo electrónico',
                },
                {
                  type: 'email',
                  message: 'Por favor ingrese un correo electrónico válido',
                },
              ]}
            >
              <Input
                placeholder="ejemplo@correo.com"
                prefix={<MailOutlined className="input-icon" data-theme={theme.mode} />}
                aria-label="Correo electrónico"
                data-theme={theme.mode}
              />
            </Form.Item>

            <Form.Item
              label="Teléfono (opcional)"
              name="phone"
              rules={[
                {
                  pattern: /^[+]?[0-9\s\-()]{7,15}$/,
                  message: 'Por favor ingrese un número de teléfono válido',
                },
              ]}
            >
              <Input
                placeholder="+506 8888 8888"
                prefix={<PhoneOutlined className="input-icon" data-theme={theme.mode} />}
                aria-label="Número de teléfono"
                data-theme={theme.mode}
              />
            </Form.Item>

            {showSendCodeVerification && !verificationCodeSent && (
              <Form.Item>
                <Alert
                  message="Verificación requerida"
                  description="Para enviar el mensaje, necesitamos verificar su correo electrónico."
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
                <Button
                  type="primary"
                  onClick={onSendVerificationCode}
                  loading={isSendingCode}
                  icon={<MailOutlined />}
                  className="verification-button"
                >
                  {isSendingCode ? 'Enviando...' : 'Enviar código de verificación'}
                </Button>
              </Form.Item>
            )}

            {verificationCodeSent && remainingTime && (
              <div className="verification-section" data-theme={theme.mode}>
                <Form.Item
                  label="Código de verificación"
                  name="verificationCode"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingrese el código de verificación',
                    },
                    {
                      len: 4,
                      message: 'El código debe tener 4 dígitos',
                    },
                  ]}
                >
                  <Input
                    placeholder="Ingrese el código de 4 dígitos"
                    onChange={onVerificationCodeChange}
                    maxLength={4}
                    aria-label="Código de verificación"
                    className={isEmailVerified ? 'verified-input' : ''}
                    data-theme={theme.mode}
                  />
                </Form.Item>

                <div className="verification-info">
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div className="timer-section">
                      <Text strong>Tiempo restante: {formatTime(remainingTime)}</Text>
                      <Progress
                        percent={(remainingTime / maxCodeDuration) * 100}
                        showInfo={false}
                        strokeColor={remainingTime < 60000 ? '#ff4d4f' : '#1890ff'}
                        className="timer-progress"
                      />
                    </div>

                    {isEmailVerified && (
                      <Alert
                        message="Email verificado correctamente"
                        type="success"
                        showIcon
                        className="verification-success"
                      />
                    )}

                    <Text type="secondary" className="verification-note" data-theme={theme.mode}>
                      Si no ves el correo, revisa tu carpeta de spam o correo no deseado.
                    </Text>
                  </Space>
                </div>
              </div>
            )}

            <Form.Item
              label="Mensaje"
              name="message"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese su mensaje',
                },
                {
                  min: 10,
                  message: 'El mensaje debe tener al menos 10 caracteres',
                },
                {
                  max: 1000,
                  message: 'El mensaje no puede exceder 1000 caracteres',
                },
              ]}
            >
              <Input.TextArea
                placeholder="Escriba aquí su consulta o mensaje..."
                style={{ height: '120px', resize: 'vertical' }}
                aria-label="Mensaje"
                rows={5}
                showCount
                maxLength={1000}
                className="message-textarea"
                data-theme={theme.mode}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('Debe aceptar la política de privacidad para continuar'),
                },
              ]}
            >
              <Checkbox className="privacy-checkbox" data-theme={theme.mode}>
                He leído y acepto la{' '}
                <Link href="/privacy-and-cookies-policy" target="_blank" className="privacy-link">
                  Política de Privacidad y Cookies
                </Link>
              </Checkbox>
            </Form.Item>

            <Row justify="end" gutter={[16, 16]} className="form-actions" data-theme={theme.mode}>
              <Col>
                <Button
                  type="default"
                  onClick={handleReset}
                  icon={<ReloadOutlined />}
                  className="reset-button"
                  disabled={isSendingEmail}
                  data-theme={theme.mode}
                >
                  Limpiar Formulario
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  disabled={isSendEmailDisabled}
                  htmlType="submit"
                  loading={isSendingEmail}
                  icon={<SendOutlined />}
                  className="submit-button"
                  data-theme={theme.mode}
                >
                  {isSendingEmail ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </motion.div>
    </Content>
  );
}
