"use client";
import React from "react";

const AboutHero = () => {
  const scrollToCall = () => {
    document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen px-6 sm:px-10 lg:px-16 pt-24 bg-black overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[15%] -left-[10%] w-[60%] h-[30%] bg-blue-600/50 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] left-[30%] w-[40%] h-[20%] bg-purple-700/20 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] -right-[0%] w-[60%] h-[50%] bg-blue-700/70 blur-[130px] rounded-full" />
      </div>
      <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#7a7886 1px, transparent 1px), linear-gradient(90deg,#656676 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent calc(100% - 320px), black 100%)",
        }}
      />  
    </div>


      <div className="relative z-10 max-w-5xl mx-auto text-center pt-32">
        <h1 className="relative z-40 mb-16 md:mb-20 text-center text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white pt-36">
          Building the Backbone of the Decentralized AI
        </h1>

        <p className="mt-10 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
          From idea to live subnet we help builders design, launch, and scale AI
          products on the Bittensor network.
        </p>

        <button
          onClick={scrollToCall}
          className="mt-12 px-8 sm:px-10 py-3.5 bg-blue-700 hover:bg-blue-600 rounded-xl font-bold transition hover:scale-105 shadow-xl"
        >
          Work With Us
        </button>
      </div>
    </section>
  );
};

export default AboutHero;
