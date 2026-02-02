/**
 * Contact Configuration
 * Centralized contact information for the clinic
 */

/**
 * Contact phone numbers
 * @todo Update with actual clinic phone numbers before production deployment
 */
export const CONTACT_PHONE = {
  /** Primary phone number for calls (digits only) */
  PRIMARY: '5551234567',
  /** Formatted display phone number */
  DISPLAY: '(555) 123-4567',
} as const;

/**
 * WhatsApp configuration
 * @todo Update with actual clinic WhatsApp number before production deployment
 */
export const WHATSAPP_CONFIG = {
  /** WhatsApp phone number (digits only) */
  PHONE: '5551234567',
  /** WhatsApp chat URL */
  get URL() {
    return `https://wa.me/${this.PHONE}`;
  },
} as const;

/**
 * Clinic address information
 * @todo Update with actual clinic address before production deployment
 */
export const CLINIC_ADDRESS = {
  STREET: '123 Health Ave',
  SUITE: 'Suite 400',
  BUILDING: 'Medical Plaza',
  CITY: 'New York',
  STATE: 'NY',
  ZIP_CODE: '10001',
  get FULL() {
    return `${this.STREET}, ${this.SUITE}, ${this.BUILDING}, ${this.CITY}, ${this.STATE} ${this.ZIP_CODE}`;
  },
} as const;

/**
 * Operating hours information
 * @todo Verify operating hours before production deployment
 */
export const OPERATING_HOURS = {
  WEEKDAY: {
    LABEL: 'Monday - Friday',
    HOURS: '8:00 AM - 6:00 PM',
  },
  WEEKEND: {
    LABEL: 'Saturday',
    HOURS: '9:00 AM - 1:00 PM (Emergency Only)',
  },
} as const;

/**
 * Parking information
 */
export const PARKING_INFO =
  'Free on-site parking available for patients. Validate your ticket at reception.' as const;

/**
 * Accessibility information
 */
export const ACCESSIBILITY_INFO =
  'Full wheelchair access via main lobby elevators. Braille signage throughout clinic.' as const;
