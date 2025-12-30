export default function VideoSection() {
  return (
    <section className="relative px-5 pt-5 pb-16 md:pb-20 lg:pb-24 overflow-hidden">
      <div className="mx-auto w-[95%] md:w-[80%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="relative z-10">
            {/* Small Title */}
            <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4 uppercase">
              НАУЧЕТЕ ПОВЕЧЕ
            </p>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Защо да се регистрираме?
            </h2>

            <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4">
              Регистрирай се и наблюдавай развитието на медицината и получи
              пълен достъп до сайта.
            </p>

            {/* Decorative Line */}
            <div className="w-16 h-1 bg-[#04737d] rounded-full"></div>
          </div>

          {/* Right: Video Container */}
          <div className="relative">
            {/* Decorative Element - Behind Video - Bottom Right */}
            <div className="absolute -bottom-12 -right-12 md:-bottom-16 md:-right-16 lg:-bottom-20 lg:-right-20 w-64 h-auto md:w-80 lg:w-96 pointer-events-none z-0">
              <img
                src="/Video-section-Element.svg"
                alt=""
                className="w-full h-auto opacity-80"
              />
            </div>

            {/* Video Placeholder - Higher z-index */}
            <div className="relative aspect-video bg-gray-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg z-10">
              {/* Placeholder for video - replace with actual video embed later */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200">
                {/* Play Button */}
                <button className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-[#04737d] ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              {/* Uncomment when you have the video URL */}
              {/* 
              <iframe
                className="absolute inset-0 w-full h-full"
                src="YOUR_VIDEO_URL_HERE"
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
