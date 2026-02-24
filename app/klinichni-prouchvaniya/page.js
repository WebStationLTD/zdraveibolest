import Link from "next/link";
import Image from "next/image";
import ClinicalStepsCarousel from "../../components/ClinicalStepsCarousel";
import ClinicalTrialForm from "../../components/ClinicalTrialForm";
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
      <section className="relative bg-gradient-to-r from-[#5FA8B3] via-[#7BB8C3] to-[#A8D5DD] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200 blur-3xl"></div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2">
          {/* Left Content */}
          <div className="py-20 md:py-32 px-8 md:px-16 lg:px-20 flex items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Знание. Избор. По-добро здраве.
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Научи как работят клиничните проучвания и открий възможности за участие – прозрачно, на разбираем език и с фокус върху безопасността.
              </p>
              <div className="flex flex-wrap gap-4">
              <Link
                href="/klinichni-prouchvaniya/nameri-klinichno-prouchvane"
                className="px-8 py-4 bg-[#fd9300] text-white font-semibold hover:bg-[#e48400] transition-colors rounded-lg"
              >
                ОТКРИЙ ПРОУЧВАНИЯ
              </Link>
              <Link
                href="/chesto-zadavani-vaprosi"
                className="px-8 py-4 bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors flex items-center gap-2 backdrop-blur-sm rounded-lg"
              >
                ЧЕСТО ЗАДАВАНИ ВЪПРОСИ
              </Link>
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
            Активно си сътрудничим с водещи CRO и фармацевтични компании
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {[
              "IQVIA",
              "ICON",
              "Parexel",
              "Medpace",
              "Pfizer",
              "AstraZeneca",
              "Janssen",
              "Bayer",
              "Sanofi",
              "Novartis",
              "Amgen",
            ].map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-8 py-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#238C96]">
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

      {/* Clinical Trial Phases Section - Image in Center with 4 cards around */}
      <section className="py-20 bg-[#0f172a]">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Фази на клиничното изпитване
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Клиничните изпитвания обикновено се провеждат на етапи (фази). Всяка фаза отговаря на различни въпроси: безопасно ли е, действа ли, каква е правилната доза, как се сравнява с наличните терапии, и какво се случва при дългосрочна употреба. Важно: във всяка фаза участието е доброволно и става след информирано съгласие.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Grid Layout - 3 columns: 2 cards left | image center | 2 cards right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Left Column - 2 Cards Stacked */}
              <div className="flex flex-col gap-6 md:gap-8">
                {/* Phase 1 Card - Top Left */}
                <div className="group relative bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 text-center hover:shadow-2xl transition-all min-h-[240px] lg:h-[280px] flex flex-col justify-center rounded-2xl cursor-pointer">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#238C96] flex items-center justify-center mx-auto mb-4 md:mb-5 rounded-lg">
                    <BeakerIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Фаза 1 (Phase I)
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Безопасност и поносимост на продукта. Малък брой участници, често здрави доброволци. Определяне на безопасна доза.
                  </p>
                  
                  {/* Hover Popup */}
                  <div className="absolute inset-0 bg-white rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-y-auto shadow-2xl z-10">
                    <h4 className="text-lg font-bold text-[#238C96] mb-3">Фаза 1 (Phase I)</h4>
                    <div className="text-left space-y-3 text-sm text-gray-700">
                      <p><strong>Основна цел:</strong> безопасност и поносимост на продукта.</p>
                      <p><strong>Какво се изследва:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>дали има нежелани реакции и какви са те</li>
                        <li>как организмът &ldquo;обработва&rdquo; продукта: PK (фармакокинетика)</li>
                        <li>какво е въздействието върху организма: PD (фармакодинамика)</li>
                        <li>каква доза е безопасна</li>
                      </ul>
                      <p><strong>Кои участват:</strong> най-често здрави доброволци; при онкология – пациенти</p>
                      <p><strong>Обичайни размери:</strong> малък брой участници (често десетки)</p>
                      <p><strong>Как протича:</strong> ескалация на дозата, SAD/MAD, интензивно наблюдение</p>
                      <p><strong>Резултат:</strong> първа картина за безопасност + ориентир за дози за Фаза 2</p>
                    </div>
                  </div>
                </div>

                {/* Phase 3 Card - Bottom Left */}
                <div className="group relative bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 text-center hover:shadow-2xl transition-all min-h-[240px] lg:h-[280px] flex flex-col justify-center rounded-2xl cursor-pointer">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#238C96] flex items-center justify-center mx-auto mb-4 md:mb-5 rounded-lg">
                    <ShieldCheckIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Фаза 3 (Phase III)
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Потвърждение на ефективността в голяма популация. Основата за регистрация. Стотици до хиляди участници.
                  </p>
                  
                  {/* Hover Popup */}
                  <div className="absolute inset-0 bg-white rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-y-auto shadow-2xl z-10">
                    <h4 className="text-lg font-bold text-[#238C96] mb-3">Фаза 3 (Phase III)</h4>
                    <div className="text-left space-y-3 text-sm text-gray-700">
                      <p><strong>Основна цел:</strong> потвърждение на ефективността и безопасността в голяма популация – основата за регистрация.</p>
                      <p><strong>Какво се изследва:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>дали новото лечение е по-добро/равностойно спрямо стандартното</li>
                        <li>нежелани реакции, включително по-редки</li>
                        <li>ефект върху ключови клинични крайни точки</li>
                      </ul>
                      <p><strong>Кои участват:</strong> пациенти в много центрове и държави</p>
                      <p><strong>Обичайни размери:</strong> стотици до хиляди участници</p>
                      <p><strong>Защо е важна:</strong> регулаторите (EMA/FDA) искат данни от Фаза 3 за одобрение</p>
                      <p><strong>Резултат:</strong> ако данните са убедителни → подаване за регистрация</p>
                    </div>
                  </div>
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
                {/* Phase 2 Card - Top Right */}
                <div className="group relative bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 text-center hover:shadow-2xl transition-all min-h-[240px] lg:h-[280px] flex flex-col justify-center rounded-2xl cursor-pointer">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#238C96] flex items-center justify-center mx-auto mb-4 md:mb-5 rounded-lg">
                    <UserGroupIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Фаза 2 (Phase II)
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Ефективност и оптимална доза при пациенти. По-широка оценка на безопасността. Десетки до стотици участници.
                  </p>
                  
                  {/* Hover Popup */}
                  <div className="absolute inset-0 bg-white rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-y-auto shadow-2xl z-10">
                    <h4 className="text-lg font-bold text-[#238C96] mb-3">Фаза 2 (Phase II)</h4>
                    <div className="text-left space-y-3 text-sm text-gray-700">
                      <p><strong>Основна цел:</strong> дали работи (ефективност) и каква е оптималната доза при пациенти.</p>
                      <p><strong>Какво се изследва:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>ефективност при целевото заболяване</li>
                        <li>по-широка оценка на безопасността</li>
                        <li>дозировка/режим: най-добра комбинация</li>
                        <li>взаимодействия с други лекарства, биомаркери</li>
                      </ul>
                      <p><strong>Кои участват:</strong> пациенти с конкретното заболяване</p>
                      <p><strong>Обичайни размери:</strong> десетки до стотици участници</p>
                      <p><strong>Типични дизайни:</strong> рандомизирани проучвания, сравнение с плацебо, доза-отговор</p>
                      <p><strong>Резултат:</strong> доказателства за потенциал и ясна доза за Фаза 3</p>
                    </div>
                  </div>
                </div>

                {/* Phase 4 Card - Bottom Right */}
                <div className="group relative bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 text-center hover:shadow-2xl transition-all min-h-[240px] lg:h-[280px] flex flex-col justify-center rounded-2xl cursor-pointer">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#238C96] flex items-center justify-center mx-auto mb-4 md:mb-5 rounded-lg">
                    <ClipboardDocumentCheckIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Фаза 4 (Phase IV)
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Наблюдение след одобрение. Дългосрочна безопасност и реална ефективност в &ldquo;реалния живот&rdquo;.
                  </p>
                  
                  {/* Hover Popup */}
                  <div className="absolute inset-0 bg-white rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-y-auto shadow-2xl z-10">
                    <h4 className="text-lg font-bold text-[#238C96] mb-3">Фаза 4 (Phase IV)</h4>
                    <div className="text-left space-y-3 text-sm text-gray-700">
                      <p><strong>Основна цел:</strong> наблюдение след одобрение – дългосрочна безопасност и реална ефективност.</p>
                      <p><strong>Кога се прави:</strong> след като продуктът вече е на пазара</p>
                      <p><strong>Какво се изследва:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>дългосрочни нежелани реакции и много редки странични ефекти</li>
                        <li>ефективност и безопасност в &ldquo;реалния живот&rdquo;</li>
                        <li>понякога нови показания, нови групи пациенти</li>
                        <li>взаимодействия, придържане към терапията</li>
                      </ul>
                      <p><strong>Форми:</strong> наблюдателни проучвания/регистри, допълнителни клинични изпитвания</p>
                      <p><strong>Резултат:</strong> по-пълна картина за рискове/ползи, актуализация на листовка</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Steps Section with Carousel */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Пътя на пациента в едно клинично{" "}
                <span className="relative inline-block z-0">
                  проучване
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

          {/* Steps Carousel Component */}
          <ClinicalStepsCarousel />
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
                Направи следващата крачка
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Провери дали има проучване, което отговаря на твоето състояние или интерес.
              </p>
              <Link
                href="/klinichni-prouchvaniya/nameri-klinichno-prouchvane"
                className="inline-block px-8 py-4 bg-[#fd9300] text-white font-semibold hover:bg-[#e48400] transition-colors rounded-lg"
              >
                НАМЕРИ КЛИНИЧНО ПРОУЧВАНЕ
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

      {/* Team Roles Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Кой какво прави в клиничните проучвания
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-4">
              Зад всяко клинично изследване стои екип от професионалисти и грижа
            </p>
            <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Клиничното проучване не е просто тест на ново лекарство или терапия. То е усилена и съвместна работа на лекари, медицински сестри, координатори, специалисти по данни, фармаколози, монитори и регулатори, които спазват най-високите международни стандарти за качество и безопасност – ICH GCP (Good Clinical Practice). Всеки член на екипа има ясно дефинирана роля. Познаването им ще ви помогне да разберете кой за какво отговаря, към кого можете да се обръщате и как се гарантира безопасността ви.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Role Card 1 - Principal Investigator */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#238C96] flex items-center justify-center mb-6 rounded-xl">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Главен изследовател (Principal Investigator – PI)
              </h3>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p><strong>Образование и роля:</strong> Лекар със специализация и дългогодишен опит, който отговаря за научната, етичната и медицинската страна на проучването.</p>
                <p><strong>Основни отговорности:</strong> Подписва документацията, осигурява информирано съгласие, следи за спазване на протокола и стандартите GCP, медицински наблюдава участниците.</p>
                <p><strong>Как комуникира с вас:</strong> PI може да ви прегледа при включване и при медицински въпроси. Обсъждане на рискове, лекарства и симптоми.</p>
              </div>
            </div>

            {/* Role Card 2 - Sub-Investigators */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#238C96] flex items-center justify-center mb-6 rounded-xl">
                <BeakerIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Подизследователи (Sub-Investigators)
              </h3>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p><strong>Роля:</strong> Лекари или специалисти, които подпомагат PI в конкретни медицински дейности – невролог, кардиолог, ендокринолог и др.</p>
                <p><strong>Какво правят:</strong> Провеждат целенасочени прегледи и тестове, интерпретират резултати, наблюдават участниците, водят медицинска документация, съветват PI.</p>
                <p><strong>Защо са важни:</strong> Гарантират мултидисциплинарен подход и специализирана експертиза.</p>
                <p><strong>Може да се обърнете към тях за:</strong> Преглед свързан с тяхната специалност, обсъждане на изследвания или симптоми.</p>
              </div>
            </div>

            {/* Role Card 3 - Study Coordinator */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#238C96] flex items-center justify-center mb-6 rounded-xl">
                <ClipboardDocumentCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Изследователски координатор (Study Coordinator)
              </h3>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p><strong>Профил:</strong> Връзката между всички участници - пациенти, лекари, медицински сестри, монитор, спонсор, лаборатории. Обикновено медицински специалист с GCP обучение.</p>
                <p><strong>Основни функции:</strong> Организира и координира ежедневната работа, подготвя графика на визитите, контролира процедурите, въвежда данни в системите, поддържа връзка с CRA.</p>
                <p><strong>Връзка с пациента:</strong> Човекът, който ще ви се обади, ще ви насочи, ще ви помогне при всяко посещение и ще отговори на въпросите ви.</p>
              </div>
            </div>

            {/* Role Card 4 - Study Nurse */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#238C96] flex items-center justify-center mb-6 rounded-xl">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Изследователска медицинска сестра (Study Nurse)
              </h3>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p><strong>Образование:</strong> Регистрирани медицински специалисти с обучения по ICH-GCP, безопасност на пациента, фармаконаблюдение, вземане на биологични проби.</p>
                <p><strong>Основни дейности:</strong> Взема кръв, урина и други проби, измерва жизнени показатели, извършва тестове (ЕКГ, спирометрия), подготвя пациента за изследвания, следи за нежелани реакции.</p>
                <p><strong>Отношение към участника:</strong> Човекът, който се грижи за вашия комфорт, безопасност и спокойствие при всяко посещение. Следи вашето състояние и съобщава на изследователя при промяна.</p>
              </div>
            </div>

            {/* Role Card 5 - Clinical Monitor (CRA) */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#238C96] flex items-center justify-center mb-6 rounded-xl">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Клиничен монитор (CRA)
              </h3>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p><strong>Кой е той:</strong> Представител на компанията (спонсор или CRO), която организира проучването. Не е част от медицинския екип, но има критична функция.</p>
                <p><strong>Функции:</strong> Наблюдава, проверява и гарантира, че всичко се извършва по правилата на медицинската етика, закона и международните стандарти ICH-GCP.</p>
                <p><strong>Какво прави:</strong> Посещава центъра (pre-study visit), проверява оборудването, помещенията, документацията, уверява се че PI и екипът имат нужния опит, съобщава на спонсора дали центърът може да бъде включен.</p>
                <p><strong>Важност:</strong> Проверява мястото, в което ще участвате, дали отговаря на всички изисквания за безопасност и качество още преди да бъде включен първият участник.</p>
              </div>
            </div>

            {/* Role Card 6 - Sponsor */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#238C96] flex items-center justify-center mb-6 rounded-xl">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Спонсор
              </h3>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p><strong>Кой е той:</strong> Организацията, която финансира и притежава новия лекарствен продукт или медицинско изделие. Може да бъде фармацевтична компания, биотехнологична фирма, университет или научен институт.</p>
                <p><strong>Какво прави:</strong> Разработва и одобрява протокола, осигурява лекарствата и инструкциите, възлага провеждането на CRO, следи и анализира резултатите, подава информация към здравните власти.</p>
                <p><strong>Роля:</strong> Не контактува директно с пациентите, но отговорността му е да гарантира, че проучването е етично, безопасно и че всички участници са защитени и оценени с уважение.</p>
                <p><strong>Значение:</strong> Благодарение на спонсора новите терапии достигат от лабораторията до реалните пациенти.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto w-[95%] md:w-[85%] max-w-4xl">
          <ClinicalTrialForm />
        </div>
      </section>
    </div>
  );
}
