"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
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
        
       
        <div className="absolute bottom-[-2%] -left-[8%] w-[50%] h-[60%] bg-[#4A3BD1] blur-[150px] rounded-full" />
        {/* <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-black-700/20 blur-[0px] rounded-full" /> */}
        <div className="absolute bottom-[-2%] -right-[8%] w-[50%] h-[60%] bg-[#1D5BFF] blur-[150px] rounded-full" />
        

        <div className="absolute top-[58%] -right-[-10%] w-[10%] h-[10%] bg-blue-600 blur-[100px] rounded-full" />

      
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{ 
            backgroundImage: 'linear-gradient(rgb(122, 120, 134) 1px, transparent 1px), linear-gradient(90deg,rgb(101, 102, 118) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)'
          }}
        />
        
{/*       

        <div className="absolute bottom-[0%] right-0 w-[50%] h-[50%] bg-blue-600/60 blur-[0px] rounded-full" />
        <div className="absolute bottom-[-200%] right-[5%] w-[40%] h-[40%] bg-blue-500/50 blur-[0px] rounded-full" /> */}

      </div>



     
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-3 md:space-y-4">
        
        
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-8 py-2   backdrop-blur-sm mb-4 md:mb-6">
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
{/* <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" /> */}
    <AnimatedGradientText className="text-sm sm:text-base md:text-[20.22px] font-medium">
      AI X Blockchain
    </AnimatedGradientText> 
    {/* <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" /> */}
        </div>

     
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[120px] font-extrabold tracking-tight leading-[1.1] text-white whitespace-nowrap overflow-hidden">
          <TypingText text="Invest, Build & Scale" />
        </h1>

      
        <p className="text-3xl md:text-5xl font-light text-gray-200/90 max-w-3xl leading-snug">
          on the{" "}
          <span className="relative whitespace-nowrap inline-block">
            {/* <motion.svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-[0.85em] fill-white"
              preserveAspectRatio="xMidYMid meet"
              width="100%"
              height="42"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      pathLength: { delay: 0.5, type: "spring", duration: 2, bounce: 0 },
                      opacity: { delay: 0.5, duration: 1 }
                    }
                  }
                }}
                strokeWidth="2"
                fill="none"
                stroke="#ffffff"
              />
            </motion.svg> */}
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

