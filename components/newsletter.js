"use client";
import { useState } from "react";

import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import useSubscribe from "../hooks/useSubscribe";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { subscribe, loading } = useSubscribe();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await subscribe(email, () => setEmail(""));
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Абонирайте се за нашия бюлетин
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Получавайте ценни съвети, анализи и актуални новини директно във
              вашата поща.
            </p>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-10 pointer-events-none">
                <div className="w-12 h-12 border-4 border-gray-400 border-t-[#129160] rounded-full animate-spin"></div>
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className={`mt-6 flex max-w-md gap-x-4 ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Въведете Вашия имейл"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-[#129160] hover:bg-gray-300 cursor-pointer hover:text-[#000000] px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Абонирайте се
              </button>
            </form>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <dt className="flex items-center text-base font-semibold text-white">
                <div className="mr-4 rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <CalendarDaysIcon
                    aria-hidden="true"
                    className="size-6 text-white"
                  />
                </div>
                <span className="mt-4">Седмични статии</span>
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                Всяка седмица подбираме за вас най-актуалните теми и експертни
                анализи. Бъдете информирани и винаги една стъпка напред.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <dt className="flex items-center text-base font-semibold text-white">
                <div className="mr-4 rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <HandRaisedIcon
                    aria-hidden="true"
                    className="size-6 text-white"
                  />
                </div>
                <span className="mt-4">Без спам</span>
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                Обещаваме: само полезна информация, без излишни съобщения.
                Вашето време е ценно, затова ви изпращаме само най-важното.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#129160] to-[#129160] opacity-50"
        />
      </div>
    </div>
  );
}
