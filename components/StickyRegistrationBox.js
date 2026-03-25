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

          {/* Capsule Button */}
          <Link
            href={registrationLink}
            className="relative block w-56 h-28 mx-auto transition-all duration-300 transform hover:scale-105 hover:drop-shadow-2xl cursor-pointer"
          >
            <Image
              src="/capsule-zib-new.png"
              alt="Capsule"
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-white font-semibold drop-shadow"
                style={{ fontSize: "10px", letterSpacing: "0.15em" }}
              >
                РЕГИСТРАЦИЯ
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
