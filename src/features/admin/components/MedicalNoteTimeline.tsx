import React from 'react';
import { Timeline, Tag, Empty } from 'antd';
import { MedicineBoxOutlined } from '@ant-design/icons';
import type { MedicalNote, MedicalNoteCategory } from '@/features/admin/types/patient.types';
import styles from './MedicalNoteTimeline.module.scss';

interface MedicalNoteTimelineProps {
  notes: MedicalNote[];
  loading?: boolean;
}

/**
 * MedicalNoteTimeline Component
 * Displays medical notes in a timeline format
 *
 * Features:
 * - Timeline visualization
 * - Category tags with color coding
 * - Date and author information
 * - Note content display
 */
export const MedicalNoteTimeline: React.FC<MedicalNoteTimelineProps> = ({ notes, loading = false }) => {
  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /**
   * Get category tag color
   */
  const getCategoryColor = (category: MedicalNoteCategory): string => {
    const colorMap: Record<MedicalNoteCategory, string> = {
      'Post-Op': 'success',
      Consultation: 'processing',
      Intake: 'default',
      'Follow-Up': 'warning',
      General: 'default',
    };
    return colorMap[category] || 'default';
  };

  if (!loading && notes.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Empty description="No medical notes available" />
      </div>
    );
  }

  /**
   * Create timeline items from notes
   */
  const timelineItems = notes.map((note) => ({
    key: note.id,
    dot: <MedicineBoxOutlined className={styles.timelineIcon} />,
    children: (
      <div className={styles.noteCard}>
        <div className={styles.noteHeader}>
          <div className={styles.noteMetadata}>
            <span className={styles.noteDate}>{formatDate(note.date)}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.noteAuthor}>{note.author}</span>
          </div>
          <Tag color={getCategoryColor(note.category)} className={styles.categoryTag}>
            {note.category}
          </Tag>
        </div>
        <div className={styles.noteContent}>{note.content}</div>
      </div>
    ),
  }));

  return (
    <div className={styles.timeline}>
      <Timeline items={timelineItems} className={styles.timelineComponent} />
    </div>
  );
};
