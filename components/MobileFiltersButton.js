"use client";

import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

/**
 * Mobile filters button with slide-out panel
 */
export default function MobileFiltersButton({ children, selectedCount }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#04737d] text-white px-6 py-4 rounded-full shadow-2xl hover:bg-[#035057] transition-all flex items-center gap-2 font-semibold"
      >
        <AdjustmentsHorizontalIcon className="w-5 h-5" />
        Филтри
        {selectedCount > 0 && (
          <span className="bg-[#fd9300] text-white text-xs font-bold px-2 py-1 rounded-full">
            {selectedCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        />
      )}

      {/* Slide-out Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">ФИЛТРИ</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
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
        </div>

        {/* Filters Content */}
        <div className="p-4">
          {children}
        </div>

        {/* Apply Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-[#04737d] text-white py-3 rounded-lg font-semibold hover:bg-[#035057] transition-colors"
          >
            Приложи филтри
          </button>
        </div>
      </div>
    </>
  );
}
