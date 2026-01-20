 import Navigation from "@/components/Navigation";
 import Footer from "@/components/Footer";
 import Hero from "@/components/InvestorsHero";
 import WhatWeOffer from "@/components/CardGridSection";
 import PastInvestorSuccess from "@/components/FeaturedWorks";
 import BookACall from "@/components/BookACall";
import HowWeWork from "@/components/LineSection";
import { Map, CodeXml, CloudCheck, Server } from "lucide-react";
 export default function InvestorsPage() {
   return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
       <Navigation />
      <Hero />
        <WhatWeOffer
          title="What We Offer Investors"
          cards={[
            { title: "Curated Access to Bittensor Subnets", img: "/investors/1.png" },
            { title: "Transparent Performance Insights", img: "/investors/2.png" },
            { title: "Due Diligence & technical evaluation", img: "/investors/3.png" },
            { title: "Long-term ecosystem alignment", img: "/investors/4.png" }
          ]}
        />
        <HowWeWork
          title="How We Work"
          steps={[
            { logo: <Server size={32} className="text-white" />, description: "Thesis-Driven Research" },
            { logo: <CodeXml size={32} className="text-white" />, description: "Technical and token Evaluation" },
            { logo: <Map size={32} className="text-white" />, description: "Ecosystem alignment check" },
            { logo: <CloudCheck size={32} className="text-white" />, description: "Ongoing performance tracking" },
          ]}
        />
  <PastInvestorSuccess />
        <BookACall id="book-a-call" />

      <Footer />
    </main>
  );
}