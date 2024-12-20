'use client';

import Image from 'next/image';
import Link from 'next/link';
import { trackLogoClick } from '@/lib/analytics/events/navigation';

export function Logo() {
  const handleLogoClick = () => {
    trackLogoClick();
  };

  return (
    <Link 
      href="https://renderwolf.ai" 
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:opacity-80 transition-opacity justify-center"
      onClick={handleLogoClick}
    >
      <Image
        src="/logo.png"
        alt="RenderWolf Logo"
        width={32}
        height={32}
        className="object-contain"
      />
      <span className="text-xl font-semibold" style={{ fontFamily: 'var(--font-josefin-sans)' }}>
        <span style={{ color: 'var(--logo-pink)' }}>render</span>
        <span style={{ color: 'var(--logo-gray)' }}>wolf</span>
      </span>
    </Link>
  );
}