import type { Graph, Thing, WithContext } from "schema-dts";

type JsonLdData = WithContext<Thing> | Graph;

interface StructuredDataProps {
  jsonLd: JsonLdData;
}

export function StructuredData({ jsonLd }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: next.js 권장 패턴
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
