/**
 * Cookie Preferences Modal Component
 * Allows users to customize their cookie consent preferences
 */

import React, { useState, useEffect } from 'react';
import { Modal, Switch, Button, Space } from 'antd';
import type { CookieCategory } from '../../types';
import styles from './CookiePreferencesModal.module.scss';

interface CookiePreferencesModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Current functional cookies preference */
  initialFunctional: boolean;
  /** Current performance cookies preference */
  initialPerformance: boolean;
  /** Callback when user saves preferences */
  onSavePreferences: (functional: boolean, performance: boolean) => void;
  /** Callback when user accepts all cookies */
  onAcceptAll: () => void;
}

/**
 * Cookie categories configuration
 */
const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    key: 'strictlyNecessary',
    title: 'Estrictamente Necesarias',
    description:
      'Estas cookies son esenciales para el funcionamiento del sitio web y no pueden desactivarse en nuestro sistema. Generalmente solo se configuran en respuesta a acciones realizadas por usted.',
    isRequired: true,
  },
  {
    key: 'functional',
    title: 'Cookies Funcionales',
    description:
      'Estas cookies permiten que el sitio web proporcione funcionalidad mejorada y personalización, como recordar sus preferencias de idioma.',
    isRequired: false,
  },
  {
    key: 'performance',
    title: 'Rendimiento y Análisis',
    description:
      'Estas cookies nos ayudan a medir cómo los visitantes utilizan nuestro sitio y rastrear fuentes de tráfico para que podamos medir y mejorar el rendimiento de nuestro sitio.',
    isRequired: false,
  },
];

/**
 * CookiePreferencesModal Component
 *
 * Displays a modal that allows users to customize their cookie preferences.
 * Users can toggle functional and performance cookies on/off, while
 * strictly necessary cookies are always enabled.
 *
 * @component
 * @example
 * ```tsx
 * <CookiePreferencesModal
 *   visible={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   initialFunctional={consent.functional}
 *   initialPerformance={consent.performance}
 *   onSavePreferences={(functional, performance) => savePreferences(functional, performance)}
 *   onAcceptAll={acceptAll}
 * />
 * ```
 */
export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  visible,
  onClose,
  initialFunctional,
  initialPerformance,
  onSavePreferences,
  onAcceptAll,
}) => {
  const [functional, setFunctional] = useState(initialFunctional);
  const [performance, setPerformance] = useState(initialPerformance);

  // Sync local state with props when modal opens or props change
  useEffect(() => {
    if (visible) {
      setFunctional(initialFunctional);
      setPerformance(initialPerformance);
    }
  }, [visible, initialFunctional, initialPerformance]);

  /**
   * Handle save preferences button click
   */
  const handleSavePreferences = () => {
    onSavePreferences(functional, performance);
    onClose();
  };

  /**
   * Handle accept all button click
   */
  const handleAcceptAll = () => {
    onAcceptAll();
    onClose();
  };

  /**
   * Get the value for a cookie category
   */
  const getCategoryValue = (key: string): boolean => {
    switch (key) {
      case 'functional':
        return functional;
      case 'performance':
        return performance;
      default:
        return true; // strictlyNecessary
    }
  };

  /**
   * Handle toggle change for a cookie category
   */
  const handleToggleChange = (key: string, checked: boolean) => {
    switch (key) {
      case 'functional':
        setFunctional(checked);
        break;
      case 'performance':
        setPerformance(checked);
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      title="Preferencias de Cookies"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={560}
      className={styles.modal}
      centered
    >
      <div className={styles.modalContent}>
        <p className={styles.description}>
          Utilizamos cookies para mejorar su experiencia en nuestro sitio. Puede gestionar sus preferencias a continuación o aceptar todas
          las cookies para obtener la mejor experiencia de navegación.
        </p>

        <div className={styles.categories}>
          {COOKIE_CATEGORIES.map((category) => (
            <div key={category.key} className={styles.categoryItem}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryTitleRow}>
                  <h4 className={styles.categoryTitle}>{category.title}</h4>
                  {category.isRequired && <span className={styles.alwaysActiveBadge}>SIEMPRE ACTIVAS</span>}
                </div>
                <Switch
                  checked={getCategoryValue(category.key)}
                  disabled={category.isRequired}
                  onChange={(checked) => handleToggleChange(category.key, checked)}
                  aria-label={`Alternar ${category.title}`}
                />
              </div>
              <p className={styles.categoryDescription}>{category.description}</p>
            </div>
          ))}
        </div>

        <Space className={styles.actions} size="middle">
          <Button type="primary" size="large" onClick={handleSavePreferences}>
            Guardar Configuración
          </Button>
          <Button size="large" onClick={handleAcceptAll}>
            Aceptar Todas
          </Button>
        </Space>
      </div>
    </Modal>
  );
};
