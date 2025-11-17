import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="relative pl-5 bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Content */}
        <div className="relative z-10 py-16 md:py-20 lg:py-24 lg:pl-[calc((100vw-80vw)/2-20px)] lg:pr-8">
          {/* Small Title */}
          <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4 uppercase">
            ЗА НАС
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Кои сме ние
          </h2>

          {/* Decorative Line */}
          <div className="w-16 h-1 bg-[#04737d] rounded-full mb-8"></div>

          {/* Description Text */}
          <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed mb-8">
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl sodales lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            </p>
          </div>

          {/* CTA Button */}
          <div>
            <Link
              href="#"
              className="inline-block px-8 py-3.5 bg-[#fd9300] hover:bg-[#e48400] text-white text-base font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Научи повече
            </Link>
          </div>
        </div>

        {/* Right: Image - Full Height with Rounded Left Corners */}
        <div className="relative h-[400px] lg:h-auto">
          <img
            src="/menu-hero-image.jpg"
            alt="Медицински екип"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl lg:rounded-l-3xl lg:rounded-r-none"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

