import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navigation from '@/app/components/Navigation/Navigation';
import Footer from '@/app/components/Footer/Footer';

import '@/app/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Apex Vortex',
  description: 'The best place to buy skis and ski equipment',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}