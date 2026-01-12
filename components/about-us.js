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
          <div className="space-y-6 mb-10">
            {/* Intro Paragraph */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Да обединим знанието, опита и експертизата на лекари и учени, за
              да предоставим надеждна и човешка информация за най-честите
              заболявания в областите:
            </p>

            {/* Medical Areas with Custom Checkboxes */}
            <div className="space-y-4 mt-6">
              {/* Кардиология */}
              <div className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center group-hover:bg-[#04737d] transition-all duration-200">
                    <svg className="w-3 h-3 text-[#04737d] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#04737d]">Кардиология</span> – хипертония, аритмия, сърдечна недостатъчност
                </p>
              </div>

              {/* Пулмология */}
              <div className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center group-hover:bg-[#04737d] transition-all duration-200">
                    <svg className="w-3 h-3 text-[#04737d] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#04737d]">Пулмология</span> – астма, ХОББ, белодробни заболявания
                </p>
              </div>

              {/* Ендокринология */}
              <div className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center group-hover:bg-[#04737d] transition-all duration-200">
                    <svg className="w-3 h-3 text-[#04737d] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#04737d]">Ендокринология</span> – диабет, метаболитен синдром, заболявания на щитовидната жлеза
                </p>
              </div>

              {/* Неврология */}
              <div className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center group-hover:bg-[#04737d] transition-all duration-200">
                    <svg className="w-3 h-3 text-[#04737d] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#04737d]">Неврология</span> – мигрена, множествена склероза, Паркинсон, Алцхаймер
                </p>
              </div>

              {/* Ревматология */}
              <div className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center group-hover:bg-[#04737d] transition-all duration-200">
                    <svg className="w-3 h-3 text-[#04737d] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#04737d]">Ревматология</span> – ревматоиден артрит, болест на Бехтерев, остеопороза, лупус
                </p>
              </div>

              {/* Дерматология и имунология */}
              <div className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center group-hover:bg-[#04737d] transition-all duration-200">
                    <svg className="w-3 h-3 text-[#04737d] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#04737d]">Дерматология и имунология</span> – автоимунни и хронични възпалителни състояния
                </p>
              </div>

              {/* Още области */}
              <div className="flex items-start gap-3 group mt-6 pt-4 border-t border-gray-200">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded-full bg-[#fd9300]/10 border-2 border-[#fd9300] flex items-center justify-center group-hover:bg-[#fd9300] transition-all duration-200">
                    <svg className="w-3 h-3 text-[#fd9300] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed italic">
                  И още много заболявания в области като <span className="font-medium">гастроентерология, алергология, хематология, нефрология и акушер-генекология</span>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <Link
              href="/nashata-misiya"
              className="inline-block px-8 py-3.5 bg-[#fd9300] hover:bg-[#e48400] text-white text-base font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Научи повече
            </Link>
          </div>
        </div>

        {/* Right: Image - Full Height with Rounded Left Corners */}
        <div className="relative h-[400px] lg:h-auto">
          <img
            src="/who-we-are.jpg"
            alt="Кои сме ние - Нашият екип"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl lg:rounded-l-3xl lg:rounded-r-none"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
