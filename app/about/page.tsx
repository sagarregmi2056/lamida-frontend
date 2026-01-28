import React from "react";
import Navigation from "@/components/Navigation";
import AboutHero from "@/components/AboutHero";
import WhoWeAre from "@/components/WhoWeAre";
import OurMission from "@/components/OurMission";
import HowWeAreDIfferent from "@/components/HowWeAreDIfferent";
import Footer from "@/components/Footer";
import BookACall from "@/components/BookACall";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <AboutHero />
      <WhoWeAre />
      <OurMission />
      <HowWeAreDIfferent />
      <BookACall />
      <Footer />
    </>
  );
}
