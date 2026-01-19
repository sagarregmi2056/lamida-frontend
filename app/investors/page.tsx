 import Navigation from "@/components/Navigation";
 import Footer from "@/components/Footer";
 import Hero from "@/components/InvestorsHero";
 import WhatWeOffer from "@/components/CardGridSection";
 export default function InvestorsPage() {
   return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
       <Navigation />
      <Hero />
        <WhatWeOffer title="What We Offer Investors"
  imageDir="/investors"
  cardTitles={[
    "Curated Access to Bittensor Subnets",
    "Transparent Performance Insights",
    "Due Diligence & technical evaluation",
    "Long-term ecosystem alignment"
  ]} />
      <Footer />
    </main>
  );
}