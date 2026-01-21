
import WhatWeOffer from "./CardGridSection";


export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-8 pt-24 overflow-hidden text-center">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 z-0">
        {/* Dark Mesh Gradients - deep blue and purple glows */}
        <div className="absolute top-[15%] -left-[10%] w-[60%] h-[20%] bg-blue-600/50 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] left-[30%] w-[40%] h-[10%] bg-purple-700/20 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] -right-[0%] w-[60%] h-[20%] bg-blue-700/70 blur-[130px] rounded-full" />
        
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
        
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl min-h-[85vh] mx-auto flex flex-col items-center justify-center space-y-3 md:space-y-4">
        

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white">
          Invest in the future of Decentralized AI 
        </h1>


        {/* Description */}
        <p className="text-white text-base md:text-lg max-w-2xl font-medium tracking-tight pt-2 hidden md:block">
          We help investors access high-quality oppurtunities within the Bittensor ecosystem, from early-stage subnets to frontier AI infrastructure.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 md:pt-10">
          <a
            href="#book-a-call"
            className="w-full sm:w-auto px-10 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-900/30"
          >
            Invest with us
          </a>
        </div>
      </div>

      <WhatWeOffer
                title="What We Offer Investors"
                cards={[
                  { title: "Curated Access to Bittensor Subnets", img: "/investors/1.png" },
                  { title: "Transparent Performance Insights", img: "/investors/2.png" },
                  { title: "Due Diligence & technical evaluation", img: "/investors/3.png" },
                  { title: "Long-term ecosystem alignment", img: "/investors/4.png" }
                ]}
              />
      
    </section>
  );
}

