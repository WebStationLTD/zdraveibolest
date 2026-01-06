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
              Да обединим знанието, опита и експертизата на лекари и учени, за
              да предоставим надеждна и човешка информация за най-честите
              заболявания в областите:
            </p>
            <ul>
              <li>
                Кардиология – хипертония, аритмия, сърдечна недостатъчност
              </li>
              <li>Пулмология – астма, ХОББ, белодробни заболявания</li>
              <li>
                Ендокринология – диабет, метаболитен синдром, заболявания на
                щитовидната жлеза
              </li>
              <li>
                Неврология – мигрена, множествена склероза, Паркинсон, Алцхаймер
              </li>
              <li>
                Ревматология – ревматоиден артрит, болест на Бехтерев,
                остеопороза, лупус
              </li>
              <li>
                Дерматология и имунология – автоимунни и хронични възпалителни
                състояния
              </li>
              <li>
                И още много заболявания в области като гастроентерология,
                алергология, хематология, нефрология и акушер-генекология
              </li>
            </ul>
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
