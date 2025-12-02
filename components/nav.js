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
import { Bars3Icon, XMarkIcon, ChevronDownIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import SearchButton from "./SearchButton";

export default function Navigation({ therapeuticAreas = [] }) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout, loading } = useAuth();

  const navigation = {
    pages: [
      { name: "Начало", href: "/" },
      { name: "Участие", href: "#" },
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
              <div className="flow-root">
                <Disclosure>
                  {({ open: disclosureOpen }) => (
                    <>
                      <DisclosureButton className="flex items-center justify-between -m-2 p-2 text-gray-700 hover:text-[#04737d] transition-colors w-auto min-w-0" style={{ width: '100%' }}>
                        <span className="font-normal">Терапевтични области</span>
                        <ChevronDownIcon
                          className={`${
                            disclosureOpen ? 'rotate-180' : ''
                          } h-5 w-5 flex-shrink-0 transition-transform duration-200`}
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 pl-4">
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {/* Link to main page */}
                          <Link
                            href="/terapevtichni-oblasti"
                            className="block py-2.5 px-3 text-sm font-medium text-[#04737d] bg-[#04737d]/5 hover:bg-[#04737d]/10 rounded-lg transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            → Всички терапевтични области
                          </Link>
                          
                          <div className="pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-2 px-1">Или изберете конкретна:</p>
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
                          </div>
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>

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

              {/* Search Button - Mobile */}
              <div className="flow-root pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between -m-2 p-2">
                  <span className="font-normal text-gray-700">Търсене</span>
                  <SearchButton />
                </div>
              </div>

              <div className="flow-root pt-4 border-t border-gray-200">
                <Link
                  href="#"
                  className="block px-6 py-3 text-center text-sm font-normal text-[#04737d] border-2 border-[#04737d] rounded-md hover:bg-[#04737d] hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Клинично изпитване
                </Link>
              </div>

              {/* Auth Buttons - Mobile */}
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
                {!loading && (
                  <>
                    {isAuthenticated && user ? (
                      <>
                        {/* User Info */}
                        <div className="flex items-center gap-3 px-2 py-3 bg-[#04737d]/5 rounded-lg">
                          <UserCircleIcon className="h-8 w-8 text-[#04737d]" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.first_name || user.username}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        {/* Logout Button */}
                        <button
                          onClick={() => {
                            logout();
                            setOpen(false);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-normal text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5" />
                          Изход
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Login Button */}
                        <Link
                          href="/login"
                          className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-normal text-[#04737d] border border-[#04737d] rounded-lg hover:bg-[#04737d]/5 transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5" />
                          Вход
                        </Link>
                        {/* Register Button */}
                        <Link
                          href="/register"
                          className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-normal text-white bg-[#04737d] rounded-lg hover:bg-[#035057] transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          <UserCircleIcon className="h-5 w-5" />
                          Регистрация
                        </Link>
                      </>
                    )}
                  </>
                )}
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
                
                {/* Терапевтични области - Dropdown Desktop (Hover) */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    href="/terapevtichni-oblasti"
                    className="flex items-center text-sm font-normal text-gray-700 hover:text-[#04737d] transition-colors whitespace-nowrap"
                  >
                    Терапевтични области
                    <ChevronDownIcon className={`ml-1 h-4 w-4 hover:text-[#04737d] transition-all ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 z-50 mt-3 w-72 origin-top-left rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-200 ${
                      dropdownOpen 
                        ? 'opacity-100 scale-100 visible' 
                        : 'opacity-0 scale-95 invisible'
                    }`}
                  >
                    <div className="p-2 max-h-[480px] overflow-y-auto">
                      {/* View All Link */}
                      <Link
                        href="/terapevtichni-oblasti"
                        className="block px-3 py-3 border-b border-gray-100 hover:bg-[#04737d]/5 rounded-lg transition-colors mb-1"
                      >
                        <p className="text-sm font-medium text-[#04737d] hover:text-[#035057]">
                          → Всички терапевтични области
                        </p>
                      </Link>
                      
                      {/* Individual Areas */}
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-xs font-medium text-gray-500 tracking-wider uppercase">
                          Или изберете конкретна област
                        </p>
                      </div>
                      {therapeuticAreas.map((area) => (
                        <Link
                          key={area.id}
                          href={`/terapevtichni-oblasti/${area.slug}`}
                          className="group flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors text-gray-700 hover:bg-[#04737d]/5 hover:text-[#04737d]"
                        >
                          <div className="flex items-center">
                            <div className="mr-3 h-2 w-2 rounded-full bg-gray-300 group-hover:bg-[#04737d] transition-colors"></div>
                            <span className="font-normal">{area.title.rendered}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

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

                {/* Search Button - Desktop */}
                <div className="ml-3 pl-3 border-l border-gray-300">
                  <SearchButton />
                </div>
              </div>
            </div>

            {/* CTA & Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center justify-end gap-3">
              {/* CTA Button */}
              <Link
                href="#"
                className="px-6 py-2.5 text-sm font-normal text-[#04737d] border-2 border-[#04737d] rounded-md hover:bg-[#04737d] hover:text-white transition-colors whitespace-nowrap"
              >
                Клинично изпитване
              </Link>

              {/* Separator */}
              <div className="h-6 w-px bg-gray-300"></div>
              
              {/* Auth Buttons */}
              {!loading && (
                <>
                  {isAuthenticated && user ? (
                    <>
                      {/* User Menu Dropdown */}
                      <Menu as="div" className="relative">
                        <MenuButton className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <UserCircleIcon className="h-6 w-6 text-[#04737d]" />
                          <span className="text-sm font-normal text-gray-700">
                            {user.first_name || user.username}
                          </span>
                          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                        </MenuButton>
                        
                        <MenuItems
                          transition
                          className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 focus:outline-none"
                        >
                          <div className="p-2">
                            {/* User Info */}
                            <div className="px-3 py-3 border-b border-gray-100">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {user.first_name} {user.last_name}
                              </p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">
                                {user.email}
                              </p>
                            </div>
                            {/* Logout */}
                            <MenuItem>
                              {({ focus }) => (
                                <button
                                  onClick={logout}
                                  className={`${
                                    focus ? 'bg-red-50 text-red-700' : 'text-red-600'
                                  } group flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors mt-1`}
                                >
                                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                  Изход
                                </button>
                              )}
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </>
                  ) : (
                    <>
                      {/* Login Button */}
                      <Link
                        href="/login"
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-normal text-gray-700 hover:text-[#04737d] hover:bg-[#04737d]/5 rounded-lg transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Вход
                      </Link>
                      {/* Register Button */}
                      <Link
                        href="/register"
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-normal text-white bg-[#04737d] hover:bg-[#035057] rounded-lg transition-colors"
                      >
                        <UserCircleIcon className="h-5 w-5" />
                        Регистрация
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
