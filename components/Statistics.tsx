"use client";

import React, { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    value: 29.7,
    suffix: "M",
    label: "Fee paying accounts, All time",
    color: "text-purple-500",
  },
  {
    value: 340,
    suffix: "M+",
    label: "NFT Minted",
    color: "text-blue-500",
  },
  {
    value: 0.00064,
    prefix: "$",
    label: "Median Fee per transaction",
    color: "text-green-500",
  },
];

const useCountUp = (
  end: number,
  duration: number,
  isVisible: boolean
): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(easeOutQuart * end);

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
        threshold: 0.3, // Trigger when 30% of the section is visible
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

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-16 mt-20"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat, isVisible }: { stat: StatItem; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible);

  const formatNumber = (num: number): string => {
    if (stat.suffix === "M+") {
      // For 340M+, show as integer
      return Math.floor(num).toString();
    }
    if (stat.suffix === "M") {
      // For 29.7M, show one decimal
      return num.toFixed(1);
    }
    if (stat.prefix === "$") {
      // For $0.00064, show 5 decimal places
      return num.toFixed(5);
    }
    return Math.floor(num).toString();
  };

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className={`text-5xl md:text-6xl lg:text-7xl font-bold ${stat.color} mb-2`}>
        {stat.prefix}
        {formatNumber(count)}
        {stat.suffix}
      </div>
      <p className="text-gray-400 text-sm md:text-base font-medium">
        {stat.label}
      </p>
    </div>
  );
}

