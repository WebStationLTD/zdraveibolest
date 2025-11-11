import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative px-5 md:px-5 pt-6 md:pt-8">
        <div className="mx-auto w-full md:w-[80%]">
          <div className="relative bg-[#178D9D] rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] md:min-h-[600px]">
              {/* Left: Content */}
              <div className="relative z-10 px-6 md:px-8 lg:pl-0 lg:pr-12 py-10 md:py-12 lg:py-16 flex flex-col justify-center">
                <div className="max-w-xl">
                  {/* Small title */}
                  <p className="text-xs md:text-sm font-medium tracking-widest text-white/90 mb-4 md:mb-6 lg:mb-8">
                    ZDRAVEIBOLEST.BG
                  </p>

                  {/* Main heading */}
                  <h1 className="text-2xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-4 md:mb-6 lg:mb-8 leading-tight">
                    Клиничните проучвания – пътят към новите терапии
                  </h1>

                  {/* Description */}
                  <p className="text-sm md:text-base lg:text-lg text-white/95 mb-6 md:mb-8 lg:mb-10 leading-relaxed">
                    Всеки нов медикамент, медицинско изделие или терапия преминава през клинични проучвания, за да бъде доказано, че е безопасен и ефективен.
                  </p>

                  {/* CTA Button */}
                  <div>
                    <Link
                      href="#"
                      className="inline-block px-6 md:px-8 py-3 md:py-3.5 bg-[#FF9642] hover:bg-[#FF8C42] text-white text-sm md:text-base font-medium rounded-lg transition-colors shadow-lg"
                    >
                      Научи повече
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: Image with decorative elements */}
              <div className="relative h-[350px] md:h-[450px] lg:h-auto">
                {/* Woman image */}
                <div className="absolute inset-0 flex items-end justify-end">
                  <img
                    src="/hero-image-desktop.jpg"
                    alt="Woman"
                    className="h-full w-full object-cover object-center md:object-center lg:object-right"
                  />
                </div>

                {/* Decorative Orange Circles - Bottom Left */}
                <svg
                  className="absolute bottom-[-30px] left-[-30px] md:bottom-[-50px] md:left-[-50px] lg:bottom-[-60px] lg:left-[-60px] w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 opacity-80 md:opacity-90"
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Concentric circles */}
                  <circle cx="200" cy="200" r="160" stroke="#FF9642" strokeWidth="4" fill="none" />
                  <circle cx="200" cy="200" r="120" stroke="#FF9642" strokeWidth="4" fill="none" />
                  <circle cx="200" cy="200" r="80" stroke="#FF9642" strokeWidth="4" fill="none" />
                  <circle cx="200" cy="200" r="40" stroke="#FF9642" strokeWidth="4" fill="none" />
                </svg>

                {/* Decorative Orange Leaf/Plant - Top Right */}
                <svg
                  className="absolute top-4 right-4 md:top-8 md:right-8 lg:top-12 lg:right-12 w-24 h-36 md:w-32 md:h-48 lg:w-40 lg:h-56 opacity-80 md:opacity-90"
                  viewBox="0 0 200 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Stem */}
                  <path
                    d="M100 280 Q105 150 100 20"
                    stroke="#FF9642"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  
                  {/* Left leaves */}
                  <ellipse
                    cx="70"
                    cy="80"
                    rx="35"
                    ry="60"
                    fill="none"
                    stroke="#FF9642"
                    strokeWidth="3"
                    transform="rotate(-25 70 80)"
                  />
                  <ellipse
                    cx="60"
                    cy="150"
                    rx="30"
                    ry="50"
                    fill="none"
                    stroke="#FF9642"
                    strokeWidth="3"
                    transform="rotate(-20 60 150)"
                  />
                  
                  {/* Right leaves */}
                  <ellipse
                    cx="130"
                    cy="60"
                    rx="35"
                    ry="60"
                    fill="none"
                    stroke="#FF9642"
                    strokeWidth="3"
                    transform="rotate(25 130 60)"
                  />
                  <ellipse
                    cx="140"
                    cy="130"
                    rx="30"
                    ry="50"
                    fill="none"
                    stroke="#FF9642"
                    strokeWidth="3"
                    transform="rotate(20 140 130)"
                  />
                  
                  {/* Top leaf */}
                  <ellipse
                    cx="100"
                    cy="30"
                    rx="25"
                    ry="40"
                    fill="none"
                    stroke="#FF9642"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>

            {/* Contact Form - Positioned on the left edge */}
            <div className="absolute left-0 top-[65%] lg:top-[55%] -translate-y-1/2 hidden lg:block z-20">
              <div className="bg-white rounded-r-2xl shadow-2xl p-6 w-72">
                <div className="space-y-4">
                  <div className="border-l-4 border-transparent pl-0 -ml-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 pl-6 leading-tight">
                      Намерете клиничното изпитване за вас или помогнете на други хора:
                    </h3>
                    <p className="text-xs text-gray-600 mb-4 pl-6 leading-relaxed">
                      Регистрирайте се през кратка контактна форма, а ние ще се свържем с Вас.
                    </p>
                  </div>

                  {/* Form fields */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Имейл*
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#178D9D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#178D9D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Заболяване*
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#178D9D]"
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 h-4 w-4 text-[#178D9D] focus:ring-[#178D9D] border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="ml-2 text-xs text-gray-600">
                      Съгласен съм личните ми данни да бъдат обработвани за целите на регистрация в базата данни според{" "}
                      <Link href="#" className="text-[#178D9D] underline">
                        Политиката за поверителност.
                      </Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF9642] hover:bg-[#FF8C42] text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Регистрация
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
