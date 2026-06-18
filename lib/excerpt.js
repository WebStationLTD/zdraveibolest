/**
 * Cleans WordPress excerpt/content HTML for plain-text card previews.
 */
export function cleanPostExcerpt(rawHtml, maxLength = 150) {
  if (!rawHtml) return "";

  let text = rawHtml
    .replace(/<[^>]+>/g, "")
    .replace(/\[&hellip;\]/g, "")
    .replace(/&hellip;/g, "")
    .replace(/\[…\]/g, "")
    .replace(/&#8230;/g, "")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  text = text.replace(/&#(\d+);/g, (_, code) =>
    String.fromCharCode(Number(code))
  );

  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength).trim()}...`;
}

/**
 * Builds a card excerpt from a WordPress post object.
 */
export function getPostCardExcerpt(post, maxLength = 150) {
  const raw =
    post.yoast_head_json?.description ||
    post.content?.rendered ||
    post.excerpt?.rendered ||
    "";

  return (
    cleanPostExcerpt(raw, maxLength) ||
    "Прочетете цялата статия за повече информация."
  );
}
