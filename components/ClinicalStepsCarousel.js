"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
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
    description: "Попълнете форма за контакт или се обадете. Нашият екип ще отговори на всички ваши въпроси.",
    image: "/our-mission.jpg"
  },
  {
    number: "02",
    title: "Разговор с координатор",
    icon: ChatBubbleLeftRightIcon,
    description: "Обсъждаме вашето здравословно състояние и дали проучването е подходящо за вас.",
    image: "/who-we-are.jpg"
  },
  {
    number: "03",
    title: "Посещение и информирано съгласие",
    icon: DocumentCheckIcon,
    description: "Получавате ясна информация и решавате дали да участвате доброволно.",
    image: "/our-mission.jpg"
  },
  {
    number: "04",
    title: "Начални медицински изследвания",
    icon: BeakerIcon,
    description: "Стандартни тестове – кръв, урина, измервания и разговор с лекар, за да сме сигурни, че проучването е подходящо и безопасно за вас.",
    image: "/who-we-are.jpg"
  },
  {
    number: "05",
    title: "Официално включване",
    icon: ClipboardDocumentCheckIcon,
    description: "След успешните изследвания започва вашето участие. Може да получите иновативно лекарство или терапия.",
    image: "/our-mission.jpg"
  },
  {
    number: "06",
    title: "Редовни посещения",
    icon: CalendarDaysIcon,
    description: "През целия период ще идвате при нас на редовни визити за лечение, изследвания и разговори за вашето състояние.",
    image: "/who-we-are.jpg"
  },
  {
    number: "07",
    title: "Вашата роля",
    icon: UserGroupIcon,
    description: "От вас се очаква да идвате на уговорените визити, да спазвате указанията на лекаря и да споделяте открито как се чувствате.",
    image: "/our-mission.jpg"
  },
  {
    number: "08",
    title: "Финално посещение",
    icon: ChartBarIcon,
    description: "В края на проучването имате последна среща. Правим обобщаващи изследвания и обсъждаме следващите стъпки за вашето здраве.",
    image: "/who-we-are.jpg"
  },
  {
    number: "09",
    title: "Проследяване",
    icon: HeartIcon,
    description: "В някои проучвания има и допълнителни телефонни разговори или визити след края, за да се събере информация как се чувствате дългосрочно.",
    image: "/our-mission.jpg"
  }
];

export default function ClinicalStepsCarousel() {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

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

  // Auto-scroll effect - every 6-7 seconds
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const autoScrollInterval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const cardWidth = carouselRef.current.offsetWidth / 3;
        
        // If at the end, scroll back to the beginning
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Otherwise, scroll one card to the right
          carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 6500);

    return () => clearInterval(autoScrollInterval);
  }, [isAutoScrolling]);

  // Mouse down - start dragging
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setIsAutoScrolling(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  // Mouse move - drag
  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
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
    setIsAutoScrolling(false);
    const cardWidth = carouselRef.current.offsetWidth / 3;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scrollTo('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#238C96] hover:text-white group ${
          canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ left: '-24px' }}
      >
        <svg className="w-6 h-6 text-[#238C96] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scrollTo('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#238C96] hover:text-white group ${
          canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ right: '-24px' }}
      >
        <svg className="w-6 h-6 text-[#238C96] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-8 overflow-x-auto pb-4 pt-2 select-none hide-scrollbar"
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
              className="group hover:shadow-2xl transition-all rounded-2xl overflow-hidden flex-shrink-0"
              style={{ 
                width: 'calc((100% - 64px) / 3)',
                minWidth: '300px'
              }}
            >
              <div className="relative h-[450px]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay white box in bottom left */}
                <div className="absolute bottom-8 left-8 bg-white p-8 w-[calc(100%-4rem)] shadow-xl rounded-xl">
                  <div className="w-14 h-14 bg-[#238C96] flex items-center justify-center mb-5 rounded-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
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
      </div>
    </div>
  );
}
