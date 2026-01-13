"use client";

import React, { useEffect, useState, useId } from "react";
import { motion } from "framer-motion";

interface ConnectionLineProps {
  fromRef: React.RefObject<any>;
  toRef: React.RefObject<any>;
  containerRef: React.RefObject<any>;
  curvature?: number;
  color?: string;
  strokeWidth?: number;
  opacity?: number;
  animated?: boolean;
  delay?: number;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  fromRef,
  toRef,
  containerRef,
  curvature = 0,
  color = "rgba(255, 255, 255, 0.5)",
  strokeWidth = 1.5,
  opacity = 0.5,
  animated = false,
  delay = 0,
}) => {
  const [path, setPath] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const gradientId = useId();

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      setDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });

      // Start from the RIGHT edge of the central node
      const startX = fromRect.right - containerRect.left;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2;

      // End at the LEFT edge of the destination node
      const endX = toRect.left - containerRect.left;
      const endY = toRect.top - containerRect.top + toRect.height / 2;

      // Calculate distance for natural branching curves
      const distanceX = endX - startX;
      const distanceY = endY - startY;
      
      // Create pattern matching Figma: horizontal start, then smooth dramatic curve
      // The line should start horizontally, then curve naturally to the target
      
      // First control point: extends horizontally, then starts curving
      const controlX1 = startX + distanceX * 0.35;
      const controlY1 = startY; // Keep horizontal initially
      
      // Second control point: creates the dramatic curve towards target
      // Position it to create a smooth, natural fan-out
      const controlX2 = startX + distanceX * 0.65;
      const controlY2 = startY + (curvature * 0.8) + (distanceY * 0.3);

      // Use cubic bezier for smooth, natural branching curves
      const pathData = `M ${startX},${startY} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
      setPath(pathData);
    };

    updatePath();

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", updatePath, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
      window.removeEventListener("scroll", updatePath, true);
    };
  }, [containerRef, fromRef, toRef, curvature]);

  if (!path || dimensions.width === 0) return null;

  return (
    <svg
      className="absolute left-0 top-0 pointer-events-none z-0"
      width={dimensions.width}
      height={dimensions.height}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
    >
      {/* Base path */}
      <path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeOpacity={opacity}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Animated flowing effect */}
      {animated && (
        <motion.path
          d={path}
          stroke={color}
          strokeWidth={strokeWidth * 1.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.9}
          strokeDasharray="8 4"
          initial={{ pathLength: 0, strokeDashoffset: 0 }}
          animate={{ 
            pathLength: 1,
            strokeDashoffset: [0, -12],
          }}
          transition={{
            duration: 2,
            delay: delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
        />
      )}
    </svg>
  );
};

