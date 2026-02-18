"use client";

import ProtectedContent from "./ProtectedContent";

/**
 * Blog Post Content Component
 * Handles displaying protected content
 * @param {string} content - HTML content of the blog post
 * @param {Array} therapeuticAreas - List of therapeutic areas
 */
export default function BlogPostContent({ content, therapeuticAreas = [] }) {
  return (
    <>
      {/* Protected Content - shows preview for non-authenticated users */}
      <ProtectedContent
        content={content}
        previewHeight={200}
        therapeuticAreas={therapeuticAreas}
      />
    </>
  );
}
