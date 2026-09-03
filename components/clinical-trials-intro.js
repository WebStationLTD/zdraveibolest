import Link from "next/link";
import Image from "next/image";

/**
 * Homepage section introducing clinical trials with CTAs for volunteers and patients.
 * Placed between "Защо да се регистрираме" and "Здравна информация".
 */
export default function ClinicalTrialsIntro() {
  return (
    <section className="px-5 py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-[#04737d]/5 to-white">
      <div className="mx-auto w-[95%] md:w-[85%] max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#04737d] mb-4 uppercase">
              КЛИНИЧНИТЕ ИЗПИТВАНИЯ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Започват с хора като вас
            </h2>
            <div className="w-16 h-1 bg-[#fd9300] rounded-full mb-8" />
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              Тези научни изпитвания помагат да се разработят по-успешни и
              иновативни лекарства или терапии, като се подобри грижата за всеки
              пациент. В зависимост от конкретното изпитване могат да вземат
              участие както пациенти с различни заболявания, така и напълно
              здрави хора – здрави доброволци.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10">
              Научете повече за вашето участие:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/klinichni-prouchvaniya/zdravi-dobrovoltsi"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#fd9300] hover:bg-[#e48400] text-white text-base font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Здрав Доброволец
              </Link>
              <Link
                href="/klinichni-prouchvaniya/patsienti"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#04737d] hover:bg-[#035057] text-white text-base font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Пациент
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/patients-care.jpg"
                alt="Клинични изпитвания — участие на пациенти и здрави доброволци"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#04737d]/40 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#fd9300]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#04737d]/20 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
