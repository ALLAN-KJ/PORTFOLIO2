import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from "@/src/lib/utils";

export const metadata: Metadata = {
  title: 'Allan K. J — Software & Security Engineering Portfolio',
  description:
    'Allan K. J | B.Tech Computer Science & Engineering (Cybersecurity Specialisation), Karunya University. Enterprise IT Security at ZF Group, Conesta Forge, Smart India Hackathon finalist.',
  keywords: [
    'Allan K. J',
    'URK25CS6018',
    'Cybersecurity',
    'Software Engineer',
    'Full-Stack Developer',
    'Karunya University',
    'ZF Group',
    'Conesta Forge',
    'Smart India Hackathon',
    'Three.js',
  ],
  authors: [{ name: 'Allan K. J' }],
  openGraph: {
    title: 'Allan K. J — Software & Security Engineering Portfolio',
    description:
      'High-contrast engineering showcase for Allan K. J — featuring enterprise cybersecurity experience, projects, and 3D architectural design.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0B0D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark",
        "bg-[#0B0B0D]",
        "text-[#F4F4F6]",
        "antialiased"
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans min-h-[100dvh] bg-[#0B0B0D] text-[#F4F4F6] overflow-x-clip selection:bg-[#F4F4F6] selection:text-[#0B0B0D]"
      >
        {children}
      </body>
    </html>
  );
}
