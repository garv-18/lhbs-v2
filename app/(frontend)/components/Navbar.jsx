"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    { name: "Join Us", href: "/joinus" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3 text-gray-600"
          : "bg-transparent border-transparent py-6 text-white"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2">
            <img
              src="/lhbs-logo.png"
              alt="LHBS Logo"
              className={`h-9 md:h-12 w-auto object-contain transition-all duration-300 ${isScrolled ? 'filter invert brightness-0' : ''}`}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors text-sm font-semibold uppercase tracking-widest ${isScrolled ? 'hover:text-primary' : 'hover:text-primary drop-shadow-md'}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Desktop Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`transition-colors p-2 ${isScrolled ? 'hover:text-primary' : 'hover:text-primary drop-shadow-md'}`}
            >
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-4 z-[60] relative">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`transition-colors ${isMobileMenuOpen || isScrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'}`}
            >
              <Search size={22} />
            </button>

            <button
              className={`transition-transform ${isMobileMenuOpen || isScrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className={`fixed inset-0 bg-white z-[55] flex flex-col pt-24 px-6 gap-6 transition-all duration-300 md:hidden ${isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
              }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl text-text font-bold border-b border-gray-100 pb-4 uppercase tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
