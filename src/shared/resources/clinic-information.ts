/**
 * Clinic information resource
 * Single source of truth for clinic data
 */
export const clinicInformation = {
  name: 'Orthopedic Spine',
  location: {
    latitude: 9.868032691676943,
    longitude: -83.90066555786967,
    address: 'De la Ferretería El Bosque, 50 m al este y 50 m al sur. San Rafael, Cartago, Costa Rica',
  },
  schedule: ['Todos los días: Abierto 24/7'],
  contact: {
    phones: ['+506 8910-3115'],
    email: 'orthopedicspineinfo@gmail.com',
  },
  socialMedia: {
    facebook: 'https://www.facebook.com/orthopedicspine',
    instagram: 'https://www.instagram.com/orthopedicspine',
    youtube: 'https://www.youtube.com/@orthopedicspine',
  },
};

/**
 * Parsed schedule entry
 */
export interface ParsedScheduleEntry {
  label: string;
  hours: string;
}

/**
 * Parse a schedule entry into label and hours
 * @param scheduleItem - Schedule entry string (e.g., "Lunes a Viernes: 8:00 am - 5:30 pm")
 * @returns Parsed schedule entry with label and hours
 */
export const parseScheduleEntry = (scheduleItem: string): ParsedScheduleEntry => {
  const colonIndex = scheduleItem.indexOf(':');
  if (colonIndex === -1) {
    return { label: '', hours: scheduleItem };
  }
  return {
    label: scheduleItem.substring(0, colonIndex).trim(),
    hours: scheduleItem.substring(colonIndex + 1).trim(),
  };
};
