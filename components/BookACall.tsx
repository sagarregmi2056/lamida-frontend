"use client";

import React, { useEffect, useRef } from "react";
import { Clock, Video } from "lucide-react";
import Image from "next/image";

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export default function BookACall() {
  const calendlyUrl = "https://calendly.com/sagarregmi2056";
  const widgetRef = useRef<HTMLDivElement>(null);

  // Load and initialize Calendly widget
  useEffect(() => {
    if (!widgetRef.current) return;

    // Load Calendly CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    link.id = "calendly-styles";
    
    // Remove existing stylesheet if present
    const existingLink = document.getElementById("calendly-styles");
    if (existingLink) {
      existingLink.remove();
    }
    
    document.head.appendChild(link);

    // Load Calendly script
    const existingScript = document.getElementById("calendly-script");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.id = "calendly-script";
    
    script.onload = () => {
      if (window.Calendly && widgetRef.current) {
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: widgetRef.current,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [calendlyUrl]);

  return (
    <section id="book-call" className="relative w-full py-24 bg-black border-t border-white/10 overflow-hidden">
      {/* Background Gradients & Effects */}
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

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
            Book a Call
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Schedule a meeting with our team to discuss how we can help you build on Bittensor.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A]">
            {/* Left Panel - Event Type Selection */}
            <div className="lg:col-span-1">
              <div className="p-6 h-full">
                {/* Logo and Host Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <Image src="/logo.png" alt="Lamida" width={100} height={100} />
                    </div>
                    <span className="text-white font-bold text-lg">Lamida</span>
                  </div>
                  
                  {/* Host Profile */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-500/30">
                      <Image 
                        src="/krishnadaiimage.jpeg" 
                        alt="Krishna Dahal" 
                        width={48} 
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">Krishna Dahal</p>
                    </div>
                  </div>
                </div>

                {/* Meeting Type Info */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3 text-sm">Meeting Type</h3>
                  <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
                    <h4 className="text-white font-semibold mb-2 text-base">Client Check-in</h4>
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>30 min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5" />
                        <span>Zoom</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Placeholder lines for additional info */}
                <div className="space-y-2 mt-6">
                  <div className="h-2 bg-gray-800/50 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-800/50 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-800/50 rounded w-5/6"></div>
                </div>
              </div>
            </div>

            {/* Right Panel - Calendly Widget */}
            <div className="lg:col-span-2">
              <div 
                ref={widgetRef}
                className="overflow-hidden"
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

