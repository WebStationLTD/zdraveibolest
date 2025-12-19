"use client";

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { searchContent, getTotalResultsCount } from '../services/search';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ posts: [], pages: [], categories: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults({ posts: [], pages: [], categories: [] });
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const searchResults = await searchContent(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  const allResults = [
    ...results.categories.map(c => ({ ...c, type: 'category' })),
    ...results.posts.map(p => ({ ...p, type: 'post' })),
    ...results.pages.map(p => ({ ...p, type: 'page' })),
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % allResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allResults.length) % allResults.length);
    } else if (e.key === 'Enter' && allResults[selectedIndex]) {
      e.preventDefault();
      const result = allResults[selectedIndex];
      const url = result.type === 'category' 
        ? `/kategoriya/${result.slug}`
        : result.type === 'post'
        ? `/blog/${result.slug}`
        : `/${result.slug}`;
      router.push(url);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleResultClick = (type, slug) => {
    const url = type === 'category' 
      ? `/kategoriya/${slug}`
      : type === 'post'
      ? `/blog/${slug}`
      : `/${slug}`;
    router.push(url);
    setIsOpen(false);
    setQuery('');
  };

  const totalResults = getTotalResultsCount(results);

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-[#04737d] hover:bg-[#04737d]/5 rounded-lg transition-colors"
        aria-label="Търсене"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="fixed left-1/2 -translate-x-1/2 top-20 lg:absolute lg:left-auto lg:translate-x-0 lg:right-0 lg:top-auto mt-3 w-[90vw] sm:w-96 origin-top rounded-xl bg-white shadow-2xl ring-1 ring-black/5 z-50 overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Търсене в сайта..."
                className="pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent w-auto min-w-0"
                style={{ width: '100%' }}
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setResults({ posts: [], pages: [], categories: [] });
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
            {query.trim().length >= 2 && (
              <p className="mt-2 text-xs text-gray-500">
                {isSearching ? 'Търсене...' : `${totalResults} резултата`}
              </p>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {query.trim().length < 2 ? (
              <div className="p-6 text-center text-gray-500 text-sm">
                Въведете поне 2 символа за търсене
              </div>
            ) : isSearching ? (
              <div className="p-6 text-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-[#04737d] border-r-transparent"></div>
              </div>
            ) : totalResults === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">
                Няма намерени резултати за &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="py-2">
                {/* Терапевтични области (Categories) */}
                {results.categories.length > 0 && (
                  <div className="mb-3">
                    <p className="px-4 py-2 text-xs font-medium text-[#04737d] tracking-wider uppercase bg-[#04737d]/5">
                      Терапевтични области
                    </p>
                    {results.categories.map((category, index) => (
                      <button
                        key={category.id}
                        onClick={() => handleResultClick('category', category.slug)}
                        className={`text-left px-4 py-3 hover:bg-[#04737d]/5 transition-colors w-auto min-w-0 ${
                          selectedIndex === index ? 'bg-[#04737d]/5' : ''
                        }`}
                        style={{ width: '100%' }}
                      >
                        <h4 className="text-sm font-medium text-gray-900 mb-1">
                          {category.name}
                        </h4>
                        {category.description && (
                          <p className="text-xs text-gray-600 line-clamp-1">
                            {category.description}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Blog Posts */}
                {results.posts.length > 0 && (
                  <div className="mb-3">
                    <p className="px-4 py-2 text-xs font-medium text-[#fd9300] tracking-wider uppercase bg-[#fd9300]/5">
                      Статии
                    </p>
                    {results.posts.map((post, index) => (
                      <button
                        key={post.id}
                        onClick={() => handleResultClick('post', post.slug)}
                        className={`text-left px-4 py-3 hover:bg-[#04737d]/5 transition-colors w-auto min-w-0 ${
                          selectedIndex === results.categories.length + index ? 'bg-[#04737d]/5' : ''
                        }`}
                        style={{ width: '100%' }}
                      >
                        <h4 className="text-sm font-medium text-gray-900 mb-1"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        {post.excerpt?.rendered && (
                          <p className="text-xs text-gray-600 line-clamp-1"
                             dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Pages */}
                {results.pages.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-medium text-gray-600 tracking-wider uppercase bg-gray-50">
                      Страници
                    </p>
                    {results.pages.map((page, index) => (
                      <button
                        key={page.id}
                        onClick={() => handleResultClick('page', page.slug)}
                        className={`text-left px-4 py-3 hover:bg-[#04737d]/5 transition-colors w-auto min-w-0 ${
                          selectedIndex === results.categories.length + results.posts.length + index ? 'bg-[#04737d]/5' : ''
                        }`}
                        style={{ width: '100%' }}
                      >
                        <h4 className="text-sm font-medium text-gray-900"
                            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
            <span>↑↓ Навигация</span>
            <span>Enter Отваряне</span>
            <span>Esc Затваряне</span>
          </div>
        </div>
      )}
    </div>
  );
}
