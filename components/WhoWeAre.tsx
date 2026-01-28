const WhoWeAre = () => {
  return (
    <section className="relative py-24 md:py-32 bg-black">
        <h2 className="absolute top-0 left-1/2 -translate-x-1/2 z-10 text-center text-5xl md:text-6xl lg:text-7xl font-extrabold text-white pt-8">
             Who We Are
        </h2>
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
  );
};

export default WhoWeAre;
