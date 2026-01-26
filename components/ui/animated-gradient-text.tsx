import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="group relative text-white mx-auto flex items-center justify-center  px-4 py-1.5  ">
   

    {children}

  </div>

  );
}

