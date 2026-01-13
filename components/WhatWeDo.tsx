
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const cards = [
  {
    title: 'For Investors',
    subtitle: 'Invest in High-Conviction Frontier Subnets',
    description: 'We identify, validate, and co-build scalable ventures on the Bittensor network, helping TAO ecosystem.',
    image: '/image 338.png',
    color: 'from-blue-500/10 to-purple-500/10'
  },
  {
    title: 'For Builders',
    subtitle: 'Accelerate Your Product from Idea to Subnets',
    description: 'We identify, validate, and co-build scalable ventures on the Tensor network, helping...',
    image: '/image 341.png',
    color: 'from-emerald-500/10 to-blue-500/10'
  },
  {
    title: 'Services',
    subtitle: 'End to End Outsourcing for Subnet Needs',
    description: 'We identify, validate, and co-build scalable ventures on the Tensor network, helping...',
    image: '/image 339.png',
    color: 'from-blue-500/10 to-emerald-500/10'
  }
];

export default function WhatWeDo() {
  return (
    <section className="relative z-10 w-full py-24 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center tracking-tight mb-20">
          What We Do
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 rounded-[40px] p-10 transition-all duration-500 hover:border-white/20 hover:bg-[#0D0D0D]"
            >
              {/* Image Container */}
              <div className={`relative w-full aspect-[4/3] rounded-3xl mb-10 overflow-hidden bg-gradient-to-br ${card.color} flex items-center justify-center border border-white/5`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <Image 
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-contain p-6 relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Card Header with Arrow */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-3xl font-bold text-white tracking-tight">
                  {card.title}
                </h3>
                <ArrowUpRight className="w-7 h-7 text-white/40 group-hover:text-white transition-all duration-300" />
              </div>

              {/* Card Subtitle */}
              <h4 className="text-xl font-medium text-white italic mb-6 leading-snug">
                {card.subtitle}
              </h4>

              {/* Card Description */}
              <p className="text-gray-400 text-base leading-relaxed font-normal">
                {card.description}
              </p>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}