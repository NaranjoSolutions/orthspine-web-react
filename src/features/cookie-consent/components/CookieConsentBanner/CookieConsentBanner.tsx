/**
 * Cookie Consent Banner Component
 * Displays a banner at the bottom of the page for first-time visitors
 */

import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useCookieConsent } from '../../hooks';
import { CookiePreferencesModal } from '../CookiePreferencesModal';
import styles from './CookieConsentBanner.module.scss';

/**
 * CookieConsentBanner Component
 * 
 * Displays a cookie consent banner at the bottom of the page when the user
 * hasn't yet made a consent decision. The banner provides three options:
 * - Manage Preferences: Opens detailed preferences modal
 * - Reject Non-Essential: Only enables strictly necessary cookies
 * - Accept All: Enables all cookie categories
 * 
 * The banner automatically hides once the user makes a consent decision.
 * State is persisted in localStorage and synchronized across tabs.
 * 
 * @component
 * @example
 * ```tsx
 * // In App.tsx or root component
 * <CookieConsentBanner />
 * ```
 */
export const CookieConsentBanner: React.FC = () => {
  const { consent, hasConsented, acceptAll, rejectNonEssential, savePreferences } = useCookieConsent();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Don't render if user has already consented
  if (hasConsented) {
    return null;
  }

  /**
   * Handle "Manage Preferences" button click
   */
  const handleManagePreferences = () => {
    setIsModalVisible(true);
  };

  /**
   * Handle modal close
   */
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  /**
   * Handle "Reject Non-Essential" button click
   */
  const handleRejectNonEssential = () => {
    rejectNonEssential();
  };

  /**
   * Handle "Accept All" button click
   */
  const handleAcceptAll = () => {
    acceptAll();
  };

  return (
    <>
      <div className={styles.banner} role="dialog" aria-label="Cookie Consent Banner">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon} role="img" aria-label="Cookie">
                🍪
              </span>
            </div>
            <div className={styles.text}>
              <h3 className={styles.title}>Cookie Consent</h3>
              <p className={styles.description}>
                We use cookies to enhance your browsing experience, serve personalized content, and
                analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.
                For more information, please read our{' '}
                <a href="/cookie-policy" className={styles.link}>
                  Cookie Policy
                </a>
                .
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <Space size="middle" wrap>
              <Button size="large" onClick={handleManagePreferences}>
                Manage Preferences
              </Button>
              <Button size="large" onClick={handleRejectNonEssential}>
                Reject Non-Essential
              </Button>
              <Button type="primary" size="large" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <CookiePreferencesModal
        visible={isModalVisible}
        onClose={handleModalClose}
        initialFunctional={consent.functional}
        initialPerformance={consent.performance}
        onSavePreferences={savePreferences}
        onAcceptAll={acceptAll}
      />
    </>
  );
};
