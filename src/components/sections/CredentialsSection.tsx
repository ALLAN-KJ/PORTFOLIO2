'use client';

import React from 'react';

const CERTIFICATIONS = [
  { title: 'Red Hat System Administration I (RH124 v10)', issuer: 'Red Hat' },
  { title: 'Oracle Java Foundations (1Z0-811)', issuer: 'Oracle' },
  { title: 'Introduction to IoT and Digital Transformation', issuer: 'Cisco Networking Academy' },
  { title: 'EC-Council Cybersecurity Workshop (1 CPE)', issuer: 'EC-Council' },
  { title: 'AIORI-3 Workshop on Internet Measurements', issuer: 'MeitY / NIXI & APNIC Foundation' },
  { title: 'Privacy and Security in Online Social Media (67%)', issuer: 'NPTEL / IIIT Hyderabad' },
];

const COMPETITIONS = [
  { title: 'Smart India Hackathon (SIH) 2026', detail: 'National Finalist · Problem Statement 26160' },
  { title: 'Conesta Forge', detail: '#33 Leaderboard · Score: 1,391' },
  { title: 'Aurelion 24-Hour Hackathon', detail: 'Participant' },
  { title: 'Hacknex Hackathon', detail: 'Participant' },
  { title: 'Mindkraft 2026', detail: 'Hashes over Roses 3.0, Crypto Crime 2.0, IoT Inferno' },
];

export default function CredentialsSection() {
  return (
    <section id="certifications" className="reveal-section w-full py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <h2 className="reveal-heading font-display text-2xl sm:text-3xl font-bold text-[#F4F4F6]">
          Certifications &amp; Competitions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Certifications */}
          <div className="reveal-card studio-card p-6 flex flex-col gap-4 hover:border-[#363640] transition-colors duration-300">
            <h3 className="text-sm font-mono text-[#9A9AA4]">Certifications</h3>
            <div className="flex flex-col divide-y divide-[#232329]">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.title} className="py-3 first:pt-0 last:pb-0 flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-[#F4F4F6]">{cert.title}</span>
                  <span className="text-xs font-mono text-[#6B6B76]">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Competitions */}
          <div className="reveal-card studio-card p-6 flex flex-col gap-4 hover:border-[#363640] transition-colors duration-300">
            <h3 className="text-sm font-mono text-[#9A9AA4]">Competitions</h3>
            <div className="flex flex-col divide-y divide-[#232329]">
              {COMPETITIONS.map((comp) => (
                <div key={comp.title} className="py-3 first:pt-0 last:pb-0 flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-[#F4F4F6]">{comp.title}</span>
                  <span className="text-xs font-mono text-[#6B6B76]">{comp.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
