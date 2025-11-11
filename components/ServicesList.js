"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import LazyImageObserver from "./LazyImageObserver";

/**
 * Компонент за рендиране на списъка с услуги
 * Използва IntersectionObserver за lazy loading на изображения и съдържание
 */
export default function ServicesList({ services }) {
  const [visibleServices, setVisibleServices] = useState([]);
  const serviceRefs = useRef({});

  useEffect(() => {
    if (!services || services.length === 0) return;

    // Настройваме IntersectionObserver за lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);

          if (entry.isIntersecting && !visibleServices.includes(index)) {
            setVisibleServices((prev) => [...prev, index]);
          }
        });
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    // Наблюдаваме всички елементи на услугите, които са добавени в serviceRefs
    Object.entries(serviceRefs.current).forEach(([index, ref]) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Първоначално показваме първите 2 услуги без lazy loading
    setVisibleServices([0, 1]);

    return () => {
      Object.values(serviceRefs.current).forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
      observer.disconnect();
    };
  }, [services]);

  // Помощна функция за задаване на референция
  const setServiceRef = (el, index) => {
    if (el) {
      el.dataset.index = index;
      serviceRefs.current[index] = el;
    }
  };

  return (
    <>
      {/* Добавяме LazyImageObserver компонент за мониторинг на изображенията */}
      <LazyImageObserver />

      <div className="mx-auto w-full">
        <div className="flex flex-col mt-8 space-y-20 lg:mt-8 lg:space-y-20">
          {services.map((service, index) => (
            <Link
              href={`/services/${service.slug}`}
              className={`flex mt-8 mb-8 w-full max-w-full transition-opacity duration-300 ${
                visibleServices.includes(index) ? "opacity-100" : "opacity-0"
              }`}
              key={service.id}
              ref={(el) => setServiceRef(el, index)}
              prefetch={index < 3} // Предварително зареждаме само първите 3 услуги
            >
              <article className="relative isolate flex flex-col gap-8 lg:flex-row w-[100%]">
                <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                  <Image
                    width={256}
                    height={256}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    alt={service.title.rendered}
                    src={
                      service.yoast_head_json?.og_image?.[0]?.url ||
                      "/placeholder.webp"
                    }
                    className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                    format="webp"
                    decoding={index === 0 ? "sync" : "async"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={service.date} className="text-gray-500">
                      {new Date(service.date).toLocaleDateString()}
                    </time>
                  </div>
                  <div className="group relative max-w-[100%]">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                      <span className="absolute inset-0" />
                      {service.title.rendered}
                    </h3>
                    <p className="mt-5 text-md/6 text-gray-600">
                      {service.content.rendered
                        ? service.content.rendered
                            .replace(/<[^>]+>/g, "")
                            .substring(0, 450) + "..."
                        : "Описание не е налично"}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
