"use client";

import { useState } from "react";

/**
 * Sidebar filter component for clinical trials
 * Allows filtering by multiple tags
 */
const HEALTHY_VOLUNTEER_TAG_ID = 27;

export default function ClinicalTrialsFilter({
  tags,
  selectedTags,
  onTagsChange,
  totalResults,
  audience,
  onAudienceChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleTagToggle = (tagId) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  const handleClearAll = () => {
    onTagsChange([]);
    setSearchTerm("");
    onAudienceChange(null);
  };

  const filteredTags = tags.filter(
    (tag) =>
      tag.id !== HEALTHY_VOLUNTEER_TAG_ID &&
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2 border-[#04737d]">
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          ФИЛТРИ
        </h3>
        {(selectedTags.length > 0 || audience) && (
          <button
            onClick={handleClearAll}
            className="text-sm text-[#04737d] hover:text-[#035057] font-medium mt-2 transition-colors"
          >
            Изчисти всички
            {selectedTags.length > 0 ? ` (${selectedTags.length})` : ""}
          </button>
        )}
      </div>

      <div className="mb-6 space-y-2">
        <button
          type="button"
          onClick={() =>
            onAudienceChange(audience === "patients" ? null : "patients")
          }
          aria-pressed={audience === "patients"}
          className={`w-full rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors ${
            audience === "patients"
              ? "bg-[#04737d] ring-2 ring-[#04737d] ring-offset-2"
              : "bg-[#04737d]/80 hover:bg-[#04737d]"
          }`}
        >
          Пациенти
        </button>
        <button
          type="button"
          onClick={() =>
            onAudienceChange(audience === "volunteers" ? null : "volunteers")
          }
          aria-pressed={audience === "volunteers"}
          className={`w-full rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors ${
            audience === "volunteers"
              ? "bg-[#fd9300] ring-2 ring-[#fd9300] ring-offset-2"
              : "bg-[#fd9300]/80 hover:bg-[#fd9300]"
          }`}
        >
          Здрави доброволци
        </button>
      </div>

      {/* Tag Search */}
      {tags.length > 10 && (
        <div className="mb-4">
          <label htmlFor="filter-search" className="sr-only">
            Търси филтър
          </label>
          <input
            type="text"
            id="filter-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Търси филтър..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent text-sm bg-white"
            aria-label="Търси в списъка с филтри"
          />
        </div>
      )}

      {/* Tags List */}
      <div 
        className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
        role="group"
        aria-label="Филтриране по етикети"
      >
        {filteredTags.map(tag => (
            <label
              key={tag.id}
              className="flex items-center gap-3 cursor-pointer group py-2 px-3 rounded-lg transition-all hover:bg-white"
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagToggle(tag.id)}
                className="flex-shrink-0 w-4 h-4 border-gray-300 rounded cursor-pointer text-[#04737d] focus:ring-[#04737d]"
                aria-label={`Филтрирай по ${tag.name}`}
              />
              <span className="text-sm flex-1 leading-tight transition-colors whitespace-nowrap text-gray-700 group-hover:text-[#04737d]">
                {tag.name}
              </span>
              {tag.count > 0 && (
                <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full text-gray-400 bg-gray-200">
                  {tag.count}
                </span>
              )}
            </label>
        ))}
      </div>

      {filteredTags.length === 0 && searchTerm && (
        <p className="text-sm text-gray-500 text-center py-6">
          Няма намерени филтри
        </p>
      )}

      {/* Results Count */}
      <div className="mt-6 pt-6 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          <span className="font-bold text-[#04737d] text-xl">{totalResults}</span> 
          {' '}
          <span className="text-gray-700 font-medium">
            {totalResults === 1 ? 'резултат' : 'резултата'}
          </span>
        </p>
      </div>
    </div>
  );
}

