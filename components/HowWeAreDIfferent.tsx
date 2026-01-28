import Image from "next/image";

const HowWeAreDIfferent = () => {
  return (
    <section className="py-24 sm:py-32 px-6 lg:px-12 bg-black">
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
  );
};

export default HowWeAreDIfferent;
