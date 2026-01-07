"use client";

import ProtectedContent from "./ProtectedContent";
import ClinicalTrialForm from "./ClinicalTrialForm";
import { useAuth } from "../contexts/AuthContext";

export default function BlogPostContent({ content, therapeuticAreas = [] }) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <ProtectedContent
        content={content}
        previewHeight={450}
        therapeuticAreas={therapeuticAreas}
      />

      {/* Clinical Trial Form - показва се само за логнати потребители */}
      {isAuthenticated && (
        <div className="mt-16 pt-16 border-t border-gray-200">
          <ClinicalTrialForm />
        </div>
      )}
    </>
  );
}
