'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    title: 'Smart India Hackathon 2026 — PS 26160',
    status: 'Live',
    url: 'https://sih-2026-frontend-eight.vercel.app',
    description: 'Full-stack web application deployed on Vercel and Render.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Vercel', 'Render'],
  },
  {
    title: '3D Interactive Portfolio',
    status: 'Live',
    url: 'https://allan-portfolioo.vercel.app',
    description: 'Scroll-linked WebGL portfolio built with Next.js, TypeScript, React Three Fiber, GSAP, and Lenis.',
    stack: ['React Three Fiber', 'Three.js', 'GSAP', 'Lenis', 'Tailwind CSS'],
  },
  {
    title: 'GHOST — AI Voice Assistant',
    status: 'In Progress',
    url: null,
    description: 'Desktop voice assistant that sends WhatsApp messages and automates browser navigation.',
    stack: ['Python', 'ElevenLabs API', 'Groq API', 'Automation'],
  },
  {
    title: 'Education-Themed 3D Website',
    status: 'In Progress',
    url: null,
    description: 'Interactive 3D book-shaped web interface built for structured learning.',
    stack: ['Three.js', 'Next.js', 'TypeScript', 'Procedural Mesh'],
  },
];

interface Section04ProjectsPinnedProps {
  lenis: Lenis | null;
}

export default function Section04ProjectsPinned({ lenis }: Section04ProjectsPinnedProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const activeProjectRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const paddingRight = Math.max(window.innerWidth * 0.1, 80);
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + paddingRight);

      const st = ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
        start: 'top top',
        end: () => '+=' + Math.abs(getScrollAmount()),
        onUpdate: (self) => {
          const total = PROJECTS.length;
          const idx = Math.min(Math.floor(self.progress * total), total - 1);
          if (idx !== activeProjectRef.current) {
            activeProjectRef.current = idx;
            if (counterRef.current) {
              counterRef.current.textContent = `0${idx + 1} / 0${total}`;
            }
            if (prevBtnRef.current) {
              prevBtnRef.current.disabled = idx === 0;
              prevBtnRef.current.style.opacity = idx === 0 ? '0.3' : '1';
            }
            if (nextBtnRef.current) {
              nextBtnRef.current.disabled = idx === total - 1;
              nextBtnRef.current.style.opacity = idx === total - 1 ? '0.3' : '1';
            }
          }
          gsap.set(track, {
            x: self.progress * getScrollAmount(),
            overwrite: 'auto',
          });
        },
      });

      scrollTriggerRef.current = st;

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(track);

      return () => {
        resizeObserver.disconnect();
        st.kill();
        scrollTriggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, [isMobile]);

  // Forward horizontal trackpad swipes into Lenis
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
        const st = scrollTriggerRef.current;
        if (st && st.isActive && lenis) {
          e.preventDefault();
          const targetY = window.scrollY + e.deltaX * 1.5;
          lenis.scrollTo(targetY, { duration: 0.3 });
        }
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleWheel);
  }, [lenis, isMobile]);

  const navigateCard = useCallback(
    (direction: 'prev' | 'next') => {
      const st = scrollTriggerRef.current;
      if (!st || !lenis) return;

      const total = PROJECTS.length;
      let targetIdx = direction === 'next' ? activeProjectRef.current + 1 : activeProjectRef.current - 1;
      targetIdx = Math.max(0, Math.min(targetIdx, total - 1));

      const start = st.start;
      const end = st.end;
      const progressFraction = targetIdx / (total - 1);
      const targetScrollY = start + (end - start) * progressFraction;

      lenis.scrollTo(targetScrollY, { duration: 0.8 });
    },
    [lenis]
  );

  // Attach native click listeners to bypass synthetic event suppression
  useEffect(() => {
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    if (!prevBtn || !nextBtn) return;

    prevBtn.disabled = true;

    const handlePrev = () => {
      if (prevBtn.disabled) return;
      navigateCard('prev');
    };
    const handleNext = () => {
      if (nextBtn.disabled) return;
      navigateCard('next');
    };

    prevBtn.addEventListener('click', handlePrev);
    nextBtn.addEventListener('click', handleNext);

    return () => {
      prevBtn.removeEventListener('click', handlePrev);
      nextBtn.removeEventListener('click', handleNext);
    };
  }, [navigateCard]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-16"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between pb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F6]">
          Projects
        </h2>

        {!isMobile && (
          <div className="flex items-center gap-3">
            <span ref={counterRef} className="text-xs font-mono text-[#9A9AA4]">
              01 / 0{PROJECTS.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                ref={prevBtnRef}
                style={{ opacity: 0.3 }}
                className="p-1.5 rounded studio-card text-[#F4F4F6] hover:border-[#363640] transition-all cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                ref={nextBtnRef}
                className="p-1.5 rounded studio-card text-[#F4F4F6] hover:border-[#363640] transition-all cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative w-full overflow-hidden">
        {!isMobile ? (
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 pl-6 md:pl-12 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {PROJECTS.map((proj, idx) => (
              <div
                key={proj.title}
                className="w-[80vw] max-w-[460px] shrink-0 studio-card p-6 flex flex-col justify-between"
                style={{ minHeight: '340px' }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#6B6B76]">
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded border ${
                        proj.status === 'Live'
                          ? 'border-[#232329] text-[#F4F4F6]'
                          : 'border-[#232329] text-[#9A9AA4]'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#F4F4F6] leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-[#9A9AA4] leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#232329] mt-4 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-[#18181D] border border-[#232329] text-[11px] font-mono text-[#9A9AA4]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between text-xs font-mono text-[#F4F4F6] hover:text-white transition-colors pt-1"
                    >
                      <span>Visit deployment</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#9A9AA4]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-4 px-6 overflow-x-auto snap-x-mandatory pb-4">
            {PROJECTS.map((proj, idx) => (
              <div
                key={proj.title}
                className="w-[82vw] shrink-0 snap-center studio-card p-5 flex flex-col justify-between"
                style={{ minHeight: '320px' }}
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#6B6B76]">0{idx + 1}</span>
                    <span className="text-xs font-mono text-[#9A9AA4]">{proj.status}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F4F6]">{proj.title}</h3>
                  <p className="text-xs text-[#9A9AA4] leading-relaxed">{proj.description}</p>
                </div>

                <div className="pt-3 border-t border-[#232329] mt-3 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-1">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 rounded bg-[#18181D] text-[10px] font-mono text-[#9A9AA4]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between text-xs font-mono text-[#F4F4F6] pt-1"
                    >
                      <span>Visit deployment</span>
                      <ExternalLink className="w-3 h-3 text-[#9A9AA4]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
