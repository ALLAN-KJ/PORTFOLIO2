'use client';

import React from 'react';

const EXPERIENCES = [
  {
    company: 'ZF Group (ZF Friedrichshafen AG)',
    role: 'IT Security & Networking Intern',
    period: 'June – July 2026',
    location: 'Coimbatore',
    description:
      'Worked with enterprise IT security operations, executed annual password reset maintenance, and configured Apple A16 iPads for deployment.',
  },
  {
    company: 'Conesta Forge (powered by Fludigo)',
    role: '5-Day AI Build Sprint',
    period: 'June 2026',
    location: 'Remote',
    description:
      'Built and shipped Tool Finder solo from scratch in five days, finishing #33 on the leaderboard with a score of 1,391.',
  },
  {
    company: 'Qaroo',
    role: 'Software Intern',
    period: 'June 2026',
    location: 'Remote',
    description:
      'Built full-stack web features and REST API integrations over a three-week sprint.',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F6]">
          Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.company}
              className="studio-card p-6 flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <h3 className="text-base font-semibold text-[#F4F4F6]">{exp.company}</h3>
                  <p className="text-xs font-mono text-[#9A9AA4] mt-0.5">{exp.role}</p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#6B6B76]">
                  <span>{exp.period}</span>
                  <span>·</span>
                  <span>{exp.location}</span>
                </div>

                <p className="text-sm text-[#9A9AA4] leading-relaxed mt-2">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

