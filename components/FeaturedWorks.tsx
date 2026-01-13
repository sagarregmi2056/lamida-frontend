"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Binary, Coins, Shield, Twitter, Check, TrendingUp } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

const projects = [
  {
    title: "BetterTherapy",
    icon: BrainCircuit,
    iconColor: "text-purple-400",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    glowColor: "purple",
    twitterUrl: "https://twitter.com/bettertherapy",
    discordUrl: "https://discord.gg/bettertherapy",
  },
  {
    title: "L1 Blockchain for AI Agent",
    icon: Binary,
    iconColor: "text-green-400",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a5b?w=800&h=600&fit=crop",
    glowColor: "green",
    twitterUrl: "https://twitter.com/l1blockchain",
    discordUrl: "https://discord.gg/l1blockchain",
  },
  {
    title: "CheckerChain",
    icon: Coins,
    iconColor: "text-yellow-400",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    glowColor: "yellow",
    twitterUrl: "https://twitter.com/checkerchain",
    discordUrl: "https://discord.gg/checkerchain",
  },
  {
    title: "LUMINAR NETWORK",
    subtitle: "Neighbourhood Insights. Business-Grade Intelligence.",
    icon: Shield,
    iconColor: "text-emerald-400",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    glowColor: "emerald",
    twitterUrl: "https://twitter.com/luminarnetwork",
    discordUrl: "https://discord.gg/luminarnetwork",
  },
];

export default function FeaturedWorks() {
  return (
    <section className="relative z-10 w-full py-24 bg-black">
       <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            backgroundImage: 'linear-gradient(rgb(122, 120, 134) 1px, transparent 1px), linear-gradient(90deg,rgb(101, 102, 118) 1px, transparent 1px)',
            backgroundSize: '80px 80px' 
          }}
        />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
            Featured Works
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            A snapshot of domains we've supported across AI, Web3, and frontier technology.
          </p>
        </div>

        {/* Projects Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6 lg:gap-8">
          {/* Row 1: Card 1 (62.5% = 5/8) and Card 2 (37.5% = 3/8) */}
          <div className="md:col-span-5">
            <ProjectCard project={projects[0]} />
          </div>
          <div className="md:col-span-3">
            <ProjectCard project={projects[1]} />
          </div>
          
          {/* Row 2: Card 3 (37.5% = 3/8) and Card 4 (62.5% = 5/8) */}
          <div className="md:col-span-3">
            <ProjectCard project={projects[2]} />
          </div>
          <div className="md:col-span-5">
            <ProjectCard project={projects[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const IconComponent = project.icon;

  return (
    <div className="group relative flex flex-col w-full h-[450px] rounded-[40px] overflow-hidden border border-white/10 bg-[#0A0A0A] hover:border-white/20 hover:bg-[#0D0D0D] transition-all duration-500" style={{ minWidth: 0 }}>
      
     <BorderBeam duration={8} size={100} />
      

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
      </div>
      
     

      {/* Content - Standardized Layout */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-10">
        {/* Icon Container - All same size */}
        <div className={`mb-8 flex items-center justify-center ${project.iconColor}`}>
          {project.title === "CheckerChain" ? (
            <div className="relative w-24 h-24">
              <div className="relative w-24 h-24 rounded-full bg-yellow-500/20 flex items-center justify-center border-2 border-yellow-400/30">
                <div className="relative z-10 w-10 h-10 rounded-full bg-yellow-500/40 flex items-center justify-center">
                  <Check className="w-6 h-6 text-yellow-200" strokeWidth={3} />
                </div>
              </div>
            </div>
          ) : project.title === "BetterTherapy" ? (
            <div className="relative w-24 h-24 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center backdrop-blur-sm">
              <BrainCircuit className={`w-12 h-12 ${project.iconColor}`} />
            </div>
          ) : project.title === "L1 Blockchain for AI Agent" ? (
            <div className="w-24 h-24 rounded-lg bg-green-900/40 border-2 border-green-400/30 flex items-center justify-center backdrop-blur-sm">
              <div className="text-green-400 font-mono font-bold text-2xl leading-tight">
                <div>10</div>
                <div>01</div>
              </div>
            </div>
          ) : (
            <div className="relative w-24 h-24 rounded-full bg-emerald-900/40 border-2 border-emerald-400/30 flex items-center justify-center backdrop-blur-sm">
              <Shield className={`w-12 h-12 ${project.iconColor}`} />
              <TrendingUp className="absolute w-7 h-7 text-emerald-300" style={{ transform: 'translateY(-2px)' }} strokeWidth={2.5} />
            </div>
          )}
        </div>

        {/* Title - Standardized */}
        <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 min-h-[60px] flex items-center justify-center">
          {project.title}
        </h3>

        {/* Subtitle for LUMINAR NETWORK - Fixed height */}
        <div className="min-h-[50px] flex items-center justify-center">
          {project.subtitle && (
            <p className="text-gray-300 text-sm md:text-base text-center max-w-xs">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Social Icons - Show on hover for all cards */}
        <div className="min-h-[40px] flex items-center justify-center mt-4">
          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Link 
              href={project.twitterUrl || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Twitter className="w-4 h-4 text-white" />
            </Link>
            <Link 
              href={project.discordUrl || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              {/* Discord Icon SVG */}
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

