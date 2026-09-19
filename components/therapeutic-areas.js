import Image from "next/image";
import Link from "next/link";

const AREAS = [
  {
    name: "Пулмология",
    icon: "/therapeutic-icons/pulmonology.webp",
    href: "/kategoriya/пулмология",
    summary: "Дихателно здраве и белодробни заболявания",
    details:
      "Информация и възможности за участие при астма, ХОББ и други белодробни заболявания — от ранна оценка до проследяване.",
  },
  {
    name: "Ревматология",
    icon: "/therapeutic-icons/rheumatology.webp",
    href: "/kategoriya/ревматология",
    summary: "Автоимунни и ставни заболявания",
    details:
      "Покриваме автоимунни и ставно-мускулни състояния, с фокус върху нови терапии и ясни критерии за участие.",
  },
  {
    name: "Кардиология",
    icon: "/therapeutic-icons/cardiology.webp",
    href: "/kategoriya/кардиология",
    summary: "Сърдечно-съдово здраве и нови терапии",
    details:
      "Подкрепяме проучвания при сърдечно-съдови индикации — от ранна до късна фаза, с достъп до опитни изследователи.",
  },
  {
    name: "Неврология",
    icon: "/therapeutic-icons/neurology.webp",
    href: "/kategoriya/неврология",
    summary: "Заболявания на мозъка и нервната система",
    details:
      "Информация за неврологични и невродегенеративни състояния и как клиничните програми могат да бъдат подходящи за вас.",
  },
  {
    name: "Нефрология",
    icon: "/therapeutic-icons/nephrology.webp",
    href: "/kategoriya/нефрология",
    summary: "Бъбречно здраве и заболявания",
    details:
      "Разглеждаме бъбречни заболявания и свързаните с тях изследвания, включително възможности за нови терапии.",
  },
  {
    name: "Гастроентерология",
    icon: "/therapeutic-icons/gastroenterology.webp",
    href: "/kategoriya/гастроентерология",
    summary: "Храносмилателна система",
    details:
      "Покриваме заболявания на храносмилателната система и възможностите за участие в свързани клинични програми.",
  },
  {
    name: "Ендокринология",
    icon: "/therapeutic-icons/endocrinology.webp",
    href: "/kategoriya/ендокринология",
    summary: "Хормонални и метаболитни нарушения",
    details:
      "Информация за диабет, щитовидна жлеза и метаболитни нарушения, както и за съответните клинични проучвания.",
  },
  {
    name: "Онкология",
    icon: "/therapeutic-icons/oncology.webp",
    href: "/kategoriya/онкология",
    summary: "Подходи в изследването на рака",
    details:
      "Представяме иновативни подходи в онкологичните изследвания и как пациентите могат да се информират за участие.",
  },
  {
    name: "Алергология",
    icon: "/therapeutic-icons/allergology.webp",
    href: "/kategoriya/алергология",
    summary: "Алергични и имунни заболявания",
    details:
      "Покриваме алергични и имунно-медиирани състояния — от ежедневни симптоми до по-сложни реакции.",
  },
  {
    name: "Дерматология",
    icon: "/therapeutic-icons/dermatology.webp",
    href: "/kategoriya/дерматология",
    summary: "Кожно здраве",
    details:
      "Информация за кожни заболявания и клинични програми, насочени към нови дерматологични терапии.",
  },
  {
    name: "Хематология",
    icon: "/therapeutic-icons/hematology.webp",
    href: "/kategoriya/хематология",
    summary: "Кръвни заболявания",
    details:
      "Разглеждаме кръвни заболявания и изследвания в хематологията, с акцент върху разбираема информация за пациенти.",
  },
  {
    name: "Акушер-гинекология",
    icon: "/therapeutic-icons/obstetrics-gynecology.webp",
    href: "/kategoriya/акушер-гинекология",
    summary: "Женско здраве във всички етапи",
    details:
      "Информация за женското здраве във всички етапи от живота и свързаните клинични възможности.",
  },
];

function ArrowIcon() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors group-hover:border-[#04737d]/30 group-hover:bg-white group-hover:text-[#04737d] lg:group-hover:bg-[#04737d] lg:group-hover:text-white lg:group-focus-within:bg-[#04737d] lg:group-focus-within:text-white">
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </span>
  );
}

