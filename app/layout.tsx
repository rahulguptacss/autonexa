import type { Metadata } from 'next';
import { Inter_Tight, Inter } from 'next/font/google';
import './globals.css';
import { pages, common } from '../components/types';

const interTight = Inter_Tight({
  variable: '--font-heading-family',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
  icons: {
    icon: common.Header.favicon,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${interTight.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans bg-white text-foreground selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
