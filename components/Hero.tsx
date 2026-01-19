"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "./ui/animated-gradient-text";

function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100); // Typing speed - adjust as needed

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && !isComplete) {
      // Hide cursor after a short delay when typing is complete
      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-24 overflow-hidden text-center">
     
     
      

      <div className="absolute inset-0 z-[2]">
        
       
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[60%] bg-purple-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-black-700/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-30%] -right-[6%] w-[60%] h-[70%] bg-blue-700/40 blur-[150px] rounded-full" />

      
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{ 
            backgroundImage: 'linear-gradient(rgb(122, 120, 134) 1px, transparent 1px), linear-gradient(90deg,rgb(101, 102, 118) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)'
          }}
        />
        
      

        <div className="absolute bottom-[-15%] right-0 w-[50%] h-[50%] bg-blue-600/60 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-200%] right-[5%] w-[40%] h-[40%] bg-blue-500/50 blur-[120px] rounded-full" />

      </div>



     
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-3 md:space-y-4">
        
        
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-6 py-2 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] bg-white/5 backdrop-blur-sm mb-4 md:mb-6">
          <span
            className={cn(
              "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:300%_100%] p-[1px]"
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
            }}
          />
         
 <Sparkles className="w-4 h-4 text-white mr-2 relative z-10" />
<hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
    <AnimatedGradientText className="text-lg font-medium">
      AI * Blockchain
    </AnimatedGradientText> 
    <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </div>

     
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white">
          <TypingText text="Invest, Build & Scale" />
        </h1>

      
        <p className="text-3xl md:text-5xl font-light text-gray-200/90 max-w-3xl leading-snug">
          on the Bittensor Network
        </p>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg max-w-2xl font-medium tracking-tight pt-2">
          Backed by deep Bittensor expertise and a builder-first ecosystem approach.
        </p>

      
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 md:pt-10">
          <Link
            href="#invest"
            className="w-full sm:w-auto px-10 py-3.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-900/30"
          >
            Invest with us
          </Link>
          <Link
            href="#build"
            className="w-full sm:w-auto px-10 py-3.5 bg-blue-800/60 hover:bg-blue-800/80 text-white rounded-xl font-bold border border-white/10 transition-all transform hover:scale-[1.02]"
          >
            Build with us
          </Link>
        </div>
      </div>
      
    </section>
  );
}

