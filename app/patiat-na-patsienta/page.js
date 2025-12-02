import Link from "next/link";
import PatientJourneyContactForm from "../../components/PatientJourneyContactForm";
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  HeartIcon,
  BeakerIcon,
  CalendarDaysIcon,
  DocumentCheckIcon,
  ChartBarIcon,
  CheckCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CurrencyEuroIcon
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Пътят на пациента - Как протича участието в клинично изпитване",
  description: "Научете повече за стъпките в клиничното изпитване - от първия контакт до финалното посещение. Прозрачен и сигурен процес за вашето участие.",
};

const steps = [
  {
    number: "01",
    title: "Първа стъпка – свързване с нас",
    icon: PhoneIcon,
    color: "bg-[#04737d]",
    description: [
      "Може би сте научили за проучването от вашия лекар, интернет или приятел.",
      "Ако проявите интерес, достатъчно е да попълните кратката форма за контакт или да ни се обадите.",
      "Нашият екип ще ви насочи и ще отговори на всички ваши въпроси."
    ]
  },
  {
    number: "02",
    title: "Разговор с координатор",
    icon: ChatBubbleLeftRightIcon,
    color: "bg-[#fd9300]",
    description: [
      "Наш координатор ще се свърже с вас за кратък разговор.",
      "Ще обсъдим вашето здравословно състояние и дали проучването е подходящо за вас.",
      "Това е моментът да зададете всички въпроси и спокойно да попитате за всичко, което ви интересува."
    ]
  },
  {
    number: "03",
    title: "Посещение и информирано съгласие",
    icon: DocumentCheckIcon,
    color: "bg-[#04737d]",
    description: [
      "В клиничния център ще получите ясна и подробна информация за целта на проучването, как протича и какви нови лекарства или терапии ще бъдат изследвани.",
      "Вие решавате дали да участвате, като подписвате информирано съгласие – документ, който ви гарантира, че участието е доброволно и че винаги можете да се откажете."
    ]
  },
  {
    number: "04",
    title: "Начални медицински изследвания",
    icon: BeakerIcon,
    color: "bg-[#fd9300]",
    description: [
      "Това включва стандартни тестове – кръв, урина, измервания и разговор с лекар, за да сме сигурни, че проучването е подходящо и безопасно за вас.",
      "Това е важна стъпка, защото само ако всичко е наред, ще имате възможност да получите подходяща терапия."
    ]
  },
  {
    number: "05",
    title: "Официално включване",
    icon: ClipboardDocumentCheckIcon,
    color: "bg-[#04737d]",
    description: [
      "След успешните изследвания започва вашето участие.",
      "В зависимост от проучването може да получите иновативно лекарство или терапия, която още не е налична на пазара.",
      "Това е шанс да имате достъп до лечение, което може да бъде по-ефективно от сегашните стандартни методи."
    ]
  },
  {
    number: "06",
    title: "Редовни посещения",
    icon: CalendarDaysIcon,
    color: "bg-[#fd9300]",
    description: [
      "През целия период ще идвате при нас на редовни визити.",
      "Там ще получавате лечение, ще ви правим изследвания и ще разговаряме за вашето състояние.",
      "Нашият екип ще е до вас, за да следи внимателно ефекта от терапията и да гарантира вашата безопасност."
    ]
  },
  {
    number: "07",
    title: "Вашата роля",
    icon: UserGroupIcon,
    color: "bg-[#04737d]",
    description: [
      "От вас се очаква:",
      "• да идвате на уговорените визити,",
      "• да спазвате указанията на лекаря,",
      "• да споделяте открито как се чувствате,",
      "• да съхранявате и връщате лекарството (ако получавате за вкъщи).",
      "Най-важното е да сте честни и открити – вашият опит е безценен за успеха на проучването."
    ]
  },
  {
    number: "08",
    title: "Финално посещение",
    icon: ChartBarIcon,
    color: "bg-[#fd9300]",
    description: [
      "В края на проучването имате последна среща.",
      "Правим обобщаващи изследвания, връщате останали лекарства (ако има такива) и заедно обсъждаме следващите стъпки за вашето здраве."
    ]
  },
  {
    number: "09",
    title: "Проследяване",
    icon: HeartIcon,
    color: "bg-[#04737d]",
    description: [
      "В някои проучвания има и допълнителни телефонни разговори или визити след края, за да се събере информация как се чувствате дългосрочно."
    ]
  }
];

const benefits = [
  {
    icon: SparklesIcon,
    title: "Иновативно лечение",
    description: "Получавате шанс за съвременно и иновативно лечение, което може да предложи по-добър контрол върху заболяването."
  },
  {
    icon: ShieldCheckIcon,
    title: "Специализирана грижа",
    description: "През цялото време сте под грижите на специализиран екип, който следи внимателно вашето здраве."
  },
  {
    icon: CurrencyEuroIcon,
    title: "Реимбурсация",
    description: "Компенсация за вашето време, усилия и транспортни разходи."
  },
  {
    icon: HeartIcon,
    title: "Помагате на другите",
    description: "С вашето участие помагате за напредъка на медицината и допринасяте за по-добро бъдещо лечение на хора със същото заболяване."
  }
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
            Научете повече за стъпките в клиничното изпитване - от първия контакт до финалното посещение. 
            Прозрачен и сигурен процес за вашето участие.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto w-[95%] md:w-[80%]">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Как протича участието?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Всяка стъпка е внимателно планирана за вашата безопасност и комфорт
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  {/* Step Number Badge */}
                  <div className={`absolute -top-4 -right-4 ${step.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`${step.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <div className="space-y-3">
                    {step.description.map((text, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed text-sm">
                        {text}
                      </p>
                    ))}
                  </div>

                  {/* Decorative Bottom Element */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${step.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              );
            })}
          </div>
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
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    Намерете клиничното изпитване за вас или помогнете на други хора
                  </h2>
                  <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                    Регистрирайте се като попълните кратка контактна форма, а ние ще се свържем с Вас.
                  </p>
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
                  <p className="text-white/80 text-sm mb-4">Или се свържете директно с нас:</p>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <a 
                      href="tel:+359000000000" 
                      className="flex items-center gap-2 text-white hover:text-[#fd9300] transition-colors"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      <span className="text-sm font-medium">+359 XX XXX XXXX</span>
                    </a>
                    <a 
                      href="mailto:info@example.com" 
                      className="flex items-center gap-2 text-white hover:text-[#fd9300] transition-colors"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                      <span className="text-sm font-medium">info@example.com</span>
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

