"use client";

/**
 * Display active filters as removable chips
 */
export default function ActiveFilters({ tags, selectedTagIds, onRemoveTag, onClearAll }) {
  if (selectedTagIds.length === 0) {
    return null;
  }

  const selectedTagObjects = tags.filter(tag => selectedTagIds.includes(tag.id));

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">
          Активни филтри:
        </span>
        
        {selectedTagObjects.map(tag => (
          <button
            key={tag.id}
            onClick={() => onRemoveTag(tag.id)}
            className="inline-flex items-center gap-2 bg-[#04737d] text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#035057] transition-colors group"
          >
            <span>{tag.name}</span>
            <svg
              className="w-4 h-4 group-hover:rotate-90 transition-transform"
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
        ))}

        <button
          onClick={onClearAll}
          className="text-sm text-gray-500 hover:text-[#04737d] font-medium transition-colors"
        >
          Изчисти всички
        </button>
      </div>
    </div>
  );
}
