import { writeFileSync } from "fs";

const SITE = "https://zdraveibolest.bg";
const WP =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://zdraveibolest.admin-panels.com/wp-json/wp/v2";

function decodeSlug(slug) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function blogUrl(slug) {
  return `${SITE}/blog/${decodeSlug(slug)}`;
}

function stripHtml(html) {
  return (html || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#8211;/g, "–")
    .replace(/&nbsp;/g, " ")
    .trim();
}

const cats = await fetch(
  `${WP}/categories?per_page=100&hide_empty=false`
).then((r) => r.json());
const posts = await fetch(
  `${WP}/posts?status=publish&per_page=100&_fields=slug,title,categories`
).then((r) => r.json());

const therapeutic = [
  ["пулмология", "Пулмология"],
  ["ревматология", "Ревматология"],
  ["кардиология", "Кардиология"],
  ["неврология", "Неврология"],
  ["нефрология", "Нефрология"],
  ["гастроентерология", "Гастроентерология"],
  ["ендокринология", "Ендокринология"],
  ["онкология", "Онкология"],
  ["алергология", "Алергология"],
  ["дерматология", "Дерматология"],
  ["хематология", "Хематология"],
  ["акушер-гинекология", "Акушер-гинекология"],
];

const catMap = Object.fromEntries(cats.map((c) => [c.id, c]));
const lines = [];

lines.push("# Здраве и Болест (zdraveibolest.bg)");
lines.push("");
lines.push(
  "> Българска здравна платформа на Диагностично-консултативен център „Конвекс“ ООД. Предоставя медицинска информация за заболявания на разбираем език, статии по терапевтични области, информация за клинични проучвания и възможност за регистрация за достъп до пълно съдържание."
);
lines.push("");
lines.push(
  "Език: **български (bg_BG)**. Аудитория: пациенти, близки и здравно грамотни граждани в България. Сайтът **не замества** медицинска консултация с лекар."
);
lines.push("");
lines.push(
  "**Оператор:** „Диагностично-консултативен център Конвекс“ ООД · София 1680, ул. „Синанишко езеро“ № 9, офис 1 · тел. +359885900109 · info@zdraveibolest.bg · office@zdraveibolest.bg"
);
lines.push("");
lines.push(
  "**Архитектура:** Headless WordPress (CMS) + Next.js frontend. Пълен URL индекс: [sitemap.xml](" +
    SITE +
    "/sitemap.xml). Структурирани данни: Organization + WebSite + MedicalWebPage (JSON-LD)."
);
lines.push("");
lines.push(
  "**Достъп до съдържание:** Повечето статии изискват безплатна регистрация (paywall). Статии с таг „Здрави доброволци“ (ID 27) са публично достъпни без login. Auth страниците (/login, /register) са noindex."
);
lines.push("");
lines.push(
  "**URL конвенции:** Каноничният hub за здравни статии е `/kategoriya/статии`. `/blog` е alias. Legacy `/blog/category/*` и `/services/*` → 301 към `/kategoriya/*`. `/team` е noindex."
);
lines.push("");

lines.push("## Основни страници");
lines.push(
  `- [Начало](${SITE}/): Главна страница – терапевтични области, последни статии, мисия, CTA за регистрация.`
);
lines.push(
  `- [За нас – Нашата мисия](${SITE}/nashata-misiya): Мисия, визия и ценности на платформата.`
);
lines.push(
  `- [Контакти](${SITE}/contact): Форма, телефон, имейл и карта.`
);
lines.push("");

lines.push("## Здравна информация");
lines.push(
  `- [Статии (hub)](${SITE}/kategoriya/статии): Каталог от ${catMap[19]?.count || 33}+ здравни статии на разбираем език.`
);
lines.push(
  `- [Подкасти](${SITE}/kategoriya/подкасти): Аудио съдържание (hub).`
);
lines.push(
  `- [Blog alias](${SITE}/blog): Пренасочва канонично към /kategoriya/статии.`
);
lines.push("");

lines.push("## Терапевтични области");
for (const [slug, name] of therapeutic) {
  const c = cats.find((x) => decodeSlug(x.slug) === slug);
  const count = c?.count || 0;
  const pubLabel =
    count === 1 ? "публикация" : count > 1 ? "публикации" : "публикации";
  lines.push(
    `- [${name}](${SITE}/kategoriya/${slug}): Статии и информация за ${name.toLowerCase()} (${count} ${pubLabel}).`
  );
}
lines.push("");

lines.push("## Клинични проучвания");
lines.push(
  `- [Какво представляват клиничните проучвания](${SITE}/klinichni-prouchvaniya): Обяснение на фази, ползи, екип, форма за регистрация.`
);
lines.push(
  `- [Намери клинично проучване](${SITE}/klinichni-prouchvaniya/nameri-klinichno-prouchvane): Търсене по терапевтична област и филтри.`
);
lines.push(
  `- [Здрави доброволци](${SITE}/klinichni-prouchvaniya/zdravi-dobrovoltsi): Участие на здрави доброволци в изпитвания.`
);
lines.push(
  `- [Пътят на пациента](${SITE}/patiat-na-patsienta): Стъпки от първи контакт до финално посещение.`
);
lines.push(
  `- [Често задавани въпроси](${SITE}/chesto-zadavani-vaprosi): FAQ за безопасност, права и възнаграждение.`
);
lines.push("");

const byCat = {};
for (const p of posts) {
  const title = stripHtml(p.title?.rendered);
  const primaryCat =
    p.categories?.find((id) => id !== 1 && catMap[id]) || p.categories?.[0];
  const catName = stripHtml(catMap[primaryCat]?.name) || "Други";
  if (!byCat[catName]) byCat[catName] = [];
  byCat[catName].push({ title, url: blogUrl(p.slug) });
}

lines.push(`## Публикации (${posts.length} статии)`);
lines.push(
  "Всички публикации са на `/blog/{slug}` с JSON-LD тип MedicalWebPage."
);
lines.push("");

for (const [catName, items] of Object.entries(byCat).sort((a, b) =>
  a[0].localeCompare(b[0], "bg")
)) {
  lines.push(`### ${catName}`);
  for (const item of items.sort((a, b) =>
    a.title.localeCompare(b.title, "bg")
  )) {
    lines.push(`- [${item.title}](${item.url})`);
  }
  lines.push("");
}

lines.push("## Optional");
lines.push(
  `- [Политика за поверителност](${SITE}/privacy-policy): GDPR и обработка на лични данни.`
);
lines.push(
  `- [Sitemap](${SITE}/sitemap.xml): Пълен машинен индекс на indexable URL-и.`
);
lines.push(
  `- [Robots](${SITE}/robots.txt): Правила за crawl; auth маршрути са disallow.`
);
lines.push("");

const content = lines.join("\n");
writeFileSync("public/llms.txt", `\uFEFF${content}`, "utf8");
console.log(`Generated public/llms.txt (${Buffer.byteLength(content, "utf8")} bytes, ${lines.length} lines)`);
