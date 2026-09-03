"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import ClinicalTrialMultistepForm from "../../../components/ClinicalTrialMultistepForm";
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  BeakerIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    number: 1,
    icon: ClipboardDocumentListIcon,
    title: "Разкажи ни за твоето здравословно състояние",
    description:
      "Най-важното, с което започваме, е личната история на всеки един пациент. Ако си със заболяване, можеш да ни споделиш твоята история — от поставянето на диагнозата и лечението до момента до текущото ти здравословно състояние.",
    extra:
      "Попълването на формата не те обвързва задължително с участие в проучване.",
  },
  {
    number: 2,
    icon: MagnifyingGlassIcon,
    title: "Ние търсим подходящите клинични проучвания за теб",
    description:
      "Не всеки пациент може да участва в определено клинично проучване. Всяко има предварително определени критерии, свързани с диагнозата, характеристиката на заболяването, възрастта и здравословното състояние.",
    extra:
      "На базата на предоставената от теб информация екипът ни проверява възможностите за твоето участие.",
  },
  {
    number: 3,
    icon: ChatBubbleLeftRightIcon,
    title: "Запознаване с детайлите и възможностите на проучването",
    description:
      "Дори и да открием подходящо клинично проучване, това не означава непременно, че трябва да участваш. Важно е всеки пациент да получи детайлна информация за целта, лечението, протичането и очакванията.",
    extra:
      "При тази стъпка отговаряме подробно на всички въпроси, за да вземеш информирано решение.",
  },
  {
    number: 4,
    icon: BeakerIcon,
    title: "Преминаване през медицински скрининг и оценка",
    description:
      "Ако проявиш интерес към конкретно клинично изпитване, следва медицински скрининг — преглед/оценка, при която лекарският екип проверява дали проучването е подходящо за теб.",
    extra: null,
  },
  {
    number: 5,
    icon: ShieldCheckIcon,
    title: "Твоят информиран избор и доброволно съгласие",
    description:
      "Преди да се включиш, преминаваш през процес на информирано съгласие. Получаваш информация за програмата, целите, процедурите, ползите и рисковете, както и за твоите права като участник.",
    extra:
      "Участието е доброволно. Можеш да прекратиш участието си по всяко време.",
  },
  {
    number: 6,
    icon: HeartIcon,
    title: "Същинско участие и безплатно медицинско проследяване",
    description:
      "Всяко клинично проучване има предварително определен план: посещения в центъра, лекарски прегледи, прием на изпитвано лечение, лабораторни и образни изследвания, въпросници и други процедури.",
    extra:
      "Медицинският екип проследява състоянието на всеки участник през целия период на проучването.",
  },
];

const benefits = [
  "Безплатни медицински прегледи",
  "Безплатни изследвания и тестове",
  "Безплатно изследователско лечение",
  "Реимбурсация на разходите за храна и транспорт",
];

const whyParticipate = [
  {
    title: "Достъп до нови възможности за лечение",
    text: "Клиничните проучвания дават достъп до нови лекарства и терапии, които все още не са част от стандартното лечение в лечебните заведения у нас.",
  },
  {
    title: "Специализирана медицинска грижа",
    text: "Здравословното състояние на всеки участник се проследява регулярно от медицински екип чрез прегледи, изследвания и други процедури.",
  },
  {
    title: "Участие без разходи за теб",
    text: "Прегледите, изследванията, медицинските процедури и лечението на участниците са безплатни — както и другите дейности, свързани с проучването.",
  },
];

const quickLinks = [
  { name: "Как работи", href: "#how-it-works" },
  { name: "Стъпките", href: "#steps" },
  { name: "Ползи", href: "#benefits" },
  { name: "Кандидатствай", href: "#apply-form" },
];

