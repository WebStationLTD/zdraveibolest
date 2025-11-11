"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Компонент за оптимизирани изображения с lazy loading и fallback
 * @param {Object} props
 * @param {string} props.src - URL на изображението
 * @param {string} props.alt - Алтернативен текст
 * @param {number} props.width - Ширина на изображението
 * @param {number} props.height - Височина на изображението
 * @param {boolean} props.priority - Приоритетно зареждане за LCP
 * @param {string} props.sizes - Responsive sizes атрибут
 * @param {number} props.quality - Качество на изображението (1-100)
 * @param {string} props.fallbackSrc - URL на изображение за fallback
 * @param {string} props.className - CSS класове
 * @param {string} props.style - Inline стилове
 * @param {string} props.objectFit - Object-fit стил (cover, contain)
 * @param {boolean} props.fadeIn - Дали да има fade-in ефект
 * @returns {JSX.Element}
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  fallbackSrc = "/placeholder.webp",
  className,
  style,
  objectFit = "cover",
  fadeIn = true,
  ...props
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
    }
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  // Fade-in анимация за по-плавно зареждане
  const imageStyle = {
    ...style,
    objectFit: objectFit,
    opacity: fadeIn ? (loaded ? 1 : 0) : 1,
    transition: fadeIn ? "opacity 0.3s ease-in-out" : "none",
  };

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt || "Изображение"}
      width={width}
      height={height}
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      onError={handleError}
      onLoad={handleLoad}
      className={className}
      style={imageStyle}
      format="webp"
      {...props}
    />
  );
}
