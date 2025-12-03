import type { Patient, PatientFormData, PatientFilters } from '../types/patient.types';

/**
 * Mock patient data for development
 * TODO: Replace with real API calls when backend is ready
 */
const mockPatients: Patient[] = [
  {
    id: '1',
    fullName: 'Olivia Martinez',
    phone: '(555) 123-4567',
    email: 'olivia.m@example.com',
    dateOfBirth: '1985-03-15',
    address: '123 Main St, Springfield, IL 62701',
    medicalHistory: 'Lower back pain, previous surgery in 2020',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    fullName: 'Benjamin Carter',
    phone: '(555) 987-6543',
    email: 'ben.carter@example.com',
    dateOfBirth: '1990-07-22',
    address: '456 Oak Ave, Chicago, IL 60614',
    medicalHistory: 'Chronic neck pain, physical therapy ongoing',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    fullName: 'Sophia Rodriguez',
    phone: '(555) 234-5678',
    email: 'sophia.r@example.com',
    dateOfBirth: '1978-11-05',
    address: '789 Pine Rd, Naperville, IL 60540',
    medicalHistory: 'Sciatica, herniated disc L4-L5',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-01T09:15:00Z',
  },
  {
    id: '4',
    fullName: 'Liam Goldberg',
    phone: '(555) 876-5432',
    email: 'liam.g@example.com',
    dateOfBirth: '2001-01-30',
    address: '321 Elm St, Aurora, IL 60505',
    medicalHistory: 'Sports injury, spinal alignment issues',
    createdAt: '2024-02-10T16:45:00Z',
    updatedAt: '2024-02-10T16:45:00Z',
  },
  {
    id: '5',
    fullName: 'Ava Nguyen',
    phone: '(555) 345-6789',
    email: 'ava.nguyen@example.com',
    dateOfBirth: '1995-09-12',
    address: '654 Birch Ln, Joliet, IL 60435',
    medicalHistory: 'Degenerative disc disease, regular checkups',
    createdAt: '2024-02-15T11:20:00Z',
    updatedAt: '2024-02-15T11:20:00Z',
  },
  {
    id: '6',
    fullName: 'Ethan Williams',
    phone: '(555) 456-7890',
    email: 'ethan.w@example.com',
    dateOfBirth: '1982-04-18',
    address: '987 Maple Dr, Rockford, IL 61101',
    medicalHistory: 'Spinal stenosis, considering surgery',
    createdAt: '2024-02-20T08:30:00Z',
    updatedAt: '2024-02-20T08:30:00Z',
  },
  {
    id: '7',
    fullName: 'Isabella Thompson',
    phone: '(555) 567-8901',
    email: 'isabella.t@example.com',
    dateOfBirth: '1988-12-25',
    address: '159 Cedar St, Peoria, IL 61602',
    medicalHistory: 'Scoliosis, brace treatment completed',
    createdAt: '2024-03-01T13:00:00Z',
    updatedAt: '2024-03-01T13:00:00Z',
  },
  {
    id: '8',
    fullName: 'Mason Anderson',
    phone: '(555) 678-9012',
    email: 'mason.a@example.com',
    dateOfBirth: '1975-06-08',
    address: '753 Spruce Ct, Champaign, IL 61820',
    medicalHistory: 'Osteoarthritis, pain management plan',
    createdAt: '2024-03-05T10:45:00Z',
    updatedAt: '2024-03-05T10:45:00Z',
  },
  {
    id: '9',
    fullName: 'Charlotte Davis',
    phone: '(555) 789-0123',
    email: 'charlotte.d@example.com',
    dateOfBirth: '1992-02-14',
    address: '951 Willow Way, Evanston, IL 60201',
    medicalHistory: 'Whiplash from car accident, recovering',
    createdAt: '2024-03-10T15:15:00Z',
    updatedAt: '2024-03-10T15:15:00Z',
  },
  {
    id: '10',
    fullName: 'Oliver Brown',
    phone: '(555) 890-1234',
    email: 'oliver.b@example.com',
    dateOfBirth: '1980-08-30',
    address: '357 Ash Ave, Schaumburg, IL 60193',
    medicalHistory: 'Bulging disc, conservative treatment',
    createdAt: '2024-03-15T12:00:00Z',
    updatedAt: '2024-03-15T12:00:00Z',
  },
];

// Extend mock data to 50 patients
for (let i = 11; i <= 50; i++) {
  const firstNames = ['James', 'Emma', 'William', 'Sophia', 'Lucas', 'Amelia', 'Henry', 'Mia', 'Alexander', 'Evelyn'];
  const lastNames = [
    'Johnson',
    'Smith',
    'Wilson',
    'Garcia',
    'Taylor',
    'Lee',
    'Walker',
    'Hall',
    'Allen',
    'Young',
  ];

  const firstName = firstNames[(i - 1) % firstNames.length];
  const lastName = lastNames[Math.floor((i - 1) / 5) % lastNames.length];

  mockPatients.push({
    id: `${i}`,
    fullName: `${firstName} ${lastName}`,
    phone: `(555) ${String(i).padStart(3, '0')}-${String(1000 + i).slice(-4)}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
    dateOfBirth: `${1950 + (i % 50)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    address: `${i * 10} Example St, City, IL 6${String(i).padStart(4, '0')}`,
    medicalHistory: 'General spine health monitoring',
    createdAt: new Date(2024, 0, i).toISOString(),
    updatedAt: new Date(2024, 0, i).toISOString(),
  });
}

/**
 * Patient Service
 * Business logic for patient management
 *
 * Architecture:
 * - Service Layer: Separates business logic from UI
 * - Repository Pattern: Abstracts data access
 * - Mock Data: Simulates backend API
 *
 * TODO: Replace mock implementation with real API calls
 */
class PatientService {
  /**
   * Get all patients with optional filtering, sorting, and pagination
   */
  async getPatients(
    filters?: PatientFilters,
    page: number = 1,
    pageSize: number = 5
  ): Promise<{
    patients: Patient[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredPatients = [...mockPatients];

    // Apply search filter
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredPatients = filteredPatients.filter(
        (p) =>
          p.fullName.toLowerCase().includes(searchLower) ||
          p.email.toLowerCase().includes(searchLower) ||
          p.phone.includes(searchLower)
      );
    }

    // Apply sorting
    if (filters?.sortBy) {
      filteredPatients.sort((a, b) => {
        const aValue = a[filters.sortBy!];
        const bValue = b[filters.sortBy!];

        if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const total = filteredPatients.length;

    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

    return {
      patients: paginatedPatients,
      total,
      page,
      pageSize,
    };
  }

  /**
   * Get a single patient by ID
   */
  async getPatientById(id: string): Promise<Patient | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    return mockPatients.find((p) => p.id === id) || null;
  }

  /**
   * Create a new patient
   */
  async createPatient(data: PatientFormData): Promise<Patient> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newPatient: Patient = {
      id: String(Date.now()),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPatients.unshift(newPatient);

    return newPatient;
  }

  /**
   * Update an existing patient
   */
  async updatePatient(id: string, data: PatientFormData): Promise<Patient> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = mockPatients.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error('Patient not found');
    }

    const updatedPatient: Patient = {
      ...mockPatients[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    mockPatients[index] = updatedPatient;

    return updatedPatient;
  }

  /**
   * Delete a patient
   */
  async deletePatient(id: string): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = mockPatients.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error('Patient not found');
    }

    mockPatients.splice(index, 1);
  }
}

// Export singleton instance
export const patientService = new PatientService();
