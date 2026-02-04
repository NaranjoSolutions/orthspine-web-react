import React from 'react';
import { Modal, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './SuccessFeedbackModal.module.scss';

interface SuccessFeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * SuccessFeedbackModal Component
 *
 * Displays a success confirmation modal after a testimonial is submitted.
 *
 * Features:
 * - Success checkmark icon
 * - Thank you message with confirmation text
 * - "Back to Home" button to navigate to homepage
 * - "Read More Reviews" button to view testimonials
 * - Fully accessible with proper ARIA attributes
 * - Keyboard navigable (ESC to close, Tab navigation)
 * - Responsive design for mobile, tablet, and desktop
 * - Background overlay to focus attention
 *
 * @param open - Controls modal visibility
 * @param onClose - Callback when modal is closed
 */
export const SuccessFeedbackModal: React.FC<SuccessFeedbackModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  /**
   * Navigate to home page and close modal
   */
  const handleBackToHome = () => {
    onClose();
    navigate(ROUTE_PATHS.HOME);
  };

  /**
   * Navigate to testimonials page (stay on page) and close modal
   */
  const handleReadMoreReviews = () => {
    onClose();
    // Scroll to testimonials list if on same page
    const testimonialsSection = document.getElementById('testimonials-list');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      className={styles.successModal}
      closeIcon={null}
      maskClosable={true}
      destroyOnClose
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
    >
      <div className={styles.modalContent}>
        {/* Success Icon */}
        <div className={styles.iconWrapper}>
          <CheckCircleFilled className={styles.successIcon} aria-hidden="true" />
        </div>

        {/* Title */}
        <h2 id="success-modal-title" className={styles.title}>
          Thank You for Your Feedback!
        </h2>

        {/* Message */}
        <p id="success-modal-description" className={styles.message}>
          Your review has been successfully submitted and is pending approval. We appreciate you sharing your experience
          with the Orthopedic Spine community.
        </p>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <Button
            type="primary"
            size="large"
            onClick={handleBackToHome}
            className={styles.primaryButton}
            aria-label="Navigate back to home page"
          >
            Back to Home
          </Button>
          <Button
            size="large"
            onClick={handleReadMoreReviews}
            className={styles.secondaryButton}
            aria-label="Read more testimonials"
          >
            Read More Reviews
          </Button>
        </div>
      </div>
    </Modal>
  );
};
