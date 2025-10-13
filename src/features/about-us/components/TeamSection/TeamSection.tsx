import React from 'react';
import { Card, Tag } from 'antd';
import aaron from '@/assets/images/about-us/aaron.png';
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
 * Displays the clinic team members
 */
export const TeamSection: React.FC = () => {
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Team</h2>
        </div>
        <div className={styles.teamGrid}>
          <TeamMember
            name="Ana Torres"
            title="Principal Physiotherapist"
            description="Ana is a certified physiotherapist specializing in spinal rehabilitation. Her approach focuses on manual therapies and personalized exercise plans to promote lasting recovery."
            certifications={['Certified in Manual Orthopedic Therapy', 'Sports Rehabilitation Specialist']}
            image={aaron}
          />
        </div>
      </div>
    </section>
  );
};
