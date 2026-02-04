import Link from "next/link";
import Image from "next/image";
import {
  BeakerIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  SparklesIcon,
  CurrencyEuroIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Клинични проучвания - Научете повече за иновативните терапии",
  description:
    "Открийте как клиничните проучвания променят медицината. Научете повече за процеса, ползите и как можете да участвате в иновативни терапии.",
};

export default function ClinicalTrialsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#238C96] to-[#1a6b73] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 blur-3xl"></div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2">
          {/* Left Content */}
          <div className="py-20 md:py-32 px-8 md:px-16 lg:px-20 flex items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Пътят на пациента
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Научете повече за стъпките в клиничното изпитване - от първия
                контакт до финалното посещение. Прозрачен и сигурен процес за вашето
                участие.
              </p>
              <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-[#fd9300] text-white font-semibold hover:bg-[#e48400] transition-colors rounded-lg"
              >
                ЗАПОЧНЕТЕ СЕГА
              </Link>
              <button className="px-8 py-4 bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors flex items-center gap-2 backdrop-blur-sm rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  ГЛЕДАЙТЕ ВИДЕО
                </button>
              </div>
            </div>
          </div>

          {/* Right Image - Full 50% width */}
          <div className="relative h-[500px] lg:h-[700px]">
            <Image
              src="/our-mission.jpg"
              alt="Medical Research"
              fill
              className="object-cover"
              priority
            />
            {/* Stats Badge */}
            <div className="absolute bottom-8 right-8 bg-white p-5 shadow-2xl flex items-start gap-4 max-w-[300px] rounded-2xl">
              <div className="w-14 h-14 flex-shrink-0">
                <Image
                  src="/who-we-are.jpg"
                  alt="Team"
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <div className="text-4xl font-bold text-[#238C96] leading-none mb-2">
                  150<span className="text-[#fd9300]">+</span>
                </div>
                <div className="text-sm text-gray-600 leading-tight">
                  Research Completed<br />for Industry Partners
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Активно си сътрудничим с институции и биотехнологични компании
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {[
              "Sitemark",
              "Automation",
              "Greenish",
              "ProNature",
              "FocalPoint",
            ].map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-white rounded-2xl"
              >
                <div className="text-2xl font-bold text-gray-400">
                  {partner}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-[95%] md:w-[85%] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/our-mission.jpg"
              alt="Laboratory Solutions"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Как протича участието?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Всяка стъпка е внимателно планирана за вашата безопасност и
              комфорт. От първия контакт до финалното посещение, нашият екип е до
              вас, за да осигури най-добрата грижа и подкрепа през целия процес.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#238C96] flex items-center justify-center flex-shrink-0 rounded-lg">
                  <ClipboardDocumentCheckIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Иновативно лечение
                  </h3>
                  <p className="text-sm text-gray-600">
                    Получавате шанс за съвременно и иновативно лечение, което може да предложи по-добър контрол върху заболяването.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#238C96] flex items-center justify-center flex-shrink-0 rounded-lg">
                  <BeakerIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Специализирана грижа
                  </h3>
                  <p className="text-sm text-gray-600">
                    През цялото време сте под грижите на специализиран екип, който следи внимателно вашето здраве.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              С вашето участие помагате за напредъка на медицината и допринасяте
              за по-добро бъдещо лечение на хора със същото заболяване.
            </p>

            <Link
              href="/nashata-misiya"
              className="inline-block px-8 py-4 bg-[#fd9300] text-white font-semibold hover:bg-[#e48400] transition-colors rounded-lg"
            >
              НАУЧЕТЕ ПОВЕЧЕ
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Image in Center with 4 cards around */}
      <section className="py-20 bg-[#0f172a]">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Защо да участвате в клинични изпитвания
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Вашето участие носи множество ползи за вас и обществото. Открийте как можете да получите достъп до иновативни терапии.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Grid Layout - 3 columns: 2 cards left | image center | 2 cards right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Left Column - 2 Cards Stacked */}
              <div className="flex flex-col gap-6 md:gap-8">
                {/* Feature Card 1 - Top Left */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 text-center hover:shadow-2xl transition-all min-h-[240px] lg:h-[280px] flex flex-col justify-center rounded-2xl">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#238C96] flex items-center justify-center mx-auto mb-4 md:mb-5 rounded-lg">
                    <BeakerIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Иновативно лечение
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Получавате шанс за съвременно и иновативно лечение, което може да предложи по-добър контрол върху заболяването.
                  </p>
                </div>

                {/* Feature Card 3 - Bottom Left */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 text-center hover:shadow-2xl transition-all min-h-[240px] lg:h-[280px] flex flex-col justify-center rounded-2xl">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#238C96] flex items-center justify-center mx-auto mb-4 md:mb-5 rounded-lg">
                    <ShieldCheckIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Реимбурсация
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Компенсация за вашето време, усилия и транспортни разходи.
                  </p>
                </div>
              </div>

              {/* Center Column - Large Image */}
              <div className="relative h-[400px] lg:h-full lg:min-h-[500px] order-first lg:order-none rounded-2xl overflow-hidden">
                <Image
                  src="/who-we-are.jpg"
                  alt="Research Team"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Column - 2 Cards Stacked */}
              <div className="flex flex-col gap-6 md:gap-8">
                {/* Feature Card 2 - Top Right */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 text-center hover:shadow-2xl transition-all min-h-[240px] lg:h-[280px] flex flex-col justify-center rounded-2xl">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#238C96] flex items-center justify-center mx-auto mb-4 md:mb-5 rounded-lg">
                    <UserGroupIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Специализирана грижа
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    През цялото време сте под грижите на специализиран екип, който следи внимателно вашето здраве.
                  </p>
                </div>

                {/* Feature Card 4 - Bottom Right */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 text-center hover:shadow-2xl transition-all min-h-[240px] lg:h-[280px] flex flex-col justify-center rounded-2xl">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#238C96] flex items-center justify-center mx-auto mb-4 md:mb-5 rounded-lg">
                    <ClipboardDocumentCheckIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Помагате на другите
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    С вашето участие помагате за напредъка на медицината и допринасяте за по-добро бъдещо лечение на хора със същото заболяване.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Стъпките на клиничното{" "}
                <span className="relative inline-block z-0">
                  изпитване
                  <span className="absolute bottom-[0.15em] left-0 w-full h-[0.35em] bg-gradient-to-r from-[#f57c00] via-[#ffa726] to-[#ffd54f] z-[-1]"></span>
                </span>
              </h2>
            </div>
            <div>
              <p className="text-lg text-gray-600 leading-relaxed">
                От първия контакт до финалното посещение - всяка стъпка е внимателно планирана за вашата безопасност, комфорт и успешно участие.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 - Fixed overlay */}
            <div className="group hover:shadow-2xl transition-all rounded-2xl overflow-hidden">
              <div className="relative h-[450px]">
                <Image
                  src="/our-mission.jpg"
                  alt="Chemical Research"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay white box in bottom left - larger and better positioned */}
                <div className="absolute bottom-8 left-8 bg-white p-8 w-[calc(100%-4rem)] shadow-xl rounded-xl">
                  <div className="w-14 h-14 bg-[#238C96] flex items-center justify-center mb-5 rounded-lg">
                    <BeakerIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    Първа стъпка – свързване с нас
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Попълнете форма за контакт или се обадете. Нашият екип ще отговори на всички ваши въпроси.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Card 2 - Fixed overlay */}
            <div className="group hover:shadow-2xl transition-all rounded-2xl overflow-hidden">
              <div className="relative h-[450px]">
                <Image
                  src="/who-we-are.jpg"
                  alt="Analytical Chemistry"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay white box in bottom left - larger and better positioned */}
                <div className="absolute bottom-8 left-8 bg-white p-8 w-[calc(100%-4rem)] shadow-xl rounded-xl">
                  <div className="w-14 h-14 bg-[#238C96] flex items-center justify-center mb-5 rounded-lg">
                    <ShieldCheckIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    Разговор с координатор
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Обсъждаме вашето здравословно състояние и дали проучването е подходящо за вас.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Card 3 - Fixed overlay */}
            <div className="group hover:shadow-2xl transition-all rounded-2xl overflow-hidden">
              <div className="relative h-[450px]">
                <Image
                  src="/our-mission.jpg"
                  alt="Biochemistry Solution"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay white box in bottom left - larger and better positioned */}
                <div className="absolute bottom-8 left-8 bg-white p-8 w-[calc(100%-4rem)] shadow-xl rounded-xl">
                  <div className="w-14 h-14 bg-[#238C96] flex items-center justify-center mb-5 rounded-lg">
                    <SparklesIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    Посещение и информирано съгласие
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Получавате ясна информация и решавате дали да участвате доброволно.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Какво казват хората за нас
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Научете повече от опита на нашите партньори и клиенти, които са
              работили с нас
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-6xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
            {/* Left - Image */}
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src="/who-we-are.jpg"
                alt="Testimonial"
                fill
                className="object-cover"
              />
            </div>

            {/* Right - Content */}
            <div className="bg-[#0f172a] p-12 lg:p-16 flex flex-col justify-center">
              <div className="mb-8">
                <div className="w-16 h-1 bg-[#fd9300] mb-8"></div>
            <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
              В клиничния център ще получите ясна и подробна информация за целта на проучването, как протича и какви нови лекарства или терапии ще бъдат изследвани. Вие решавате дали да участвате, като подписвате информирано съгласие – документ, който ви гарантира, че участието е доброволно.
            </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Мария Петрова
                </h4>
                <p className="text-gray-400">
                  Участник в клинично изпитване
                </p>
              </div>
              {/* Quote Icon */}
              <div className="absolute bottom-8 right-8 opacity-10">
                <svg
                  className="w-32 h-32 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Studies Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Терапевтични области
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Разгледайте всички терапевтични области, в които провеждаме клинични проучвания. Намерете клиничното изпитване, което търсите.
              </p>
              <Link
                href="/terapevtichni-oblasti"
                className="inline-block px-8 py-4 bg-[#fd9300] text-white font-semibold hover:bg-[#e48400] transition-colors rounded-lg"
              >
                ВСИЧКИ ТЕРАПЕВТИЧНИ ОБЛАСТИ
              </Link>
            </div>

            <div className="space-y-8">
              {/* Study Card 1 */}
              <div className="bg-white shadow-lg hover:shadow-2xl transition-all rounded-2xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative h-[200px] md:h-auto">
                    <Image
                      src="/our-mission.jpg"
                      alt="Research Study"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-6 flex flex-col justify-center">
                    <span className="text-sm font-semibold text-[#238C96] mb-3">
                      Кардиология
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Клинични проучвания в областта на сърдечно-съдовите заболявания
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Изследване на нови терапии за сърдечна недостатъчност и превенция на инфаркт.
                    </p>
                    <Link
                      href="#"
                      className="text-[#fd9300] font-semibold flex items-center gap-2 hover:gap-4 transition-all"
                    >
                      ВИЖТЕ ДЕТАЙЛИ
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Study Card 2 */}
              <div className="bg-white shadow-lg hover:shadow-2xl transition-all rounded-2xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative h-[200px] md:h-auto">
                    <Image
                      src="/who-we-are.jpg"
                      alt="Research Study"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-6 flex flex-col justify-center">
                    <span className="text-sm font-semibold text-[#238C96] mb-3">
                      Онкология
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Иновативни терапии за лечение на рак
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Проучване на нови имунотерапии и таргетни лечения за различни видове рак.
                    </p>
                    <Link
                      href="#"
                      className="text-[#fd9300] font-semibold flex items-center gap-2 hover:gap-4 transition-all"
                    >
                      ВИЖТЕ ДЕТАЙЛИ
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Здравна информация и статии
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Актуални статии за иновативни терапии, клинични проучвания и съвременни методи на лечение
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Blog Card 1 - Horizontal Layout */}
            <div className="bg-white hover:shadow-2xl transition-all group rounded-2xl overflow-hidden">
              <div className="grid grid-cols-5 gap-0 h-full">
                {/* Left - Image */}
                <div className="col-span-2 relative overflow-hidden">
                  <Image
                    src="/our-mission.jpg"
                    alt="Blog Post"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Right - Content */}
                <div className="col-span-3 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">
                      Юни 3, 2025
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#238C96] transition-colors leading-tight">
                      Как протича участието в клинично изпитване
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      Научете повече за стъпките в клиничното изпитване - от първия контакт до финалното посещение...
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="text-[#fd9300] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    ПРОЧЕТИ ПОВЕЧЕ
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Blog Card 2 - Horizontal Layout */}
            <div className="bg-white hover:shadow-2xl transition-all group rounded-2xl overflow-hidden">
              <div className="grid grid-cols-5 gap-0 h-full">
                {/* Left - Image */}
                <div className="col-span-2 relative overflow-hidden">
                  <Image
                    src="/who-we-are.jpg"
                    alt="Blog Post"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Right - Content */}
                <div className="col-span-3 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">
                      Юни 3, 2025
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#238C96] transition-colors leading-tight">
                      Иновативно лечение чрез клинични проучвания
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      Получавате шанс за съвремено и иновативно лечение, което може да предложи по-добър контрол върху заболяването...
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="text-[#fd9300] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    ПРОЧЕТИ ПОВЕЧЕ
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Blog Card 3 - Horizontal Layout */}
            <div className="bg-white hover:shadow-2xl transition-all group rounded-2xl overflow-hidden">
              <div className="grid grid-cols-5 gap-0 h-full">
                {/* Left - Image */}
                <div className="col-span-2 relative overflow-hidden">
                  <Image
                    src="/our-mission.jpg"
                    alt="Blog Post"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Right - Content */}
                <div className="col-span-3 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">
                      Юни 3, 2025
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#238C96] transition-colors leading-tight">
                      Защо да участвате в клинични изпитвания
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      Вашето участие носи множество ползи за вас и обществото. С вашето участие помагате за напредъка на медицината...
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="text-[#fd9300] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    ПРОЧЕТИ ПОВЕЧЕ
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Blog Card 4 - Horizontal Layout */}
            <div className="bg-white hover:shadow-2xl transition-all group rounded-2xl overflow-hidden">
              <div className="grid grid-cols-5 gap-0 h-full">
                {/* Left - Image */}
                <div className="col-span-2 relative overflow-hidden">
                  <Image
                    src="/our-mission.jpg"
                    alt="Blog Post"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Right - Content */}
                <div className="col-span-3 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">
                      Юни 3, 2025
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#238C96] transition-colors leading-tight">
                      Специализирана грижа по време на клинично изпитване
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      През цялото време сте под грижите на специализиран екип, който следи внимателно вашето здраве и безопасност...
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="text-[#fd9300] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    ПРОЧЕТИ ПОВЕЧЕ
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
