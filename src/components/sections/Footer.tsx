'use client';

import React, { useRef, useState } from 'react';
import { RESUME_DATA } from '@/src/data/resumeData';
import { Mail, Phone, ArrowUpRight, ArrowUp, Globe, Check } from 'lucide-react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const curvePathRef = useRef<SVGPathElement | null>(null);
  const lenis = useLenis();
  const { contact } = RESUME_DATA;
  const [copied, setCopied] = useState(false);

  // GSAP Curved Footer Curtain Reveal
  useGSAP(
    () => {
      if (!footerRef.current) return;

      const curtainTL = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'top 25%',
          scrub: 0.8,
        },
      });

      // 1. Rising curtain slide-up
      curtainTL.fromTo(
        footerRef.current,
        { yPercent: 20 },
        { yPercent: 0, ease: 'none' },
        0
      );

      // 2. Animated curved top edge that flattens out as it reaches viewport top
      if (curvePathRef.current) {
        curtainTL.fromTo(
          curvePathRef.current,
          {
            attr: { d: 'M0,0 C480,120 960,120 1440,0 L1440,0 L0,0 Z' },
          },
          {
            attr: { d: 'M0,0 C480,0 960,0 1440,0 L1440,0 L0,0 Z' },
            ease: 'none',
          },
          0
        );
      }
    },
    { scope: footerRef }
  );

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    navigator.clipboard?.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      data-cursor-invert="true"
      className="relative w-full overflow-hidden bg-[#D19A4C] text-[#0A0C10] z-20 will-change-transform"
    >
      {/* Top Center Flow Anchor */}
      <div
        data-flow-anchor="footer-top"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 pointer-events-none z-30"
      />

      {/* Anchor alias for #connect */}
      <div id="connect" className="sr-only" />

      {/* Curved SVG Top Transition: Flattens as footer rises */}
      <div className="w-full overflow-hidden leading-none -mt-1 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-12 sm:h-20 md:h-28 text-[#0A0C10]"
          preserveAspectRatio="none"
        >
          <path
            ref={curvePathRef}
            d="M0,0 C480,120 960,120 1440,0 L1440,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 pb-12 sm:pb-16 flex flex-col justify-between min-h-[70vh]">
        {/* Top Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-[#0A0C10]/80 border-b border-[#0A0C10]/20 pb-6">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#0A0C10]" />
            <span>START A CONVERSATION</span>
          </div>
          <div>COIMBATORE &bull; TAMIL NADU &bull; REMOTE WORLDWIDE</div>
        </div>

        {/* Giant Anton Display Headline */}
        <div className="my-10 sm:my-16">
          <h2 className="font-anton text-[15vw] sm:text-[13vw] leading-[0.82] uppercase tracking-tighter text-[#0A0C10] select-none">
            LET'S CONNECT
          </h2>
          <p className="font-mono text-sm sm:text-base text-[#0A0C10]/85 uppercase tracking-wide mt-4 max-w-xl font-medium">
            Available for Enterprise IT Security Operations, Full-Stack Engineering roles, and collaborative AI sprints.
          </p>
        </div>

        {/* Magnetic Action Pills */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-16">
          {/* Email with copy-to-clipboard feedback */}
          <a
            href={`mailto:${contact.email}`}
            onClick={handleCopyEmail}
            data-cursor="MAIL"
            className="group flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-[#0A0C10]/10 hover:bg-[#0A0C10] border border-[#0A0C10]/30 hover:border-[#0A0C10] text-[#0A0C10] hover:text-[#D19A4C] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-700" />
                <span className="text-green-800">COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </>
            )}
          </a>

          {/* Phone */}
          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            data-cursor="CALL"
            className="group flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-[#0A0C10]/10 hover:bg-[#0A0C10] border border-[#0A0C10]/30 hover:border-[#0A0C10] text-[#0A0C10] hover:text-[#D19A4C] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            <Phone className="w-4 h-4" />
            <span>{contact.phoneDisplay}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* LinkedIn (Exact URL) */}
          <a
            href="https://www.linkedin.com/in/allan-k-j-21389838a"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="LINKEDIN"
            className="group flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-[#0A0C10]/10 hover:bg-[#0A0C10] border border-[#0A0C10]/30 hover:border-[#0A0C10] text-[#0A0C10] hover:text-[#D19A4C] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* GitHub */}
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            className="group flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-[#0A0C10]/10 hover:bg-[#0A0C10] border border-[#0A0C10]/30 hover:border-[#0A0C10] text-[#0A0C10] hover:text-[#D19A4C] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
            </svg>
            <span>GITHUB</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* SIH Live Demo */}
          <a
            href={contact.sihUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="LIVE"
            className="group flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-[#0A0C10]/10 hover:bg-[#0A0C10] border border-[#0A0C10]/30 hover:border-[#0A0C10] text-[#0A0C10] hover:text-[#D19A4C] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            <Globe className="w-4 h-4" />
            <span>sih-2026-frontend-eight.vercel.app</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-[#0A0C10]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#0A0C10]/80">
          <div>
            &copy; {new Date().getFullYear()} ALLAN K. J &bull; DESIGNED WITH LANDO NORRIS SPEED ARCHITECTURE
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="TOP"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0C10] text-[#D19A4C] hover:bg-[#0A0C10]/90 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
