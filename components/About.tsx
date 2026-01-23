"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <div>
      <section className="relative min-h-screen px-6 lg:px-8 pt-24 overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute top-[30%] left-[-10%] w-[50%] h-[35%] bg-purple-800/30 blur-[180px] rounded-full" />
          <div className="absolute bottom-[30%] right-[-10%] w-[80%] h-[50%] bg-blue-800/30 blur-[180px] rounded-full" />
        </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white pt-36">
          Building the Backbone of the Decentralized AI
        </h1>

        <p className="text-base md:text-lg max-w-2xl font-medium tracking-tight pt-16 text-white">
          From idea to live subnet we help builders design, launch, and scale AI
          products on the Bittensor network.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-16">
          <button onClick={() => {
            const el = document.getElementById("book-call");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }} className="px-10 py-3.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-bold transition-all hover:scale-[1.02] shadow-xl shadow-purple-900/40">
            Work With Us
          </button>
        </div>
      </div>
      <h1 className="relative z-40 mb-16 md:mb-20 text-center text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white pt-36">
      Who We Are
    </h1>
    </section>

    {/* ===== WHO WE ARE SECTION ===== */}
  <section className="relative py-24 md:py-32 overflow-hidden bg-black">

    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Arc */}
      <div className="absolute bottom-[-180px] left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-t-full border-t border-white/50" />

       {/* Dots */}
      <div className="absolute z-20 top-[120px] left-[25%] w-22 h-22 bg-gray-200 rounded-full" />
      <div className="absolute z-20 top-[0px] left-[40%] w-22 h-22 bg-gray-200 rounded-full" />
      <div className="absolute z-20 top-[120px] right-[25%] w-22 h-22 bg-gray-200 rounded-full" />
      <div className="absolute z-20 top-[0px] right-[40%] w-22 h-22 bg-gray-200 rounded-full" />

      <div className="absolute z-30 bottom-[120px] left-1/2 -translate-x-1/2 px-6 text-center">
        <p className="text-xl md:text-3xl lg:text-4xl font-light text-gray-200 max-w-4xl leading-relaxed">
          Lamida is a Bittensor-focused studio working at the intersection of AI,
          Web3, and product execution.
        </p>
      </div>
    </div>
  </section>


  {/* ===== OUR MISSION SECTION ===== */}
      <section className="relative py-32 px-6 lg:px-8 bg-black">
        <h2 className="relative z-40 mb-16 md:mb-20 text-center text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white pt-36">
          Our Mission
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl border border-white bg-gradient-to-br from-[#0b0f2a] via-black to-black p-10 shadow-2xl">
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              <svg width="256" height="256" viewBox="0 0 256 256">
                <g transform="translate(128 128) rotate(-90)">
                  <circle r="88" cx="0" cy="0" fill="none" stroke="#2b08f3" strokeWidth="42" strokeDasharray="207 345" strokeDashoffset="0"/>
                  <circle r="88" cx="0" cy="0" fill="none" stroke="#2e5bbb" strokeWidth="32" strokeDasharray="152 400" strokeDashoffset="-207"/>
                  <circle r="88" cx="0" cy="0" fill="none" stroke="#06024b" strokeWidth="22" strokeDasharray="130 422" strokeDashoffset="-359"/>
                  <circle r="88" cx="0" cy="0" fill="none" stroke="#000716" strokeWidth="12" strokeDasharray="65 495" strokeDashoffset="-489"/>
                </g>
              </svg>

              <div className="absolute w-40 h-40 rounded-full bg-black flex items-center justify-center">
                <span className="text-2xl font-bold text-white">100%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10 text-gray-300 text-sm">
              <div>
                <p className="font-semibold text-white">30%</p>
                <p>Othym Foundation(unlocked tokens)</p>
              </div>
              <div>
                <p className="font-semibold text-white">40%</p>
                <p>34% Launch Partners (3 year vesting)</p>
              </div>
              <div>
                <p className="font-semibold text-white">26%</p>
                <p>Mythical Employees and Advisors (3 year vesting)</p>
              </div>
              <div>
                <p className="font-semibold text-white">14%</p>
                <p>Game Fund (3 year vesting)</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start text-left max-w-xl">
            <p className="text-3xl md:text-4xl font-semibold text-white leading-snug mb-10">
              Enable scalable, decentralized AI by supporting the people building it.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-16">
              <button onClick={() => {
                const el = document.getElementById("book-call");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }} className="px-10 py-3.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-bold transition-all hover:scale-[1.02] shadow-xl shadow-purple-900/40">
                Book a Call
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ===== HOW WE’RE DIFFERENT SECTION ===== */}
      <section className="relative z-0 py-32 px-6 lg:px-8 bg-black">
        <h2 className="relative z-10 text-center text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-24">
          How We're Different
        </h2>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-10 min-h-[280px] flex flex-col justify-end">
            <Image src="/icon.png" alt="icon" width={350} height={160} className="absolute top-6 left-6 object-contain" />
            <p className="relative text-xl md:text-2xl font-medium text-white">
              Ecosystem-first thinking
            </p>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-10 min-h-[280px] flex flex-col justify-end">
              <Image src="/icon.png" alt="icon" width={350} height={160} className="absolute top-6 left-6 object-contain" />
            <p className="relative text-xl md:text-2xl font-medium text-white">
              Technical + product depth
            </p>
          </div>


          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-full md:w-[60%] rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-10 min-h-[280px] flex flex-col justify-end">
              <Image src="/icon.png" alt="icon" width={350} height={160} className="absolute top-6 left-6 object-contain" />
              <p className="relative text-xl md:text-2xl font-medium text-white">
                Hands-on collaboration
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
   
  );
};

export default About;


