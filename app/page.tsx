import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import WhatWeDo from "@/components/WhatWeDo";
import WhyBittensor from "@/components/WhyBittensor";
import Statistics from "@/components/Statistics";
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
      <Statistics />
      <FeaturedWorks 
        title="Featured Works"
        card={[
          {
            title: "Bittensor Validator",
            subtitle: "Stake Operations",
            image: "/whatweoffer/card1.png",
          },
          {
            title: "Subnet Registration",
            subtitle: "Cost Funding",
            image: "/whatweoffer/card2.png",
          },
          {
            title: "Subnet Audit/\nConsulting",
            image: "/whatweoffer/card3.png",
          },
          {
            title: "Taxation",  
            image: "/whatweoffer/card4.png",
          },
        ]}
      />
      <Insights />
      <BookACall />
      <Footer />
    </main>
  );
}
