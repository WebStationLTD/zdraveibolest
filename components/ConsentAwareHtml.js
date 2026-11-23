"use client";

import { useEffect, useMemo, useRef } from "react";
import { useConsent } from "../contexts/ConsentContext";
import {
  blockExternalEmbeds,
  restoreExternalEmbeds,
} from "../lib/consent-html";

export default function ConsentAwareHtml({
  content,
  className = "",
  id,
  style,
}) {
  const containerRef = useRef(null);
  const { preferences, allowExternalMedia } = useConsent();

  const blockedHtml = useMemo(() => blockExternalEmbeds(content), [content]);
  const renderedHtml = useMemo(
    () =>
      preferences.externalMedia
        ? restoreExternalEmbeds(blockedHtml)
        : blockedHtml,
    [blockedHtml, preferences.externalMedia]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (event) => {
      const button = event.target.closest("[data-zb-enable-external]");
      if (button && container.contains(button)) {
        allowExternalMedia();
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [allowExternalMedia]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
