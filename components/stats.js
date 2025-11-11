export default function Stats() {
  const stats = [
    {
      number: "12",
      label: "години опит",
    },
    {
      number: "13",
      label: "терапевтични области",
    },
    {
      number: "25",
      label: "lorem ipsum dolor",
    },
    {
      number: "120",
      label: "lorem ipsum dolor",
    },
  ];

  return (
    <div className="relative px-5 md:px-5 pt-0 pb-8 md:pb-12">
      <div className="mx-auto w-full md:w-[80%]">
        <div className="bg-[#0F5F6B] rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="px-6 md:px-8 lg:pl-0 lg:pr-0 py-10 md:py-12 lg:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center lg:text-left ${
                    index !== stats.length - 1
                      ? "lg:border-r lg:border-white/20"
                      : ""
                  } ${index === 0 ? "" : "lg:pl-8 lg:pr-4"} ${
                    index === 0 ? "lg:pr-4" : ""
                  } ${index === stats.length - 1 ? "lg:pl-8" : ""}`}
                >
                  <div className="flex flex-col">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-3">
                      {stat.number}
                    </span>
                    <span className="text-sm md:text-base lg:text-lg text-white/90 font-normal leading-snug">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

