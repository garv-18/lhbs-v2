"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Cinzel } from "next/font/google";
import SearchOverlay from "./SearchOverlay";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isSolidBg = isScrolled || !isHome || isMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Join Now", href: "/joinus" },
  ];

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolidBg
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm text-text"
          : "bg-transparent border-transparent text-white"
          } py-3`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-[60]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/lhbs-logo.png"
              alt="LHBS Logo"
              width={316}
              height={54}
              priority={true}
              className="h-9 md:h-11 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors text-sm font-semibold uppercase tracking-widest ${isSolidBg ? 'hover:text-primary text-gray-800' : 'hover:text-primary drop-shadow-md text-white'}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Desktop Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`transition-colors p-2 ${isSolidBg ? 'hover:text-primary text-gray-800' : 'hover:text-primary drop-shadow-md text-white'}`}
            >
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className={`transition-colors ${isSolidBg ? 'text-gray-800 hover:text-primary' : 'text-white hover:text-primary'}`}
            >
              <Search size={22} />
            </button>

            <button
              className={`transition-transform duration-300 ${isSolidBg ? 'text-gray-800 hover:text-primary' : 'text-white hover:text-primary'} ${isMobileMenuOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Premium Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[50] md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Side Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 right-0 bottom-0 w-[280px] bg-white/95 backdrop-blur-2xl z-[55] shadow-2xl flex flex-col pt-24 px-8 pb-8 md:hidden border-l border-white/20"
              >
                <div className="flex flex-col gap-8 flex-1 mt-8">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.4, delay: i * 0.05 + 0.1, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        className="block text-xl text-gray-700 font-medium tracking-wide hover:text-primary hover:translate-x-1 transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Decorative Element */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-auto w-full pt-8"
                >
                  <div className="h-[1px] w-full bg-gradient-to-r from-gray-200 to-transparent mb-6"></div>
                  <p className="text-gray-400 text-[10px] tracking-widest uppercase font-semibold">
                    LHBS Academy
                  </p>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
