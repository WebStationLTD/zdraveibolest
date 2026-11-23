"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useConsent } from "../contexts/ConsentContext";

const CookieConsentBanner = () => {
  const {
    ready,
    hasDecision,
    preferences,
    acceptAll,
    rejectOptional,
    savePreferences,
    settingsOpen,
    openSettings,
    closeSettings,
  } = useConsent();
  const [externalMedia, setExternalMedia] = useState(false);

  useEffect(() => {
    if (settingsOpen) {
      setExternalMedia(preferences.externalMedia);
    }
  }, [settingsOpen, preferences.externalMedia]);

  return (
    <>
      {ready && !hasDecision && (
        <section
          className="pointer-events-none fixed inset-x-0 bottom-3 z-[90] max-h-[calc(100dvh-1.5rem)] overflow-y-auto"
          aria-label="Настройки за бисквитки"
        >
          <div className="pointer-events-auto mx-auto grid w-[95%] gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-900 shadow-[0_8px_32px_rgba(10,37,64,0.22)] sm:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] sm:items-center sm:gap-4 sm:px-6 sm:py-3 md:w-[80%] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-6">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#035057]">
                Използваме бисквитки
              </h2>
              <p className="mt-1 text-sm leading-5 text-gray-700">
                Някои бисквитки са необходими за работата на сайта, а други
                използваме само с Вашето съгласие. Можете да промените избора си
                по всяко време.{" "}
                <Link
                  href="/cookie-policy"
                  className="font-semibold text-[#04737d] underline decoration-[#04737d]/50 underline-offset-4 hover:text-[#035057] hover:decoration-[#035057] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04737d]"
                >
                  Научете повече
                </Link>
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-2 lg:w-auto lg:grid-cols-3">
              <button
                type="button"
                onClick={rejectOptional}
                className="min-h-11 cursor-pointer rounded-lg border border-[#04737d] px-3 py-2 text-sm font-semibold text-[#04737d] transition-colors hover:bg-[#f1f8f7] active:bg-[#e2f0ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04737d]"
              >
                Само необходимите
              </button>
              <button
                type="button"
                onClick={openSettings}
                className="col-span-2 min-h-11 cursor-pointer rounded-lg border border-[#04737d] px-3 py-2 text-sm font-semibold text-[#04737d] transition-colors hover:bg-[#f1f8f7] active:bg-[#e2f0ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04737d] lg:col-span-1"
              >
                Настройки
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="col-start-2 row-start-1 min-h-11 cursor-pointer rounded-lg bg-[#fd9300] px-3 py-2 text-sm font-bold text-[#202020] transition-colors hover:bg-[#ffab33] active:bg-[#e88400] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:col-start-auto lg:row-start-auto"
              >
                Приемам всички
              </button>
            </div>
          </div>
        </section>
      )}

      <Dialog
        open={settingsOpen}
        onClose={closeSettings}
        className="relative z-[100]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/55" />
        <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6">
          <div className="flex min-h-full items-end justify-center sm:items-center">
            <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-gray-200 px-5 py-5 sm:px-7">
                <div className="pr-6">
                  <DialogTitle className="text-xl font-bold text-[#035057] sm:text-2xl">
                    Настройки за поверителност
                  </DialogTitle>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Можете да промените избора си по всяко време от линка в
                    долната част на сайта.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeSettings}
                  className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-2xl leading-none text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04737d]"
                  aria-label="Затвори настройките"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3 px-5 py-5 sm:px-7">
                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900">Необходими</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Запазват избора Ви и поддържат входа, формите и основните
                        функции на сайта.
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-[#04737d]">
                      Винаги активни
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        id="external-media-heading"
                        className="font-bold text-gray-900"
                      >
                        Външна медия
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Разрешава видеа от YouTube и карти от Google Maps. При
                        зареждането им тези доставчици могат да получат технически
                        данни за устройството и връзката Ви.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={externalMedia}
                      aria-labelledby="external-media-heading"
                      onClick={() => setExternalMedia((current) => !current)}
                      className={`relative mt-1 h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04737d] ${
                        externalMedia ? "bg-[#04737d]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          externalMedia ? "left-1 translate-x-5" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-gray-200 px-5 py-5 sm:flex-row sm:justify-end sm:px-7">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="min-h-11 cursor-pointer rounded-lg border border-[#04737d] px-5 py-2.5 text-sm font-bold text-[#04737d] transition-colors hover:bg-[#f1f8f7] active:bg-[#e2f0ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04737d]"
                >
                  Отказвам незадължителните
                </button>
                <button
                  type="button"
                  onClick={() => savePreferences({ externalMedia })}
                  className="min-h-11 cursor-pointer rounded-lg bg-[#04737d] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#035057] active:bg-[#023f45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04737d]"
                >
                  Запази избора
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CookieConsentBanner;
