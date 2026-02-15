import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const DEFAULT_KEYWORDS =
  "AI automation, AI agents, business solution, startup, ePublishing, VMKD X AI LABS";
const DEFAULT_OG_IMAGE = "https://vmkdxailabs.com/og-image.png";
const SITE_NAME = "VMKD X AI LABS";

export const SEOHead = ({
  title,
  description,
  canonical,
  keywords,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
}: SEOHeadProps) => {
  const fullKeywords = keywords
    ? `${keywords}, ${DEFAULT_KEYWORDS}`
    : DEFAULT_KEYWORDS;

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@VMKDXAILabs" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
