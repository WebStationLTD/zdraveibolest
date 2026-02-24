"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  BeakerIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  UserGroupIcon,
  BeakerIcon,
  ClipboardDocumentCheckIcon,
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon,
};

/**
 * Expandable team role card with compact default state
 */
export default function TeamRoleCard({ iconName, title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[iconName];

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header - Always Visible */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 bg-[#238C96] flex items-center justify-center rounded-xl flex-shrink-0">
            {Icon && <Icon className="w-7 h-7 text-white" />}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
          {title}
        </h3>

        {/* Content Preview with Fade Effect */}
        <div className="relative">
          <div
            className={`text-sm text-gray-600 leading-relaxed transition-all duration-500 ${
              isExpanded ? "max-h-[2000px] opacity-100" : "max-h-[60px] overflow-hidden"
            }`}
          >
            {!isExpanded && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none"></div>
            )}
            <div className="space-y-3">
              {children}
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 group inline-flex items-center gap-2 text-[#04737d] hover:text-[#035057] font-medium text-sm transition-all"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Скрий" : "Научи повече"}</span>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
