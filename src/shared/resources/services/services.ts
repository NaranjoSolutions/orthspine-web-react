import spine from '../../../assets/images/services/spine.jpg';
import knee from '../../../assets/images/services/knee.jpg';
import hip from '../../../assets/images/services/hip.jpg';
import shoulder from '../../../assets/images/services/shoulder.jpg';
import footAndHand1 from '../../../assets/images/services/foot-and-hand-1.jpg';
import rehabilitation from '../../../assets/images/services/rehabilitation.jpg';
import circulation from '../../../assets/images/services/circulation.jpg';
import sports from '../../../assets/images/services/sports.jpg';

export const allClinicServices = [
  {
    serviceId: 'spine',
    title: 'Spine',
    shortDescription:
      'Specialized care for the treatment of spine conditions such as disc protrusions, bulges, herniated discs, and scoliosis.',
    description: `We provide rehabilitation services for conditions such as disc protrusions, bulges, herniated discs, spondylolisthesis, radiculopathies, sciatica, scoliosis, straightening, hyperlordosis, and spine surgical procedures.`,
    alt: 'Spine',
    image: spine,
    isPrimary: true,
  },
  {
    serviceId: 'knee',
    title: 'Knee',
    shortDescription:
      'Comprehensive treatments for knee problems including meniscus injuries, arthritis, and ligament sprains.',
    description: `We offer treatments for knee conditions such as meniscus injuries, wear and tear, arthritis, chondromalacia, ligament sprains, Baker's cysts, joint effusion, fibrous tissue, knee surgical procedures, and fractures.`,
    alt: 'Knee',
    image: knee,
    isPrimary: true,
  },
  {
    serviceId: 'hip',
    title: 'Hip',
    shortDescription: 'Effective solutions for hip fractures, bursitis, and joint mechanical changes.',
    description: `Our services include treatments for hip fractures, bursitis, wear and tear, and joint mechanical changes.`,
    alt: 'Hip',
    image: hip,
    isPrimary: true,
  },
  {
    serviceId: 'shoulder',
    title: 'Shoulder',
    shortDescription:
      'Expert care for shoulder injuries including rotator cuff problems, tendinitis, and tears.',
    description: `We provide treatments for shoulder conditions such as fractures, bursitis, wear and tear, joint mechanical changes, rotator cuff problems, tendinitis, and tears.`,
    alt: 'Shoulder',
    image: shoulder,
    isPrimary: true,
  },
  {
    serviceId: 'foot-and-hand',
    title: 'Foot and Hand',
    shortDescription: 'Rehabilitation programs for fractures, tendinitis, and carpal tunnel syndrome.',
    description: `Our rehabilitation services address conditions such as fractures, tendinitis, fibrous tissue, sprains, heel spurs, plantar fasciitis, carpal tunnel syndrome, De Quervain's tendinitis, and radiculopathies.`,
    alt: 'Foot and Hand',
    image: footAndHand1,
    isPrimary: true,
  },
  {
    serviceId: 'rehabilitation',
    title: 'Rehabilitation',
    shortDescription: 'Specialized physical therapy for post-cardiac conditions and surgeries.',
    description: `We offer programs and follow-up for post-cardiac conditions, patients with pacemakers, open-heart surgeries, and cardio-pulmonary conditions.`,
    alt: 'Rehabilitation',
    image: rehabilitation,
    isPrimary: true,
  },
  {
    serviceId: 'circulation',
    title: 'Circulation',
    shortDescription: 'Treatment for circulatory problems including varicose veins and ulcers.',
    description: `Our services include treatments for circulatory problems such as varicose veins, lymphedema, circulation issues, and ulcers.`,
    alt: 'Circulation',
    image: circulation,
    isPrimary: true,
  },
  {
    serviceId: 'sports',
    title: 'Sports',
    shortDescription: 'Sports rehabilitation including posture correction and muscle recovery.',
    description: `We provide sports rehabilitation services such as muscle recovery massages, posture correction, sports readaptation, cryotherapy, and guidance on sports footwear prescription.`,
    alt: 'Sports',
    image: sports,
    isPrimary: true,
  },
];
