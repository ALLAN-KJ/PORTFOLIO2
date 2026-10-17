import type { Metadata, Viewport } from 'next';
import { Syne, Anton, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const syne = Syne({
  weight: ['700', '800'],
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ALLAN K. J • Cybersecurity & Software Engineering',
  description:
    'Second-year Computer Science student specializing in Cybersecurity at Karunya University. Experienced in enterprise IT security at ZF Group and rapid full-stack product delivery.',
  keywords: [
    'Allan K. J',
    'Cybersecurity',
    'Software Engineering',
    'Karunya University',
    'Coimbatore',
    'ZF Group',
    'Tool Finder',
    'Conesta Forge',
  ],
  authors: [{ name: 'ALLAN K. J' }],
  openGraph: {
    title: 'ALLAN K. J • Cybersecurity & Software Engineering',
    description:
      'Second-year Computer Science student specializing in Cybersecurity at Karunya University. Experienced in enterprise IT security at ZF Group and rapid full-stack product delivery.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0C10',
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
      className={cn(
        "dark",
        "bg-[#0A0C10]",
        "text-[#F4F4EE]",
        "antialiased",
        syne.variable,
        anton.variable,
        plusJakartaSans.variable,
        jetbrainsMono.variable
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-[100dvh] bg-[#0A0C10] text-[#F4F4EE] overflow-x-clip selection:bg-[#D19A4C] selection:text-[#0A0C10]">
        {children}
      </body>
    </html>
  );
}
