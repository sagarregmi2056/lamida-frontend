"use client";

import React from "react";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";

interface CardInfo {
  title: string;
  subtitle?: string;
  image: string;
}

interface FeaturedWorksProps {
  title: string;
  card: CardInfo[];
}

 const FeaturedWorks:React.FC<FeaturedWorksProps>=({ title, card }) => {
  return (
    <section className="relative z-10 w-full py-10 bg-black">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(82, 79, 99) 1px, transparent 1px), linear-gradient(90deg,rgb(101, 102, 118) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Colored glows */}
      <div className="absolute bottom-[8%] left-[8%] w-[30%] h-[50%] bg-blue-600/60 blur-[120px] rounded-full" />
      <div className="absolute top-[10%] right-[20%] w-[30%] h-[50%] bg-blue-700/40 blur-[120px] rounded-full" />

      {/* Bottom fade to pure black to blend smoothly into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-b from-transparent to-black" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
           {title}
          </h2>
          {/* <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            A snapshot of domains we've supported across AI, Web3, and frontier technology.
          </p> */}
        </div>

        {/* Projects Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6 lg:gap-8">
          {/* Row 1: Card 1 (62.5% = 5/8) and Card 2 (37.5% = 3/8) */}
          <div className="md:col-span-5">
            <ProjectCard project={card[0]} index={0} />
          </div>
          <div className="md:col-span-3">
            <ProjectCard project={card[1]} index={1} />
          </div>
          
          {/* Row 2: Card 3 (37.5% = 3/8) and Card 4 (62.5% = 5/8) */}
          <div className="md:col-span-3">
            <ProjectCard project={card[2]} index={2} />
          </div>
          <div className="md:col-span-5">
            <ProjectCard project={card[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: CardInfo; index: number }) {
  return (
    <div
      className="group relative flex flex-col w-full h-[260px] md:h-[320px] lg:h-[360px] rounded-[32px] overflow-hidden border border-white/40 bg-[#050509] hover:border-white/25   transition-all duration-500 cursor-pointer"
      style={{ minWidth: 0 }}
    >
      <div className="absolute inset-0 z-20 pointer-events-none">
        <BorderBeam duration={8} size={120} delay={index * 1.5} initialOffset={index * 25} />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-center opacity-100 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Dark overlay - lighter for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/10 group-hover:from-black/50 group-hover:via-black/30 transition-colors duration-500" />
      </div>
      {/* Content */}
      <div className="relative z-30 h-full flex flex-col justify-end p-8 md:p-10">
        <div className="max-w-xs md:max-w-sm">
          {/* <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-300/80 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Services
          </p> */}
          <h3 className="whitespace-pre-line text-2xl md:text-3xl lg:text-4xl font-semibold md:font-bold text-white tracking-tight mb-1">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm md:text-base text-gray-200/90">
              {project.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default FeaturedWorks;