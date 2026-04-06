"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import HealthyVolunteerForm from "../../../components/HealthyVolunteerForm";
import {
  ClipboardDocumentListIcon,
  BeakerIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  LockClosedIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    number: 1,
    icon: ClipboardDocumentListIcon,
    title: "Регистрация на интерес",
    description:
      "Първата стъпка е да попълните кратка форма за регистрация. Ще ви зададем няколко основни въпроса, свързани с възраст, здравословно състояние и навици. Това ни помага да проверим дали има клинично проучване, за което бихте могли да отговаряте на условията.",
    bullets: null,
    extra:
      "Регистрацията не ви задължава да участвате и служи само за първоначална оценка.",
  },
  {
    number: 2,
    icon: HeartIcon,
    title: "Предварителен разговор и информация",
    description:
      "Ако има подходящо клинично проучване, член на нашия екип ще се свърже с вас, за да ви предостави повече информация. Ще научите:",
    bullets: [
      "Каква е целта на проучването",
      "Каква е неговата продължителност",
      "Какви посещения или престой са необходими",
      "Какво възнаграждение е предвидено",
    ],
    extra:
      "Ще имате възможност спокойно да зададете всички свои въпроси, преди да решите дали желаете да продължите.",
  },
  {
    number: 3,
    icon: ShieldCheckIcon,
    title: "Първоначален преглед",
    description:
      "Ако проявявате интерес към участие, ще бъдете поканени на предварителен медицински преглед. Той има за цел да установи дали участието в конкретното клинично проучване е подходящо за вас. Скринингът може да включва:",
    bullets: [
      "Физически преглед",
      "Кръвни и уринни изследвания",
      "Електрокардиограма (ЕКГ)",
      "Преглед на медицинска история и др. оценки",
    ],
    extra:
      "Преди да започне проучването ще получите подробна информация и документ за информирано съгласие.",
  },
  {
    number: 4,
    icon: BeakerIcon,
    title: "Участие в клиничното проучване",
    description:
      "Ако сте одобрени и желаете да участвате, ще бъдете включени в клиничното проучване. В зависимост от конкретния проект участието може да включва:",
    bullets: [
      "Посещения в клиничния център",
      "Кратък или по-дълъг престой",
      "Медицински изследвания и наблюдение",
      "Последващи контролни прегледи",
    ],
    extra:
      "По време на проучването медицински специалисти наблюдават Вашето здравословно състояние. За отделеното време и ангажираност обикновено се предвижда възнаграждение, като размерът му зависи от конкретното проучване и неговата продължителност.",
  },
  {
    number: 5,
    icon: CalendarDaysIcon,
    title: "Проследяване след проучването",
    description:
      "След приключване на основната част на проучването може да има кратко проследяващо посещение или телефонен разговор.",
    bullets: null,
    extra:
      "Това позволява на медицинския екип да се увери, че всичко протича нормално след участието.",
  },
];

const compensationReasons = [
  {
    icon: GlobeAltIcon,
    text: "Помагат за развитието на нови лекарства",
  },
  {
    icon: ClipboardDocumentCheckIcon,
    text: "Получават безплатни изследвания",
  },
  {
    icon: LockClosedIcon,
    text: "Възнаграждение за отделеното време",
  },
  {
    icon: BeakerIcon,
    text: "Участват в научни изследвания",
  },
];

const quickLinks = [
  { name: "Как работи", href: "#how-it-works" },
  { name: "Стъпките", href: "#steps" },
  { name: "Възнаграждение", href: "#safety" },
  { name: "Кандидатствай", href: "#apply-form" },
];

