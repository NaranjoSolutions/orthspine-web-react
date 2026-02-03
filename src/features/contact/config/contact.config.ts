import { clinicInformation } from '@/shared/resources/clinic-information';

/**
 * Contact Configuration
 * Centralized contact information for the clinic
 * Now sourced from shared clinic-information.ts for single source of truth
 */

/**
 * Contact phone numbers
 * Derived from shared clinic information
 */
export const CONTACT_PHONE = {
  /** Primary phone number for calls (digits only) */
  get PRIMARY() {
    return clinicInformation.contact.phones[0].replace(/\D/g, '');
  },
  /** Formatted display phone number */
  get DISPLAY() {
    return clinicInformation.contact.phones[0];
  },
} as const;

/**
 * WhatsApp configuration
 * Derived from shared clinic information
 */
export const WHATSAPP_CONFIG = {
  /** WhatsApp phone number (digits only) */
  get PHONE() {
    return clinicInformation.contact.phones[0].replace(/\D/g, '');
  },
  /** WhatsApp chat URL */
  get URL() {
    return `https://wa.me/${this.PHONE}`;
  },
} as const;

/**
 * Clinic address information
 * Derived from shared clinic information
 */
export const CLINIC_ADDRESS = {
  get FULL() {
    return clinicInformation.location.address;
  },
} as const;

/**
 * Operating hours information
 * Derived from shared clinic information schedule
 */
export const OPERATING_HOURS = {
  WEEKDAY: {
    get LABEL() {
      return clinicInformation.schedule[0].split(':')[0].trim();
    },
    get HOURS() {
      return clinicInformation.schedule[0].split(':').slice(1).join(':').trim();
    },
  },
  WEEKEND: {
    get LABEL() {
      return clinicInformation.schedule[1].split(':')[0].trim();
    },
    get HOURS() {
      return clinicInformation.schedule[1].split(':').slice(1).join(':').trim();
    },
  },
} as const;

/**
 * Parking information
 * Note: This information is not available in shared clinic-information.ts
 * Consider adding it there if it becomes part of the clinic's core information
 */
export const PARKING_INFO =
  'Free on-site parking available for patients. Validate your ticket at reception.' as const;

/**
 * Accessibility information
 * Note: This information is not available in shared clinic-information.ts
 * Consider adding it there if it becomes part of the clinic's core information
 */
export const ACCESSIBILITY_INFO =
  'Full wheelchair access via main lobby elevators. Braille signage throughout clinic.' as const;
