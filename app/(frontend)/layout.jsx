

import { Cinzel, Manrope } from 'next/font/google';
import Providers from './providers';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import AOSInitializer from './components/AOSInitializer';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['500'], display: 'swap', variable: '--font-cinzel' });
const manrope = Manrope({ subsets: ['latin'], weight: ['400'], display: 'swap', variable: '--font-manrope' });

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${manrope.variable}`}>
      <body className={manrope.className}>
        <Providers>
          <Navbar />
          <AOSInitializer />
          <div className="font-wrapper overflow-x-hidden w-full">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}