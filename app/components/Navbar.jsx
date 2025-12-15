"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cinzel, Manrope } from "next/font/google";
import { Menu, X } from "lucide-react";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["500", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500"] });

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Join Us", href: "/joinus" },
    { name: "Coupons", href: "/coupons" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? "bg-black/60 backdrop-blur-md border-white/10 py-4"
        : "bg-transparent border-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50 group">
          <img
            src="/lhbs-logo.png"
            alt="LHBS Logo"
            className="h-9 md:h-12 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* Desktop Links */}
        <div className={`hidden lg:flex gap-8 items-center ${manrope.className}`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white z-[100] relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden ${isMobileMenuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
            }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-3xl text-white font-light ${cinzel.className}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
