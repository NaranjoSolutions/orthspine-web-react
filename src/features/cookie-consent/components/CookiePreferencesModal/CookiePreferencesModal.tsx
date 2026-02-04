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
    title: 'Strictly Necessary',
    description:
      'These cookies are essential for the website to function and cannot be switched off in our system. They are usually only set in response to actions made by you.',
    isRequired: true,
  },
  {
    key: 'functional',
    title: 'Functional Cookies',
    description:
      'These cookies enable the website to provide enhanced functionality and personalization, such as remembering your language preferences.',
    isRequired: false,
  },
  {
    key: 'performance',
    title: 'Performance & Analytics',
    description:
      "These cookies help us measure how visitors use our site and track traffic sources so we can measure and improve our site's performance.",
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
      title="Cookie Preferences"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={560}
      className={styles.modal}
      centered
    >
      <div className={styles.modalContent}>
        <p className={styles.description}>
          We use cookies to improve your experience on our site. You can manage your preferences below or accept all
          cookies for the best browsing experience.
        </p>

        <div className={styles.categories}>
          {COOKIE_CATEGORIES.map((category) => (
            <div key={category.key} className={styles.categoryItem}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryTitleRow}>
                  <h4 className={styles.categoryTitle}>{category.title}</h4>
                  {category.isRequired && <span className={styles.alwaysActiveBadge}>ALWAYS ACTIVE</span>}
                </div>
                <Switch
                  checked={getCategoryValue(category.key)}
                  disabled={category.isRequired}
                  onChange={(checked) => handleToggleChange(category.key, checked)}
                  aria-label={`Toggle ${category.title}`}
                />
              </div>
              <p className={styles.categoryDescription}>{category.description}</p>
            </div>
          ))}
        </div>

        <Space className={styles.actions} size="middle">
          <Button type="primary" size="large" onClick={handleSavePreferences}>
            Save Settings
          </Button>
          <Button size="large" onClick={handleAcceptAll}>
            Accept All
          </Button>
        </Space>
      </div>
    </Modal>
  );
};
