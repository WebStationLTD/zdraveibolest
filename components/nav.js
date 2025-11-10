"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { getServicesNav } from "../services/services";
import { searchContent } from "../services/search";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const [navigation, setNavigation] = useState({
    categories: [
      {
        id: "categories",
        name: "Услуги",
        featured: [],
        services: [],
      },
    ],
    pages: [
      { name: "Начало", href: "/" },
      { name: "Екип", href: "/team" },
      { name: "Блог", href: "/blog" },
      { name: "Контакти", href: "/contact" },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const services = await getServicesNav();

        if (!services || !Array.isArray(services) || services.length === 0) {
          console.warn("No services found from API");
          return;
        }

        const featured = services.slice(0, 2);
        const remainingServices = services.slice(2);

        setNavigation((prev) => ({
          ...prev,
          categories: [
            {
              id: "categories",
              name: "Услуги",
              featured: featured.map((service) => ({
                name: service.title.rendered,
                href: `/services/${service.slug}`,
                imageSrc:
                  service.yoast_head_json?.og_image?.[0]?.url ||
                  "/placeholder.webp",
                imageAlt: service.title.rendered,
              })),
              services: remainingServices.map((service) => ({
                id: service.id,
                name: service.title.rendered,
                href: `/services/${service.slug}`,
              })),
            },
          ],
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching navigation data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }

    console.log(searchQuery);

    setIsSearching(true);
    setShowResults(true);

    const delayDebounceFn = setTimeout(async () => {
      const results = await searchContent(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white sticky shadow-md top-0 block w-full z-50">
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
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
              <div className="ml-4">
                <Image
                  src="/next-level-logo.png"
                  alt=""
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </div>
            {/* Links */}
            <TabGroup className="mt-2">
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link
                      href={page.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => setOpen(false)}
                      prefetch={true}
                    >
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-xl font-bold text-center text-gray-900 hover:text-[#129160] data-headlessui-state-selected:border-[#129160] data-headlessui-state-selected:text-[#129160]"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              {/* Loader */}
              {loading && (
                <div className="flex justify-center py-10">
                  <div className="w-12 h-12 border-4 border-gray-500 border-t-[#129160] rounded-full animate-spin"></div>
                </div>
              )}
              {!loading && (
                <TabPanels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <TabPanel
                      key={category.name}
                      className="space-y-6 px-4 pt-6 pb-8"
                    >
                      <ul className="flex flex-col space-y-4">
                        {[...category.featured, ...category.services].map(
                          (service) => (
                            <li
                              key={service.id || service.name}
                              className="flow-root"
                            >
                              <Link
                                href={service.href}
                                className="-m-2 block p-2 font-medium text-gray-900"
                                onClick={() => setOpen(false)}
                                prefetch={true}
                              >
                                {service.name}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </TabPanel>
                  ))}
                </TabPanels>
              )}
            </TabGroup>
          </DialogPanel>
        </div>
      </Dialog>
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between h-16 lg:h-16">
              {/* Mobile menu button - запазваме мобилната версия непроменена */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Секция 1: Лого */}
              <div className="w-1/4 lg:w-1/5 flex items-center justify-start">
                <Link href="/" className="block">
                  <span className="sr-only">NextLevel Theme</span>
                  <Image
                    width={180}
                    height={40}
                    alt=""
                    src="/next-level-logo.png"
                    className="w-auto transition-all duration-300 ease-in-out"
                  />
                </Link>
              </div>

              {/* Секция 2: Меню - центрирано */}
              <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
                <PopoverGroup className="flex">
                  <div className="flex space-x-8">
                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        href={page.href}
                        className="flex items-center font-medium text-gray-700 hover:text-gray-800 text-base"
                        prefetch={true}
                      >
                        {page.name}
                      </Link>
                    ))}
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open, close }) => (
                          <>
                            <div className="relative flex">
                              <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-[#129160] data-open:text-[#129160] cursor-pointer focus-visible:outline-none transition-all text-base">
                                {category.name}
                                <ChevronDownIcon
                                  className={`ml-2 h-5 w-5 text-gray-500 transition-transform duration-200 ease-in-out ${
                                    open ? "rotate-180" : "rotate-0"
                                  }`}
                                />
                              </PopoverButton>
                            </div>
                            <PopoverPanel
                              transition
                              className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                            >
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 top-1/2 bg-white shadow-sm"
                              />
                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  {/* Loader */}
                                  {loading && (
                                    <div className="flex justify-center py-10">
                                      <div className="w-12 h-12 border-4 border-gray-500 border-t-[#129160] rounded-full animate-spin"></div>
                                    </div>
                                  )}
                                  {!loading && (
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-6">
                                      <div className="col-start-2">
                                        <div className="group relative text-base sm:text-sm">
                                          <Image
                                            width={560}
                                            height={560}
                                            alt=""
                                            src="/menu-hero-image.jpg"
                                            className="w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                          />
                                        </div>
                                      </div>
                                      <ul className="text-lg divide-y divide-gray-100 start-1 row-start-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                        {[
                                          ...category.featured,
                                          ...category.services,
                                        ].map((service) => (
                                          <li
                                            key={service.id || service.name}
                                            className="flex gap-x-4 py-1 items-center"
                                          >
                                            <Link
                                              className="min-w-0 w-full flex"
                                              href={service.href}
                                              prefetch={true}
                                              onClick={close}
                                            >
                                              <p className="text-lg font-semibold text-gray-900 transition-colors duration-300 hover:text-[#129160]">
                                                {service.name}
                                              </p>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </PopoverPanel>
                          </>
                        )}
                      </Popover>
                    ))}
                  </div>
                </PopoverGroup>
              </div>

              {/* Секция 3: Търсачка */}
              <div
                ref={searchRef}
                className="flex justify-end w-40 sm:w-44 lg:w-1/6"
              >
                <div className="relative w-full lg:w-72">
                  <input
                    type="text"
                    placeholder="Търсене..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowResults(true);
                    }}
                    onFocus={() => {
                      if (searchQuery.length >= 3) {
                        setShowResults(true);
                      }
                    }}
                    className="block w-full px-3 pr-10 text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#129160] py-1 text-sm sm:text-base lg:text-base"
                  />
                  <MagnifyingGlassIcon className="absolute right-2 top-1/2 text-gray-500 -translate-y-1/2 h-5 w-5" />
                </div>
                {showResults && (
                  <div className="absolute right-0 w-44 sm:w-48 lg:w-72 mt-2 bg-white shadow-lg rounded-md max-h-48 sm:max-h-56 lg:max-h-60 overflow-y-auto border border-gray-200">
                    {isSearching ? (
                      <div className="p-2 text-gray-500 text-sm text-center">
                        Зареждане...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {searchResults.map((result) => (
                          <li
                            key={result.id}
                            className="p-1 sm:p-2 hover:bg-gray-100"
                            onClick={() => {
                              setSearchQuery("");
                              setSearchResults([]);
                              setShowResults(false);
                            }}
                          >
                            <Link
                              href={`/${result.type}/${result.slug}`}
                              className="block w-full h-full p-1 sm:p-2 text-gray-900 hover:text-[#129160]"
                              prefetch={true}
                            >
                              {result.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-2 text-gray-500 text-sm text-center">
                        Няма намерени резултати
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
