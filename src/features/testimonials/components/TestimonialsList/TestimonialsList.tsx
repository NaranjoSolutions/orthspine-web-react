import React, { useState } from 'react';
import { Button, Select, Pagination } from 'antd';
import { TestimonialCard } from '@/features/home/components/TestimonialCard';
import { Testimonial } from '@/shared/resources/testimonials/testimonials';
import styles from './TestimonialsList.module.scss';

const { Option } = Select;

interface TestimonialsListProps {
  testimonials: Testimonial[];
}

type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1';
type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

/**
 * TestimonialsList Component
 * Displays a filterable and sortable list of testimonials with pagination
 *
 * @param testimonials - Array of testimonials to display
 */
export const TestimonialsList: React.FC<TestimonialsListProps> = ({ testimonials }) => {
  const [filterRating, setFilterRating] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter testimonials by rating
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (filterRating === 'all') return true;
    return testimonial.rating === parseInt(filterRating);
  });

  // Sort testimonials
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        // Assuming newer testimonials have higher IDs
        return parseInt(b.id) - parseInt(a.id);
      case 'oldest':
        return parseInt(a.id) - parseInt(b.id);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  // Paginate testimonials
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTestimonials = sortedTestimonials.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.testimonialsListContainer}>
      <div className={styles.controls}>
        <div className={styles.filterButtons}>
          <Button
            type={filterRating === 'all' ? 'primary' : 'default'}
            onClick={() => {
              setFilterRating('all');
              setCurrentPage(1);
            }}
          >
            All
          </Button>
          <Button
            type={filterRating === '5' ? 'primary' : 'default'}
            onClick={() => {
              setFilterRating('5');
              setCurrentPage(1);
            }}
          >
            5 stars
          </Button>
          <Button
            type={filterRating === '4' ? 'primary' : 'default'}
            onClick={() => {
              setFilterRating('4');
              setCurrentPage(1);
            }}
          >
            4 stars
          </Button>
          <Button
            type={filterRating === '3' ? 'primary' : 'default'}
            onClick={() => {
              setFilterRating('3');
              setCurrentPage(1);
            }}
          >
            3 stars
          </Button>
          <Button
            type={filterRating === '2' ? 'primary' : 'default'}
            onClick={() => {
              setFilterRating('2');
              setCurrentPage(1);
            }}
          >
            2 stars
          </Button>
          <Button
            type={filterRating === '1' ? 'primary' : 'default'}
            onClick={() => {
              setFilterRating('1');
              setCurrentPage(1);
            }}
          >
            1 star
          </Button>
        </div>

        <div className={styles.sortControl}>
          <span className={styles.sortLabel}>Sort by:</span>
          <Select value={sortBy} onChange={(value: SortOption) => setSortBy(value)} className={styles.sortSelect}>
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
            <Option value="highest">Highest Rated</Option>
            <Option value="lowest">Lowest Rated</Option>
          </Select>
        </div>
      </div>

      <div className={styles.testimonialGrid}>
        {paginatedTestimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            patientName={testimonial.patientName}
            rating={testimonial.rating}
            testimonial={testimonial.testimonial}
          />
        ))}
      </div>

      {sortedTestimonials.length === 0 && (
        <div className={styles.emptyState}>
          <p>No testimonials found for the selected filter.</p>
        </div>
      )}

      {sortedTestimonials.length > itemsPerPage && (
        <div className={styles.paginationContainer}>
          <Pagination
            current={currentPage}
            total={sortedTestimonials.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
            className={styles.pagination}
          />
        </div>
      )}
    </div>
  );
};
