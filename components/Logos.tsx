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
    src: '/trustedpartner/bittensor.svg', // Place logo files in public/logos/
    alt: 'Bittensor',
    fallback: <Network className="h-14 md:h-16 w-14 md:w-14 text-white" />
  },
  {
    name: 'Running Matrix',
    type: 'image',
    src: '/trustedpartner/runningmatrix.png', // Place logo files in public/logos/
    alt: 'Running Matrix',
    noInvert: true,
    fallback: <Network className="h-14 md:h-16 w-14 md:w-14 text-white" />
  },
  {
    name: 'AWS',
    type: 'image',
    src: '/trustedpartner/aws.svg',
    alt: 'AWS',
    fallback: <Cloud className="h-7 md:h-8 w-7 md:w-8 text-white" />
  },
  {
    name: 'Talisman',
    type: 'image',
    src: '/trustedpartner/talisman2.png',
    alt: 'Talisman wallet',
    noInvert: true,
    fallback: <Code className="h-7 md:h-8 w-7 md:w-8 text-white" />
  },
  // {
  //   name: 'Solidity',
  //   type: 'image',
  //   src:'/trustedpartner/solidity.svg',
  //   alt: 'Solidity',
  //   fallback: <Code className="h-7 md:h-8 w-7 md:w-8 text-white" />
  // },
  {
    name:"OpenAI",
    type: 'image',
    src: '/trustedpartner/openai.svg',
    alt: 'OpenAI',
    fallback: <Code className="h-7 md:h-8 w-7 md:w-8 text-white" />
  },
  {
    name:"Polkadot",
    type: 'image',
    src: '/trustedpartner/polkadot.svg',
    alt: 'Polkadot',
    fallback: <Network className="h-7 md:h-8 w-7 md:w-8 text-white" />

  },
  // {
  //   name: 'Ethereum',
  //   type: 'image',
  //   src: '/trustedpartner/ethereum.svg',
  //   alt: 'Ethereum',
  //   fallback: <Coins className="h-7 md:h-8 w-7 md:w-8 text-white" />
  // },
  {
    name:'Rust',
    type: 'image',
    src: '/trustedpartner/rust.svg',
    alt: 'Rust',
    fallback: <Code className="h-7 md:h-8 w-7 md:w-8 text-white" />
  },
  {
    name: 'Substrate',
    type: 'image',
    src: '/trustedpartner/substrate.svg',
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
    <section className="relative z-10 w-full py-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Powering Tools Text */}
<p className="text-gray-400/80 text-center text-xl md:text-xl lg:text-2xl mb-12 font-medium tracking-wide">
  Powering Tools and Integrations from companies all over the world
</p>


        {/* Logos Marquee */}
        <div className="mt-10 overflow-hidden">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .marquee-container {
              display: flex;
              width: fit-content;
              animation: marquee 30s linear infinite;
            }
            .marquee-container:hover {
              animation-play-state: paused;
            }
          `}} />
          <div className="marquee-container flex items-center gap-6 md:gap-16 opacity-90">
            {/* First set of logos */}
            {logos.map((logo) => {
              const hasError = imageErrors[logo.name];
              
              return (
                <div 
                  key={logo.name} 
                  className="group flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer flex-shrink-0"
                >
                  {logo.type === 'image' && logo.src ? (
                    <div className="relative h-9 md:h-12 w-auto">
                      {hasError && logo.fallback ? (
                        <div>{logo.fallback}</div>
                      ) : (
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={128}
                          height={128}
                          className={`
                            h-9 md:h-12 w-auto object-contain transition-all duration-300
                            ${logo.noInvert 
                              ? 'opacity-80 hover:opacity-100' 
                              : 'filter brightness-0 invert group-hover:filter-none'}
                          `}
                          onError={() => handleImageError(logo.name)}
                          priority
                          quality={100}
                        />
                      )}
                    </div>
                  ) : logo.fallback ? (
                    <div>{logo.fallback}</div>
                  ) : null}
                </div>
              );
            })}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo) => {
              const hasError = imageErrors[logo.name];
              
              return (
                <div 
                  key={`${logo.name}-duplicate`} 
                  className="group flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer flex-shrink-0"
                >
                  {logo.type === 'image' && logo.src ? (
                    <div className="relative h-9 md:h-12 w-auto">
                      {hasError && logo.fallback ? (
                        <div>{logo.fallback}</div>
                      ) : (
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={128}
                          height={128}
                          className={`
                            h-9 md:h-12 w-auto object-contain transition-all duration-300
                            ${logo.noInvert 
                              ? 'opacity-80 hover:opacity-100' 
                              : 'filter brightness-0 invert group-hover:filter-none'}
                          `}
                          onError={() => handleImageError(logo.name)}
                          priority
                          quality={100}
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
      </div>
    </section>
  );
}
