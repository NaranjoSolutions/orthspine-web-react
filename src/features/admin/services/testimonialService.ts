import {
  Testimonial,
  TestimonialFormData,
  TestimonialFilters,
  TestimonialStatus,
} from '../types/testimonial.types';

/**
 * Mock testimonials data for development
 * TODO: Replace with real API calls when backend is ready
 */
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    patientName: 'John Doe',
    message:
      "The care I received was exceptional. Dr. Carter's expertise and the staff's compassion made my recovery smooth and successful. Highly recommend!",
    rating: 5,
    status: 'approved' as TestimonialStatus,
    dateAdded: '2023-10-26T00:00:00Z',
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-26T10:00:00Z',
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    message:
      'My back pain is completely gone after the procedure. I can finally enjoy activities with my family again. Thank you so much!',
    rating: 5,
    status: 'pending' as TestimonialStatus,
    dateAdded: '2023-10-25T00:00:00Z',
    createdAt: '2023-10-25T14:30:00Z',
    updatedAt: '2023-10-25T14:30:00Z',
  },
  {
    id: '3',
    patientName: 'Samuel Green',
    message:
      'A five-star experience from start to finish. Highly professional team and state-of-the-art facilities. Very satisfied!',
    rating: 5,
    status: 'approved' as TestimonialStatus,
    dateAdded: '2023-10-22T00:00:00Z',
    createdAt: '2023-10-22T09:15:00Z',
    updatedAt: '2023-10-22T09:15:00Z',
  },
  {
    id: '4',
    patientName: 'Brenda Lee',
    message:
      'The testimonial was not relevant to the services we provide. Please provide feedback specific to orthopedic care.',
    rating: 2,
    status: 'rejected' as TestimonialStatus,
    dateAdded: '2023-10-20T00:00:00Z',
    createdAt: '2023-10-20T11:00:00Z',
    updatedAt: '2023-10-20T11:00:00Z',
  },
  {
    id: '5',
    patientName: 'Michael Brown',
    message:
      'Outstanding service! The physical therapy team helped me regain full mobility. Forever grateful for their dedication.',
    rating: 5,
    status: 'approved' as TestimonialStatus,
    dateAdded: '2023-10-18T00:00:00Z',
    createdAt: '2023-10-18T15:45:00Z',
    updatedAt: '2023-10-18T15:45:00Z',
  },
  {
    id: '6',
    patientName: 'Emily Davis',
    message:
      'The consultation was thorough and professional. Waiting for the procedure but already impressed with the care.',
    rating: 4,
    status: 'pending' as TestimonialStatus,
    dateAdded: '2023-10-15T00:00:00Z',
    createdAt: '2023-10-15T08:20:00Z',
    updatedAt: '2023-10-15T08:20:00Z',
  },
  {
    id: '7',
    patientName: 'Robert Johnson',
    message:
      'After years of chronic pain, I finally found relief. The surgical team was incredible, and recovery was faster than expected.',
    rating: 5,
    status: 'approved' as TestimonialStatus,
    dateAdded: '2023-10-12T00:00:00Z',
    createdAt: '2023-10-12T13:30:00Z',
    updatedAt: '2023-10-12T13:30:00Z',
  },
  {
    id: '8',
    patientName: 'Lisa Anderson',
    message: 'Great experience overall. The staff was friendly and the facility was clean and modern.',
    rating: 4,
    status: 'pending' as TestimonialStatus,
    dateAdded: '2023-10-10T00:00:00Z',
    createdAt: '2023-10-10T10:00:00Z',
    updatedAt: '2023-10-10T10:00:00Z',
  },
];

/**
 * Simulated API delay
 */
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * TestimonialService
 * Service layer for testimonial operations
 *
 * Design Principles:
 * - Repository Pattern: Abstracts data access
 * - Single Responsibility: Handles testimonial data operations only
 * - Facade Pattern: Provides simplified interface to complex operations
 *
 * Note: Currently using mock data. Replace with real API calls when backend is ready.
 */
class TestimonialService {
  private testimonials: Testimonial[] = [...mockTestimonials];

  /**
   * Get testimonials with filters and pagination
   */
  async getTestimonials(
    filters: TestimonialFilters,
    page: number,
    pageSize: number,
  ): Promise<{ testimonials: Testimonial[]; total: number }> {
    await delay();

    let filtered = [...this.testimonials];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.patientName.toLowerCase().includes(searchLower) || t.message.toLowerCase().includes(searchLower),
      );
    }

    // Apply status filter
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter((t) => t.status === filters.status);
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: string | number = a[filters.sortBy as keyof Testimonial] as string | number;
        let bValue: string | number = b[filters.sortBy as keyof Testimonial] as string | number;

        if (filters.sortBy === 'dateAdded') {
          aValue = new Date(aValue as string).getTime();
          bValue = new Date(bValue as string).getTime();
        }

        if (filters.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = filtered.slice(start, end);

    return { testimonials: paginated, total };
  }

  /**
   * Get testimonial by ID
   */
  async getTestimonialById(id: string): Promise<Testimonial> {
    await delay();
    const testimonial = this.testimonials.find((t) => t.id === id);
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    return testimonial;
  }

  /**
   * Create new testimonial
   */
  async createTestimonial(data: TestimonialFormData): Promise<Testimonial> {
    await delay();

    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      ...data,
      dateAdded: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.testimonials.unshift(newTestimonial);
    return newTestimonial;
  }

  /**
   * Update testimonial
   */
  async updateTestimonial(id: string, data: Partial<TestimonialFormData>): Promise<Testimonial> {
    await delay();

    const index = this.testimonials.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error('Testimonial not found');
    }

    const updatedTestimonial: Testimonial = {
      ...this.testimonials[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.testimonials[index] = updatedTestimonial;
    return updatedTestimonial;
  }

  /**
   * Delete testimonial
   */
  async deleteTestimonial(id: string): Promise<void> {
    await delay();

    const index = this.testimonials.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error('Testimonial not found');
    }

    this.testimonials.splice(index, 1);
  }

  /**
   * Update testimonial status (approve/reject)
   */
  async updateTestimonialStatus(id: string, status: TestimonialStatus): Promise<Testimonial> {
    return this.updateTestimonial(id, { status });
  }

  /**
   * Get testimonials count by status
   */
  async getTestimonialStats(): Promise<{
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  }> {
    await delay();

    return {
      total: this.testimonials.length,
      approved: this.testimonials.filter((t) => t.status === TestimonialStatus.APPROVED).length,
      pending: this.testimonials.filter((t) => t.status === TestimonialStatus.PENDING).length,
      rejected: this.testimonials.filter((t) => t.status === TestimonialStatus.REJECTED).length,
    };
  }
}

/**
 * Singleton instance
 */
export const testimonialService = new TestimonialService();
