"use client";

import { useState } from "react";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ContactMap({ address, phone, emails = [], lat, lng }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  const encodedAddress = encodeURIComponent(address || "София, България");
  // When coordinates are provided, use them for a precise static pin; otherwise fall back to address search
  const mapQuery = lat && lng ? `${lat},${lng}` : encodedAddress;
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&output=embed&z=17&hl=bg`;

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Map iframe */}
      <iframe
        src={mapSrc}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setMapLoaded(true)}
        title="Карта с местоположение"
      />

      {/* Loading skeleton */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#04737d]/10 to-[#035057]/20 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-[#04737d] border-t-transparent animate-spin" />
            <p className="text-[#04737d] font-medium text-sm">Зарежда карта...</p>
          </div>
        </div>
      )}

      {/* Beautiful info card overlay */}
      <div className="absolute bottom-6 left-6 z-10 max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-r from-[#04737d] to-[#238C96] px-5 py-4">
            <div className="flex items-center gap-2">
              {/* Animated ping marker */}
              <div className="relative flex-shrink-0">
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-white/40 animate-ping" />
                <MapPinIcon className="relative h-5 w-5 text-white" />
              </div>
              <h3 className="text-white font-semibold text-base">Нашето местоположение</h3>
            </div>
          </div>

          {/* Card body */}
          <div className="px-5 py-4 space-y-3">
            {address && (
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-[#04737d] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{address}</p>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-[#04737d] flex-shrink-0" />
                <a href={`tel:${phone}`} className="text-sm text-gray-700 hover:text-[#04737d] transition-colors">
                  {phone}
                </a>
              </div>
            )}
            {emails.length > 0 && emails.map((email, i) => (
              <div key={i} className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5 text-[#04737d] flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-sm text-gray-700 hover:text-[#04737d] transition-colors truncate">
                  {email}
                </a>
              </div>
            ))}

            {/* Open in Google Maps button */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}&zoom=17`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#04737d] hover:bg-[#035057] text-white text-sm font-medium rounded-xl transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Отвори в Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay at top */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-10" />
    </section>
  );
}
