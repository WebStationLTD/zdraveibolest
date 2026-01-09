"use client";

import ProtectedContent from "./ProtectedContent";
import ClinicalTrialForm from "./ClinicalTrialForm";
import { useAuth } from "../contexts/AuthContext";

/**
 * Blog Post Content Component
 * Handles displaying protected content and clinical trial form
 * @param {string} content - HTML content of the blog post
 * @param {Array} therapeuticAreas - List of therapeutic areas
 */
export default function BlogPostContent({ content, therapeuticAreas = [] }) {
  const { isAuthenticated, loading } = useAuth();

  return (
    <>
      {/* Protected Content - shows preview for non-authenticated users */}
      <ProtectedContent
        content={content}
        previewHeight={450}
        therapeuticAreas={therapeuticAreas}
      />

      {/* Clinical Trial Form - only shown for authenticated users */}
      {/* Wait for auth to load to prevent race conditions */}
      {!loading && isAuthenticated && (
        <div className="mt-16 pt-16 border-t border-gray-200">
          <ClinicalTrialForm />
        </div>
      )}
    </>
  );
}
