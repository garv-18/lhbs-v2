"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isSolidBg = isScrolled || !isHome;

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
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolidBg
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm text-text"
          : "bg-transparent border-transparent text-white"
          } py-3`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2">
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
          <div className="md:hidden flex items-center gap-4 z-[60] relative">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`transition-colors ${isMobileMenuOpen || isSolidBg ? 'text-gray-800 hover:text-primary' : 'text-white hover:text-primary'}`}
            >
              <Search size={22} />
            </button>

            <button
              className={`transition-transform ${isMobileMenuOpen || isSolidBg ? 'text-gray-800 hover:text-primary' : 'text-white hover:text-primary'}`}
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
