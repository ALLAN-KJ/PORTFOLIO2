'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── Command Registry ───────────────────────────────────────────────────────

type Line = { text: string; type: 'cmd' | 'out' | 'info' | 'err' };

const COMMANDS: Record<string, () => string[]> = {
  whoami: () => [
    'Allan K. J',
    'B.Tech CSE (Cybersecurity) · Karunya Institute of Technology and Sciences',
    'Coimbatore, India · Expected May 2029 · CGPA 7.06',
  ],
  skills: () => [
    '── Languages ──────────────────────────────',
    'Python  TypeScript  JavaScript  C  Java  Bash',
    '',
    '── Frameworks & Tools ─────────────────────',
    'Next.js  React  Three.js  Tailwind CSS  Node.js',
    'Linux  Git  Docker  Wireshark  Nmap',
    '',
    '── Domains ────────────────────────────────',
    'Enterprise IT Security  Linux Administration',
    'Full-Stack Web Engineering  Network Analysis',
  ],
  experience: () => [
    '── ZF Group ───────────────────────────────',
    'Role: IT Security & Compliance Intern',
    'Focus: Risk assessment, policy audits, vulnerability scanning',
    '',
    '── Conesta Forge ──────────────────────────',
    'Role: Web Development Intern',
    'Focus: React front-ends, REST API integrations',
    '',
    '── Qaroo ──────────────────────────────────',
    'Role: Junior Developer',
    'Focus: Full-stack features, performance optimization',
  ],
  projects: () => [
    '── SIH 2026 ───────────────────────────────',
    'Smart India Hackathon project · Cybersecurity track',
    '',
    '── 3D Portfolio ───────────────────────────',
    'Next.js · React Three Fiber · GSAP · Lenis',
    'Monochrome studio aesthetic, smooth scroll',
    '',
    '── GHOST ──────────────────────────────────',
    'Network reconnaissance and packet analysis tool',
    'Python · Scapy · Nmap integration',
    '',
    '── Education 3D ───────────────────────────',
    'Interactive 3D learning environment prototype',
    'Three.js · WebGL · Custom shaders',
  ],
  certifications: () => [
    'Red Hat Certified System Administrator (RHCSA)',
    'Oracle Cloud Infrastructure Foundations',
    'Cisco CyberOps Associate',
    'EC-Council Ethical Hacking Essentials (EHE)',
    'NPTEL — Programming in Python (Elite)',
    'NPTEL — Computer Networks (Gold)',
  ],
  contact: () => [
    'Email    allan22kj@gmail.com',
    'Phone    +91 93614 09760',
    'GitHub   github.com/ALLAN-KJ',
    'LinkedIn linkedin.com/in/allan-k-j-21389838a',
  ],
  help: () => [
    'Available commands:',
    '',
    '  whoami          Personal & academic info',
    '  skills          Languages, frameworks, domains',
    '  experience      Internships & roles',
    '  projects        Selected builds',
    '  certifications  Professional credentials',
    '  contact         Reach out',
    '  clear           Clear terminal',
    '  help            Show this list',
  ],
};

const INTRO_LINES = [
  'Welcome to allan@portfolio',
  'Type `help` to see available commands.',
];

// ─── MacTerminal Component ───────────────────────────────────────────────────

export default function MacTerminal() {
  const [history, setHistory] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [introComplete, setIntroComplete] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Typewriter intro ──────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const lines: Line[] = [];

    const typeLines = async () => {
      for (const text of INTRO_LINES) {
        if (cancelled) return;
        for (let i = 1; i <= text.length; i++) {
          if (cancelled) return;
          await new Promise<void>((r) => setTimeout(r, 28));
          setHistory([
            ...lines,
            { text: text.slice(0, i), type: 'info' },
          ]);
        }
        lines.push({ text, type: 'info' });
        await new Promise<void>((r) => setTimeout(r, 160));
      }
      if (!cancelled) {
        setIntroComplete(true);
        inputRef.current?.focus();
      }
    };

    typeLines();
    return () => { cancelled = true; };
  }, []);

  // ── Auto-scroll to bottom ─────────────────────────────────────────────────
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  // ── Run a command ─────────────────────────────────────────────────────────
  const run = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setCmdHistory((prev) => [raw, ...prev]);
      setCmdIndex(-1);
      return;
    }

    const outputLines: Line[] = [];
    if (COMMANDS[cmd]) {
      COMMANDS[cmd]().forEach((t) =>
        outputLines.push({ text: t, type: 'out' })
      );
    } else {
      outputLines.push({
        text: `command not found: ${cmd}  (try \`help\`)`,
        type: 'err',
      });
    }

    setHistory((prev) => [
      ...prev,
      { text: `➜  ~ ${raw}`, type: 'cmd' },
      ...outputLines,
    ]);
    setCmdHistory((prev) => [raw, ...prev]);
    setCmdIndex(-1);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(cmdIndex - 1, -1);
      setCmdIndex(next);
      setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter((k) =>
        k.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col rounded-lg overflow-hidden border border-[#232329] bg-[#0D1117] font-mono text-sm select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── Traffic-light title bar ── */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-[#232329] shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57] cursor-pointer" title="Close" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E] cursor-pointer" title="Minimise" />
        <span className="w-3 h-3 rounded-full bg-[#28C840] cursor-pointer" title="Maximise" />
        <span className="ml-auto text-[11px] text-[#6B6B76] tracking-wide">
          allan@portfolio — bash — 80×24
        </span>
      </div>

      {/* ── Scrollable body ── */}
      <div
        ref={bodyRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5 scrollbar-thin"
        style={{ scrollbarColor: '#232329 transparent' }}
        data-lenis-prevent
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={`leading-relaxed whitespace-pre-wrap break-words ${
              line.type === 'cmd'
                ? 'text-[#58A6FF]'
                : line.type === 'err'
                ? 'text-[#FF7B72]'
                : line.type === 'info'
                ? 'text-[#8B949E]'
                : 'text-[#C9D1D9]'
            }`}
          >
            {line.text || '\u00A0'}
          </div>
        ))}

        {/* ── Live prompt ── */}
        {introComplete && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#3FB950] shrink-0">➜</span>
            <span className="text-[#58A6FF] shrink-0">~</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-[#C9D1D9] outline-none caret-[#C9D1D9] placeholder:text-[#484F58]"
                placeholder=""
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
