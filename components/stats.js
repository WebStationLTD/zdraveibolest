export default function Stats() {
  const stats = [
    {
      number: "13",
      label: "терапевтични области",
    },
    {
      number: "100%",
      label: "проверена информация",
    },
    {
      number: "80+",
      label: "специалисти",
    },
    {
      number: "1",
      label: "мисия здраве,чрез знание и подкрепа",
    },
  ];

  return (
    <div className="relative px-5 pt-6 pb-8 md:pb-12">
      <div className="bg-[#035057] rounded-2xl md:rounded-3xl overflow-hidden">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="w-[90%] md:w-[80%] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center lg:text-left ${
                    index !== stats.length - 1
                      ? "lg:border-r lg:border-white/20"
                      : ""
                  } ${index === 0 ? "lg:pr-8" : ""} ${
                    index > 0 && index < stats.length - 1 ? "lg:px-8" : ""
                  } ${index === stats.length - 1 ? "lg:pl-8" : ""}`}
                >
                  <div className="flex flex-col">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 lg:mb-3 leading-none">
                      {stat.number}
                    </span>
                    <span className="text-sm md:text-base lg:text-lg text-white/95 font-normal leading-relaxed">
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
