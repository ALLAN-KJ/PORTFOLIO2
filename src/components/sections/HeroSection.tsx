'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/src/components/icons/BrandIcons';

const Centerpiece3D = dynamic(
  () => import('@/src/components/canvas/Centerpiece3D'),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[380px]" /> }
);

export default function HeroSection() {
  const [wireframe, setWireframe] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('allan22kj@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (55% width on desktop) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131316] border border-[#232329] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
            <span className="text-xs font-mono text-[#9A9AA4]">Available for internships</span>
          </div>

          {/* Name & Academic Title */}
          <div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F4F6] uppercase leading-[0.95]">
              ALLAN K. J
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#F4F4F6] font-medium leading-snug">
              B.Tech Computer Science & Engineering (Cybersecurity) · Karunya Institute of Technology and Sciences
            </p>
          </div>

          {/* Location & Academic Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-mono text-[#9A9AA4]">
            <span>Coimbatore, India</span>
            <span className="text-[#363640]">·</span>
            <span>Expected May 2029</span>
            <span className="text-[#363640]">·</span>
            <span className="text-[#F4F4F6]">CGPA 7.06 / 10</span>
          </div>

          {/* 1-Sentence Factual Summary */}
          <p className="text-sm sm:text-base text-[#9A9AA4] leading-relaxed max-w-xl">
            Second-year CSE student focused on enterprise IT security, Linux administration, and full-stack web engineering.
          </p>

          {/* Direct Outlets */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={copyEmail}
              className="px-4 py-2 rounded bg-[#F4F4F6] text-[#0B0B0D] text-xs font-mono font-medium hover:bg-white transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'allan22kj@gmail.com'}</span>
            </button>

            <a
              href="tel:+919361409760"
              className="px-3.5 py-2 rounded bg-[#131316] border border-[#232329] hover:border-[#363640] text-[#F4F4F6] text-xs font-mono transition-colors"
            >
              +91 93614 09760
            </a>

            <a
              href="https://github.com/ALLAN-KJ"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-[#131316] border border-[#232329] hover:border-[#363640] text-[#9A9AA4] hover:text-[#F4F4F6] transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/allan-k-j-21389838a"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-[#131316] border border-[#232329] hover:border-[#363640] text-[#9A9AA4] hover:text-[#F4F4F6] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column (45% width on desktop) — Scoped 3D Viewport */}
        <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[420px] lg:h-[480px] bg-[#131316] border border-[#232329] rounded-lg overflow-hidden flex flex-col justify-between p-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#9A9AA4] z-10">
            <span>3D Model View</span>
            <button
              onClick={() => setWireframe((prev) => !prev)}
              className="px-2.5 py-1 rounded bg-[#18181D] border border-[#232329] hover:border-[#363640] text-[#F4F4F6] transition-colors"
            >
              {wireframe ? 'Solid' : 'Wireframe'}
            </button>
          </div>

          <div className="flex-1 w-full h-full">
            <Centerpiece3D wireframe={wireframe} />
          </div>

          <div className="text-[11px] font-mono text-[#6B6B76] text-center z-10 pointer-events-none">
            Drag to rotate 360°
          </div>
        </div>
      </div>
    </section>
  );
}

