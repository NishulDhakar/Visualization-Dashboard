import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DataViz Dashboard — Global Insights',
  description: 'Interactive data visualization dashboard for global analytics and insights.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} bg-slate-950 text-slate-100 min-h-screen`}>
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
