"use client";

import ProtectedContent from './ProtectedContent';

export default function BlogPostContent({ content, therapeuticAreas = [] }) {
  return (
    <ProtectedContent 
      content={content} 
      previewHeight={450}
      therapeuticAreas={therapeuticAreas}
    />
  );
}


