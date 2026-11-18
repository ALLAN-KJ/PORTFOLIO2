'use client';

import React from 'react';

const SKILL_GROUPS = [
  {
    category: 'Languages',
    items: ['Python', 'C', 'Java', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    category: 'APIs & Tools',
    items: ['ElevenLabs API', 'Groq API', 'Antigravity', 'Docker', 'Git', 'VS Code'],
  },
  {
    category: 'Domains',
    items: ['Cybersecurity', 'System Design', 'IoT', 'Linux System Administration'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F6]">
          Skills
        </h2>

        <div className="flex flex-col gap-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="studio-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <span className="text-sm font-mono font-medium text-[#F4F4F6] shrink-0 w-44">
                {group.category}
              </span>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded bg-[#18181D] border border-[#232329] text-xs font-mono text-[#F4F4F6]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

