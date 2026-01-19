"use client";

import React from "react";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";

const projects = [
  {
    title: "Bittensor Validator",
    subtitle: "Stake Operations",
    image: "/whatweoffer/card1.png",
  },
  {
    title: "Subnet Registration",
    subtitle: "Cost Funding",
    image: "/whatweoffer/card2.png",
  },
  {
    title: "Subnet Audit/\nConsulting",
    image: "/whatweoffer/card3.png",
    imageFit: "object-contain",
    imagePosition: "object-center",
  },
  {
    title: "Taxation",
    image: "/whatweoffer/card4.png",
  },
];

export default function FeaturedWorks() {
  return (
    <section className="relative z-10 w-full py-24 bg-black">
       <div 
          className="absolute inset-0 opacity-[0.15]"
          
        />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
           Past Investors Success
          </h2>
        </div>

        {/* Projects Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6 lg:gap-8">
          {/* Row 1: Card 1 (62.5% = 5/8) and Card 2 (37.5% = 3/8) */}
          <div className="md:col-span-5">
            <ProjectCard project={projects[0]} index={0} />
          </div>
          <div className="md:col-span-3">
            <ProjectCard project={projects[1]} index={1} />
          </div>
          
          {/* Row 2: Card 3 (37.5% = 3/8) and Card 4 (62.5% = 5/8) */}
          <div className="md:col-span-3">
            <ProjectCard project={projects[2]} index={2} />
          </div>
          <div className="md:col-span-5">
            <ProjectCard project={projects[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <div
      className="group relative flex flex-col w-full h-[260px] md:h-[320px] lg:h-[360px] rounded-[32px] overflow-hidden border border-white/10 bg-[#050509] hover:border-white/25 transition-all duration-500 cursor-pointer"
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
          className={`${project.imageFit || "object-cover"} ${project.imagePosition || "object-center"} opacity-100 group-hover:opacity-100 transition-opacity duration-500`}
        />
        {/* Dark overlay - lighter for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/10 group-hover:from-black/50 group-hover:via-black/30 transition-colors duration-500" />
      </div>
      {/* Content */}
      <div className="relative z-30 h-full flex flex-col justify-end p-8 md:p-10">
        <div className="max-w-xs md:max-w-sm">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-300/80 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Services
          </p>
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

