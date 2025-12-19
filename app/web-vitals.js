"use client";

import { useEffect } from "react";

// Функция за регистриране на Web Vitals метрики
export function WebVitals() {
  useEffect(() => {
    if (typeof window !== "undefined" && "performance" in window) {
      // Регистриране на LCP
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            // Изпращане на LCP метрика към Google Analytics, ако е налично
            if (entry.entryType === "largest-contentful-paint") {
              if (window.gtag) {
                window.gtag("event", "web_vitals", {
                  event_category: "Web Vitals",
                  event_label: "LCP",
                  value: Math.round(entry.startTime),
                  non_interaction: true,
                });
              }
            }
          });
        });

        // Наблюдаваме LCP, FID, CLS и други метрики
        observer.observe({ type: "largest-contentful-paint", buffered: true });
        observer.observe({ type: "first-input", buffered: true });
        observer.observe({ type: "layout-shift", buffered: true });

        // Изчистване
        return () => {
          observer.disconnect();
        };
      } catch (e) {
        console.error("Грешка при регистриране на Web Vitals:", e);
      }
    }
  }, []);

  return null;
}

// Функция за ръчно измерване на LCP
export function measureLCP() {
  if (
    typeof window !== "undefined" &&
    "performance" in window &&
    "PerformanceObserver" in window
  ) {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];

      // LCP measurement tracking
      if (window.gtag && lastEntry) {
        window.gtag("event", "lcp_measurement", {
          event_category: "Performance",
          event_label: "LCP",
          value: Math.round(lastEntry.startTime),
          non_interaction: true,
        });
      }
    });

    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

    return () => lcpObserver.disconnect();
  }

  return null;
}
