import { Button, Card, Checkbox, Col, Form, Input, Layout, message, Progress, Row, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChangeEvent } from 'react';

import { useTheme } from '../../../../shared/theme/ThemeContext';
import { isValidEmail } from '../../../../shared/utils/validateEmail';
import { useSendContactEmailMutation, useSendVerificationCodeMutation } from '../../../../api/clinicApi/emailApi';
import './ContactForm.scss';

const { Title, Text, Link } = Typography;
const { Content } = Layout;

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
  confirm: boolean;
}

const initialFormValues = { name: '', email: '', message: '', confirm: false };
const maxCodeDuration = 300000; //5 minutes

export function ContactForm() {
  const { theme } = useTheme();
  const [form] = Form.useForm();

  const [receiveEmail] = useSendContactEmailMutation();
  const [sendVerificationCodeEmail] = useSendVerificationCodeMutation();

  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [codeExpirationTime, setCodeExpirationTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [showSendCodeVerification, setShowSendCodeVerification] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendEmailDisabled, setIsSendEmailDisabled] = useState(true);

  const onValuesChange = useCallback(
    (_: unknown, allValues: ContactFormValues) => {
      // Enable send email button if all required fields are filled and email is verified
      setIsSendEmailDisabled(
        !allValues.name || !allValues.email || !allValues.message || !allValues.confirm || !isEmailVerified,
      );

      if (isValidEmail(allValues.email)) {
        setShowSendCodeVerification(true);
      } else {
        setShowSendCodeVerification(false);
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
      if (!email) {
        message.error('Por favor ingrese su email primero.');
        return;
      }

      const response = await sendVerificationCodeEmail({ email }).unwrap();

      if (response.error) {
        message.error('Error al enviar el código de verificación. Inténtelo de nuevo.');
        return;
      }

      setVerificationCodeSent(true);
      setVerificationCode(response.verificationCode);
      setCodeExpirationTime(Date.now() + maxCodeDuration); //300000 Set expiration time to 5 minutes from now

      message.success('Código de verificación enviado con éxito');
    } catch {
      message.error('Error al enviar el código de verificación. Inténtelo de nuevo.');
    }
  }, [form, sendVerificationCodeEmail]);

  const onSubmitContactForm = useCallback(
    async (values: { name: string; email: string; message: string; confirm: boolean }) => {
      try {
        handleReset();
        const payload = {
          fromUser: values.email,
          subject: values.name,
          message: values.message,
        };
        const response = await receiveEmail(payload).unwrap();

        if (response.error) {
          message.error('Error al enviar el mensaje. Inténtelo de nuevo.');
          return;
        }

        message.success('Mensaje enviado con éxito');
      } catch {
        message.error('Error al enviar el mensaje. Inténtelo de nuevo.');
      }
    },
    [receiveEmail, handleReset],
  );

  const onVerificationCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputCode = String(event.target.value).trim() || '';
    if (inputCode === String(verificationCode).trim()) {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false);
    }
  };

  // Update remaining time every second
  useEffect(() => {
    setIsSendEmailDisabled(!isEmailVerified);

    if (codeExpirationTime) {
      const email = form.getFieldValue('email');
      if (!email) {
        setShowSendCodeVerification(false);
      }

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
          message.error('Código expirado. Reenvíe uno nuevo.');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [codeExpirationTime, isEmailVerified, form]);

  return (
    <Content>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <Title level={4}>Envíe un mensaje</Title>
          <Text type="secondary">Los campos marcados con "*" son obligatorios.</Text>

          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmitContactForm}
            onValuesChange={onValuesChange}
            autoComplete="off"
            initialValues={initialFormValues}
          >
            <Form.Item
              label="Su nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su nombre',
                },
                {
                  pattern: /^[a-zA-Z\s]{1,}$/,
                  message: 'El nombre debe contener solo letras',
                },
              ]}
            >
              <Input placeholder="Su nombre" aria-label="Nombre" />
            </Form.Item>

            <Form.Item
              label="Su email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su email',
                },
                {
                  type: 'email',
                  message: 'Ingrese un email válido',
                },
              ]}
            >
              <Input placeholder="tueemail@ejemplo.com" aria-label="Correo Electrónico" />
            </Form.Item>

            {showSendCodeVerification && !verificationCodeSent && (
              <Form.Item>
                <Button type="primary" onClick={onSendVerificationCode}>
                  Enviar código de verificación
                </Button>
              </Form.Item>
            )}

            {verificationCodeSent && remainingTime && (
              <>
                <Form.Item
                  label="Código de verificación"
                  name="verificationCode"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese el código',
                    },
                  ]}
                >
                  <Input placeholder="Código" onChange={onVerificationCodeChange} maxLength={4} />
                </Form.Item>
                <Text type="secondary">Tiempo restante para ingresar el código</Text>
                <Progress percent={(remainingTime / maxCodeDuration) * 100} showInfo={false} />
                <br />
                <Text type="secondary">
                  Si no ves el correo, revisa también tu carpeta de spam o correo no deseado.
                </Text>
              </>
            )}

            <Form.Item
              label="Su mensaje"
              name="message"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su mensaje',
                },
              ]}
            >
              <Input.TextArea
                placeholder="Escriba su mensaje aquí... "
                style={{ height: '100px' }}
                aria-label="Mensaje"
                rows={4}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject('Debe aceptar la política.')),
                },
              ]}
            >
              <Checkbox>
                He leído y acepto la{' '}
                <Link href="/privacy-and-cookies-policy" target="_blank">
                  Política de Privacidad
                </Link>
              </Checkbox>
            </Form.Item>

            <Row justify="end" gutter={10}>
              <Col>
                <Button type="default" onClick={handleReset}>
                  Limpiar
                </Button>
              </Col>
              <Col>
                <Button type="primary" disabled={isSendEmailDisabled} htmlType="submit">
                  Enviar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </motion.div>
    </Content>
  );
}
