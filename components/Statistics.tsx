"use client";

import React, { useEffect, useRef, useState } from "react";

interface TAOData {
  price: number;
  volume: number;
  marketCap: number;
}

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  gradient: string;
}

const useCountUp = (end: number, duration: number, isVisible: boolean): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Ease-out for smoother finish
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * end);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return count;
};

export default function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [taoData, setTaoData] = useState<TAOData>({
    price: 0,
    volume: 0,
    marketCap: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Only load once: first time the section becomes visible
    if (!isVisible || hasLoaded) return;

    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/ticker/24hr?symbol=TAOUSDT"
        );
        const data = await response.json();

        if (data.lastPrice && data.volume) {
          const price = parseFloat(data.lastPrice);
          // 24h volume in TAO units (not millions)
          const volume = parseFloat(data.volume);
          const circulatingSupply = 21_000_000; // Approximate TAO circulating supply
          const marketCap = price * circulatingSupply;

          setTaoData({
            price,
            volume,
            marketCap,
          });
        }
      } catch (error) {
        console.error("Error fetching initial TAO data:", error);
        // Set default values if API fails
        setTaoData({
          price: 251.34,
          volume: 120148, // example fallback TAO volume
          marketCap: 2_412_033_048,
        });
      } finally {
        setHasLoaded(true);
      }
    };

    fetchInitialData();
  }, [isVisible, hasLoaded]);

  const stats: StatItem[] = [
    {
      value: taoData.price,
      prefix: "$",
      label: "TAO Current Price",
      gradient: "from-purple-400 via-purple-500 to-purple-600",
    },
    {
      value: taoData.volume,
      prefix: "$",
      label: "Today's Volume",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
    },
    {
      value: taoData.marketCap,
      prefix: "$",
      label: "Market Cap",
      gradient: "from-green-400 via-green-500 to-green-600",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-16 mt-20"
    >
      {/* Grid Pattern - Same as Hero */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{ 
          backgroundImage: 'linear-gradient(rgb(99, 97, 112) 1px, transparent 1px), linear-gradient(90deg,rgb(104, 105, 116) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgb(228, 220, 220) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)'
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-8 lg:gap-12 xl:gap-16">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat, isVisible, index }: { stat: StatItem; isVisible: boolean; index: number }) {
  const animatedValue = useCountUp(stat.value, 2000, isVisible);

  const formatNumber = (num: number): string => {
    if (num === 0) return "0";
    
    if (stat.label === "Today's Volume") {
      // Show raw TAO volume with commas, no decimals (e.g., 120,148)
      return Math.floor(num).toLocaleString("en-US");
    }
    
    if (stat.label === "Market Cap") {
      // For market cap, format with commas
      if (num >= 1000000000) {
        // Format with commas: e.g., 2,412,033,048
        return Math.floor(num).toLocaleString("en-US");
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + "M";
      }
      return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
    }
    
    // For price, show 2 decimal places
    return num.toFixed(2);
  };

  return (
    <div className={`flex flex-col items-center md:items-start text-center md:text-left px-2 md:px-4 lg:px-6 flex-1 ${index === 1 ? 'md:ml-0' : index === 2 ? 'md:ml-4 lg:ml-8 xl:ml-12' : ''}`}>
      <div
        className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent break-words`}
      >
        {stat.prefix}
        {formatNumber(animatedValue)}
        {stat.suffix}
      </div>
      <p className="text-gray-400 text-sm md:text-base font-medium">
        {stat.label}
      </p>
    </div>
  );
}

