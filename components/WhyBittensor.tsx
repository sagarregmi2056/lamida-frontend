"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { ConnectionLine } from "@/components/ui/custom-connection-line";
import { Coins, Binary, BrainCircuit, ShieldCheck } from "lucide-react";
import Statistics from "@/components/Statistics";

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
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[60%] bg-blue-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-purple-700/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] -right-[10%] w-[60%] h-[70%] bg-blue-700/40 blur-[150px] rounded-full" />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            backgroundImage: 'linear-gradient(rgb(122, 120, 134) 1px, transparent 1px), linear-gradient(90deg,rgb(101, 102, 118) 1px, transparent 1px)',
            backgroundSize: '80px 80px' 
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

            <div className="flex w-full max-w-lg items-center justify-between gap-12 relative">
              {/* Central Node */}
              <div className="flex flex-col items-center justify-center">
                <Circle ref={centralRef} className="size-28 md:size-32 border-white/20">
                   <span className="text-5xl md:text-6xl font-bold text-white italic">T</span>
                </Circle>
              </div>

              {/* Right Side Nodes */}
              {/* 
                TO REPLACE ICONS:
                1. Lucide Icons: Import from "lucide-react" (e.g., import { IconName } from "lucide-react")
                2. Custom SVG: Replace with <svg>...</svg> component
                3. Images: Use <Image src="/path/to/image.png" /> from "next/image"
                4. Text/Emoji: Use <span>Your Text</span> or <span>🎯</span>
              */}
              <div className="flex flex-col justify-between gap-10 h-full">
                {/* Icon 1 - Top */}
                <Circle ref={icon1Ref} className="size-16 md:size-20 border-white/30">
                  <Coins className="text-orange-400 size-8 md:size-10" />
                  {/* Replace <Coins /> above with your custom icon */}
                </Circle>
                
                {/* Icon 2 - Second from top */}
                <Circle ref={icon2Ref} className="size-16 md:size-20 border-white/30">
                  <Binary className="text-green-400 size-8 md:size-10" />
                  {/* Replace <Binary /> above with your custom icon */}
                </Circle>
                
                {/* Icon 3 - Third from top */}
                <Circle ref={icon3Ref} className="size-16 md:size-20 border-white/30">
                  <BrainCircuit className="text-purple-400 size-8 md:size-10" />
                  {/* Replace <BrainCircuit /> above with your custom icon */}
                </Circle>
                
                {/* Icon 4 - Bottom */}
                <Circle ref={icon4Ref} className="size-16 md:size-20 border-white/30">
                  <ShieldCheck className="text-emerald-400 size-8 md:size-10" />
                  {/* Replace <ShieldCheck /> above with your custom icon */}
                </Circle>
              </div>
            </div>

            {/* Custom Connection Lines - Natural branching pattern matching Figma */}
            <ConnectionLine
              containerRef={containerRef}
              fromRef={centralRef}
              toRef={icon1Ref}
              curvature={-80}
              color="rgba(255, 255, 255, 0.7)"
              strokeWidth={1.5}
              opacity={0.7}
              animated={true}
              delay={0}
            />
            <ConnectionLine
              containerRef={containerRef}
              fromRef={centralRef}
              toRef={icon2Ref}
              curvature={-30}
              color="rgba(255, 255, 255, 0.7)"
              strokeWidth={1.5}
              opacity={0.7}
              animated={true}
              delay={0.5}
            />
            <ConnectionLine
              containerRef={containerRef}
              fromRef={centralRef}
              toRef={icon3Ref}
              curvature={30}
              color="rgba(255, 255, 255, 0.7)"
              strokeWidth={1.5}
              opacity={0.7}
              animated={true}
              delay={1}
            />
            <ConnectionLine
              containerRef={containerRef}
              fromRef={centralRef}
              toRef={icon4Ref}
              curvature={80}
              color="rgba(255, 255, 255, 0.7)"
              strokeWidth={1.5}
              opacity={0.7}
              animated={true}
              delay={1.5}
            />
          </div>
        </div>

        {/* Statistics Section */}
        <Statistics />
      </div>
    </section>
  );
}

