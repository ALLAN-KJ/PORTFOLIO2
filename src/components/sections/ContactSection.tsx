'use client';

import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/src/components/icons/BrandIcons';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('allan22kj@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="reveal-section w-full py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <h2 className="reveal-heading font-display text-2xl sm:text-3xl font-bold text-[#F4F4F6]">
          Contact
        </h2>

        <div className="reveal-card studio-card p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#363640] transition-colors duration-300 focus-within:shadow-[0_0_0_1px_#363640]">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-[#9A9AA4]">Email</span>
            <div className="flex items-center gap-3">
              <a
                href="mailto:allan22kj@gmail.com"
                className="text-lg font-mono font-medium text-[#F4F4F6] hover:opacity-70 transition-opacity"
              >
                allan22kj@gmail.com
              </a>
              <button
                onClick={copyEmail}
                className="p-1.5 rounded studio-card text-[#9A9AA4] hover:text-[#F4F4F6] transition-colors"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-[#F4F4F6]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-[#9A9AA4]">Phone</span>
            <a
              href="tel:+919361409760"
              className="text-lg font-mono font-medium text-[#F4F4F6] hover:opacity-70 transition-opacity"
            >
              +91 93614 09760
            </a>
          </div>

          <div className="flex items-center gap-3 pt-2 md:pt-0">
            <a
              href="https://github.com/ALLAN-KJ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded studio-card text-xs font-mono text-[#F4F4F6] hover:border-[#4A4A54] transition-colors flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9A9AA4]" />
            </a>

            <a
              href="https://www.linkedin.com/in/allan-k-j-21389838a"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded studio-card text-xs font-mono text-[#F4F4F6] hover:border-[#4A4A54] transition-colors flex items-center gap-2"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9A9AA4]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
