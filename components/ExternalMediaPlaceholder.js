"use client";

import { useConsent } from "../contexts/ConsentContext";

export default function ExternalMediaPlaceholder({
  title,
  service,
  poster,
  className = "",
  onAllow,
}) {
  const { allowExternalMedia } = useConsent();

  const handleAllow = () => {
    allowExternalMedia();
    onAllow?.();
  };

  return (
    <div
      className={`relative flex min-h-56 items-center justify-center overflow-hidden bg-[#e8f1f1] px-5 py-8 text-center ${className}`}
    >
      {poster && (
        <>
          <img
            src={poster}
            alt=""
            width="1280"
            height="720"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a3034]/80" />
        </>
      )}

      <div
        className={`relative z-10 max-w-md ${
          poster ? "text-white" : "text-[#173f43]"
        }`}
      >
        <h3 className="text-lg font-bold">{title}</h3>
        <p
          className={`mt-2 text-sm leading-6 ${
            poster ? "text-white/90" : "text-gray-700"
          }`}
        >
          За да се зареди съдържанието от {service}, разрешете категория
          „Външна медия“.
        </p>
        <button
          type="button"
          onClick={handleAllow}
          className="mt-4 min-h-11 cursor-pointer rounded-lg bg-[#fd9300] px-5 py-2.5 text-sm font-bold text-[#202020] transition-colors hover:bg-[#ffab33] active:bg-[#e88400] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Разреши и зареди
        </button>
      </div>
    </div>
  );
}
