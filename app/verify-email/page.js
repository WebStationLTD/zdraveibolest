"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace("/wp-json/wp/v2", "") ||
  "https://zdraveibolest.admin-panels.com";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // loading | success | error | missing
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("missing");
      return;
    }

    const verify = async () => {
      try {
        const response = await fetch(
          `${API_URL}/wp-json/zdravei/v1/verify-email?token=${encodeURIComponent(token)}`,
          { method: "GET" }
        );
        const data = await response.json();

        if (response.ok && data.success) {
          setStatus("success");
        } else {
          setStatus("error");
          setMessage(data.message || "Невалиден или изтекъл линк за потвърждение.");
        }
      } catch {
        setStatus("error");
        setMessage("Възникна грешка. Моля, опитайте отново.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-[#04737d] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-700">Проверяване на линка...</h2>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Имейлът е потвърден!</h2>
            <p className="text-gray-600 mb-8">
              Акаунтът ви е активиран успешно. Вече можете да влезете в сайта.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-xl transition-colors"
            >
              Вход в акаунта
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Линкът е невалиден</h2>
            <p className="text-gray-600 mb-8">
              {message || "Линкът за потвърждение е невалиден или вече е използван."}
            </p>
            <Link
              href="/register"
              className="inline-block px-8 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-xl transition-colors"
            >
              Обратно към регистрация
            </Link>
          </>
        )}

        {status === "missing" && (
          <>
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Липсва токен</h2>
            <p className="text-gray-600 mb-8">
              Моля, използвайте линка от имейла, който сте получили при регистрация.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-xl transition-colors"
            >
              Начална страница
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
