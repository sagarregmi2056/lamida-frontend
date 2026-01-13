import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-24 overflow-hidden text-center">
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
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '80px 80px' 
          }}
        />
        
        {/* Subtle radial overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-3 md:space-y-4">
        
        {/* Badge - AI * Blockchain with Animated Gradient Border */}
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
          <span className="text-base font-bold text-white tracking-wide relative z-10">
            AI * Blockchain
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white">
          Invest, Build & Scale
        </h1>

        {/* Sub Title */}
        <p className="text-3xl md:text-5xl font-light text-gray-200/90 max-w-3xl leading-snug">
          on the Bittensor Network
        </p>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg max-w-2xl font-medium tracking-tight pt-2">
          Backed by deep Bittensor expertise and a builder-first ecosystem approach.
        </p>

        {/* Action Buttons */}
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

