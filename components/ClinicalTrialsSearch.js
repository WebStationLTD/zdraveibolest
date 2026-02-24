"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

/**
 * Search component for clinical trials
 */
export default function ClinicalTrialsSearch({ onSearch, initialValue = "", isSearching = false }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  return (
    <div className="w-full">
      <div className="relative">
        <label htmlFor="search-articles" className="sr-only">
          Търси статии за клинични проучвания
        </label>
        <input
          type="search"
          id="search-articles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Търси статии..."
          className="w-full pl-14 pr-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-[#04737d] text-base transition-all shadow-sm hover:shadow-md"
          aria-label="Търси статии за клинични проучвания"
        />
        {isSearching ? (
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#04737d] animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" aria-hidden="true" />
        )}
        {searchTerm && !isSearching && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            aria-label="Изчисти търсенето"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
