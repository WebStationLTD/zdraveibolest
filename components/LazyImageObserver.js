"use client";

import { useEffect, useRef } from "react";

/**
 * Компонент, който следи кога LCP изображението влиза във viewport
 * и ще маркира, че е заредено успешно
 */
export default function LazyImageObserver() {
  const observerRef = useRef(null);
  const lcpImageLoadedRef = useRef(false);

  useEffect(() => {
    // Функция за докладване на LCP метрика
    const reportLCP = (targetElement) => {
      if (lcpImageLoadedRef.current) return; // Предотвратяваме повторно докладване

      lcpImageLoadedRef.current = true;

      if (window.performance && window.performance.mark) {
        window.performance.mark("lcp-detected");
      }

      // Маркираме атрибут на изображението, че е заредено
      if (targetElement) {
        targetElement.setAttribute("data-lcp-loaded", "true");
        console.log("LCP изображението е заредено успешно!", targetElement.id);
      }
    };

    // Използваме Intersection Observer API за да проверим кога изображението е видимо
    const initIntersectionObserver = () => {
      // Търсим LCP изображенията според viewport размера и ID
      const isMobile = window.innerWidth <= 640;
      const targetId = isMobile ? "hero-mobile-lcp" : "hero-desktop-lcp";

      // Използваме ID селектори за по-добра производителност
      const targetImage = document.getElementById(targetId);

      if (targetImage && "IntersectionObserver" in window) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                reportLCP(entry.target);
                // Изчистваме observer-а след като изображението е заредено
                if (observerRef.current) {
                  observerRef.current.disconnect();
                  observerRef.current = null;
                }
              }
            });
          },
          {
            root: null,
            threshold: 0.01, // 1% от изображението да бъде видимо е достатъчно
            rootMargin: "0px", // Не добавяме допълнителен марджин
          }
        );

        observerRef.current.observe(targetImage);

        // Проверяваме и за случая, когато изображението вече е заредено
        if (targetImage.complete) {
          reportLCP(targetImage);
        } else {
          // Добавяме и onload handler за директно изображение
          targetImage.onload = () => reportLCP(targetImage);
        }

        // Алтернативен подход чрез PerformanceObserver за измерване на LCP
        if ("PerformanceObserver" in window) {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];

            // Регистрираме LCP метрика
            console.log(
              "LCP Measurement:",
              Math.round(lastEntry.startTime),
              "ms"
            );

            // Проверяваме дали елементът съвпада с нашия LCP елемент
            if (lastEntry.element && lastEntry.element.id === targetId) {
              reportLCP(lastEntry.element);
              lcpObserver.disconnect();
            }
          });

          lcpObserver.observe({
            entryTypes: ["largest-contentful-paint"],
            buffered: true,
          });
        }
      }
    };

    // Изчакваме минимално, за да бъдем сигурни, че DOM е зареден
    const timer = setTimeout(() => {
      initIntersectionObserver();
    }, 10); // Намаляваме времето за изчакване

    // Cleanup при unmount
    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  // Този компонент не рендерира нищо
  return null;
}
