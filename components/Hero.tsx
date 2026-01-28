"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const words = [
  {
    text: "Invest",
  },
  {
    text: ",",
  },
  {
    text: "Build",
  },
  {
    text: "&",
  },
  {
    text: "Scale",
  },
  
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-start justify-center px-6 lg:px-8 pt-50 pb-0 overflow-hidden text-center">
     
     
      

      <div className="absolute inset-0 z-[2]">
        
       
        <div className="absolute bottom-[-2%] -left-[8%] w-[38%] h-[50%] bg-[#4A3BD1] blur-[200px] rounded-full" />
        {/* <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-black-700/20 blur-[0px] rounded-full" /> */}
        <div className="absolute bottom-[-2%] -right-[8%] w-[38%] h-[50%] bg-[#1D5BFF] blur-[200px] rounded-full" />
        

        <div className="absolute top-[58%] -right-[-10%] w-[10%] h-[10%] bg-blue-600/50 blur-[60px] rounded-full" />

      
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{ 
            backgroundImage: 'linear-gradient(rgb(148, 147, 154) 1px, transparent 1px), linear-gradient(90deg,rgb( 141, 133, 175) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)'
          }}
        />
        
{/*       

        <div className="absolute bottom-[0%] right-0 w-[50%] h-[50%] bg-blue-600/60 blur-[0px] rounded-full" />
        <div className="absolute bottom-[-200%] right-[5%] w-[40%] h-[40%] bg-blue-500/50 blur-[0px] rounded-full" /> */}

      </div>



     
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-1 md:space-y-4">
        
        
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-8 py-2 backdrop-blur-sm mb-4 md:mb-6 bg-black/80">
          <span
            className={cn(
              // Soft multi-color pastel border similar to the first reference
              "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#B1F5FF] via-[#F6C4FF] to-[#6be585] bg-[length:300%_100%] p-[1px]"
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
            }}
          />

          <Sparkles className="w-6 h-6 text-white mr-0 pr-0 relative z-10 fill-white" fill="currentColor" />
{/* <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" /> */}
    <AnimatedGradientText className="text-sm sm:text-base md:text-[20.22px] text-white font-bold">
      AI * Blockchain
    </AnimatedGradientText> 
    {/* <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" /> */}
        </div>

     
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[140px] font-extrabold tracking-tight leading-[1.05] text-white text-center">
          <TypewriterEffectSmooth className="text-white" words={words} />
        </h1>

      
        <p className="text-3xl md:text-5xl font-light text-gray-200/90 max-w-3xl leading-snug">
          on the{" "}
          <span className="relative  inline-block">
           
            <span className="relative">Bittensor Network</span>
          </span>
        </p>

        {/* Description */}
        <p className="text-gray-400 text-[18px] max-w-2xl font-medium tracking-tight pt-2">
        Backed by Bittensor expertise for Bittensor-only ecosystem approach.
        </p>

      
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 md:pt-10">
          <Link
            href="#invest"
            className="w-full sm:w-auto px-10 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl  text-[20.22px] transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-900/30"
          >
            Invest with us
          </Link>
          <Link
            href="#build"
            className="w-full sm:w-auto px-10 py-3.5 bg-blue-800/60 hover:bg-blue-800/80 text-white rounded-xl text-[20.22px] border border-white/10 transition-all transform hover:scale-[1.02]"
          >
            Build with us
          </Link>
        </div>
      </div>
      
    </section>
  );
}

