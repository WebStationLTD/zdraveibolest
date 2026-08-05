import ProtectedContent from "./ProtectedContent";
import { isPaywallEnabled } from "../lib/paywall";

/**
 * Blog Post Content Component
 * Full HTML for all visitors when paywall is off.
 * When NEXT_PUBLIC_ENABLE_PAYWALL=true, uses ProtectedContent.
 * @param {string} content - HTML content of the blog post
 * @param {Array} therapeuticAreas - Therapeutic areas for register modal (paywall only)
 * @param {Array} tags - Post tags (paywall public-access check)
 */
export default function BlogPostContent({
  content,
  therapeuticAreas = [],
  tags = [],
}) {
  if (!isPaywallEnabled()) {
    return (
      <div
        className="prose prose-lg max-w-none text-justify"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <ProtectedContent
      content={content}
      previewHeight={200}
      therapeuticAreas={therapeuticAreas}
      postTags={tags}
    />
  );
}
