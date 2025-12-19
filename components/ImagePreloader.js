"use client";

import { useEffect } from "react";

// Списък с изображения, които трябва да се заредят предварително
const CRITICAL_IMAGES = [
  "/hero-woman-bg.png", // Hero изображение - жена
];

/**
 * Компонент за предварително зареждане на критични изображения
 * Подобрява LCP метриката, като зарежда важните изображения предварително
 */
export default function ImagePreloader() {
  useEffect(() => {
    // Оптимизирана версия на функцията за предварително зареждане
    const preloadImages = () => {
      // Определяме приоритетното изображение
      const priorityImage = "/hero-woman-bg.png";

      // Зареждаме приоритетното изображение първо
      const loadPriorityImage = () => {
        const img = new Image();
        img.fetchPriority = "high";
        img.importance = "high";

        img.onload = () => {
          // След като приоритетното изображение е заредено, маркираме го
          if (window.performance && window.performance.mark) {
            window.performance.mark("priority-image-loaded");
          }

          // След като приоритетното изображение е заредено, зареждаме останалите
          loadRemainingImages();
        };

        img.onerror = () => {
          console.error(`Failed to preload priority image: ${priorityImage}`);
          loadRemainingImages(); // При грешка, продължаваме със зареждането на останалите изображения
        };

        if ("decode" in img) {
          img.src = priorityImage;
          img
            .decode()
            .then(() => {
              // Image decoded successfully
            })
            .catch((err) => {
              console.warn(
                `Priority image decode failed: ${priorityImage}`,
                err
              );
            });
        } else {
          img.src = priorityImage;
        }
      };

      // Зареждаме останалите изображения след приоритетното
      const loadRemainingImages = () => {
        CRITICAL_IMAGES.forEach((imageSrc) => {
          // Пропускаме приоритетното изображение, което вече е заредено
          if (imageSrc === priorityImage) return;

          const img = new Image();
          img.importance = "low";

          img.onload = () => {
            // Image preloaded
          };

          if ("decode" in img) {
            img.src = imageSrc;
            img.decode().catch(() => {});
          } else {
            img.src = imageSrc;
          }
        });
      };

      // Стартираме процеса
      loadPriorityImage();
    };

    // Изпълняваме незабавно за критични изображения
    preloadImages();
  }, []);

  // Този компонент не рендерира нищо във видимата част на DOM
  return null;
}
