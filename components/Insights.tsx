"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const insights = [
  {
    id: 1,
    title: "Scaling Bittensor for mass use",
    description: "Exploring the infrastructure, tooling, and network upgrades needed to take Bittensor from a niche protocol to real-world, large-scale adoption across industries.",
    date: "Nov 2, 2025",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    badge: "dTAO",
  },
  {
    id: 2,
    title: "Latest ecosystem changes",
    description: "A quick overview of recent updates in the Bittensor ecosystem, including protocol improvements, governance changes, and community-driven developments.",
    date: "Dec 10, 2025",
    image: "https://img.bgstatic.com/multiLang/image/social/fbe7c2071b35ac9f93a65a19bd8ada5f1762283003888.png",
    badge: "BITTENSOR",
  },
  {
    id: 3,
    title: "New Subnet Registered",
    description: "A newly launched subnet joins the Bittensor network, expanding use cases and opening new opportunities for builders, miners, and validators.",
    date: "Jan 11, 2026",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    badge: null,
  },
  {
    id: 4,
    title: "Required TAO",
    description: "A newly launched subnet joins the Bittensor network, expanding use cases and opening new opportunities for builders, miners, and validators.",
    date: "Jan 11, 2026",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    badge: "TAO",
  },
];

export default function Insights() {
  return (
    <section className="relative z-10 w-full py-10 bg-black">
       <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            backgroundImage: 'linear-gradient(rgb(122, 120, 134) 1px, transparent 1px), linear-gradient(90deg,rgb(101, 102, 118) 1px, transparent 1px)',
            backgroundSize: '80px 80px' 
          }}
        />
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center tracking-tight mb-16">
          Insights
        </h2>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightCard({ insight }: { insight: typeof insights[0] }) {
  return (
    <Link 
      href={`/insights/${insight.id}`}
      className="group relative flex flex-col h-full rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] hover:border-white/20 hover:bg-[#0D0D0D] transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={insight.image}
          alt={insight.title}
          fill
          className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
        
        {/* Badge if exists */}
        {insight.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-bold">
              {insight.badge}
            </span>
          </div>
        )}

        {/* Arrow Icon */}
        <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
          {insight.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
          {insight.description}
        </p>
        <div className="text-gray-500 text-xs font-medium">
          {insight.date}
        </div>
      </div>
    </Link>
  );
}

