import React, { useMemo } from "react";

export default function FaqSchemaFromHtml({ html = "" }) {
  const faqs = useMemo(() => {
    if (!html) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Find FAQ heading
    const h2List = Array.from(doc.querySelectorAll("h2"));
    const faqH2 = h2List.find((h2) =>
      (h2.textContent || "").toLowerCase().includes("faq")
    );

    if (!faqH2) return [];

    const result = [];

    // FAQ format: h3 question -> p answer
    let node = faqH2.nextElementSibling;

    while (node) {
      const tag = node.tagName?.toLowerCase();

      // stop if next h2 starts (new section)
      if (tag === "h2") break;

      if (tag === "h3") {
        const q = (node.textContent || "").trim();

        // next paragraph should be answer
        const next = node.nextElementSibling;
        if (next && next.tagName?.toLowerCase() === "p") {
          const a = (next.textContent || "").trim();

          if (q && a) {
            // remove "1. " type numbering
            const cleanQ = q.replace(/^\d+\.\s*/, "");
            result.push({ q: cleanQ, a });
          }
        }
      }

      node = node.nextElementSibling;
    }

    return result;
  }, [html]);

  if (!faqs.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
