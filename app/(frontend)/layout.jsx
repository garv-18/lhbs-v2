

import { Inter } from 'next/font/google';
import Providers from './providers';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import AOSInitializer from './components/AOSInitializer';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.className} bg-background text-text`}>
        <Providers>
          <Navbar />
          <AOSInitializer />
          <div className="font-wrapper w-full">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}