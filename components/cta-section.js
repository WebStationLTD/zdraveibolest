"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Carousel slides data
const slides = [
  {
    id: 1,
    title: "Намерете клиничното изпитване за вас или помогнете на други хора:",
    description:
      "Регистрирайте се като попълните кратка контактна форма, а ние ще се свържем с Вас.",
    buttonText: "Регистрация",
    buttonLink: "/register",
  },
  {
    id: 2,
    title: "Разбери повече за заболяванията",
    description:
      "От настинка и грип до редки хронични заболявания – научи какво представляват, как се лекуват и кога трябва да потърсиш лекарска помощ.",
    buttonText: "Виж повече",
    buttonLink: "/#therapeutic-areas",
  },
  {
    id: 3,
    title: "Бъди част от информираното общество",
    description:
      "Регистрирай се и наблюдавай развитието на медицината и получи пълен достъп до сайта.",
    buttonText: "Регистрация",
    buttonLink: "/register",
  },
];

export default function CTASection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  // Handle next slide with transition
  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Handle previous slide with transition
  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Handle dot navigation
  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="relative pt-16 md:pt-20 lg:pt-24 pb-0">
      {/* CTA Box with Background and Effects - 80% Container */}
      <div className="px-5">
        <div className="mx-auto w-[95%] md:w-[80%]">
          <div className="relative bg-[#04737d] rounded-3xl md:rounded-[2.5rem] overflow-hidden py-12 md:py-16 lg:py-20 px-6 md:px-12 mb-0">
            {/* Decorative Element - Top Left (Circles) */}
            <img
              src="/Register-section-Element-1.svg"
              alt=""
              className="absolute top-0 left-0 pointer-events-none opacity-30"
            />

            {/* Decorative Element - Bottom Right (Plant/Leaves) */}
            <img
              src="/Register-section-Element-2.svg"
              alt=""
              className="absolute bottom-0 right-0 pointer-events-none opacity-40"
            />

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              disabled={isTransitioning}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Предишен слайд"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNextSlide}
              disabled={isTransitioning}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Следващ слайд"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
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
            </button>

            {/* Content - Centered with Carousel */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              {/* Slides Container */}
              <div className="relative min-h-[280px] md:min-h-[250px] flex items-center justify-center">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 translate-x-0"
                        : index < currentSlide
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    }`}
                  >
                    {/* Main Heading */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                      {slide.title}
                    </h2>

                    {/* Subheading */}
                    <p className="text-base md:text-lg text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <Link
                      href={slide.buttonLink}
                      className="inline-block px-10 py-4 bg-[#fd9300] hover:bg-[#e48400] text-white text-base md:text-lg font-medium rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Dots Navigation - REMOVED as per user request */}
              {/* <div className="flex items-center justify-center gap-2 mt-6">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${
                      index === currentSlide
                        ? "w-8 h-2 bg-[#fd9300]"
                        : "w-2 h-2 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Към слайд ${index + 1}`}
                  />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Illustration - Full Width */}
      <div className="relative -mt-1">
        <img
          src="/Footer Illustration.svg"
          alt="Медицински специалисти"
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
    </section>
  );
}
