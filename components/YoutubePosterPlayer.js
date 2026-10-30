"use client";

import { useState } from "react";

export default function YoutubePosterPlayer({
  videoId,
  title,
  className = "",
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-2xl md:rounded-3xl bg-black shadow-2xl ${className}`}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&cc_load_policy=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 block w-full cursor-pointer"
          aria-label={`Пусни видеото: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <span className="relative">
              <span
                className="absolute inset-0 rounded-full bg-white/30 animate-ping"
                style={{ animationDuration: "2s" }}
              />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-[0_0_40px_rgba(253,147,0,0.8)] md:h-24 md:w-24">
                <svg
                  className="ml-1 h-8 w-8 text-[#04737d] transition-colors group-hover:text-[#fd9300] md:h-10 md:w-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
