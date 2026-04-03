import type { Metadata } from 'next';
import { CartProvider } from '@/lib/cart';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NHCare Pathlabs — Lab Tests at Home | NABL Certified Delhi-NCR',
  description: 'Book blood tests, health packages & home sample collection. NABL accredited lab. AI-powered reports. 663K+ patients served. Delhi-NCR coverage.',
  keywords: 'blood test, lab test, home collection, NABL lab, Delhi, health checkup, pathology',
  openGraph: { title: 'NHCare Pathlabs', description: 'Diagnostic excellence at your doorstep', url: 'https://nhcare.in', siteName: 'NHCare Pathlabs', locale: 'en_IN', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-cream-50 dark:bg-forest-950 font-body antialiased">
        <Navbar />
        <main><CartProvider>{children}</CartProvider></main>
        <Footer />
      </body>
    </html>
  );
}
