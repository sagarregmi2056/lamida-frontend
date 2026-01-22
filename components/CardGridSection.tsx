type Card = {
  title: string;
  img: string;
};

interface CardGridSectionProps {
  title: string;
  cards: Card[];
}

export default function CardGridSection({ title, cards }: CardGridSectionProps) {
  return (
    <section className="px-4 sm:px-8 md:px-12 py-10 md:py-20 text-white">
      {/* Heading */}
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight mb-20 inline-block z-20 relative">
        {title}
      </h2>

      {/* Card Grid */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-8 md:gap-y-10 w-full max-w-6xl">
          {cards.map((card, idx) => (
            <div
              key={card.title}
              className="
              group
                w-full
                max-w-[617px]
                h-[260px] sm:h-[320px] md:h-[356px]
                border
                border-gray-700
                rounded-[15.74px]
                p-4 sm:p-6
                flex
                flex-col
                mx-auto
                 transition-all
                duration-300
                 hover:border-white/20 hover:bg-[#0D0D0D]
              "
            >
              <div className="h-32 sm:h-40 md:h-44 bg-black-200 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-black/20 transition-colors duration-500">
                <img src={card.img} alt={card.title} className="h-full max-h-full object-contain group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"/>
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-center mt-auto">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

