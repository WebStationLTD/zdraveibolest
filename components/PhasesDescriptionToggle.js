"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

/**
 * Expandable/Collapsible description for clinical trial phases
 */
export default function PhasesDescriptionToggle() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="text-center max-w-4xl mx-auto mt-12">
      {/* Content with smooth height transition */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isExpanded ? "max-h-[500px] opacity-100 mb-8" : "max-h-0 opacity-0 mb-0"
        }`}
      >
        <div className="pt-6 pb-2">
          <p className="text-lg text-gray-300 leading-relaxed">
            Клиничните изпитвания обикновено се провеждат на етапи (фази). Всяка фаза отговаря на различни въпроси: безопасно ли е, действа ли, каква е правилната доза, как се сравнява с наличните терапии, и какво се случва при дългосрочна употреба. Важно: във всяка фаза участието е доброволно и става след информирано съгласие.
          </p>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group inline-flex items-center gap-2 text-[#fd9300] hover:text-[#e48400] font-semibold text-base transition-all duration-300"
        aria-expanded={isExpanded}
        aria-controls="phases-description"
      >
        <span>{isExpanded ? "Скрий" : "Научи повече"}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-500 group-hover:translate-y-0.5 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
}

