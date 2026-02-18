"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";

/**
 * Sticky Registration Call-to-Action Box
 * Appears on the right side of blog posts
 * Dynamically changes link based on authentication status
 */
export default function StickyRegistrationBox() {
  const { isAuthenticated, loading } = useAuth();

  // Determine the registration link based on auth status
  const registrationLink = isAuthenticated 
    ? "/klinichni-prouchvaniya#registration"
    : "/register";

  return (
    <div className="sticky top-24 w-full">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 relative">
        {/* Content */}
        <div className="text-center">
          {/* Title */}
          <h3 className="text-2xl font-bold text-[#04737d] mb-4 leading-tight">
            Виж лечение за твоето заболяване
          </h3>

          {/* Subtitle */}
          <p className="text-base text-[#04737d]/80 mb-6 leading-relaxed px-2">
            Регистрирайте се през кратка контактна форма, а ние ще се свържем с Вас.
          </p>

          {/* Capsule Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-56 h-28">
              <Image
                src="/capsule-zib.png"
                alt="Capsule"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={registrationLink}
            className="inline-block w-full bg-gradient-to-b from-[#5FA8B3] via-[#5FA8B3] to-[#4A8A94] hover:from-[#4A8A94] hover:to-[#3A7A84] text-white font-bold text-lg py-4 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
          >
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}
