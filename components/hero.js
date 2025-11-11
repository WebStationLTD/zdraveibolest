import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative px-5 pt-5">
        <div className="relative bg-[#04737d] rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] md:min-h-[550px]">
            {/* Left: Content */}
            <div className="relative z-10 flex flex-col justify-center py-12 md:py-16 lg:py-20">
              <div className="w-[90%] md:w-[80%] mx-auto max-w-xl">
                {/* Small title */}
                <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-white/90 mb-5 md:mb-6 uppercase">
                  ZDRAVEIBOLEST.BG
                </p>

                {/* Main heading */}
                <h1 className="text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-white mb-5 md:mb-6 leading-tight">
                  Клиничните проучвания – пътят към новите терапии
                </h1>

                {/* Description */}
                <p className="text-base md:text-base lg:text-[1.05rem] text-white/95 mb-8 md:mb-9 leading-relaxed">
                  Всеки нов медикамент, медицинско изделие или терапия преминава
                  през клинични проучвания, за да бъде доказано, че е безопасен
                  и ефективен.
                </p>

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
            </div>

            {/* Right: Image with decorative elements */}
            <div className="relative h-[150px] md:h-[250px] lg:h-auto">
              {/* Mountain Effect Background - Hero-Element-3 - Най-отзад (z-0) */}
              <img
                src="/Hero-Element-3.svg"
                alt=""
                className="absolute bottom-0 right-0 h-auto z-0"
              />

              {/* Decorative Orange Circles - Hero-Element-1 - Долу вляво, половината излиза (z-10) */}
              <img
                src="/Hero-Element-1.svg"
                alt=""
                className="absolute bottom-0 left-0 w-72 md:w-96 lg:w-[28rem] xl:w-[32rem] h-auto z-10"
                style={{ transform: "translateX(-20%) translateY(40%)" }}
              />

              {/* Woman image - Долу, най-висок z-index (z-30) */}
              <img
                src="/hero-woman-bg.png"
                alt="Усмихната жена"
                className="hidden lg:block absolute bottom-0 left-0 lg:left-8 xl:left-32 h-[85%] md:h-[90%] lg:h-[95%] w-auto z-30"
              />

              {/* Decorative Orange Plant - Hero-Element-2 - Горе вдясно (z-20) */}
              <img
                src="/Hero-Element-2.svg"
                alt=""
                className="absolute bottom-0 right-20 md:bottom-0 md:right-30 lg:bottom-0 lg:right-40 xl:right-50 w-32 md:w-40 lg:w-48 xl:w-56 h-auto z-20"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
