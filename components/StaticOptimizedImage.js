import Image from "next/image";

/**
 * Статичен серверен компонент за оптимизирани изображения, специално за LCP
 * Не използва client-side логика, която може да забави рендерирането
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function StaticOptimizedImage({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 90,
  className,
  style,
  ...props
}) {
  // Опростен серверен компонент без client-side state
  return (
    <Image
      src={src}
      alt={alt || "Изображение"}
      width={width}
      height={height}
      sizes={sizes}
      quality={85} // Намаляваме quality за по-малък размер на файла
      priority={true} // Винаги с приоритет за LCP
      loading="eager" // Винаги eager за LCP
      fetchPriority="high" // Висок приоритет при зареждане
      placeholder="blur" // Добавяме blur placeholder
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAcACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APi/9o/T9U+HOo6n8OdQ8ZR+JtY8AxLFNaTQ20l7o+vqP7QaXULm2YXGpWmox3P9r6XFcXNxHp9tcTaNBewwz2TmrjUdOcuWai3G+jTTu0+X+b/hLokpe80nfp/SOP8ACUP9kfGbWNOurO2uNN1XxB4V13S4tSRJrfUNPj1/Q9NtNR024iEsTwXiaabaZklZkeQGVJXAZjpKfPSjJdVuZxhaU0+n4FLXPhb4U/4JlaZ8JfiFD4m1DQvgrr3gzwl4mi8aaH/Y+n+LdB0dn0DULKGAavYazBFMH1GeORZHVbi0McysVX95jBScuR8r51qne13vt+QWsmlpbov+E//Z" // Базов blur placeholder
      className={className}
      style={{
        objectFit: "cover",
        ...style,
      }}
      {...props}
    />
  );
}
