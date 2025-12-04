"use client";

import { useRef, useState, useEffect } from "react";
import { 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  HeartIcon,
  BeakerIcon,
  CalendarDaysIcon,
  DocumentCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    number: "01",
    title: "Първа стъпка – свързване с нас",
    icon: PhoneIcon,
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
    description: [
      "В клиничния център ще получите ясна и подробна информация за целта на проучването, как протича и какви нови лекарства или терапии ще бъдат изследвани.",
      "Вие решавате дали да участвате, като подписвате информирано съгласие – документ, който ви гарантира, че участието е доброволно и че винаги можете да се откажете."
    ]
  },
  {
    number: "04",
    title: "Начални медицински изследвания",
    icon: BeakerIcon,
    description: [
      "Това включва стандартни тестове – кръв, урина, измервания и разговор с лекар, за да сме сигурни, че проучването е подходящо и безопасно за вас.",
      "Това е важна стъпка, защото само ако всичко е наред, ще имате възможност да получите подходяща терапия."
    ]
  },
  {
    number: "05",
    title: "Официално включване",
    icon: ClipboardDocumentCheckIcon,
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
    description: [
      "В края на проучването имате последна среща.",
      "Правим обобщаващи изследвания, връщате останали лекарства (ако има такива) и заедно обсъждаме следващите стъпки за вашето здраве."
    ]
  },
  {
    number: "09",
    title: "Проследяване",
    icon: HeartIcon,
    description: [
      "В някои проучвания има и допълнителни телефонни разговори или визити след края, за да се събере информация как се чувствате дългосрочно."
    ]
  }
];

export default function StepsCarousel() {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position for arrow visibility
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition);
      return () => carousel.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  // Mouse down - start dragging
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  // Mouse move - drag
  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Mouse up - stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  // Mouse leave - stop dragging
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (carouselRef.current) {
        carouselRef.current.style.cursor = 'grab';
      }
    }
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (!carouselRef.current) return;
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Navigation buttons
  const scrollTo = (direction) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.offsetWidth / 3.5;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scrollTo('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#04737d] hover:text-white group ${
          canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ left: '-24px' }}
      >
        <svg className="w-6 h-6 text-[#04737d] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scrollTo('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#04737d] hover:text-white group ${
          canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ right: '-24px' }}
      >
        <svg className="w-6 h-6 text-[#04737d] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-4 pt-6 select-none hide-scrollbar"
        style={{ 
          cursor: 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex-shrink-0 ${isDragging ? '' : 'hover:cursor-pointer'}`}
              style={{ 
                width: 'calc((100% - 72px) / 3.5)', // 3.5 cards visible with gaps
                minWidth: '280px'
              }}
            >
              {/* Step Number Badge - ОРАНЖЕВО с наклон */}
              <div className="absolute -top-4 -right-4 bg-[#fd9300] text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform duration-300">
                {step.number}
              </div>

              {/* Icon - ЗЕЛЕНО */}
              <div className="bg-[#04737d] w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-8 w-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight pr-8">
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

              {/* Decorative Bottom Element - ЗЕЛЕНО */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#04737d] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          );
        })}
      </div>

      {/* Scroll Hint */}
      <div className="flex items-center justify-center gap-3 mt-6 text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
          </svg>
          <span>Плъзнете или използвайте стрелките</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <span className="text-gray-400">|</span>
          <span className="ml-2">Скролвайте с мишката</span>
          <svg className="w-4 h-4 animate-bounce-x ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}



