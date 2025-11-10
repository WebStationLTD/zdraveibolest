"use client";

import { useEffect, useState } from "react";

/**
 * Компонент за рендиране на съдържанието на услугите
 * Този компонент се зарежда динамично и използва клиентски код за оптимизация
 */
export default function ServiceContent({ content }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Използваме IntersectionObserver за "lazy loading" на съдържанието
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const contentContainer = document.getElementById("service-content");
    if (contentContainer) {
      observer.observe(contentContainer);
    }

    return () => {
      if (contentContainer) {
        observer.unobserve(contentContainer);
      }
      observer.disconnect();
    };
  }, []);

  // Оптимизация на изображенията в съдържанието
  useEffect(() => {
    if (isVisible) {
      // Намираме всички изображения в съдържанието
      const images = document.querySelectorAll("#service-content img");

      // Добавяме lazy loading и формат webp за всички изображения
      images.forEach((img) => {
        if (!img.hasAttribute("loading")) {
          img.setAttribute("loading", "lazy");
        }

        // Добавяме decoding="async" за по-добра производителност
        if (!img.hasAttribute("decoding")) {
          img.setAttribute("decoding", "async");
        }
      });
    }
  }, [isVisible]);

  return (
    <article className="mx-auto max-w-8xl w-full">
      <div
        id="service-content"
        className={`wordpress-content prose max-w-none leading-relaxed ${
          isVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
}
