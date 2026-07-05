

import { Inter } from 'next/font/google';
import Providers from './providers';
import Navbar from './components/Navbar';
import Footer from './components/footer';
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

import './globals.css';

export const metadata = {
  title: 'Live Healthy and Be Safe',
  description: 'Master your mind, body, and chi with Live Healthy and Be Safe.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.className} bg-background text-text`}>
        <Providers>
          <Navbar />
          <div className="font-wrapper w-full">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}