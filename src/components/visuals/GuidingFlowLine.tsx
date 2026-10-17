'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnchorPoint {
  id: string;
  x: number;
  y: number;
}

export default function GuidingFlowLine() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const basePathRef = useRef<SVGPathElement | null>(null);
  const haloPathRef = useRef<SVGPathElement | null>(null);
  const corePathRef = useRef<SVGPathElement | null>(null);
  const orbRef = useRef<SVGCircleElement | null>(null);
  const orbPulseRef = useRef<SVGCircleElement | null>(null);

  const [pathD, setPathD] = useState<string>('');
  const [docHeight, setDocHeight] = useState<number>(9500);
  const [anchorNodes, setAnchorNodes] = useState<{ x: number; y: number }[]>([]);

  // Keep ref to anchor lengths and points for fast 60fps scroll loop
  const anchorDataRef = useRef<{
    pts: AnchorPoint[];
    lengths: number[];
    totalLength: number;
  }>({
    pts: [],
    lengths: [],
    totalLength: 0,
  });

  // =========================================================================
  // STEP 1 & 2: Measure Real Document Anchor Coordinates & Build Connected Path
  // =========================================================================
  useEffect(() => {
    const measureAndBuildCircuit = () => {
      const mainEl = document.querySelector('main');
      if (!mainEl) return;

      const docH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        mainEl.scrollHeight,
        window.innerHeight * 5
      );
      setDocHeight(docH);

      const mainRect = mainEl.getBoundingClientRect();
      const centerX = mainRect.width * 0.5;

      const getAnchor = (id: string, fallbackX: number, fallbackY: number): AnchorPoint => {
        const el = document.querySelector(`[data-flow-anchor="${id}"]`);
        if (!el) return { id, x: fallbackX, y: fallbackY };
        const rect = el.getBoundingClientRect();
        return {
          id,
          x: rect.left - mainRect.left + rect.width * 0.5,
          y: rect.top - mainRect.top + rect.height * 0.5,
        };
      };

      // Query all anchor points in physical sequence
      const p_hb = getAnchor('hero-bottom', centerX, 920);
      const p_ehr = getAnchor('exp-header-right', centerX + 400, 1400);
      const p_ehl = getAnchor('exp-header-left', Math.max(48, (mainRect.width - 1280) * 0.5 + 40), 1400);
      const p_eb = getAnchor('exp-bottom', p_ehl.x, 2200);
      const p_pe = getAnchor('proj-entry', p_ehl.x, 2600);
      const p_px = getAnchor('proj-exit', Math.min(mainRect.width - 48, (mainRect.width - 1280) * 0.5 + 1240), 5500);
      const p_slr = getAnchor('skills-line-right', p_px.x, 5700);
      const p_sll = getAnchor('skills-line-left', p_ehl.x, 5700);
      const p_ct = getAnchor('cred-top', centerX, 6800);
      const p_cb = getAnchor('cred-bottom', centerX, 7600);
      const p_ft = getAnchor('footer-top', centerX, 8400);

      const pts: AnchorPoint[] = [
        p_hb,
        p_ehr,
        p_ehl,
        p_eb,
        p_pe,
        p_px,
        p_slr,
        p_sll,
        p_ct,
        p_cb,
        p_ft,
      ];

      setAnchorNodes(pts.map((p) => ({ x: p.x, y: p.y })));

      // -----------------------------------------------------------------------
      // Construct smooth connected orthogonal-bezier circuit:
      // 1. hero-bottom -> exp-header-right (curves down through marquee ribbon)
      // 2. exp-header-right -> exp-header-left (straight horizontal line on header divider)
      // 3. exp-header-left -> exp-bottom (straight down left gutter outside cards)
      // 4. exp-bottom -> proj-entry (smooth entry into horizontal track)
      // 5. proj-entry -> proj-exit (horizontal glide track behind projects)
      // 6. proj-exit -> skills-line-right (drops into right end of skills divider)
      // 7. skills-line-right -> skills-line-left (straight horizontal line on skills divider)
      // 8. skills-line-left -> cred-top (smooth curve into center T-junction)
      // 9. cred-top -> cred-bottom (straight down empty center gap between columns)
      // 10. cred-bottom -> footer-top (straight down center spine into gold footer)
      // -----------------------------------------------------------------------
      const midY_hero_exp = (p_hb.y + p_ehr.y) * 0.5;
      const midY_exp_proj = (p_eb.y + p_pe.y) * 0.5;
      const midY_proj = (p_pe.y + p_px.y) * 0.5;
      const midY_proj_skills = (p_px.y + p_slr.y) * 0.5;
      const midY_skills_cred = (p_sll.y + p_ct.y) * 0.5;

      const d = `
        M ${p_hb.x} ${p_hb.y}
        C ${p_hb.x} ${midY_hero_exp}, ${p_ehr.x} ${midY_hero_exp}, ${p_ehr.x} ${p_ehr.y}
        L ${p_ehl.x} ${p_ehl.y}
        L ${p_ehl.x} ${p_eb.y}
        C ${p_ehl.x} ${midY_exp_proj}, ${p_pe.x} ${midY_exp_proj}, ${p_pe.x} ${p_pe.y}
        C ${p_pe.x} ${midY_proj}, ${p_px.x} ${midY_proj}, ${p_px.x} ${p_px.y}
        C ${p_px.x} ${midY_proj_skills}, ${p_slr.x} ${midY_proj_skills}, ${p_slr.x} ${p_slr.y}
        L ${p_sll.x} ${p_sll.y}
        C ${p_sll.x} ${midY_skills_cred}, ${p_ct.x} ${midY_skills_cred}, ${p_ct.x} ${p_ct.y}
        L ${p_cb.x} ${p_cb.y}
        L ${p_ft.x} ${p_ft.y}
      `.replace(/\s+/g, ' ').trim();

      setPathD(d);

      // Store anchor coordinates for scroll mapping
      anchorDataRef.current.pts = pts;
    };

    // Calculate on load, resize, and GSAP refresh
    const timer = setTimeout(measureAndBuildCircuit, 250);
    window.addEventListener('resize', measureAndBuildCircuit);
    ScrollTrigger.addEventListener('refresh', measureAndBuildCircuit);

    const observer = new ResizeObserver(() => {
      measureAndBuildCircuit();
    });
    const mainEl = document.querySelector('main');
    if (mainEl) observer.observe(mainEl);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureAndBuildCircuit);
      ScrollTrigger.removeEventListener('refresh', measureAndBuildCircuit);
      observer.disconnect();
    };
  }, []);

  // =========================================================================
  // STEP 3: Accurate Viewport-Locked (55% Screen) Water-Flow Scrubbing
  // =========================================================================
  useEffect(() => {
    const corePath = corePathRef.current;
    const haloPath = haloPathRef.current;
    if (!corePath || !haloPath || !pathD) return;

    const totalLength = corePath.getTotalLength();
    if (!totalLength || totalLength <= 0) return;

    // Reset dash arrays
    corePath.style.strokeDasharray = `${totalLength}`;
    haloPath.style.strokeDasharray = `${totalLength}`;
    corePath.style.strokeDashoffset = `${totalLength}`;
    haloPath.style.strokeDashoffset = `${totalLength}`;

    // Sample path length at each anchor point using distance check
    const pts = anchorDataRef.current.pts;
    const lengths: number[] = [];
    let searchStart = 0;

    for (let i = 0; i < pts.length; i++) {
      if (i === 0) {
        lengths.push(0);
        continue;
      }
      if (i === pts.length - 1) {
        lengths.push(totalLength);
        continue;
      }

      const target = pts[i];
      let bestDist = Infinity;
      let bestL = searchStart;
      const step = 4;

      for (let l = searchStart; l <= totalLength; l += step) {
        const pt = corePath.getPointAtLength(l);
        const dx = pt.x - target.x;
        const dy = pt.y - target.y;
        const dist = dx * dx + dy * dy;
        if (dist < bestDist) {
          bestDist = dist;
          bestL = l;
        }
        if (dist < 16) break;
      }

      lengths.push(bestL);
      searchStart = Math.min(totalLength, bestL);
    }

    anchorDataRef.current.lengths = lengths;
    anchorDataRef.current.totalLength = totalLength;

    // Setup leading edge update function
    const updateLeadingEdge = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const winH = window.innerHeight;
      const targetDocY = scrollY + winH * 0.55;

      const p_pts = anchorDataRef.current.pts;
      const p_lens = anchorDataRef.current.lengths;
      const total = anchorDataRef.current.totalLength;

      if (!p_pts.length || !p_lens.length || total <= 0) return;

      const y_start = p_pts[0].y;
      const y_proj_entry = p_pts[4].y;
      const y_skills_start = p_pts[6].y;
      const y_footer = p_pts[10].y;

      let activeLen = 0;

      // Check if user is inside the horizontal pinned Projects section
      const projSection = document.getElementById('projects');
      let isProjectsPinned = false;
      let projProgress = 0;

      if (projSection) {
        const projST = ScrollTrigger.getAll().find(
          (st) => st.trigger === projSection || (st.trigger as HTMLElement)?.id === 'projects'
        );
        if (projST) {
          isProjectsPinned = projST.progress > 0 && projST.progress < 1;
          projProgress = projST.progress;
        }
      }

      if (targetDocY < y_start) {
        // Above first anchor
        activeLen = 0;
      } else if (isProjectsPinned) {
        // Smoothly glide through horizontal Projects track from proj-entry (anchor 4) to proj-exit (anchor 5)
        const l4 = p_lens[4];
        const l5 = p_lens[5];
        activeLen = l4 + projProgress * (l5 - l4);
      } else if (targetDocY < y_proj_entry) {
        // In vertical sections before Projects (Hero -> Experience)
        // Find segment [k, k+1] in anchors 0..4
        for (let k = 0; k < 4; k++) {
          const y1 = p_pts[k].y;
          const y2 = p_pts[k + 1].y;
          if (y1 === y2) {
            // Horizontal line
            if (targetDocY >= y1) {
              activeLen = p_lens[k + 1];
            }
          } else if (targetDocY >= Math.min(y1, y2) && targetDocY <= Math.max(y1, y2)) {
            const ratio = (targetDocY - y1) / (y2 - y1);
            activeLen = p_lens[k] + Math.max(0, Math.min(1, ratio)) * (p_lens[k + 1] - p_lens[k]);
            break;
          } else if (targetDocY > Math.max(y1, y2)) {
            activeLen = p_lens[k + 1];
          }
        }
      } else if (targetDocY < y_skills_start) {
        // At entrance to skills or transition
        activeLen = p_lens[5];
      } else {
        // In vertical sections after Projects (Skills -> Credentials -> Footer)
        // Find segment [k, k+1] in anchors 5..10
        activeLen = p_lens[5];
        for (let k = 5; k < 10; k++) {
          const y1 = p_pts[k].y;
          const y2 = p_pts[k + 1].y;
          if (y1 === y2) {
            // Horizontal line
            if (targetDocY >= y1) {
              activeLen = p_lens[k + 1];
            }
          } else if (targetDocY >= Math.min(y1, y2) && targetDocY <= Math.max(y1, y2)) {
            const ratio = (targetDocY - y1) / (y2 - y1);
            activeLen = p_lens[k] + Math.max(0, Math.min(1, ratio)) * (p_lens[k + 1] - p_lens[k]);
            break;
          } else if (targetDocY > Math.max(y1, y2)) {
            activeLen = p_lens[k + 1];
          }
        }

        if (targetDocY >= y_footer) {
          activeLen = total;
        }
      }

      // Clamp activeLen
      activeLen = Math.max(0, Math.min(total, activeLen));

      // Apply stroke dashoffsets
      const dashOffset = total - activeLen;
      corePath.style.strokeDashoffset = `${dashOffset}`;
      haloPath.style.strokeDashoffset = `${dashOffset}`;

      // Update pulsing leading droplet / orb
      if (activeLen > 10 && orbRef.current && orbPulseRef.current) {
        const pt = corePath.getPointAtLength(activeLen);
        orbRef.current.setAttribute('cx', `${pt.x}`);
        orbRef.current.setAttribute('cy', `${pt.y}`);
        orbPulseRef.current.setAttribute('cx', `${pt.x}`);
        orbPulseRef.current.setAttribute('cy', `${pt.y}`);
        orbRef.current.style.opacity = '1';
        orbPulseRef.current.style.opacity = '1';
      } else if (orbRef.current && orbPulseRef.current) {
        orbRef.current.style.opacity = '0';
        orbPulseRef.current.style.opacity = '0';
      }
    };

    // Attach to scroll and ScrollTrigger
    window.addEventListener('scroll', updateLeadingEdge, { passive: true });
    ScrollTrigger.addEventListener('scrollEnd', updateLeadingEdge);
    updateLeadingEdge();

    return () => {
      window.removeEventListener('scroll', updateLeadingEdge);
      ScrollTrigger.removeEventListener('scrollEnd', updateLeadingEdge);
    };
  }, [pathD]);

  if (!pathD) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 top-0 pointer-events-none z-[5] overflow-visible"
      style={{ height: docHeight }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        style={{ height: docHeight }}
      >
        {/* Layer 1: Always-Visible Base Track (Solid, NOT dashed) */}
        <path
          ref={basePathRef}
          d={pathD}
          fill="none"
          stroke="rgba(209, 154, 76, 0.28)"
          strokeWidth="2"
        />

        {/* Layer 2: Outer Water Glow Halo (NO <filter> tag to prevent >4096px SVG clipping) */}
        <path
          ref={haloPathRef}
          d={pathD}
          fill="none"
          stroke="rgba(209, 154, 76, 0.35)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Layer 3: Core Liquid Gold Stream */}
        <path
          ref={corePathRef}
          d={pathD}
          fill="none"
          stroke="#D19A4C"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Engineered Junction Nodes at Every Connection Point */}
        {anchorNodes.map((pt, i) => (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r="4"
            fill="#0A0C10"
            stroke="#D19A4C"
            strokeWidth="2"
          />
        ))}

        {/* Leading Pulse Orb at the Flowing Stream Tip */}
        <circle
          ref={orbPulseRef}
          r="14"
          fill="none"
          stroke="#D19A4C"
          strokeWidth="1.5"
          className="animate-ping origin-center"
          style={{ opacity: 0 }}
        />
        <circle
          ref={orbRef}
          r="4.5"
          fill="#FFF4E0"
          stroke="#D19A4C"
          strokeWidth="2"
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
}
