export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  mode: 'security' | 'builder' | 'both';
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  categoryTag: string;
  description: string;
  liveUrl?: string;
  mode: 'security' | 'builder' | 'both';
  badge?: string;
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  mode: 'security' | 'builder' | 'both';
}

export interface ArenaItem {
  id: string;
  name: string;
  subtitle: string;
  mode: 'security' | 'builder' | 'both';
}

export const RESUME_DATA = {
  personal: {
    name: 'ALLAN K. J',
    displaySurname: 'K. J',
    firstName: 'ALLAN',
    subtitle: 'Cybersecurity & Full-Stack Engineering',
    location: 'Coimbatore, Tamil Nadu, India',
    intro:
      'Second-year Computer Science student (Cybersecurity) at Karunya University working across enterprise IT security, networking, and full-stack web development.',
  },
  experience: [
    {
      id: 'zf-group',
      company: 'ZF Group (ZF Friedrichshafen AG)',
      role: 'IT Security & Networking Intern',
      period: 'June 2 – July 3, 2026',
      location: 'Coimbatore',
      description:
        'Worked with enterprise IT security operations, performed yearly password maintenance, and configured Apple A16 iPads for deployment.',
      mode: 'security',
      tags: ['IT Security', 'Enterprise Operations', 'Device Config'],
    },
    {
      id: 'conesta-forge',
      company: 'Conesta Forge',
      role: '5-Day AI Build Sprint',
      period: 'June 21 – 26, 2026',
      location: 'Remote',
      description:
        'Built and shipped Tool Finder solo from blank idea to live product in five days — #33 on the leaderboard (Forge Score: 1,391).',
      mode: 'builder',
      tags: ['Solo Build', 'Rank #33', 'Product Launch'],
    },
    {
      id: 'qaroo',
      company: 'Qaroo',
      role: 'Full-Stack Intern',
      period: 'June 1 – 20, 2026',
      location: 'Remote',
      description:
        'Completed a three-week internship covering full-stack development and REST API integration.',
      mode: 'builder',
      tags: ['Full-Stack', 'REST APIs', 'Frontend Architecture'],
    },
  ] as ExperienceItem[],
  projects: [
    {
      id: 'sih-2026',
      title: 'SIH 2026 — Problem Statement 26160',
      categoryTag: 'Full-Stack Solution',
      description:
        'Full-stack application deployed on Vercel and Render for Smart India Hackathon 2026.',
      liveUrl: 'https://sih-2026-frontend-eight.vercel.app',
      mode: 'builder',
      badge: 'Smart India Hackathon',
    },
    {
      id: 'qaroo-lms',
      title: 'Qaroo',
      categoryTag: 'Student LMS Platform',
      description:
        'Full-stack learning management application with integrated REST APIs deployed live.',
      liveUrl: 'https://student-lms-vds8.onrender.com/',
      mode: 'builder',
      badge: 'Live Platform',
    },
    {
      id: 'ghost-ai',
      title: 'GHOST',
      categoryTag: 'AI Voice Assistant',
      description:
        'Voice-controlled AI assistant that sends WhatsApp messages and opens websites like Google and YouTube.',
      mode: 'builder',
      badge: 'Voice Automation',
    },
    {
      id: 'education-3d',
      title: 'Education 3D Website',
      categoryTag: 'Interactive 3D Site',
      description:
        'Book-shaped interactive 3D website designed for visual education.',
      mode: 'builder',
      badge: 'Three.js / WebGL',
    },
  ] as ProjectItem[],
  skills: {
    languages: ['Python', 'C', 'Java', 'TypeScript', 'JavaScript', 'HTML & CSS'],
    tools: [
      'ElevenLabs API',
      'Groq API',
      'Antigravity',
      'Docker',
      'Git',
      'VS Code',
    ],
    domains: [
      'Cybersecurity',
      'System Design',
      'IoT',
      'Linux System Administration',
    ],
  },
  credentials: [
    {
      id: 'rh-124',
      title: 'Red Hat System Administration I (RH124, Ver. 10)',
      issuer: 'Red Hat',
      mode: 'security',
    },
    {
      id: 'oracle-java',
      title: 'Oracle Java Foundations (1Z0-811)',
      issuer: 'Oracle',
      mode: 'builder',
    },
    {
      id: 'cisco-iot',
      title: 'Introduction to IoT & Digital Transformation',
      issuer: 'Cisco Networking Academy',
      mode: 'security',
    },
    {
      id: 'aiori-3',
      title: 'AIORI-3 Workshop on Internet Measurements',
      issuer: 'MeitY / NIXI & APNIC Foundation',
      mode: 'security',
    },
    {
      id: 'ec-council',
      title: 'Cybersecurity Workshop (1 CPE)',
      issuer: 'EC-Council',
      mode: 'security',
    },
  ] as CredentialItem[],
  arenas: [
    {
      id: 'sih-arena',
      name: 'Smart India Hackathon (SIH) 2026',
      subtitle: 'National Flagship Innovation Arena',
      mode: 'both',
    },
    {
      id: 'conesta-arena',
      name: 'Conesta Forge 5-Day AI Build Sprint (#33 Leaderboard)',
      subtitle: 'Rapid Solo AI Production',
      mode: 'builder',
    },
    {
      id: 'hacknex-arena',
      name: 'Hacknex Hackathon',
      subtitle: 'Competitive Engineering Sprint',
      mode: 'builder',
    },
    {
      id: 'aurelion-arena',
      name: 'Aurelion Hackathon (24-Hour)',
      subtitle: '24-Hour High-Intensity Endurance Sprint',
      mode: 'both',
    },
    {
      id: 'mindkraft-arena',
      name: 'Mindkraft 2026 (Hashes over Roses 3.0 • Crypto Crime 2.0 • IoT Inferno)',
      subtitle: 'Cybersecurity & IoT Technical Challenges',
      mode: 'security',
    },
  ] as ArenaItem[],
  education: {
    institution: 'Karunya Institute of Technology and Sciences',
    degree: 'B.Tech in Computer Science & Engineering (Cybersecurity)',
    expectedGraduation: 'Expected May 2029',
    cgpa: 'CGPA: 7.06 / 10',
    location: 'Coimbatore, India',
  },
  contact: {
    email: 'allan22kj@gmail.com',
    phone: '+91 93614 09760',
    phoneDisplay: '+91 93614 09760',
    linkedin: 'https://www.linkedin.com/in/allan-k-j-21389838a',
    github: 'https://github.com/ALLAN-KJ',
    sihUrl: 'https://sih-2026-frontend-eight.vercel.app',
  },
};
