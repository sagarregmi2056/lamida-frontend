export default function CardGridSection({ title, imageDir, cardTitles }) {
  return (
    <section className="px-12 py-20 text-white">
      {/* Heading */}
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight mb-20">
        {title}
      </h2>

      {/* Card Grid */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          {cardTitles.map((cardTitle, idx) => (
            <div
              key={cardTitle}
              className="
                w-[617px]
                h-[356px]
                border
                border-gray-700
                rounded-[15.74px]
                p-6
                flex
                flex-col
              "
            >
              <div className="h-100 bg-black-200 flex items-center justify-center mb-6">
                {/* Use separate image directory for different pages and save img as 1.png, 2.png, etc. */}
                <img src={`${imageDir}/${idx + 1}.png`} alt={cardTitle} className="h-44 object-contain" />
              </div>

              <h3 className="text-xl font-semibold text-center mt-auto">
                {cardTitle}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

