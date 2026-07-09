/**
 * Server-rendered JSON-LD for SEO (initial HTML, not client-injected).
 */
export default function JsonLd({ id, data }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