export default function TherapeuticAreas() {
  return (
    <section
      id="therapeutic-areas"
      lang="bg"
      className="relative px-4 pt-5 pb-16 sm:px-5 md:pb-20 lg:pb-24"
    >
      <div className="mx-auto w-[95%] md:w-[80%]">
        <div className="text-center mb-10 md:mb-16">
          <p className="mx-auto max-w-2xl text-xs font-normal leading-relaxed tracking-wide text-[#04737d] mb-4 md:text-sm md:tracking-[0.2em]">
            Ключовите здравни области, върху които се фокусираме, за да
            предложим надеждна и научно обоснована информация
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Терапевтични области
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-[#fd9300] rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 items-stretch md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4 lg:gap-5">
          {AREAS.map((area, index) => {
            const col = index % 4;
            const expandLeft = col === 3;
            const expandUp = index >= 8;

            return (
              <div key={area.href} className="relative h-full">
                <div
                  className="invisible hidden pointer-events-none select-none lg:block"
                  aria-hidden="true"
                >
                  <div className="px-2.5 py-3.5 sm:px-4 sm:py-5 md:p-5">
                    <div className="flex flex-col items-center xl:flex-row xl:items-start xl:gap-4">
                      <div className="mb-2.5 h-14 w-14 sm:mb-3 sm:h-16 sm:w-16 md:h-[68px] md:w-[68px] xl:mb-0 xl:h-16 xl:w-16" />
                      <div className="w-full">
                        <div className="min-h-[2.5em] text-[13px] font-semibold leading-[1.25] sm:text-sm md:text-[15px] xl:min-h-0 xl:text-base">
                          {area.name}
                        </div>
                        <div className="mt-1.5 hidden text-sm leading-relaxed md:block md:min-h-[2.75em]">
                          {area.summary}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 hidden h-8 xl:block" />
                  </div>
                </div>

                <Link
                  href={area.href}
                  className={`group z-0 flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] bg-white px-2.5 py-3.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] outline-none transition-[box-shadow,background-color,padding,width,height] duration-300 motion-reduce:transition-none hover:z-20 hover:shadow-[0_16px_40px_rgba(4,115,125,0.12)] focus-visible:ring-2 focus-visible:ring-[#04737d] focus-visible:ring-offset-2 sm:rounded-[20px] sm:px-4 sm:py-5 md:p-5 lg:absolute lg:inset-0 lg:hover:z-30 lg:hover:w-[calc(200%+1.25rem)] lg:hover:h-[calc(200%+1.25rem)] lg:hover:bg-[#f3fbfb] lg:hover:p-7 lg:focus-within:z-30 lg:focus-within:w-[calc(200%+1.25rem)] lg:focus-within:h-[calc(200%+1.25rem)] lg:focus-within:bg-[#f3fbfb] lg:focus-within:p-7${
                    expandLeft
                      ? " lg:hover:left-auto lg:hover:right-0 lg:focus-within:left-auto lg:focus-within:right-0"
                      : ""
                  }${
                    expandUp
                      ? " lg:hover:top-auto lg:hover:bottom-0 lg:focus-within:top-auto lg:focus-within:bottom-0"
                      : ""
                  }`}
                >
                  <div className="flex min-w-0 flex-1 flex-col items-center text-center xl:flex-row xl:items-start xl:gap-4 xl:text-left">
                    <div className="relative mb-2.5 h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#f7fafc] sm:mb-3 sm:h-16 sm:w-16 md:h-[68px] md:w-[68px] xl:mb-0 xl:h-16 xl:w-16 lg:group-hover:h-[72px] lg:group-hover:w-[72px] lg:group-focus-within:h-[72px] lg:group-focus-within:w-[72px]">
                      <Image
                        src={area.icon}
                        alt=""
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 w-full max-w-full flex-col items-center xl:items-start">
                      <h3 className="min-h-[2.5em] w-full max-w-full text-[13px] font-semibold leading-[1.25] tracking-tight text-gray-900 [overflow-wrap:anywhere] hyphens-auto sm:text-sm md:text-[15px] xl:min-h-0 xl:text-base">
                        {area.name}
                      </h3>
                      <p className="mt-1.5 hidden w-full text-sm leading-relaxed text-gray-500 md:min-h-[2.75em] md:line-clamp-2">
                        {area.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto hidden pt-5 lg:group-hover:block lg:group-focus-within:block">
                    <p className="text-sm leading-relaxed text-gray-600">
                      {area.details}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#04737d] px-4 py-2 text-sm font-medium text-white">
                      Научи повече
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="mt-auto hidden justify-end pt-3 xl:flex lg:group-hover:hidden lg:group-focus-within:hidden">
                    <ArrowIcon />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
