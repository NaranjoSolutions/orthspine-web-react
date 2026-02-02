import React from 'react';
import { Card, Tag } from 'antd';
import teamMemberImage from '@/assets/images/about-us/aaron.png';
import styles from './TeamSection.module.scss';

interface TeamMemberProps {
  name: string;
  title: string;
  description: string;
  certifications: string[];
  image: string;
}

/**
 * TeamMember Component
 * Individual team member card
 * @param name - Team member's name
 * @param title - Team member's professional title
 * @param description - Team member's description
 * @param certifications - Array of certifications
 * @param image - Image source for the team member
 * @returns React component displaying a team member card
 */
const TeamMember: React.FC<TeamMemberProps> = ({ name, title, description, certifications, image }) => {
  return (
    <Card className={styles.teamCard} bordered={false}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.memberImage} />
      </div>
      <h3 className={styles.memberName}>{name}</h3>
      <p className={styles.memberTitle}>{title}</p>
      <p className={styles.memberDescription}>{description}</p>
      <div className={styles.certifications}>
        {certifications.map((cert, index) => (
          <Tag key={index} color="blue" className={styles.certTag}>
            {cert}
          </Tag>
        ))}
      </div>
    </Card>
  );
};

/**
 * TeamSection Component
 * Displays the clinic specialist
 * @returns React component with team member card
 */
export const TeamSection: React.FC = () => {
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Meet Our Specialist</h2>
        </div>
        <div className={styles.teamGrid}>
          <TeamMember
            name="Dr. Linda Chen"
            title="Lead Physiotherapist, DPT"
            description="With over 15 years of clinical experience, Dr. Chen specializes in manual therapy and advanced spinal alignment techniques. She is dedicated to providing compassionate, evidence-based, and personalized care plans for every patient at Orthopedic Spine."
            certifications={['Manual Therapy Certified', 'Orthopedic Clinical Specialist']}
            image={teamMemberImage}
          />
        </div>
      </div>
    </section>
  );
};
