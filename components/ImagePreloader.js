"use client";

import { useEffect } from "react";

// Списък с изображения, които трябва да се заредят предварително
const CRITICAL_IMAGES = [
  "/hero-image-mobile.jpg", // Hero изображение - мобилна версия
  "/hero-image-desktop.jpg", // Hero изображение - десктоп версия
];

/**
 * Компонент за предварително зареждане на критични изображения
 * Подобрява LCP метриката, като зарежда важните изображения предварително
 */
export default function ImagePreloader() {
  useEffect(() => {
    // Оптимизирана версия на функцията за предварително зареждане
    const preloadImages = () => {
      // Определяме кое изображение трябва да заредим първо според устройството
      const isMobile = window.innerWidth <= 640;
      const priorityImage = isMobile
        ? "/hero-image-mobile.jpg"
        : "/hero-image-desktop.jpg";

      // Зареждаме приоритетното изображение първо
      const loadPriorityImage = () => {
        const img = new Image();
        img.fetchPriority = "high";
        img.importance = "high";

        img.onload = () => {
          console.log(`Priority image preloaded: ${priorityImage}`);

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
              console.log(`Priority image decoded: ${priorityImage}`);
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
            console.log(`Secondary image preloaded: ${imageSrc}`);
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

    // Регистрираме handler за прозореца в случай, че размерът се промени
    const handleResize = () => {
      // При промяна на размера на прозореца, презареждаме изображенията
      preloadImages();
    };

    // Премахваме throttling при размер на прозореца, за да сме сигурни, че изображенията ще се заредят правилно
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Този компонент не рендерира нищо във видимата част на DOM
  return null;
}
