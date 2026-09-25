"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

/**
 * Sticky clinical-trial CTA in the blog post sidebar.
 * Link depends on whether the visitor is logged in.
 */
export default function StickyRegistrationBox() {
  const { isAuthenticated } = useAuth();

  const registrationLink = isAuthenticated
    ? "/klinichni-prouchvaniya#registration"
    : "/register";

  return (
    <div className="sticky top-24 w-full">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#4d8494] px-6 py-10 text-center text-white shadow-xl">
        <div
          className="pointer-events-none absolute -left-20 -top-24 h-52 w-52 rounded-full border-[22px] border-white/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -right-16 h-64 w-64 rounded-full border-[26px] border-white/10"
          aria-hidden="true"
        />

        <div className="relative">
          <h3 className="text-[1.65rem] font-bold leading-tight mb-5">
            Интересуваш се от участие в клинично изпитване?
          </h3>

          <p className="text-[15px] leading-relaxed text-white/95 mb-7">
            Заяви интерес чрез кратката контактна форма. Ще се свържем с теб,
            за да обсъдим възможностите за участие.
          </p>

          <Link
            href={registrationLink}
            className="inline-flex items-center justify-center rounded-lg bg-[#f0a020] hover:bg-[#e09010] px-8 py-3 text-base font-semibold text-white shadow-md transition-colors"
          >
            Заяви интерес
          </Link>

          <p className="mt-8 text-xs leading-relaxed text-white/80">
            Запитването не те задължава да участваш и не гарантира включване.
            Възможността за участие се преценява от изследователския екип
            според изискванията на конкретното изпитване.
          </p>
        </div>
      </div>
    </div>
  );
}
