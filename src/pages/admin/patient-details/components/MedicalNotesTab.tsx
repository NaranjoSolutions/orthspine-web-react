import React from 'react';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MedicalNoteTimeline } from '@/features/admin/components';
import type { MedicalNote } from '@/features/admin/types/patient.types';
import styles from './MedicalNotesTab.module.scss';

/**
 * MedicalNotesTab Component
 * Tab content for displaying medical notes
 */
interface MedicalNotesTabProps {
  notes: MedicalNote[];
  loading: boolean;
  onAddNote: () => void;
}

export const MedicalNotesTab: React.FC<MedicalNotesTabProps> = ({ notes, loading, onAddNote }) => {
  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddNote} size="large">
          Add New Note
        </Button>
      </div>
      <MedicalNoteTimeline notes={notes} loading={loading} />
    </div>
  );
};
