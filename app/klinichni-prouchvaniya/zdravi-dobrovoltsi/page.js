"use client";

import { useState, useRef } from "react";
import Link from "next/link";
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
    title: "Регистрирайте интереса си",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    bullets: null,
    extra: null,
  },
  {
    number: 2,
    icon: HeartIcon,
    title: "Скрининг преглед",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    bullets: [
      "Физически преглед",
      "Кръвни и урейни изследвания",
      "ЕКГ и здравни оценки",
    ],
    extra:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation. Участието е изцяло доброволно.",
  },
  {
    number: 3,
    icon: BeakerIcon,
    title: "Участие в проучването",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    bullets: [
      "Дневни визити като амбулаторен пациент",
      "Краткосрочен престой (нощувка или няколко дни)",
      "По-дълъг престой до няколко седмици",
      "Проследяващи визити на място или по телефон",
    ],
    extra:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Лекари и сестри са на ваше разположение 24/7.",
  },
  {
    number: 4,
    icon: CalendarDaysIcon,
    title: "Текущо проследяване",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    bullets: null,
    extra: null,
  },
];

const safetyFeatures = [
  {
    icon: GlobeAltIcon,
    text: "Клиники, разположени в близост до основни медицински центрове",
  },
  {
    icon: CalendarDaysIcon,
    text: "Лекари и медицински персонал на място 24/7 и при спешност",
  },
  {
    icon: ShieldCheckIcon,
    text: "Проучвания, одобрени от независими комисии по етика",
  },
  {
    icon: LockClosedIcon,
    text: "Строги протоколи за защита на личните данни и поверителност",
  },
  {
    icon: ClipboardDocumentCheckIcon,
    text: "Над 2,500 успешно завършени ранни проучвания",
  },
];

const quickLinks = [
  { name: "Как работи", href: "#how-it-works" },
  { name: "Безопасност", href: "#safety" },
  { name: "Кандидатствай", href: "#apply" },
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
      <section id="how-it-works" className="relative bg-[#0A2540] overflow-hidden">
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

        <div className="mx-auto w-[95%] md:w-[85%] py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="text-white">
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
              <p className="text-blue-100/75 leading-relaxed mb-8 max-w-lg text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                Duis aute irure dolor in reprehenderit in voluptate velit esse.
              </p>
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 bg-[#2D8CFF] hover:bg-[#1a6fd4] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Провери допустимостта си
              </Link>
            </div>

            {/* Right decorative */}
            <div className="hidden lg:flex justify-end items-center">
              <div className="relative w-[400px] h-[340px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#2D8CFF]/25 to-[#4B0082]/25 border border-[#2D8CFF]/20" />
                </div>
                <div className="absolute top-8 right-8 w-48 h-48 rounded-full bg-[#6B48FF]/10" />
                <div className="absolute bottom-4 left-12 w-20 h-20 rounded-full border-2 border-[#60B4FF]/25" />
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
      <section className="py-16 bg-white overflow-hidden">
        <div className="ml-[2.5%] md:ml-[7.5%]">
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
              href="#apply"
              className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#145f3a] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all duration-200 shadow hover:shadow-md"
            >
              Провери допустимостта си
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
                Защо{" "}
                <span className="text-[#2D8CFF]">безопасността</span>{" "}
                е приоритет
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing:
              </p>
              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                {safetyFeatures.map((feature, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <feature.icon className="w-8 h-8 text-[#2D8CFF]" strokeWidth={1.5} />
                    <p className="text-sm text-gray-600 leading-snug">{feature.text}</p>
                  </div>
                ))}
              </div>
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#145f3a] text-white font-semibold px-6 py-3 rounded-full text-sm transition-all duration-200 shadow hover:shadow-md"
              >
                Научи повече
                <span className="text-base">›</span>
              </Link>
            </div>

            {/* Right: circular image placeholder */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Dots decoration */}
                <div className="absolute -right-8 -top-8 grid grid-cols-6 gap-2 opacity-40 pointer-events-none">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#2D8CFF]" />
                  ))}
                </div>
                <div className="w-[340px] h-[340px] rounded-full overflow-hidden bg-gradient-to-br from-[#2D8CFF]/20 to-[#0A2540]/20 border-4 border-white shadow-2xl flex items-center justify-center">
                  <div className="text-center text-[#2D8CFF]/40">
                    <ShieldCheckIcon className="w-24 h-24 mx-auto mb-3" strokeWidth={1} />
                    <p className="text-sm font-medium text-[#1a56a0]/60">Снимка на лекар</p>
                  </div>
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
                  Готови ли сте да участвате и да помогнете за бъдещето на медицината?
                </h2>
                <p className="text-blue-200 leading-relaxed mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore, quis nostrud
                  exercitation ullamco.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/klinichni-prouchvaniya/nameri-klinichno-prouchvane"
                    className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#1B4F8A] font-semibold px-6 py-3 rounded-full transition-all duration-200"
                  >
                    Намери проучване
                    <span className="text-base">›</span>
                  </Link>
                  <Link
                    href="/klinichni-prouchvaniya#registration"
                    className="inline-flex items-center gap-2 bg-white text-[#1B4F8A] hover:bg-blue-50 font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-md"
                  >
                    Регистрирай се
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
