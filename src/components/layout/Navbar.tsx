'use client';

import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 py-3.5 backdrop-blur-xl bg-[#0A0C10]/85 border-b border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Monogram */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-baseline gap-1.5 group select-none"
            aria-label="Allan K. J - Home"
          >
            <span className="font-anton text-2xl tracking-wide text-[#F4F4EE] group-hover:text-[#D19A4C] transition-colors">
              ALLAN K. J
            </span>
          </a>
        </div>

        {/* Right: Section Anchor Links & Contact Action */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#8A8F9E]">
            <a
              href="#experience"
              className="hover:text-[#D19A4C] transition-colors"
            >
              EXPERIENCE
            </a>
            <a
              href="#projects"
              className="hover:text-[#D19A4C] transition-colors"
            >
              PROJECTS
            </a>
            <a
              href="#credentials"
              className="hover:text-[#D19A4C] transition-colors"
            >
              CREDENTIALS
            </a>
          </nav>

          <a
            href="https://github.com/ALLAN-KJ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-[#8A8F9E] hover:text-[#D19A4C] transition-colors"
            aria-label="GitHub Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
            </svg>
            <span className="hidden sm:inline">GITHUB</span>
          </a>

          <a
            href="#contact"
            className="flex items-center px-4 py-1.5 rounded-full border border-[#D19A4C] text-[#D19A4C] hover:bg-[#D19A4C] hover:text-[#0A0C10] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-[0_0_12px_rgba(209,154,76,0.15)]"
          >
            <span>CONNECT</span>
          </a>
        </div>
      </div>
    </header>
  );
}
