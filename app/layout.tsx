import './globals.css';
import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { Logo } from '@/components/logo';
import { AnalyticsProvider } from '@/components/analytics/analytics-provider';

const josefinSans = Josefin_Sans({ 
  subsets: ['latin'],
  variable: '--font-josefin-sans'
});

export const metadata: Metadata = {
  title: 'Hidden Object Game - RenderWolf',
  description: 'A hidden object game powered by RenderWolf',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${josefinSans.className} app-layout`}>
        <AnalyticsProvider>
          <header className="app-header">
            <div className="container mx-auto px-4 h-full flex items-center">
              <Logo />
            </div>
          </header>
          <main className="app-content">
            {children}
          </main>
        </AnalyticsProvider>
      </body>
    </html>
  );
}