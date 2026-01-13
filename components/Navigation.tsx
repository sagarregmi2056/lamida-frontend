"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Video } from "lucide-react";

const navLinks = [
  { href: "#investors", label: "Investors" },
  { href: "#buidlers", label: "Buidlers" },
  { href: "#services", label: "Services" },
  { href: "#our-work", label: "Our Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Image src="/logo.png" alt="Lamida" width={100} height={100} />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Book a Call Button */}
          <div className="hidden md:block">
            <Link
              href="#book-call"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              <Video className="w-4 h-4" />
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-white/10 mt-4 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white transition-colors text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#book-call"
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-500/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Video className="w-4 h-4" />
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

