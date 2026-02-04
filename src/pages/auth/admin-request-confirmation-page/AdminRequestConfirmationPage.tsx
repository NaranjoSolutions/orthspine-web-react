import React from 'react';
import { Card, Button, Space, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './AdminRequestConfirmationPage.module.scss';

const { Title, Paragraph } = Typography;

/**
 * AdminRequestConfirmationPage Component
 * 
 * UI-only confirmation page displayed after admin account creation request.
 * Provides clear feedback about the request status and next steps.
 * 
 * Features:
 * - Success icon and confirmation message
 * - Information about approval process
 * - Clear call-to-action to return to login
 * - Accessible and responsive design
 * - Follows existing auth page patterns
 */
export const AdminRequestConfirmationPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Navigate back to login page
   */
  const handleReturnToLogin = () => {
    navigate(ROUTE_PATHS.AUTH.LOGIN);
  };

  return (
    <Card className={styles.confirmationCard} bordered={false}>
      <div className={styles.contentWrapper}>
        {/* Success Icon */}
        <div className={styles.iconWrapper}>
          <CheckCircleOutlined 
            className={styles.successIcon} 
            aria-hidden="true"
          />
        </div>

        {/* Header Section */}
        <div className={styles.headerSection}>
          <Title level={2} className={styles.title}>
            Request Received
          </Title>
          <Paragraph className={styles.subtitle}>
            Your admin account creation request has been successfully submitted
          </Paragraph>
        </div>

        {/* Message Section */}
        <div className={styles.messageSection}>
          <Paragraph className={styles.message}>
            <strong>What happens next?</strong>
          </Paragraph>
          <Paragraph className={styles.message}>
            Your request is currently pending approval from our system administrators. 
            This process typically takes 1-2 business days.
          </Paragraph>
          <Paragraph className={styles.message}>
            You will receive an email notification once your account has been reviewed 
            and approved. After approval, you'll be able to log in with your credentials.
          </Paragraph>
        </div>

        {/* Next Steps Section */}
        <div className={styles.nextStepsSection}>
          <Paragraph className={styles.nextStepsTitle}>
            <strong>Next Steps:</strong>
          </Paragraph>
          <ul className={styles.nextStepsList}>
            <li>Check your email for approval notifications</li>
            <li>Keep your login credentials secure</li>
            <li>Contact support if you have questions or concerns</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <Space direction="vertical" size="middle" className={styles.actionButtons}>
          <Button
            type="primary"
            size="large"
            block
            onClick={handleReturnToLogin}
            className={styles.primaryButton}
            aria-label="Return to login page"
          >
            Return to Login
          </Button>
        </Space>

        {/* Support Contact */}
        <div className={styles.supportSection}>
          <Paragraph className={styles.supportText}>
            Need help? Contact us at{' '}
            <a 
              href="mailto:support@orthospine.com" 
              className={styles.supportLink}
              aria-label="Contact support via email"
            >
              support@orthospine.com
            </a>
          </Paragraph>
        </div>
      </div>
    </Card>
  );
};

export default AdminRequestConfirmationPage;
