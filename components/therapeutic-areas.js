import Link from "next/link";

export default function TherapeuticAreas() {
  const areas = [
    { name: "Пулмология", icon: "/пулмология-icon.svg", href: "/kategoriya/пулмология" },
    { name: "Ревматология", icon: "/ревматология-icon.svg", href: "/kategoriya/ревматология" },
    { name: "Кардиология", icon: "/кардиология-icon.svg", href: "/kategoriya/кардиология" },
    { name: "Неврология", icon: "/неврология-icon.svg", href: "/kategoriya/неврология" },
    { name: "Нефрология", icon: "/нефрология-icon.svg", href: "/kategoriya/нефрология" },
    { name: "Гастроентерология", icon: "/гастроентерология-icon.svg", href: "/kategoriya/гастроентерология" },
    { name: "Ендокринология", icon: "/ендокринология-icon.svg", href: "/kategoriya/ендокринология" },
    { name: "Онкология", icon: "/онкология-icon.svg", href: "/kategoriya/онкология" },
    { name: "Алергология", icon: "/алергология-icon.svg", href: "/kategoriya/алергология" },
    { name: "Дерматология", icon: "/дерматология-icon.svg", href: "/kategoriya/дерматология" },
    { name: "Ранни фази", icon: "/ранни-фази-icon.svg", href: "/kategoriya/ранни-фази" },
    { name: "Хематология", icon: "/хематология-icon.svg", href: "/kategoriya/хематология" },
    { name: "Акушер-гинекология", icon: "/акушер-гинекология-icon.svg", href: "/kategoriya/акушер-гинекология" },
  ];

  return (
    <section className="relative px-5 pt-5 pb-16 md:pb-20 lg:pb-24">
      <div className="mx-auto w-[95%] md:w-[80%]">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Small Title */}
          <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4 uppercase">
            КРАТЪК ТЕКСТ
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Терапевтични области
          </h2>

          {/* Decorative Line */}
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-[#fd9300] rounded-full"></div>
          </div>
        </div>

        {/* Grid of Therapeutic Areas */}
        <div className="space-y-4 md:space-y-5">
          {/* First 10 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {areas.slice(0, 10).map((area, index) => (
              <Link
                key={index}
                href={area.href}
                className="group relative bg-white rounded-2xl border border-[#04737d] p-6 md:p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center"
              >
                {/* Icon */}
                <div className="mb-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <img
                    src={area.icon}
                    alt={area.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Area Name */}
                <h3 className="text-base md:text-lg font-normal text-gray-900 group-hover:text-[#04737d] transition-colors">
                  {area.name}
                </h3>
              </Link>
            ))}
          </div>

          {/* Last 3 cards - Equal width */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {areas.slice(10).map((area, index) => (
              <Link
                key={index + 10}
                href={area.href}
                className="group relative bg-white rounded-2xl border border-[#04737d] p-6 md:p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center"
              >
                {/* Icon */}
                <div className="mb-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <img
                    src={area.icon}
                    alt={area.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Area Name */}
                <h3 className="text-base md:text-lg font-normal text-gray-900 group-hover:text-[#04737d] transition-colors">
                  {area.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

