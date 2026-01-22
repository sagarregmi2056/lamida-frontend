 import Navigation from "@/components/Navigation";
 import Footer from "@/components/Footer";
 import Hero from "@/components/InvestorsHero";
 import PastInvestorSuccess from "@/components/FeaturedWorks";
 import BookACall from "@/components/BookACall";
import HowWeWork from "@/components/LineSection";
import { Map, CodeXml, CloudCheck, Server } from "lucide-react";
 export default function InvestorsPage() {
   return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
       <Navigation />
      <Hero />
        <HowWeWork
          title="How We Work"
          steps={[
            { logo: <Server size={32} className="text-white" />, description: "Thesis-Driven Research" },
            { logo: <CodeXml size={32} className="text-white" />, description: "Technical and token Evaluation" },
            { logo: <Map size={32} className="text-white" />, description: "Ecosystem alignment check" },
            { logo: <CloudCheck size={32} className="text-white" />, description: "Ongoing performance tracking" },
          ]}
        />
  <PastInvestorSuccess 
    title="Past Investor Success"
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
        <BookACall  />

      <Footer />
    </main>
  );
}