import React from "react";

export interface LineStep {
  logo: React.ReactNode;
  description: string;
}

interface LineSectionProps {
  title: string;
  steps: LineStep[];
}

const LineSection: React.FC<LineSectionProps> = ({ title, steps }) => {
  return (
    <section className="relative py-8 md:py-12 lg:py-16 xl:py-24 text-white overflow-visible font-space-grotesk">
      {/* HEADING */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center tracking-tight mb-32 md:mb-40 lg:mb-48 xl:mb-56">
        {title}
      </h2>

      {/* MOBILE FALLBACK - Hide timeline on small screens */}
      <div className="block md:hidden">
  <div className="max-w-lg mx-auto px-4">
    <ul className="space-y-8">
      {steps.map((step, index) => (
        <li key={index} className="flex items-start gap-4">
          <div className="flex-shrink-0 w-13 h-13 rounded-full bg-blue-700 flex items-center justify-center">
            {step.logo}
          </div>
          <p className="text-base font-medium pt-3 flex-1">
            {step.description}
          </p>
        </li>
      ))}
    </ul>
  </div>
</div>

      {/* TIMELINE WRAPPER - Hidden on mobile, shown on md+ */}
      <div className="hidden md:block relative max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 pb-20 md:pb-24 lg:pb-28 xl:pb-32">
        {/* HORIZONTAL LINE */}
        <div className="absolute left-0 right-0 top-[140px] md:top-[150px] lg:top-[160px] xl:top-[180px] border-t-2 border-white" />

        <div className="flex justify-between items-end">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center w-1/4"
            >
              {/* TEXT ON TOP OF VERTICAL LINE */}
              <div className="flex flex-col justify-end h-[60px] md:h-[70px] lg:h-[75px] xl:h-[80px]">
                <p className="text-base md:text-lg lg:text-xl xl:text-2xl max-w-[180px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[260px] text-center mb-16 md:mb-20 lg:mb-22 xl:mb-24 font-medium">
                  {step.description}
                </p>
              </div>

              {/* VERTICAL LINE */}
              <div className="absolute left-1/2 -translate-x-1/2 h-24 md:h-28 lg:h-32 xl:h-40 border-l-2 border-white opacity-30" />

              {/* CIRCLE — Responsive scaling, with logo */}
              <div className="absolute top-[140px] md:top-[150px] lg:top-[160px] xl:top-[180px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full bg-blue-700 z-10 flex items-center justify-center">
                {step.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LineSection;