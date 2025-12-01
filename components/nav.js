"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Navigation({ therapeuticAreas = [] }) {
  const [open, setOpen] = useState(false);

  const navigation = {
    pages: [
      { name: "Начало", href: "/" },
      { name: "Участие", href: "#" },
      { name: "Клинични проучвания", href: "#" },
      { name: "Форум", href: "#" },
      { name: "Обучителен център", href: "/blog" },
      { name: "За нас", href: "#" },
    ],
  };

  return (
    <div className="bg-white sticky top-0 w-full z-50 shadow-sm">
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
              <Link href="/" className="text-xl font-normal text-gray-900">
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
            <div className="space-y-4 px-4 py-6">
              {/* Начало */}
              <div className="flow-root">
                <Link
                  href="/"
                  className="-m-2 block p-2 font-normal text-gray-700 hover:text-[#04737d] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Начало
                </Link>
              </div>
              
              {/* Терапевтични области - Accordion Mobile */}
              <Disclosure>
                {({ open: disclosureOpen }) => (
                  <>
                    <DisclosureButton className="flex w-full items-center justify-between -m-2 p-2 text-gray-700 hover:text-[#04737d] transition-colors">
                      <span className="font-normal">Терапевтични области</span>
                      <ChevronDownIcon
                        className={`${
                          disclosureOpen ? 'rotate-180' : ''
                        } h-5 w-5 transition-transform duration-200`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2 pl-4">
                      {therapeuticAreas.map((area) => (
                        <Link
                          key={area.id}
                          href={`/terapevtichni-oblasti/${area.slug}`}
                          className="block py-2 text-sm text-gray-600 hover:text-[#04737d] transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          {area.title.rendered}
                        </Link>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>

              {/* Останалите страници */}
              {navigation.pages.slice(1).map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    href={page.href}
                    className="-m-2 block p-2 font-normal text-gray-700 hover:text-[#04737d] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {page.name}
                  </Link>
                </div>
              ))}

              <div className="flow-root pt-4">
                <Link
                  href="#"
                  className="block px-6 py-3 text-center text-sm font-normal text-[#04737d] border-2 border-[#04737d] rounded-md hover:bg-[#04737d] hover:text-white transition-colors"
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
        <nav aria-label="Top" className="mx-auto w-[95%] md:w-[80%]">
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
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:ml-12">
              <div className="flex items-center space-x-7">
                {/* Начало */}
                <Link
                  href="/"
                  className="text-sm font-normal text-gray-700 hover:text-[#04737d] transition-colors whitespace-nowrap"
                >
                  Начало
                </Link>
                
                {/* Терапевтични области - Dropdown Desktop */}
                <Menu as="div" className="relative">
                  <MenuButton className="flex items-center text-sm font-normal text-gray-700 hover:text-[#04737d] transition-colors whitespace-nowrap group">
                    Терапевтични области
                    <ChevronDownIcon className="ml-1 h-4 w-4 group-hover:text-[#04737d] transition-all group-data-[open]:rotate-180" />
                  </MenuButton>
                  
                  <MenuItems
                    transition
                    className="absolute left-0 z-50 mt-3 w-72 origin-top-left rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 focus:outline-none"
                  >
                    <div className="p-2 max-h-[480px] overflow-y-auto">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-xs font-medium text-[#04737d] tracking-wider uppercase">
                          Изберете област
                        </p>
                      </div>
                      {therapeuticAreas.map((area) => (
                        <MenuItem key={area.id}>
                          {({ focus }) => (
                            <Link
                              href={`/terapevtichni-oblasti/${area.slug}`}
                              className={`${
                                focus ? 'bg-[#04737d]/5 text-[#04737d]' : 'text-gray-700'
                              } group flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors`}
                            >
                              <div className="flex items-center">
                                <div className={`mr-3 h-2 w-2 rounded-full ${
                                  focus ? 'bg-[#04737d]' : 'bg-gray-300'
                                } transition-colors`}></div>
                                <span className="font-normal">{area.title.rendered}</span>
                              </div>
                            </Link>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                {/* Останалите страници */}
                {navigation.pages.slice(1).map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="text-sm font-normal text-gray-700 hover:text-[#04737d] transition-colors whitespace-nowrap"
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
                className="hidden lg:block px-6 py-2.5 text-sm font-normal text-[#04737d] border-2 border-[#04737d] rounded-md hover:bg-[#04737d] hover:text-white transition-colors whitespace-nowrap"
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
