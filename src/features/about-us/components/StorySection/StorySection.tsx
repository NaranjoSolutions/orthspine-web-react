import React from 'react';
import santaPaulaImage from '@/assets/images/about-us/santa-paula.png';
import styles from './StorySection.module.scss';

/**
 * StorySection Component
 * Displays the clinic's story with image and text in a two-column layout
 * @returns React component with story content
 */
export const StorySection: React.FC = () => {
  return (
    <section className={styles.storySection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.imageColumn}>
            <img 
              src={santaPaulaImage} 
              alt="Orthopedic Spine Clinic" 
              className={styles.storyImage} 
            />
          </div>
          <div className={styles.textColumn}>
            <h2 className={styles.sectionHeading}>Our Story</h2>
            <p className={styles.storyText}>
              Founded with a mission to provide specialized care for complex spine issues, 
              Orthopedic Spine has grown into a leading clinic for rehabilitation, filling 
              a gap in the community for highly specialized spinal care that combines expertise 
              and compassionate clinical support.
            </p>
            <p className={styles.storyText}>
              Our patient-first approach ensures that every individual receives a personalized 
              path to recovery. Over the last decade, we have helped thousands of patients 
              reclaim their quality of life through dedicated expertise and clinical excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};