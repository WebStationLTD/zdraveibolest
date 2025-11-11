import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative px-5 pt-8 md:pt-10">
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
                    Всеки нов медикамент, медицинско изделие или терапия преминава през клинични проучвания, за да бъде доказано, че е безопасен и ефективен.
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
            <div className="relative h-[350px] md:h-[450px] lg:h-auto">
                {/* Woman image */}
                <div className="absolute inset-0">
                  <img
                    src="/hero-image-desktop.jpg"
                    alt="Усмихната жена"
                    className="h-full w-full object-cover object-center lg:object-right"
                  />
                </div>

                {/* Decorative Orange Circles - Bottom Left */}
                <svg
                  className="absolute bottom-0 left-0 translate-y-[40%] translate-x-[-30%] w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80"
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="200" cy="200" r="160" stroke="#fd9300" strokeWidth="5" fill="none" opacity="0.9" />
                  <circle cx="200" cy="200" r="120" stroke="#fd9300" strokeWidth="5" fill="none" opacity="0.9" />
                  <circle cx="200" cy="200" r="80" stroke="#fd9300" strokeWidth="5" fill="none" opacity="0.9" />
                  <circle cx="200" cy="200" r="40" stroke="#fd9300" strokeWidth="5" fill="none" opacity="0.9" />
                </svg>

                {/* Decorative Orange Leaf/Plant - Top Right */}
                <svg
                  className="absolute top-8 right-8 md:top-12 md:right-12 lg:top-16 lg:right-16 w-28 h-40 md:w-36 md:h-52 lg:w-44 lg:h-64"
                  viewBox="0 0 200 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Stem */}
                  <path
                    d="M100 280 Q102 150 100 20"
                    stroke="#fd9300"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  
                  {/* Left leaves */}
                  <ellipse
                    cx="65"
                    cy="75"
                    rx="38"
                    ry="65"
                    fill="none"
                    stroke="#fd9300"
                    strokeWidth="4"
                    transform="rotate(-30 65 75)"
                    opacity="0.9"
                  />
                  <ellipse
                    cx="55"
                    cy="155"
                    rx="32"
                    ry="55"
                    fill="none"
                    stroke="#fd9300"
                    strokeWidth="4"
                    transform="rotate(-25 55 155)"
                    opacity="0.9"
                  />
                  <ellipse
                    cx="50"
                    cy="225"
                    rx="28"
                    ry="48"
                    fill="none"
                    stroke="#fd9300"
                    strokeWidth="4"
                    transform="rotate(-20 50 225)"
                    opacity="0.9"
                  />
                  
                  {/* Right leaves */}
                  <ellipse
                    cx="135"
                    cy="55"
                    rx="38"
                    ry="65"
                    fill="none"
                    stroke="#fd9300"
                    strokeWidth="4"
                    transform="rotate(30 135 55)"
                    opacity="0.9"
                  />
                  <ellipse
                    cx="145"
                    cy="135"
                    rx="32"
                    ry="55"
                    fill="none"
                    stroke="#fd9300"
                    strokeWidth="4"
                    transform="rotate(25 145 135)"
                    opacity="0.9"
                  />
                  <ellipse
                    cx="150"
                    cy="205"
                    rx="28"
                    ry="48"
                    fill="none"
                    stroke="#fd9300"
                    strokeWidth="4"
                    transform="rotate(20 150 205)"
                    opacity="0.9"
                  />
                  
                  {/* Top leaf */}
                  <ellipse
                    cx="100"
                    cy="25"
                    rx="28"
                    ry="45"
                    fill="none"
                    stroke="#fd9300"
                    strokeWidth="4"
                    opacity="0.9"
                  />
                </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
