import { stripHtml } from "./schema";

const SECTION_RE =
  /<(div|details) class="schema-faq-section"([^>]*)>\s*<(strong|summary) class="schema-faq-question">([\s\S]*?)<\/\3>\s*<(div|p) class="schema-faq-answer">([\s\S]*?)<\/\5>\s*<\/\1>/g;

export function extractYoastFaq(html) {
  if (!html || !html.includes("schema-faq-question")) return [];
  const items = [];
  for (const match of html.matchAll(SECTION_RE)) {
    const question = stripHtml(match[4]);
    const answer = match[6].trim();
    if (question && answer) items.push({ question, answer });
  }
  return items;
}

/** Turn the static Yoast FAQ markup into a native accordion. */
export function enhanceYoastFaqHtml(html) {
  if (!html || !html.includes("schema-faq-section")) return html;
  return html.replace(
    /<div class="schema-faq-section"([^>]*)>\s*<strong class="schema-faq-question">([\s\S]*?)<\/strong>\s*<(div|p) class="schema-faq-answer">([\s\S]*?)<\/\3>\s*<\/div>/g,
    (_, attrs, question, tag, answer) => {
      return `<details class="schema-faq-section"${attrs}><summary class="schema-faq-question">${question}</summary><${tag} class="schema-faq-answer">${answer}</${tag}></details>`;
    }
  );
}
