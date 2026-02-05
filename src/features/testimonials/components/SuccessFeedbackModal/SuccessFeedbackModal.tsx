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
          ¡Gracias por Sus Comentarios!
        </h2>

        {/* Message */}
        <p id="success-modal-description" className={styles.message}>
          Su reseña ha sido enviada exitosamente y está pendiente de aprobación. Agradecemos que comparta su experiencia con la comunidad de Orthopedic Spine.
        </p>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <Button
            type="primary"
            size="large"
            onClick={handleBackToHome}
            className={styles.primaryButton}
            aria-label="Navegar de regreso a la página de inicio"
          >
            Volver al Inicio
          </Button>
          <Button
            size="large"
            onClick={handleReadMoreReviews}
            className={styles.secondaryButton}
            aria-label="Leer más testimonios"
          >
            Leer Más Reseñas
          </Button>
        </div>
      </div>
    </Modal>
  );
};
