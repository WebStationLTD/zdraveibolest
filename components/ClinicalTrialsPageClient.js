"use client";

import { useState, useEffect, useCallback } from "react";
import ClinicalTrialsFilter from "./ClinicalTrialsFilter";
import ClinicalTrialsSearch from "./ClinicalTrialsSearch";
import ClinicalTrialsList from "./ClinicalTrialsList";
import ClinicalTrialsListSkeleton from "./ClinicalTrialsListSkeleton";
import ActiveFilters from "./ActiveFilters";
import MobileFiltersButton from "./MobileFiltersButton";
import Breadcrumbs from "./Breadcrumbs";

/**
 * Client component for clinical trials page with filtering and search
 */
export default function ClinicalTrialsPageClient({ initialTags, initialPosts, categorySlug }) {
  const [tags] = useState(initialTags);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const totalPosts = initialPosts.length;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://zdraveibolest.admin-panels.com/wp-json/wp/v2";

      const categoryResponse = await fetch(
        `${API_URL}/categories?slug=${categorySlug}`
      );
      const categories = await categoryResponse.json();
      
      if (categories.length === 0) {
        setPosts([]);
        return;
      }

      const categoryId = categories[0].id;

      let queryParams = `categories=${categoryId}&per_page=100&_embed&orderby=date&order=desc`;

      if (selectedTags.length > 0) {
        queryParams += `&tags=${selectedTags.join(',')}`;
      }

      if (debouncedSearchQuery.trim()) {
        queryParams += `&search=${encodeURIComponent(debouncedSearchQuery.trim())}`;
      }

      const response = await fetch(`${API_URL}/posts?${queryParams}`);
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedTags, debouncedSearchQuery, categorySlug]);

  useEffect(() => {
    if (selectedTags.length > 0 || debouncedSearchQuery.trim()) {
      loadPosts();
    } else {
      setPosts(initialPosts);
      setLoading(false);
    }
  }, [selectedTags, debouncedSearchQuery, initialPosts, loadPosts]);

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId));
  };

  const handleClearAllFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  const breadcrumbItems = [
    { label: "Клинични проучвания", href: "/klinichni-prouchvaniya" },
    { label: "Намери клинично проучване", href: null },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Search Bar */}
        <div className="mb-8">
          <ClinicalTrialsSearch
            onSearch={setSearchQuery}
            initialValue={searchQuery}
            isSearching={loading}
          />
        </div>

        {/* Grid Layout: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar - Filters (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
            <ClinicalTrialsFilter
              tags={tags}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              totalResults={posts.length}
            />
          </aside>

          {/* Mobile Filters Button & Drawer */}
          <MobileFiltersButton selectedCount={selectedTags.length}>
            <ClinicalTrialsFilter
              tags={tags}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              totalResults={posts.length}
            />
          </MobileFiltersButton>

          {/* Main Content - Posts */}
          <main className="lg:col-span-9 w-full">
            {/* Results Count & Active Filters */}
            <div className="mb-6">
              {!loading && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {posts.length} {posts.length === 1 ? 'резултат' : 'резултата'}
                    {(selectedTags.length > 0 || searchQuery.trim()) && (
                      <span className="text-base font-normal text-gray-500 ml-2">
                        от общо {totalPosts}
                      </span>
                    )}
                  </h2>
                  {(selectedTags.length > 0 || searchQuery.trim()) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                      {selectedTags.length > 0 && (
                        <span className="font-medium text-[#04737d]">
                          {selectedTags.length} {selectedTags.length === 1 ? 'филтър' : 'филтри'}
                        </span>
                      )}
                      {selectedTags.length > 0 && searchQuery.trim() && (
                        <span className="text-gray-400">•</span>
                      )}
                      {searchQuery.trim() && (
                        <span>
                          Търсене: <strong>&ldquo;{searchQuery}&rdquo;</strong>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              <ActiveFilters
                tags={tags}
                selectedTagIds={selectedTags}
                onRemoveTag={handleRemoveTag}
                onClearAll={handleClearAllFilters}
              />
            </div>

            {/* Loading State */}
            {loading && <ClinicalTrialsListSkeleton />}
            
            {/* Results */}
            {!loading && <ClinicalTrialsList posts={posts} />}
          </main>
        </div>
      </div>
    </section>
  );
}
