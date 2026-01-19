"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";

import { Coins, Binary, BrainCircuit, ShieldCheck } from "lucide-react";
import { AnimatedBeamMultipleOutputDemo } from "./animated-beam-multiple";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-[#0D0D0D] p-3 shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function WhyBittensor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centralRef = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);
  const icon4Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Gradients & Grid Pattern - Matching Hero */}
      <div className="absolute inset-0 z-0">
        {/* Dark Mesh Gradients - deep blue and purple glows */}
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[60%] bg-blue-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-purple-700/20 blur-[120px] rounded-full" />
        {/* same as hero below  */}
        <div className="absolute top-[30%] -right-[-32%] w-[20%] h-[70%] bg-blue-600 blur-[120px] rounded-full" />
        
        {/* Grid Pattern Overlay - Visible from top center, fades as light blue gradient appears */}
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{ 
            backgroundImage: 'linear-gradient(rgb(148, 147, 154) 1px, transparent 1px), linear-gradient(90deg,rgb( 141, 133, 175) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)'
          }}
        />
        
        {/* Subtle radial overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center tracking-tight mb-20">
          Why Bittensor?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8 max-w-xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              The Bittensor network enables the Decentralized era of scalable, AI-accelerated applications.
            </h3>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed italic">
              <span className="font-bold text-white not-italic">LAMIDA</span> is built for this ecosystem-leveraging its speed, modularity, and interoperability to architect products with real-world traction and long-term durability.
            </p>
          </div>

          {/* Right Content - Animated Beam Diagram */}
          <div 
            className="relative flex h-[500px] w-full items-center justify-center"
            ref={containerRef}
          >
            <AnimatedBeamMultipleOutputDemo className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

