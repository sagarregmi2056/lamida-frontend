"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Wallet, Cloud, Code, Coins, Network } from 'lucide-react';

// Logos can be either image files or icon components
// For images: Place logo files in public/logos/ folder (e.g., bittensor.svg, aws.svg, etc.)
// For icons: Use lucide-react icons as fallback
const logos = [
  {
    name: 'Bittensor',
    type: 'image',
    src: '/trustedpartner/bittensor.png', // Place logo files in public/logos/
    alt: 'Bittensor',
    fallback: <Network className="h-14 md:h-16 w-14 md:w-14 text-white" />
  },
  {
    name: 'AWS',
    type: 'image',
    src: '/trustedpartner/aws.png',
    alt: 'AWS',
    fallback: <Cloud className="h-7 md:h-8 w-7 md:w-8 text-white" />
  },
  {
    name: 'Talisman',
    type: 'image',
    src: '/trustedpartner/talisman.png',
    alt: 'Talisman wallet',
    fallback: <Code className="h-7 md:h-8 w-7 md:w-8 text-white" />
  },
  {
    name: 'Wallet',
    type: 'icon',
    icon: Wallet,
    alt: 'Wallet'
  },
  {
    name: 'Polkadot',
    type: 'image',
    src: '/logos/polkadot.svg',
    alt: 'Polkadot',
    fallback: <Coins className="h-7 md:h-8 w-7 md:w-8 text-white" />
  },
  {
    name: 'Ethereum',
    type: 'image',
    src: '/logos/ethereum.svg',
    alt: 'Ethereum',
    fallback: <Coins className="h-7 md:h-8 w-7 md:w-8 text-white" />
  },
  {
    name: 'Substrate',
    type: 'image',
    src: '/logos/substrate.svg',
    alt: 'Substrate',
    fallback: <Network className="h-7 md:h-8 w-7 md:w-8 text-white" />
  }
];

export default function Logos() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (logoName: string) => {
    setImageErrors((prev) => ({ ...prev, [logoName]: true }));
  };

  return (
    <section className="relative z-10 w-full py-16 bg-[#0B1222]/60 backdrop-blur-xl border-y border-white/[0.05]">
      <div className="container mx-auto px-6">
        {/* Powering Tools Text */}
        <p className="text-gray-400/80 text-center text-sm md:text-base mb-12 font-medium tracking-wide">
          Powering Tools and Integrations from companies all over the world
        </p>

        {/* Logos Grid */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-20 opacity-40">
          {logos.map((logo) => {
            const IconComponent = logo.type === 'icon' ? logo.icon : null;
            const hasError = imageErrors[logo.name];
            
            return (
              <div 
                key={logo.name} 
                className="flex items-center justify-center grayscale brightness-200 hover:opacity-60 transition-opacity"
              >
                {IconComponent ? (
                  <IconComponent className="h-7 md:h-8 w-7 md:w-8 text-white" />
                ) : logo.type === 'image' && logo.src ? (
                  <div className="relative h-7 md:h-8 w-auto">
                    {hasError && logo.fallback ? (
                      <div>{logo.fallback}</div>
                    ) : (
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={32}
                        height={32}
                        className="h-7 md:h-8 w-auto object-contain"
                        onError={() => handleImageError(logo.name)}
                      />
                    )}
                  </div>
                ) : logo.fallback ? (
                  <div>{logo.fallback}</div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

