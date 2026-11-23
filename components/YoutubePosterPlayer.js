"use client";

import { useEffect, useState } from "react";
import { useConsent } from "../contexts/ConsentContext";
import ExternalMediaPlaceholder from "./ExternalMediaPlaceholder";

export default function YoutubePosterPlayer({
  videoId,
  title,
  className = "",
}) {
  const [playing, setPlaying] = useState(false);
  const { preferences } = useConsent();
  const poster = `/images/consent/youtube-${videoId}.jpg`;

  useEffect(() => {
    if (!preferences.externalMedia) {
      setPlaying(false);
    }
  }, [preferences.externalMedia]);

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-2xl md:rounded-3xl bg-black shadow-2xl ${className}`}
    >
      {!preferences.externalMedia ? (
        <ExternalMediaPlaceholder
          title={title}
          service="YouTube"
          poster={poster}
          onAllow={() => setPlaying(true)}
          className="absolute inset-0 h-full w-full"
        />
      ) : playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&cc_load_policy=0&iv_load_policy=3&playsinline=1`}
          title={title}
          width="1280"
          height="720"
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
            src={poster}
            alt=""
            width="1280"
            height="720"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-xl transition-colors group-hover:bg-[#fd9300] md:h-24 md:w-24">
              <svg
                className="ml-1 h-8 w-8 text-[#04737d] transition-colors group-hover:text-[#202020] md:h-10 md:w-10"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
