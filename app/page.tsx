import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import WhatWeDo from "@/components/WhatWeDo";
import WhyBittensor from "@/components/WhyBittensor";
import Statistics from "@/components/Statistics";
import FeaturedWorks from "@/components/FeaturedWorks";
import Insights from "@/components/Insights";
import BookACall from "@/components/BookACall";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      <Hero />
      <Logos />
      <WhatWeDo />
      <WhyBittensor />
      <Statistics />
      <FeaturedWorks />
      <Insights />
      <BookACall/>
    </main>
  );
}
