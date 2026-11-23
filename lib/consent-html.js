const EXTERNAL_IFRAME =
  /<iframe\b([^>]*\bsrc\s*=\s*(["'])(.*?)\2[^>]*)>[\s\S]*?<\/iframe>/gi;

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeText(value) {
  return escapeAttribute(value).replaceAll("'", "&#39;");
}

function encodedAttribute(value) {
  return escapeAttribute(encodeURIComponent(value));
}

function normalizeExternalUrl(rawUrl) {
  try {
    const url = new URL(rawUrl, "https://zdraveibolest.bg");
    const host = url.hostname.toLowerCase().replace(/^www\./, "");

    if (
      (host === "youtube.com" || host === "youtube-nocookie.com") &&
      url.pathname.startsWith("/embed/")
    ) {
      url.protocol = "https:";
      url.hostname = "www.youtube-nocookie.com";
      return { service: "YouTube", url: url.toString() };
    }

    if (
      host === "maps.google.com" ||
      (host === "google.com" && url.pathname.startsWith("/maps"))
    ) {
      url.protocol = "https:";
      return { service: "Google Maps", url: url.toString() };
    }
  } catch {
    return null;
  }

  return null;
}

export function blockExternalEmbeds(html = "") {
  return html.replace(
    EXTERNAL_IFRAME,
    (iframe, attributes, _quote, source) => {
      const external = normalizeExternalUrl(source);
      if (!external) return iframe;

      const titleMatch = attributes.match(/\btitle\s*=\s*(["'])(.*?)\1/i);
      const title =
        titleMatch?.[2] || `Външно съдържание от ${external.service}`;

      return `<figure class="zb-consent-embed" data-zb-external-embed="true" data-src="${encodedAttribute(
        external.url
      )}" data-title="${encodedAttribute(title)}"><figcaption><strong>${escapeText(
        title
      )}</strong><span>За да се зареди съдържанието от ${external.service}, разрешете категория „Външна медия“.</span><button type="button" data-zb-enable-external="true">Разреши и зареди</button></figcaption></figure>`;
    }
  );
}

export function restoreExternalEmbeds(html = "") {
  return html.replace(
    /<figure\b[^>]*data-zb-external-embed="true"[^>]*data-src="([^"]+)"[^>]*data-title="([^"]*)"[^>]*>[\s\S]*?<\/figure>/gi,
    (placeholder, encodedSource, encodedTitle) => {
      try {
        const source = decodeURIComponent(encodedSource);
        const title = decodeURIComponent(encodedTitle);
        const external = normalizeExternalUrl(source);
        if (!external) return placeholder;

        return `<iframe src="${escapeAttribute(
          external.url
        )}" title="${escapeAttribute(
          title
        )}" width="1280" height="720" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      } catch {
        return placeholder;
      }
    }
  );
}
