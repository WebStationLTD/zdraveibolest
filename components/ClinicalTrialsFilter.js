"use client";

import { useState } from "react";

/**
 * Sidebar filter component for clinical trials
 * Allows filtering by multiple tags
 */
export default function ClinicalTrialsFilter({ tags, selectedTags, onTagsChange, totalResults }) {
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
  };

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2 border-[#04737d]">
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          ФИЛТРИ
        </h3>
        {selectedTags.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-[#04737d] hover:text-[#035057] font-medium mt-2 transition-colors"
          >
            Изчисти всички ({selectedTags.length})
          </button>
        )}
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
            className="flex items-start gap-3 cursor-pointer group py-2 px-3 rounded-lg hover:bg-white transition-all"
          >
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.id)}
              onChange={() => handleTagToggle(tag.id)}
              className="mt-0.5 w-4 h-4 text-[#04737d] border-gray-300 rounded focus:ring-[#04737d] cursor-pointer"
              aria-label={`Филтрирай по ${tag.name}`}
            />
            <span className="text-sm text-gray-700 group-hover:text-[#04737d] transition-colors flex-1 leading-tight">
              {tag.name}
            </span>
            {tag.count > 0 && (
              <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
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

