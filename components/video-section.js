"use client";

import { useState, useRef } from "react";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section className="relative px-5 pt-5 pb-16 md:pb-20 lg:pb-24 overflow-hidden">
      <div className="mx-auto w-[95%] md:w-[80%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="relative z-10">
            <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4 uppercase">
              НАУЧЕТЕ ПОВЕЧЕ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Защо да се регистрираме?
            </h2>
            <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4">
              Регистрирай се и наблюдавай развитието на медицината и получи
              пълен достъп до сайта.
            </p>
            <div className="w-16 h-1 bg-[#04737d] rounded-full"></div>
          </div>

          {/* Right: Video */}
          <div className="relative">
            {/* Decorative Element */}
            <div className="absolute -bottom-12 -right-12 md:-bottom-16 md:-right-16 lg:-bottom-20 lg:-right-20 w-64 h-auto md:w-80 lg:w-96 pointer-events-none z-0">
              <img src="/Video-section-Element.svg" alt="" className="w-full h-auto opacity-80" />
            </div>

            {/* Video Container */}
            <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl z-10">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls={playing}
                preload="metadata"
                src="/zdraveibolest-video.mp4"
                onPause={() => {}}
              />

              {/* Cover overlay - shown before play */}
              {!playing && (
                <div
                  className="absolute inset-0 cursor-pointer group"
                  onClick={handlePlay}
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#04737d] via-[#035a63] to-[#024248]" />

                  {/* Decorative blobs */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fd9300]/20 rounded-full translate-y-1/2 -translate-x-1/2" />

                  {/* Decorative circles */}
                  <div className="absolute top-6 left-6 w-16 h-16 rounded-full border-2 border-white/20" />
                  <div className="absolute top-10 left-10 w-6 h-6 rounded-full bg-[#fd9300]/40" />
                  <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full border border-white/10" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6">
                    {/* Pill label */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
                      <span className="text-white/90 text-xs font-medium tracking-[0.15em] uppercase">
                        zdraveibolest.bg
                      </span>
                    </div>

                    {/* Play button */}
                    <div className="w-18 h-18 md:w-22 md:h-22 relative">
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full bg-white/20 scale-110 group-hover:scale-125 transition-transform duration-500" />
                      <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-7 h-7 md:w-9 md:h-9 text-[#04737d] group-hover:text-[#fd9300] transition-colors ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Label */}
                    <p className="text-white text-sm md:text-base font-semibold tracking-wide">
                      Гледай видеото
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
