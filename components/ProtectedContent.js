"use client";

import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function ProtectedContent({
  content,
  previewHeight = 450,
  therapeuticAreas = [],
}) {
  const { isAuthenticated, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (showLoginModal) setShowLoginModal(false);
        if (showRegisterModal) setShowRegisterModal(false);
      }
    };

    if (showLoginModal || showRegisterModal) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [showLoginModal, showRegisterModal]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  // Ако е logged in - показваме пълното съдържание
  if (isAuthenticated) {
    return (
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // За нерегистрирани - показваме preview с blur overlay
  return (
    <div className="relative">
      {/* Preview Content - Limited Height */}
      <div
        className="relative overflow-hidden"
        style={{ maxHeight: `${previewHeight}px` }}
      >
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none"></div>
      </div>

      {/* Lock Overlay - Call to Action */}
      <div className="relative -mt-32 pt-32 pb-12 bg-gradient-to-t from-white via-white to-transparent">
        <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-2xl mx-auto p-8 md:p-12 border-2 border-[#04737d]/20">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#04737d]/10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#04737d]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Регистрирайте се за пълен достъп
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            За да получите достъп до цялото съдържание и подробна информация за
            различните терапевтични области, моля създайте безплатен акаунт.
            Какво получавате с безплатна регистрация:
          </p>

          {/* Benefits */}
          <div className="space-y-3 mb-8">
            {[
              "Достъп до пълна информация за всички терапевтични области",
              "Персонализирани препоръки съобразено с вашите интереси и здравни нужди",
              "Актуални новини, статии и информация за иновативни терапии",
              "Напълно безплатно – без скрити такси",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#04737d] mr-3 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowRegisterModal(true)}
              className="block w-full px-6 py-3.5 bg-[#04737d] hover:bg-[#035057] text-white text-center font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Регистрирай се безплатно
            </button>

            <button
              onClick={() => setShowLoginModal(true)}
              className="block w-full px-6 py-3 text-[#04737d] hover:bg-[#04737d]/5 text-center font-medium rounded-lg transition-colors border border-[#04737d]/30"
            >
              Вече имам акаунт
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Dialog
        open={showLoginModal}
        onClose={() => {}}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-md w-full bg-white rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Вход</h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                aria-label="Затвори"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              <LoginForm
                onSuccess={() => {
                  setShowLoginModal(false);
                  // Content will auto-update via auth context
                }}
                redirectAfterSuccess={false}
              />
            </div>

            {/* Footer Help Text */}
            <div className="px-6 pb-6 text-center text-sm text-gray-500">
              Натиснете ESC или X за затваряне
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Register Modal */}
      <Dialog
        open={showRegisterModal}
        onClose={() => {}}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <DialogPanel className="mx-auto max-w-md w-full bg-white rounded-2xl shadow-2xl my-8">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Регистрация</h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                aria-label="Затвори"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <RegisterForm
                therapeuticAreas={therapeuticAreas}
                onSuccess={() => {
                  setShowRegisterModal(false);
                  // Content will auto-update via auth context
                }}
                redirectAfterSuccess={false}
              />
            </div>

            {/* Footer Help Text */}
            <div className="px-6 pb-6 text-center text-sm text-gray-500">
              Натиснете ESC или X за затваряне
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