export default function PatsientiPage() {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const stepsRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const scrollSteps = () => {
    if (!stepsRef.current) return;
    const card = stepsRef.current.querySelector("div");
    const cardWidth = (card?.offsetWidth ?? 400) + 24;
    const currentScroll = stepsRef.current.scrollLeft;
    const maxScroll =
      stepsRef.current.scrollWidth - stepsRef.current.clientWidth;

    if (currentScroll >= maxScroll - 10) {
      stepsRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setCurrentSlideIndex(0);
    } else {
      stepsRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      setCurrentSlideIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section id="how-it-works" className="relative bg-[#04737d] overflow-visible">
        <div className="absolute top-8 right-48 grid grid-cols-9 gap-2.5 opacity-25 pointer-events-none select-none">
          {[...Array(54)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>
        <div className="absolute top-0 right-0 w-[45%] h-full pointer-events-none select-none">
          <div className="absolute right-24 top-12 w-72 h-72 rounded-full bg-gradient-to-br from-white/10 to-[#fd9300]/20" />
          <div className="absolute right-10 top-28 w-48 h-48 rounded-full bg-white/10" />
        </div>

        <div
          className="mx-auto w-[95%] md:w-[85%] relative z-10"
          style={{ paddingTop: "80px", paddingBottom: 0 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center min-h-[600px]">
            <div className="text-white pb-12">
              <p className="text-[#fd9300] font-semibold text-sm uppercase tracking-widest mb-4">
                Пациенти
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                Клинични проучвания за пациенти:{" "}
                <span className="text-white/90">
                  Открий нова възможност за твоето лечение
                </span>
              </h1>
              <p className="text-white/85 leading-relaxed mb-4 max-w-lg text-base">
                Когато живееш с определено заболяване, е нормално да търсиш
                различни възможности за лечение. Освен стандартното, което се
                предлага в болниците, съществуват медицински програми, които
                разработват иновативни подходи.
              </p>
              <p className="text-white/85 leading-relaxed mb-8 max-w-lg text-base">
                Клиничните проучвания дават възможност на пациентите да получат
                достъп до иновативна терапия — под наблюдение от специализиран
                медицински екип и безплатно.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#apply-form"
                  className="inline-flex items-center gap-2 bg-[#fd9300] hover:bg-[#e48400] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Кандидатствай сега
                </Link>
                <Link
                  href="/klinichni-prouchvaniya/nameri-klinichno-prouchvane"
                  className="inline-flex items-center gap-2 border-2 border-white/80 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-all duration-300"
                >
                  Намери проучване
                  <ChevronRightIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center items-start pt-8">
              <div className="relative">
                <div className="w-[420px] h-[420px] rounded-full overflow-hidden bg-gradient-to-br from-white/20 to-[#035057] border-4 border-white shadow-2xl">
                  <img
                    src="/images/patients-hero.jpg"
                    alt="Клинични проучвания за пациенти"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "50% 20%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="steps" className="py-16 bg-white overflow-hidden">
        <div className="ml-[2.5%] md:ml-[7.5%]">
          <div className="mb-10 pr-[2.5%] md:pr-[7.5%]">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Как да участваш в{" "}
              <span className="text-[#04737d]">клинично проучване</span>
            </h2>
            <p className="mt-3 text-gray-600">Основни стъпки на пациента</p>
          </div>
          <div
            ref={stepsRef}
            className="flex gap-6 overflow-x-auto pb-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex-shrink-0 bg-[#04737d]/5 rounded-3xl p-9 flex flex-col min-h-[420px]"
                style={{
                  width: "clamp(260px, calc((92.5vw - 4.5rem) / 3.333), 520px)",
                }}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  <step.icon className="w-8 h-8 text-[#04737d]" strokeWidth={1.5} />
                </div>
                <p className="text-xs text-[#04737d] font-semibold mb-2 uppercase tracking-widest">
                  Стъпка {step.number}
                </p>
                <h3 className="text-xl font-black text-gray-900 mb-4 leading-snug">
                  {step.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed mb-4">
                  {step.description}
                </p>
                {step.extra && (
                  <p className="text-sm text-gray-500 leading-relaxed mt-auto pt-4 border-t border-[#04737d]/15 italic">
                    {step.extra}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (stepsRef.current) {
                      const card = stepsRef.current.querySelector("div");
                      const cardWidth = (card?.offsetWidth ?? 400) + 24;
                      stepsRef.current.scrollTo({
                        left: cardWidth * index,
                        behavior: "smooth",
                      });
                      setCurrentSlideIndex(index);
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlideIndex
                      ? "w-8 h-3 bg-[#04737d]"
                      : "w-3 h-3 bg-gray-300 hover:bg-[#04737d]/50"
                  }`}
                  aria-label={`Отиди на стъпка ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={scrollSteps}
              className="w-12 h-12 rounded-full bg-[#04737d] text-white hover:bg-[#035057] flex items-center justify-center transition-all duration-200 shadow-md"
              aria-label="Следваща стъпка"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                Какво{" "}
                <span className="text-[#04737d]">получаваш?</span>
              </h2>
              <ul className="space-y-4 mb-10">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-[#04737d] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                Участието в клинично проучване е лично решение. За някои
                пациенти то е възможност за достъп до нови терапии. За други —
                начин да осигурят иновативно лечение и да допринесат за
                развитието на лечението на хора със същата диагноза.
              </p>
              <Link
                href="#apply-form"
                className="inline-flex items-center gap-2 bg-[#04737d] hover:bg-[#035057] text-white font-semibold px-6 py-3 rounded-full text-sm transition-all shadow"
              >
                Кандидатствай сега
                <span className="text-base">›</span>
              </Link>
            </div>

            <div className="space-y-5">
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Защо да участваш?
              </h3>
              {whyParticipate.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <h4 className="font-bold text-[#04737d] mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="relative bg-[#035057] rounded-3xl overflow-hidden px-10 py-14 md:px-14">
            <div className="max-w-2xl relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <UserGroupIcon className="w-8 h-8 text-[#fd9300]" />
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  Готов ли си да провериш възможностите за теб?
                </h2>
              </div>
              <p className="text-white/85 leading-relaxed mb-8">
                Ти решаваш дали да продължим заедно по пътя на клиничното
                проучване. Попълни краткия въпросник — ние ще проверим дали има
                подходяща възможност.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#apply-form"
                  className="inline-flex items-center gap-2 bg-[#fd9300] hover:bg-[#e48400] text-white font-semibold px-6 py-3 rounded-full transition-all"
                >
                  Кандидатствай сега
                </Link>
                <Link
                  href="/klinichni-prouchvaniya/nameri-klinichno-prouchvane"
                  className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#035057] font-semibold px-6 py-3 rounded-full transition-all"
                >
                  Намери проучване
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="apply-form" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto w-[95%] md:w-[85%] max-w-4xl">
          <ClinicalTrialMultistepForm />
        </div>
      </section>

      {/* Quick links capsule */}
      <div className="fixed right-0 bottom-1/3 z-50 hidden lg:block">
        <div className="relative flex flex-col items-end">
          {quickLinksOpen && (
            <div className="absolute right-full bottom-0 mr-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setQuickLinksOpen(false)}
                  className="block px-5 py-3.5 text-sm text-gray-700 hover:bg-[#04737d]/5 hover:text-[#04737d] transition-colors border-b border-gray-50 last:border-0 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
          <button
            onClick={() => setQuickLinksOpen(!quickLinksOpen)}
            className="flex items-center gap-2 bg-[#04737d] hover:bg-[#035057] text-white font-semibold pl-4 pr-3 py-3 rounded-l-full shadow-lg transition-all duration-200"
          >
            <span className="text-sm whitespace-nowrap">Кандидатстване</span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform duration-200 ${
                quickLinksOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </main>
  );
}
