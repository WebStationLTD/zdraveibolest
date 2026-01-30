import Link from "next/link";
import StickyQuickRegisterWrapper from "../../components/StickyQuickRegisterWrapper";

/**
 * Our Mission Page
 * Full page dedicated to the mission and vision of the platform
 */

// Page metadata
export const metadata = {
  title: "Нашата мисия - Здраве и Болест",
  description:
    "Нашата мисия е да обединим знанието, опита и експертизата на лекари и учени, за да предоставим надеждна и човешка информация за най-честите заболявания.",
  openGraph: {
    title: "Нашата мисия - Здраве и Болест",
    description:
      "Нашата мисия е да обединим знанието, опита и експертизата на лекари и учени.",
    images: [
      {
        url: "/who-we-are.jpg",
        width: 1200,
        height: 630,
        alt: "Нашата мисия",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
};

export default function OurMissionPage() {
  return (
    <>
      <StickyQuickRegisterWrapper />

      {/* Hero Section */}
      <section className="relative px-5 pt-5 pb-12 md:pb-16 lg:pb-20">
        <div className="relative bg-[#04737d] rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="py-16 md:py-20 lg:py-24">
            <div className="w-[90%] md:w-[80%] mx-auto text-center">
              <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-white/90 mb-5 md:mb-6 uppercase">
                НАШАТА МИСИЯ
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Мисията на &ldquo;Здраве и Болест&rdquo;
              </h1>
              <div className="w-20 h-1 bg-[#fd9300] rounded-full mx-auto mb-8"></div>
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed">
                Твоето място за информация, грижа и надежда
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="px-5 py-12 md:py-16 lg:py-20 bg-white">
        <div className="w-[90%] md:w-[80%] mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
              &ldquo;Здраве и Болест&rdquo; е създаден с една ясна цел – да помогне на всеки човек да разбира по-добре своето здраве и да има достъп до проверена, достъпна и съвременна медицинска информация.
            </p>
          </div>
          <div className="text-center">
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
              Чрез сътрудничеството ни с медицински центрове и изследователски организации, предлагаме и възможност за достъп до по-иновативни терапии и нови лечебни подходи.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section with Bullets */}
      <section className="px-5 py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="w-[90%] md:w-[80%] mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4 uppercase">
              НАШАТА ВИЗИЯ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Нашата мисия
            </h2>
            <div className="w-16 h-1 bg-[#04737d] rounded-full mx-auto mb-8"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Да обединим знанието, опита и експертизата на лекари и учени, за да предоставим надеждна и човешка информация за най-честите заболявания в областите:
            </p>
          </div>

          {/* Medical Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Кардиология */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#04737d] text-lg mb-1">Кардиология</h3>
                <p className="text-sm md:text-base text-gray-700">хипертония, аритмия, сърдечна недостатъчност</p>
              </div>
            </div>

            {/* Пулмология */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#04737d] text-lg mb-1">Пулмология</h3>
                <p className="text-sm md:text-base text-gray-700">астма, ХОББ, белодробни заболявания</p>
              </div>
            </div>

            {/* Ендокринология */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#04737d] text-lg mb-1">Ендокринология</h3>
                <p className="text-sm md:text-base text-gray-700">диабет, метаболитен синдром, заболявания на щитовидната жлеза</p>
              </div>
            </div>

            {/* Неврология */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#04737d] text-lg mb-1">Неврология</h3>
                <p className="text-sm md:text-base text-gray-700">мигрена, множествена склероза, Паркинсон, Алцхаймер</p>
              </div>
            </div>

            {/* Ревматология */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#04737d] text-lg mb-1">Ревматология</h3>
                <p className="text-sm md:text-base text-gray-700">ревматоиден артрит, болест на Бехтерев, остеопороза, лупус</p>
              </div>
            </div>

            {/* Дерматология и имунология */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded bg-[#04737d]/10 border-2 border-[#04737d] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#04737d] text-lg mb-1">Дерматология и имунология</h3>
                <p className="text-sm md:text-base text-gray-700">автоимунни и хронични възпалителни състояния</p>
              </div>
            </div>
          </div>

          {/* Additional Areas */}
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-[#fd9300]/5 to-[#fd9300]/10 rounded-xl border-2 border-[#fd9300]/20">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-[#fd9300]/10 border-2 border-[#fd9300] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#fd9300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </section>

      {/* Philosophy Section */}
      <section className="px-5 py-12 md:py-16 lg:py-20 bg-white">
        <div className="w-[90%] md:w-[80%] mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4 uppercase">
              НАШАТА ФИЛОСОФИЯ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Нашата философия
            </h2>
            <div className="w-16 h-1 bg-[#04737d] rounded-full mx-auto"></div>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="p-6 md:p-8 bg-gradient-to-br from-[#04737d]/5 to-[#04737d]/10 rounded-2xl border-l-4 border-[#04737d]">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                Здравето започва със знанието, а знанието идва от достъпна и точна информация.
              </p>
            </div>

            <div className="p-6 md:p-8 bg-gradient-to-br from-[#04737d]/5 to-[#04737d]/10 rounded-2xl border-l-4 border-[#04737d]">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                Социално значимите заболявания не засягат само тялото – те променят начина на живот, мислите и емоциите.
              </p>
            </div>

            <div className="p-6 md:p-8 bg-gradient-to-br from-[#fd9300]/5 to-[#fd9300]/10 rounded-2xl border-l-4 border-[#fd9300]">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                Затова нашата мисия е да създадем пространство, където медицината става човешка, а знанието – достъпно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Main Functions Section */}
      <section className="px-5 py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="w-[90%] md:w-[80%] mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4 uppercase">
              КАКВО ПРЕДЛАГАМЕ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Основни функции на платформата
            </h2>
            <div className="w-16 h-1 bg-[#04737d] rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Information about diseases */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#04737d]">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#04737d] to-[#035057] rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Информация за заболявания
              </h3>
              <p className="text-base text-gray-700 leading-relaxed text-center">
                Подробна и достъпна информация за социално значимите заболявания, симптоми, диагностика и лечение.
              </p>
            </div>

            {/* Column 2: Articles */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#fd9300]">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#fd9300] to-[#e48400] rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Статии
              </h3>
              <p className="text-base text-gray-700 leading-relaxed text-center">
                Актуални статии за иновативни терапии, клинични проучвания и съвременни методи на лечение.
              </p>
            </div>

            {/* Column 3: Registration */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#04737d]">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#04737d] to-[#035057] rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Регистрация
              </h3>
              <p className="text-base text-gray-700 leading-relaxed text-center">
                Регистрирайте се за пълен достъп до експертни коментари, специализирани рубрики и новини.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Find Section */}
      <section className="px-5 py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="w-[90%] md:w-[80%] mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4 uppercase">
              НАШЕТО СЪДЪРЖАНИЕ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Какво ще намерите в &ldquo;Здраве и Болест&rdquo;
            </h2>
            <div className="w-16 h-1 bg-[#04737d] rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#04737d]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Достоверна информация</h3>
              <p className="text-gray-700 leading-relaxed">написана и проверена от специалисти.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#04737d]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Актуални новини</h3>
              <p className="text-gray-700 leading-relaxed">за иновативни терапии, клинични проучвания, биотехнологии и съвременни методи на лечение.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#04737d]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Полезни съвети</h3>
              <p className="text-gray-700 leading-relaxed">за профилактика, грижа и подкрепа при хронични заболявания.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#04737d]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Разбираеми обяснения</h3>
              <p className="text-gray-700 leading-relaxed">превеждаме сложния медицински език на човешки.</p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#04737d]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Вдъхновяващи истории</h3>
              <p className="text-gray-700 leading-relaxed">защото здравето не е само диагноза, а и надежда.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="px-5 py-12 md:py-16 lg:py-20 bg-white">
        <div className="w-[90%] md:w-[80%] mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4 uppercase">
              ЗА КОГО Е ПОРТАЛЪТ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              За кого е нашият портал
            </h2>
            <div className="w-16 h-1 bg-[#04737d] rounded-full mx-auto"></div>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Item 1 */}
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-[#04737d] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                За всеки, който има здравословен проблем – независимо дали е остро, хронично или периодично състояние – и търси ясно, достъпно и надеждно обяснение.
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-[#04737d] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                За хората, които се грижат за своите близки и искат да разбират по-добре диагнозата, лечението и възможностите за подкрепа.
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-[#04737d] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                За всички, които искат да се информират навреме, да разпознават симптомите и да предприемат правилните стъпки към профилактика и ранна диагностика.
              </p>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-[#04737d] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                За пациенти, които се интересуват от съвременни и иновативни методи на лечение, включително нови медикаменти, биотехнологии и <Link href="/klinichni-prouchvaniya" className="text-[#04737d] font-medium hover:text-[#035057] underline transition-colors">клинични проучвания</Link>.
              </p>
            </div>

            {/* Item 5 */}
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-[#04737d] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                За младите хора, които искат да изградят здравословни навици и да разберат как начинът на живот влияе върху тяхното бъдещо здраве.
              </p>
            </div>

            {/* Item 6 */}
            <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-[#fd9300]/10 to-[#fd9300]/5 rounded-xl border-2 border-[#fd9300]/30">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-[#fd9300] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                За всеки, който вярва, че знанието е най-добрата превенция, а достъпната информация – най-сигурният път към добро здраве.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Benefits Section */}
      <section className="px-5 py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-[90%] md:w-[80%] mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#04737d] to-[#035057] rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-xl">
            <div className="w-16 h-16 bg-[#fd9300] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              Регистрирайте се за пълен достъп
            </h2>
            <p className="text-base md:text-lg text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
              След регистрация в &ldquo;Здраве и Болест&rdquo; потребителите получават достъп до пълното съдържание на портала, включително детайлни статии, експертни коментари, специализирани рубрики и най-актуалните новини и иновации в медицината и здравеопазването.
            </p>
            <Link
              href="/register"
              className="inline-block px-10 py-4 bg-[#fd9300] hover:bg-[#e48400] text-white text-base md:text-lg font-medium rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-5 py-12 md:py-16 lg:py-20 bg-white">
        <div className="w-[90%] md:w-[80%] mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Присъединете се към нас
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
            Започнете пътуването си към по-добро разбиране на здравето и медицината
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-block px-8 py-3.5 bg-[#04737d] hover:bg-[#035057] text-white text-base font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Разгледайте статиите
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-white hover:bg-gray-50 text-[#04737d] text-base font-medium rounded-lg border-2 border-[#04737d] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Свържете се с нас
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
