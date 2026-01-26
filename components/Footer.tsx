"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, X } from "lucide-react";
import Image from "next/image";

// Discord Icon Component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative w-full bg-black border-t border-white/10 overflow-hidden">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 z-0">
        {/* Dark Mesh Gradients - deep blue and purple glows */}
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[60%] bg-blue-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-purple-700/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] -right-[10%] w-[60%] h-[70%] bg-blue-700/40 blur-[150px] rounded-full" />
        
        {/* Grid Pattern Overlay - Visible from top center, fades as light blue gradient appears */}
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{ 
            backgroundImage: 'linear-gradient(rgb(122, 120, 134) 1px, transparent 1px), linear-gradient(90deg,rgb(101, 102, 118) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)'
          }}
        />
        
        {/* Subtle radial overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Lamida Branding and Contact */}
          <div className="space-y-6">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Image src="/logo.png" alt="Lamida" width={100} height={100} />
              </div>
              <span className="text-white font-bold text-xl">Lamida</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://discord.gg/lamida"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Discord"
              >
                <DiscordIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/lamida"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/lamida"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="X (Twitter)"
              >
                <X className="w-5 h-5" />
              </a>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-white/80 text-sm">
              <a 
                href="mailto:admin@lamidacrypto.com" 
                className="block hover:text-white transition-colors"
              >
                lamidaglobal@gmail.com
              </a>
              <p className="text-white/80"> W. 2nd St #2327, Casper, Wyoming</p>
            </div>

            {/* Copyright */}
            <p className="text-white/60 text-sm">© 2026 Lamida Global</p>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/solutions/investors" className="text-white/80 hover:text-white transition-colors text-sm">
                  For Investors
                </Link>
              </li>
              <li>
                <Link href="/solutions/builders" className="text-white/80 hover:text-white transition-colors text-sm">
                  For Builders
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-white/80 hover:text-white transition-colors text-sm">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-white/80 hover:text-white transition-colors text-sm">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors text-sm">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Insights */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Insights</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/insights/designing-for-investors" className="text-white/80 hover:text-white transition-colors text-sm">
                  Designing for Investors
                </Link>
              </li>
              <li>
                <Link href="/insights/building-for-buidlers" className="text-white/80 hover:text-white transition-colors text-sm">
                  Building for Buidlers
                </Link>
              </li>
              <li>
                <Link href="/insights/top-rated-services" className="text-white/80 hover:text-white transition-colors text-sm">
                  Top rated services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

