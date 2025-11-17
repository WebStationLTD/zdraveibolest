import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative pt-16 md:pt-20 lg:pt-24 pb-0">
      {/* CTA Box with Background and Effects - 80% Container */}
      <div className="px-5">
        <div className="mx-auto w-[95%] md:w-[80%]">
          <div className="relative bg-[#04737d] rounded-3xl md:rounded-[2.5rem] overflow-hidden py-12 md:py-16 lg:py-20 px-6 md:px-12 mb-0">
            {/* Decorative Element - Top Left (Circles) */}
            <img
              src="/Register-section-Element-1.svg"
              alt=""
              className="absolute top-0 left-0 pointer-events-none opacity-30"
            />

            {/* Decorative Element - Bottom Right (Plant/Leaves) */}
            <img
              src="/Register-section-Element-2.svg"
              alt=""
              className="absolute bottom-0 right-0 pointer-events-none opacity-40"
            />

            {/* Content - Centered */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              {/* Main Heading */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Намерете клиничното изпитване за вас или помогнете на други
                хора:
              </h2>

              {/* Subheading */}
              <p className="text-base md:text-lg text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
                Регистрирайте се като попълните кратка контактна форма, а ние ще
                се свържем с Вас.
              </p>

              {/* CTA Button */}
              <Link
                href="#"
                className="inline-block px-10 py-4 bg-[#fd9300] hover:bg-[#e48400] text-white text-base md:text-lg font-medium rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Illustration - Full Width */}
      <div className="relative -mt-1">
        <img
          src="/Footer Illustration.svg"
          alt="Медицински специалисти"
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
    </section>
  );
}
