import { Shield, Heart, Phone, Users, Landmark, Gavel } from 'lucide-react';

export const CONSTITUTION_PARTS = [
  { id: 'I', name: 'The Union and its Territory', articles: '1-4' },
  { id: 'II', name: 'Citizenship', articles: '5-11' },
  { id: 'III', name: 'Fundamental Rights', articles: '12-35' },
  { id: 'IV', name: 'Directive Principles of State Policy', articles: '36-51' },
  { id: 'IVA', name: 'Fundamental Duties', articles: '51A' },
  { id: 'V', name: 'The Union', articles: '52-151' },
  { id: 'VI', name: 'The States', articles: '152-237' },
  { id: 'IX', name: 'The Panchayats', articles: '243-243O' },
  { id: 'XV', name: 'Elections', articles: '324-329A' },
  { id: 'XX', name: 'Amendment of the Constitution', articles: '368' },
];

export const FEATURED_ARTICLES = [
  {
    id: '14',
    title: 'Equality before law',
    part: 'III',
    description: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.'
  },
  {
    id: '19',
    title: 'Protection of certain rights regarding freedom of speech',
    part: 'III',
    description: 'All citizens shall have the right to freedom of speech and expression, to assemble peaceably, and more.'
  },
  {
    id: '21',
    title: 'Protection of life and personal liberty',
    part: 'III',
    description: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.'
  },
  {
    id: '32',
    title: 'Remedies for enforcement of rights',
    part: 'III',
    description: 'The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed.'
  }
];

export const EMERGENCY_CONTACTS = [
  {
    name: 'National Legal Aid (NALSA)',
    number: '15100',
    description: 'Free legal services to weaker sections and organizing Lok Adalats.',
    icon: Gavel,
    color: 'blue'
  },
  {
    name: 'National Emergency Number',
    number: '112',
    description: 'Unified emergency response system for Police, Fire, and Ambulance.',
    icon: Shield,
    color: 'red'
  },
  {
    name: 'Women Helpline',
    number: '1091',
    description: 'Specialized helpline for women in distress or facing legal issues.',
    icon: Heart,
    color: 'pink'
  },
  {
    name: 'Child Helpline',
    number: '1098',
    description: '24-hour emergency phone service for children in need of aid/assistance.',
    icon: Users,
    color: 'orange'
  },
  {
    name: 'Senior Citizen Helpline',
    number: '14567',
    description: 'Support and information for senior citizens regarding rights and safety.',
    icon: Landmark,
    color: 'indigo'
  },
  {
    name: 'Cyber Crime Helpline',
    number: '1930',
    description: 'Immediate reporting of financial cyber frauds and online crimes.',
    icon: Phone,
    color: 'slate'
  }
];

export const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 
  'Tamil', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
];

export const AVATARS = ['🇮🇳', '⚖️', '📜', '🏛️', '🦁', '🧑‍⚖️'];

export const ViewMode = {
  HOME: 'HOME',
  EXPLORE: 'EXPLORE',
  CHAT: 'CHAT',
  HISTORY: 'HISTORY',
  PROFILE: 'PROFILE',
  CONTACTS: 'CONTACTS'
};