export default function ZdraviDobrovolciPage() {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const stepsRef = useRef(null);

  const scrollSteps = (direction) => {
    if (stepsRef.current) {
      const card = stepsRef.current.querySelector("div");
      const cardWidth = (card?.offsetWidth ?? 400) + 24; // card + gap-6
      stepsRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen">

      {/* ===== HERO ===== */}
      <section id="how-it-works" className="relative bg-[#0A2540] overflow-visible">
        {/* Dots pattern top right */}
        <div className="absolute top-8 right-48 grid grid-cols-9 gap-2.5 opacity-25 pointer-events-none select-none">
          {[...Array(54)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-[45%] h-full pointer-events-none select-none">
          <div className="absolute right-24 top-12 w-72 h-72 rounded-full bg-gradient-to-br from-[#2D8CFF]/20 to-[#4B0082]/30" />
          <div className="absolute right-10 top-28 w-48 h-48 rounded-full bg-[#6B48FF]/15" />
          <div className="absolute right-36 bottom-8 w-32 h-32 rounded-full border border-[#2D8CFF]/30" />
        </div>

        <div className="mx-auto w-[95%] md:w-[85%] relative z-10" style={{ paddingTop: '80px', paddingBottom: 0 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center min-h-[600px]">
            {/* Text */}
            <div className="text-white pb-12">
              <p className="text-[#60B4FF] font-semibold text-sm uppercase tracking-widest mb-4">
                Здрави доброволци
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Как работи{" "}
                <span className="text-[#60B4FF]">участието</span>
              </h1>
              <p className="text-xl text-blue-200 font-semibold mb-4">
                Участие като здрав доброволец в клинично проучване
              </p>
              <p className="text-blue-100/75 leading-relaxed mb-4 max-w-lg text-base">
                Участието на здрави доброволци в клинични проекти е важна част от развитието на нови лекарства и терапии. Участието е изцяло доброволно и се извършва под медицински контрол.
              </p>
              <p className="text-blue-100/75 leading-relaxed mb-8 max-w-lg text-base">
                За отделеното време и ангажираност се предвижда възнаграждение. В зависимост от клиничната програма възнаграждението може да бъде различно, тъй като зависи от продължителността и необходимите посещения.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#apply-form"
                  className="inline-flex items-center gap-2 bg-[#2D8CFF] hover:bg-[#1a6fd4] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Кандидатствай
                </Link>
                <Link
                  href="/klinichni-prouchvaniya/nameri-klinichno-prouchvane"
                  className="inline-flex items-center gap-2 border-2 border-white/80 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Намери проучване
                  <ChevronRightIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right image - кръгла с декорации */}
            <div className="hidden lg:flex justify-center items-start pt-8">
              <div className="relative">
                {/* Dots decoration - горе вдясно */}
                <div className="absolute -right-12 -top-12 grid grid-cols-8 gap-2.5 opacity-30 pointer-events-none">
                  {[...Array(48)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
                  ))}
                </div>
                {/* Dots decoration - долу вляво */}
                <div className="absolute -left-10 -bottom-6 grid grid-cols-6 gap-2 opacity-25 pointer-events-none">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#60B4FF]" />
                  ))}
                </div>
                {/* Main circular image */}
                <div className="w-[420px] h-[420px] rounded-full overflow-hidden bg-gradient-to-br from-[#2D8CFF]/25 to-[#4B0082]/25 border-4 border-white shadow-2xl">
                  <img
                    src="/images/hero-volunteers.png"
                    alt="Здрави доброволци"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '50% 20%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STEPS ===== */}
      {/*
        Логика на ширините:
        Visible area от лявото отстояние (7.5vw) = 92.5vw
        Искаме 3 пълни + 1/3 от 4-та = 3.333 карти
        3 gap-а × 1.5rem = 4.5rem
        card_width = (92.5vw - 4.5rem) / 3.333
      */}
      <section id="steps" className="py-16 bg-white overflow-hidden">
        <div className="ml-[2.5%] md:ml-[7.5%]">
          {/* Section heading */}
          <div className="mb-10 pr-[2.5%] md:pr-[7.5%]">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0A2540] leading-tight">
              Стъпки за участие като{" "}
              <span className="text-[#2D8CFF]">здрав доброволец</span>
            </h2>
          </div>
          <div
            ref={stepsRef}
            className="flex gap-6 overflow-x-auto pb-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex-shrink-0 bg-[#F0F7FF] rounded-3xl p-9 flex flex-col min-h-[420px]"
                style={{
                  width: "clamp(260px, calc((92.5vw - 4.5rem) / 3.333), 520px)",
                }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  <step.icon className="w-8 h-8 text-[#2D8CFF]" strokeWidth={1.5} />
                </div>
                {/* Step label */}
                <p className="text-xs text-[#2D8CFF] font-semibold mb-2 uppercase tracking-widest">
                  Стъпка {step.number}
                </p>
                {/* Title */}
                <h3 className="text-xl font-black text-[#0A2540] mb-4 leading-snug">
                  {step.title}
                </h3>
                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed mb-4">
                  {step.description}
                </p>
                {/* Bullets */}
                {step.bullets && (
                  <ul className="space-y-2 mb-4">
                    {step.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="mt-2 w-2 h-2 rounded-full bg-[#2D8CFF] flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {step.extra && (
                  <p className="text-sm text-gray-500 leading-relaxed mt-auto pt-4 border-t border-blue-100/70 italic">
                    {step.extra}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Navigation row */}
          <div className="flex items-center justify-between mt-4 pr-[2.5%] md:pr-[7.5%]">
            <Link
              href="#apply-form"
              className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#145f3a] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all duration-200 shadow hover:shadow-md"
            >
              Кандидатствай
              <span className="text-base">›</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollSteps("left")}
                className="w-12 h-12 rounded-full border-2 border-[#2D8CFF] text-[#2D8CFF] hover:bg-[#2D8CFF] hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Предишна стъпка"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSteps("right")}
                className="w-12 h-12 rounded-full bg-[#2D8CFF] text-white hover:bg-[#1a6fd4] flex items-center justify-center transition-all duration-200"
                aria-label="Следваща стъпка"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SAFETY SECTION ===== */}
      <section id="safety" className="py-20 bg-[#EBF5FF]">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: content */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2540] mb-6 leading-tight">
                Възнаграждение за{" "}
                <span className="text-[#2D8CFF]">участие</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Участието в клинични проучвания със здрави доброволци обикновено включва възнаграждение за отделеното време и ангажираност.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Размерът на възнаграждението не е еднакъв за всички проучвания и зависи от: продължителността, посещения или престой, изследвания и др.
              </p>
              <p className="text-[#0A2540] font-bold text-lg mb-6">
                Защо хората участват като здрави доброволци?
              </p>
              {/* Reasons grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                {compensationReasons.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#2D8CFF]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-[#2D8CFF]" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm text-gray-600 leading-snug pt-2">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link
                href="#apply-form"
                className="inline-flex items-center gap-2 bg-[#2D8CFF] hover:bg-[#1a6fd4] text-white font-semibold px-6 py-3 rounded-full text-sm transition-all duration-200 shadow hover:shadow-md"
              >
                Кандидатствай
                <span className="text-base">›</span>
              </Link>
            </div>

            {/* Right: circular image */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Dots decoration */}
                <div className="absolute -right-8 -top-8 grid grid-cols-6 gap-2 opacity-40 pointer-events-none">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#2D8CFF]" />
                  ))}
                </div>
                <div className="w-[340px] h-[340px] rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src="/images/doctor-safety.png"
                    alt="Медицински специалист"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section id="apply" className="py-16">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="relative bg-[#1B4F8A] rounded-3xl overflow-hidden">
            {/* Decorative rings */}
            <div className="absolute right-0 top-0 h-full w-80 pointer-events-none select-none">
              <div className="absolute right-8 top-6 w-52 h-52 rounded-full border-[3px] border-pink-400/50" />
              <div className="absolute right-16 top-14 w-36 h-36 rounded-full bg-pink-500/20" />
              <div className="absolute right-4 bottom-4 w-20 h-20 rounded-full border border-pink-300/30" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-10 py-14 md:px-14 items-center relative z-10">
              {/* Text + buttons */}
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-5 leading-tight">
                  Проявявате интерес към участие като здрав доброволец?
                </h2>
                <p className="text-blue-200 leading-relaxed mb-3">
                  Ако проявявате интерес към участие като здрав доброволец, можете да се регистрирате и нашият екип ще се свърже с Вас.
                </p>
                <p className="text-blue-200 leading-relaxed mb-8">
                  Ще получите информация за текущи или бъдещи клинични проучвания, включително условията за участие и предвиденото възнаграждение.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/klinichni-prouchvaniya/nameri-klinichno-prouchvane"
                    className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#1B4F8A] font-semibold px-6 py-3 rounded-full transition-all duration-200"
                  >
                    Намери проучване
                    <span className="text-base">›</span>
                  </Link>
                
                </div>
              </div>

              {/* Right visual */}
              <div className="hidden lg:flex justify-end items-center pr-4">
                <div className="relative">
                  <div className="w-44 h-44 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                    <HeartIcon className="w-16 h-16 text-white/50" strokeWidth={1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FORM SECTION ===== */}
      <section id="apply-form" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <HealthyVolunteerForm />
        </div>
      </section>

      {/* ===== QUICK LINKS (КАНДИДАТСТВАНЕ) ===== */}
      <div className="fixed right-0 bottom-1/3 z-50 hidden lg:block">
        <div className="relative flex flex-col items-end">
          {/* Dropdown */}
          {quickLinksOpen && (
            <div className="absolute right-full bottom-0 mr-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setQuickLinksOpen(false)}
                  className="block px-5 py-3.5 text-sm text-gray-700 hover:bg-[#EBF5FF] hover:text-[#1a56a0] transition-colors border-b border-gray-50 last:border-0 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Capsule button */}
          <button
            onClick={() => setQuickLinksOpen(!quickLinksOpen)}
            className="flex items-center gap-2 bg-[#1B4F8A] hover:bg-[#163f72] text-white font-semibold pl-4 pr-3 py-3 rounded-l-full shadow-lg transition-all duration-200"
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
