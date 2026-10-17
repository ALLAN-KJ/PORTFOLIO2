'use client';

import React from 'react';
import { RESUME_DATA } from '@/src/data/resumeData';
import { GraduationCap, Award, MapPin, Calendar } from 'lucide-react';

export default function Education() {
  const { education } = RESUME_DATA;

  return (
    <section id="education" className="relative py-16 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto z-10">
      <div
        id="education-card"
        className="p-8 sm:p-10 rounded-2xl bg-[#0E1117]/95 border border-white/10 backdrop-blur-md hover:border-[#D19A4C]/60 transition-all duration-300 relative z-10 overflow-hidden shadow-2xl"
      >
        {/* Subtle Ambient Gold Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#D19A4C]/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          {/* Left: Degree & Institution */}
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-[#0A0C10] border border-white/10 flex items-center justify-center text-[#D19A4C] shrink-0 shadow-inner">
              <GraduationCap className="w-6 sm:w-7 h-6 sm:h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#D19A4C] uppercase tracking-widest mb-1.5 font-bold">
                <span>UNDERGRADUATE ACADEMICS</span>
              </div>
              <h3 className="font-anton text-2xl sm:text-3xl text-[#F4F4EE] uppercase tracking-wide">
                {education.institution}
              </h3>
              <p className="text-sm sm:text-base text-[#8A8F9E] mt-1 font-medium">
                {education.degree}
              </p>
            </div>
          </div>

          {/* Right: Architectural Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8 font-mono text-xs">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0A0C10] border border-white/10">
              <Calendar className="w-4 h-4 text-[#D19A4C]" />
              <span className="text-[#F4F4EE] font-semibold">{education.expectedGraduation}</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0A0C10] border border-[#D19A4C]/40 text-[#D19A4C] shadow-[0_0_15px_rgba(209,154,76,0.15)] font-bold">
              <Award className="w-4 h-4" />
              <span>{education.cgpa}</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0A0C10] border border-white/10 text-[#8A8F9E]">
              <MapPin className="w-4 h-4 text-[#D19A4C]" />
              <span>{education.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
