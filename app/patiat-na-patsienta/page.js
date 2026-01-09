import Link from "next/link";
import PatientJourneyContactForm from "../../components/PatientJourneyContactForm";
import StepsCarousel from "../../components/StepsCarousel";
import {
  PhoneIcon,
  EnvelopeIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CurrencyEuroIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Пътят на пациента - Как протича участието в клинично изпитване",
  description:
    "Научете повече за стъпките в клиничното изпитване - от първия контакт до финалното посещение. Прозрачен и сигурен процес за вашето участие.",
};

const benefits = [
  {
    icon: SparklesIcon,
    title: "Иновативно лечение",
    description:
      "Получавате шанс за съвременно и иновативно лечение, което може да предложи по-добър контрол върху заболяването.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Специализирана грижа",
    description:
      "През цялото време сте под грижите на специализиран екип, който следи внимателно вашето здраве.",
  },
  {
    icon: CurrencyEuroIcon,
    title: "Реимбурсация",
    description: "Компенсация за вашето време, усилия и транспортни разходи.",
  },
  {
    icon: HeartIcon,
    title: "Помагате на другите",
    description:
      "С вашето участие помагате за напредъка на медицината и допринасяте за по-добро бъдещо лечение на хора със същото заболяване.",
  },
];

export default function PatientJourneyPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#04737d] via-[#035a63] to-[#024248] py-16 md:py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#fd9300] rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto w-[95%] md:w-[80%] text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
            Пътят на пациента
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Научете повече за стъпките в клиничното изпитване - от първия
            контакт до финалното посещение. Прозрачен и сигурен процес за вашето
            участие.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Как протича участието?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Всяка стъпка е внимателно планирана за вашата безопасност и
              комфорт
            </p>
          </div>

          {/* Steps Carousel Component */}
          <StepsCarousel />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#04737d]/5 to-[#fd9300]/5">
        <div className="mx-auto w-[95%] md:w-[80%]">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <SparklesIcon className="h-8 w-8 text-[#fd9300]" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Защо да участвате?
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Вашето участие носи множество ползи за вас и обществото
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#04737d] to-[#035a63] rounded-2xl mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section with Contact Form */}
      <section className="relative pt-16 md:pt-20 lg:pt-24 pb-0">
        <div className="px-5">
          <div className="mx-auto w-[95%] md:w-[80%]">
            <div className="relative bg-gradient-to-br from-[#04737d] to-[#035a63] rounded-3xl md:rounded-[2.5rem] overflow-hidden py-12 md:py-16 lg:py-20 px-6 md:px-12 mb-0">
              {/* Decorative Elements */}
              <img
                src="/Register-section-Element-1.svg"
                alt=""
                className="absolute top-0 left-0 pointer-events-none opacity-30"
              />
              <img
                src="/Register-section-Element-2.svg"
                alt=""
                className="absolute bottom-0 right-0 pointer-events-none opacity-40"
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-center mb-10 md:mb-12">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    Регистрирай се и получи достъп до най-новите възможности за
                    лечение и информация за заболявания
                  </h3>
                </div>

                {/* Contact Form */}
                <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                  <div className="text-center px-6 pt-8 pb-4">
                    <p className="text-white text-xl md:text-2xl mb-2 font-bold">
                      Регистрирайте се сега
                    </p>
                    <p className="text-white/90 text-base">
                      Попълнете формата и ние ще се свържем с Вас
                    </p>
                  </div>
                  <div className="bg-white rounded-b-2xl">
                    <PatientJourneyContactForm />
                  </div>
                </div>

                {/* Alternative: Direct Contact Info */}
                <div className="mt-8 text-center">
                  <p className="text-white/80 text-sm mb-4">
                    Или се свържете директно с нас:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <a
                      href="tel:+359000000000"
                      className="flex items-center gap-2 text-white hover:text-[#fd9300] transition-colors"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        +359 XX XXX XXXX
                      </span>
                    </a>
                    <a
                      href="mailto:info@example.com"
                      className="flex items-center gap-2 text-white hover:text-[#fd9300] transition-colors"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        info@example.com
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Illustration */}
        <div className="relative -mt-1">
          <img
            src="/Footer Illustration.svg"
            alt="Медицински специалисти"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
