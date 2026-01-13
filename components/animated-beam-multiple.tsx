"use client"

import type React from "react"
import { forwardRef, useRef } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import {  Binary, BrainCircuit } from "lucide-react"

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-[#0D0D0D] p-3 shadow-2xl",
          className,
        )}
      >
        {children}
      </div>
    )
  },
)

Circle.displayName = "Circle"

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const centralRef = useRef<HTMLDivElement>(null)
  const icon1Ref = useRef<HTMLDivElement>(null)
  const icon2Ref = useRef<HTMLDivElement>(null)
  const icon3Ref = useRef<HTMLDivElement>(null)
  const icon4Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn("relative flex h-[300px] md:h-[500px] w-full items-center justify-center pl-0 pr-4 md:p-10", className)}
      ref={containerRef}
    >
      <div className="flex w-full md:max-w-9xl flex-row items-center justify-between gap-16 md:gap-58 lg:gap-94">
        {/* Central Node - Left Side */}
        <div className="flex flex-col items-center justify-center">
          <Circle ref={centralRef} className="size-20 md:size-28 lg:size-32 border-white/20 bg-white">
            <Image
              src="/trustedpartner/Bittensor_TAO_Logo.png"
              alt="Bittensor"
              width={96}
              height={96}
              className="h-full w-full object-contain"
            />
          </Circle>
        </div>

        {/* Right Side Nodes - 4 Icons */}
        <div className="flex flex-col justify-between gap-4 md:gap-10 h-full">
          {/* Icon 1 - Top (CheckerChain) */}
          <Circle ref={icon1Ref} className="size-12 md:size-16 lg:size-20 border-white/30 bg-black">
            <Image
              src="/checkerchain.png"
              alt="CheckerChain"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </Circle>
          
          {/* Icon 2 - Second from top */}
          <Circle ref={icon2Ref} className="size-12 md:size-16 lg:size-20 border-white/30">
            <Binary className="text-green-400 size-6 md:size-8 lg:size-10" />
          </Circle>
          
          {/* Icon 3 - Third from top */}
          <Circle ref={icon3Ref} className="size-12 md:size-16 lg:size-20 border-white/30">
            <BrainCircuit className="text-purple-400 size-6 md:size-8 lg:size-10" />
          </Circle>
          
          {/* Icon 4 - Bottom (Luminar) */}
          <Circle ref={icon4Ref} className="size-12 md:size-16 lg:size-20 border-white/30 bg-black">
            <Image
              src="/luminar.png"
              alt="Luminar"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </Circle>
        </div>
      </div>

      {/* Animated Beams - Natural branching pattern - Only FROM Bittensor TO other icons */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centralRef}
        toRef={icon1Ref}
        curvature={-80}
        reverse={false}
        pathColor="rgba(255, 255, 255, 0.7)"
        pathWidth={1.5}
        pathOpacity={0.7}
        delay={0}
        duration={5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centralRef}
        toRef={icon2Ref}
        curvature={-30}
        reverse={false}
        pathColor="rgba(255, 255, 255, 0.7)"
        pathWidth={1.5}
        pathOpacity={0.7}
        delay={0.5}
        duration={5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centralRef}
        toRef={icon3Ref}
        curvature={30}
        reverse={false}
        pathColor="rgba(255, 255, 255, 0.7)"
        pathWidth={1.5}
        pathOpacity={0.7}
        delay={1}
        duration={5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centralRef}
        toRef={icon4Ref}
        curvature={80}
        reverse={false}
        pathColor="rgba(255, 255, 255, 0.7)"
        pathWidth={1.5}
        pathOpacity={0.7}
        delay={1.5}
        duration={5}
      />
    </div>
  )
}
