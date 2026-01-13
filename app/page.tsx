import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import WhatWeDo from "@/components/WhatWeDo";
import WhyBittensor from "@/components/WhyBittensor";
import FeaturedWorks from "@/components/FeaturedWorks";
import Insights from "@/components/Insights";
import BookACall from "@/components/BookACall";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      <Navigation />
      <Hero />
      <Logos />
      <WhatWeDo />
      <WhyBittensor />
      <FeaturedWorks />
      <Insights />
      <BookACall />
      <Footer />
    </main>
  );
}
