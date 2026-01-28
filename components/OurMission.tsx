"use client";

const OurMission = () => {
  return (
    <section className="py-24 sm:py-32 px-6 lg:px-12 bg-black">
        <h2 className="relative z-10 text-center text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-24">
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
  );
};

export default OurMission;
