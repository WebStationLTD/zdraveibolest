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
              {/* Thumbnail image - always visible before play */}
              {!playing && (
                <img
                  src="/zdraveibolest-homepage-video-tumbnail.png"
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls={playing}
                preload="metadata"
                src="/zdraveibolest-video.mp4#t=0.001"
                onPause={() => {}}
              />

              {/* Play button overlay - shown before play */}
              {!playing && (
                <div
                  className="absolute inset-0 cursor-pointer group"
                  onClick={handlePlay}
                >
                  {/* Content - centered play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Play button */}
                    <div className="relative">
                      {/* Animated pulse ring */}
                      <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" style={{ animationDuration: '2s' }} />
                      
                      {/* Main play button - semi-transparent */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white group-hover:shadow-[0_0_40px_rgba(253,147,0,0.8)] transition-all duration-300">
                        <svg
                          className="w-8 h-8 md:w-10 md:h-10 text-[#04737d] group-hover:text-[#fd9300] transition-colors ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
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
