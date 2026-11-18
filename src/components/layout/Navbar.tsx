'use client';

import React from 'react';
import { GithubIcon } from '@/src/components/icons/BrandIcons';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0B0B0D]/90 backdrop-blur-md border-b border-[#232329]">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between gap-6">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2 group select-none"
          aria-label="Allan K. J - Home"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#F4F4F6] group-hover:text-white transition-colors">
            Allan K. J
          </span>
          <span className="hidden sm:inline font-mono text-[11px] text-[#9A9AA4]">
            / CS & Cybersecurity
          </span>
        </a>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-wider text-[#9A9AA4]">
          <a
            href="#experience"
            className="hover:text-[#F4F4F6] transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="hover:text-[#F4F4F6] transition-colors"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="hover:text-[#F4F4F6] transition-colors"
          >
            Skills
          </a>
          <a
            href="#certifications"
            className="hover:text-[#F4F4F6] transition-colors"
          >
            Certifications
          </a>
          <a
            href="#contact"
            className="hover:text-[#F4F4F6] transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ALLAN-KJ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-[#9A9AA4] hover:text-[#F4F4F6] transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center px-3.5 py-1.5 rounded border border-[#232329] bg-[#131316] text-[#F4F4F6] hover:bg-[#F4F4F6] hover:text-[#0B0B0D] hover:border-[#F4F4F6] font-mono text-xs font-medium uppercase tracking-wider transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
