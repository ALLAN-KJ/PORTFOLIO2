export interface Project {
  id: string;
  index: string;
  title: string;
  tag: string;
  status: 'DEPLOYED' | 'IN PROGRESS';
  description: string;
  stack: string[];
  liveUrl?: string;
  metrics?: string;
}

export interface Experience {
  id: string;
  index: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: 'In-Person' | 'Remote';
  description: string;
  bullets: string[];
  tags: string[];
  score?: string;
}

export interface Credential {
  id: string;
  index: string;
  title: string;
  issuer: string;
  date?: string;
  grade?: string;
  badge: string;
}

export interface Hackathon {
  name: string;
  event: string;
  highlight?: string;
}

export const TELEMETRY_DATA = {
  hero: {
    callsign: 'URK25CS6018',
    name: 'ALLAN K. J',
    firstName: 'ALLAN',
    lastName: 'K. J',
    status: 'SYS: OPTIMAL // 60FPS',
    role: 'Second-Year B.Tech Computer Science & Engineering Student',
    specialisation: 'Cybersecurity Specialisation',
    institution: 'Karunya Institute of Technology and Sciences',
    location: 'Coimbatore, Tamil Nadu, India',
    expectedGrad: 'Expected May 2029',
    cgpa: '7.06 / 10',
    links: {
      portfolio: 'https://allan-portfolioo.vercel.app',
      portfolioLabel: 'allan-portfolioo.vercel.app',
      github: 'https://github.com/ALLAN-KJ',
      githubLabel: 'github.com/ALLAN-KJ',
      linkedin: 'https://linkedin.com/in/allan-k-j-21389838a',
      linkedinLabel: 'linkedin.com/in/allan-k-j-21389838a',
      email: 'allan22kj@gmail.com',
      phone: '+91 93614 09760',
    },
    bio: 'Second-year cybersecurity engineering undergraduate building at the intersection of enterprise defensive operations, distributed infrastructure, and high-performance spatial interfaces.',
  },

  stack: {
    languages: [
      { name: 'Python', level: 'ADVANCED', telemetry: 'SYS_PY_3.12' },
      { name: 'TypeScript', level: 'PRIMARY', telemetry: 'SYS_TS_5.7' },
      { name: 'JavaScript', level: 'HIGH', telemetry: 'SYS_JS_ES2026' },
      { name: 'C', level: 'CORE', telemetry: 'SYS_GCC_POSIX' },
      { name: 'Java', level: 'CERTIFIED', telemetry: 'SYS_JDK_21' },
      { name: 'HTML5', level: 'STANDARD', telemetry: 'DOM_SEMANTIC' },
      { name: 'CSS3', level: 'HARDWARE-ACCEL', telemetry: 'COMPOSITOR' },
    ],
    toolsAndAPIs: [
      { name: 'ElevenLabs API', category: 'Voice Synthesis & Neural Audio' },
      { name: 'Groq API', category: 'LPU Ultra-Low Latency Inference' },
      { name: 'Antigravity', category: 'Agentic Tooling & System Orchestration' },
      { name: 'Docker', category: 'Containerization & Isolation' },
      { name: 'Git', category: 'Distributed Version Control' },
      { name: 'VS Code', category: 'Primary IDE & Debugging Runtime' },
    ],
    domains: [
      { name: 'Cybersecurity', desc: 'Enterprise IT defense, credential lifecycle, threat hardening' },
      { name: 'System Design', desc: 'Fault-tolerant architecture, modular API boundaries' },
      { name: 'IoT Systems', desc: 'Embedded sensor networks & connected telemetry' },
      { name: 'Linux SysAdmin', desc: 'Red Hat Enterprise Linux, POSIX automation, permissions' },
    ],
  },

  experience: [
    {
      id: 'zf-group',
      index: '01',
      company: 'ZF Group (ZF Friedrichshafen AG)',
      role: 'IT Security & Networking Intern',
      period: 'June 2 – July 3, 2026',
      location: 'Coimbatore, India',
      type: 'In-Person',
      description: 'Hands-on enterprise IT security and fleet networking operations at a Tier-1 global automotive leader.',
      bullets: [
        'Executed enterprise IT security operations and monitored corporate network nodes.',
        'Managed yearly enterprise credential and password reset security cycles.',
        'Configured and deployed Apple A16 iPad hardware fleets according to strict enterprise MDM policies.',
      ],
      tags: ['IT Security', 'Enterprise Networking', 'Fleet MDM', 'Automotive IT'],
    },
    {
      id: 'conesta-forge',
      index: '02',
      company: 'Conesta Forge (powered by Fludigo)',
      role: '5-Day AI Build Sprint',
      period: 'June 21 – 26, 2026',
      location: 'Remote',
      type: 'Remote',
      score: '1,391 FORGE SCORE // #33 ON LEADERBOARD',
      description: 'Solo-developed and deployed "Tool Finder" from a blank repository to verified production within 5 days.',
      bullets: [
        'Designed full architecture, API pipelines, and interactive UI independently under intense deadline.',
        'Shipped production service earning 1,391 Forge Score, ranking #33 on the global builder leaderboard.',
      ],
      tags: ['Solo Build', 'Rank #33', 'Leaderboard 1391', 'AI Sprint'],
    },
    {
      id: 'qaroo',
      index: '03',
      company: 'Qaroo',
      role: 'Software Intern',
      period: 'June 1 – 20, 2026',
      location: 'Remote',
      type: 'Remote',
      description: 'Three-week intensive full-stack development and third-party REST API integration sprint.',
      bullets: [
        'Engineered responsive full-stack features and student LMS interfaces.',
        'Connected secure REST API endpoints with robust error boundaries and state persistence.',
      ],
      tags: ['Full-Stack', 'REST APIs', 'LMS Platform', 'State Architecture'],
    },
  ] as Experience[],

  projects: [
    {
      id: 'sih-2026',
      index: '01',
      title: 'Smart India Hackathon 2026',
      tag: 'PS 26160 // NATIONAL FINALIST',
      status: 'DEPLOYED',
      description:
        'Full-stack national competition solution tackling Ministry Problem Statement 26160 with dual-cloud architecture.',
      stack: ['Next.js', 'TypeScript', 'Render Backend', 'Vercel Edge', 'REST API'],
      liveUrl: 'https://sih-2026-frontend-eight.vercel.app',
      metrics: 'Dual-Cloud (Vercel + Render)',
    },
    {
      id: 'portfolio-3d',
      index: '02',
      title: 'Personal 3D Portfolio',
      tag: '60FPS WEBGL SHOWCASE',
      status: 'DEPLOYED',
      description:
        'Telemetry-inspired interactive showcase combining GPU-composited horizontal tracking and real-time Three.js R3F shaders.',
      stack: ['Next.js', 'React Three Fiber', 'GSAP ScrollTrigger', 'Lenis', 'Tailwind'],
      liveUrl: 'https://allan-portfolioo.vercel.app',
      metrics: '60FPS // WebGL 2.0',
    },
    {
      id: 'ghost-assistant',
      index: '03',
      title: 'GHOST — AI Voice Assistant',
      tag: 'SYSTEM AUTOMATION // IN PROGRESS',
      status: 'IN PROGRESS',
      description:
        'Desktop voice-activated assistant automating real-time WhatsApp messaging, browser tab orchestration, and system queries.',
      stack: ['Python', 'ElevenLabs API', 'Groq LPU', 'Browser Automation', 'Voice Engine'],
      metrics: 'Ultra-low Latency Inference',
    },
    {
      id: 'education-3d',
      index: '04',
      title: 'Education 3D Learning Portal',
      tag: 'SPATIAL LEARNING // IN PROGRESS',
      status: 'IN PROGRESS',
      description:
        'Interactive book-geometry WebGL interface transforming structured curricula into interactive, spatial 3D learning volumes.',
      stack: ['Three.js', 'GLSL Shaders', 'React', 'Spatial UI', 'Physics Rig'],
      metrics: 'Procedural Book Geometry',
    },
  ] as Project[],

  credentials: [
    {
      id: 'rh124',
      index: '01',
      title: 'System Administration I (RH124, Ver. 10)',
      issuer: 'Red Hat',
      badge: 'ENTERPRISE LINUX',
    },
    {
      id: 'java-foundations',
      index: '02',
      title: 'Java Foundations (1Z0-811)',
      issuer: 'Oracle',
      badge: 'CERTIFIED ASSOCIATE',
    },
    {
      id: 'cisco-iot',
      index: '03',
      title: 'Introduction to IoT and Digital Transformation',
      issuer: 'Cisco Networking Academy',
      badge: 'IOT & NETWORKS',
    },
    {
      id: 'ec-council',
      index: '04',
      title: 'Cybersecurity Workshop (1 CPE Credit)',
      issuer: 'EC-Council',
      badge: 'SECURITY CPE',
    },
    {
      id: 'aiori-3',
      index: '05',
      title: 'AIORI-3 Workshop on Internet Measurements',
      issuer: 'MeitY / NIXI & APNIC Foundation',
      date: 'Sept 8, 2026',
      badge: 'INTERNET ARCHITECTURE',
    },
    {
      id: 'nptel-social-media',
      index: '06',
      title: 'Privacy and Security in Online Social Media',
      issuer: 'NPTEL (IIIT Hyderabad)',
      grade: '67% Elite Score',
      badge: 'IIIT HYDERABAD',
    },
  ] as Credential[],

  hackathons: [
    {
      name: 'Smart India Hackathon (SIH) 2026',
      event: 'Problem Statement 26160',
      highlight: 'National Stage Solution',
    },
    {
      name: 'Conesta Forge',
      event: '5-Day Global AI Build Sprint',
      highlight: 'Rank #33 · 1,391 Forge Score',
    },
    {
      name: 'Aurelion 24-Hour Hackathon',
      event: 'Rapid Prototyping Sprint',
      highlight: 'Full-Stack Deployment',
    },
    {
      name: 'Hacknex Hackathon',
      event: 'Cybersecurity & Defense Track',
      highlight: 'Security Challenge Finalist',
    },
    {
      name: 'Mindkraft 2026',
      event: 'Hashes over Roses 3.0 · Crypto Crime 2.0 · IoT Inferno',
      highlight: 'Triple Arena Competitor',
    },
  ] as Hackathon[],

  cliCommands: {
    help: 'Available commands: whoami, stack, experience, projects, certs, explode, livery <volt|stealth|forge|wire>, clear',
    whoami:
      'ALLAN K. J // URK25CS6018 — Second-Year Cybersecurity Undergrad at Karunya Univ (CGPA 7.06). Builder across enterprise IT security and 60fps WebGL systems.',
    stack:
      'CORE: Python, TypeScript, C, Java, HTML5, CSS3, Docker, Linux, ElevenLabs, Groq API, Antigravity.',
    experience:
      '[1] ZF Group (IT Security & Networking Intern) | [2] Conesta Forge (AI Build Sprint #33) | [3] Qaroo (Software Intern)',
    projects:
      '[1] SIH 2026 PS 26160 | [2] 3D Portfolio WebGL | [3] GHOST Voice AI Assistant | [4] Education 3D Web',
    certs:
      'Red Hat RH124 | Oracle Java 1Z0-811 | Cisco IoT | EC-Council CPE | MeitY/APNIC AIORI-3 | NPTEL IIIT Hyderabad (67%)',
  },
} as const;

