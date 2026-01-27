
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const cards = [
  {
    title: 'For Investors',
    subtitle: 'Invest in High-Conviction Frontier Subnets',
    description: 'We invest, crowdfund and lead fundraise for Bittensor related ventures, funding TAO ecosystem.',
    image: '/card1.png',
    color: 'from--500/10 to-black-500/10'
  },
  {
    title: 'For Builders',
    subtitle: 'Accelerate Your Product from Idea to Subnets',
    description: 'We identify, incubate and co-build scalable subnets on the Bittensor network, building TAO ecosystem.',
    image: '/card2.webp',
    color: 'from-emerald-500/10 to-blue-500/10'
  },
  {
    title: 'Services',
    subtitle: 'End to End Outsourcing for Subnet Needs',
    description: 'We develop subnets, design incentive mechanisms (IM), run miners and validators, servicing TAO ecosystem.',
    image: '/image 339.png',
    color: 'from-blue-500/10 to-emerald-500/10'
  }
];

export default function WhatWeDo() {
  return (
    <section className="relative z-10 w-full py-10 bg-black ">
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* <div className="absolute top-[20%] -left-[10%] w-[50%] h-[60%] bg-purple-600/30 blur-[120px] rounded-full" /> */}
        {/* <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-black-700/20 blur-[150px] rounded-full" /> */}

      </div>
      <div className="container mx-auto px-6 ">
        {/* Section Header */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center tracking-tight mb-20">
          What We Do
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 cursor-pointer ">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="group relative flex flex-col bg-[#0A0A0A] border-2 border-white/20 rounded-[40px] p-10 transition-all duration-500 hover:border-white/30 hover:bg-[#0D0D0D]"
            >
              {/* Image Container */}
              <div className={`relative w-full aspect-[4/3] rounded-3xl mb-10 overflow-hidden bg-gradient-to-br ${card.color}`}>
                <Image 
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover relative z-10 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
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