"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const navigation = {
    pages: [
      { name: "Начало", href: "#" },
      { name: "Терапевтични области", href: "#" },
      { name: "Участие", href: "#" },
      { name: "Клинични проучвания", href: "#" },
      { name: "Форум", href: "#" },
      { name: "Обучителен център", href: "#" },
      { name: "За нас", href: "#" },
    ],
  };

  return (
    <div className="bg-white sticky top-0 w-full z-50">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2 justify-between items-center">
              <Link href="/" className="text-xl font-bold text-[#178D9D]">
                zdraveibolest.bg
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="space-y-6 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={() => setOpen(false)}
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
              <div className="flow-root pt-4">
                <Link
                  href="#"
                  className="block px-6 py-3 text-center text-sm font-medium text-[#178D9D] border-2 border-[#178D9D] rounded-md hover:bg-[#178D9D] hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Клинично изпитване
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Header */}
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto w-[95%] md:w-[80%] px-0">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="relative rounded-md bg-white p-2 text-gray-700 lg:hidden"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center justify-start">
              <Link href="/" className="block">
                <span className="text-base md:text-lg font-normal text-gray-900">
                  zdraveibolest.bg
                </span>
              </Link>
            </div>

            {/* Desktop Menu - Center */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
              <div className="flex space-x-6 xl:space-x-8">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="text-sm font-normal text-gray-700 hover:text-[#178D9D] transition-colors whitespace-nowrap"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-end">
              <Link
                href="#"
                className="hidden lg:block px-5 xl:px-6 py-2.5 text-sm font-normal text-[#178D9D] border-2 border-[#178D9D] rounded-md hover:bg-[#178D9D] hover:text-white transition-colors whitespace-nowrap"
              >
                Клинично изпитване
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
