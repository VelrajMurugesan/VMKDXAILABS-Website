import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ChevronRight } from "lucide-react";

const exploreLinks = [
  { to: "/solutions", label: "AI Solutions" },
  { to: "/use-cases", label: "Industry Use Cases" },
  { to: "/book-demo", label: "Book a Free Demo" },
  { to: "/blog", label: "More Articles" },
];

export default function BlogPost() {
  const { slug } = useParams();

  const blogFiles = import.meta.glob("../../blogs/*.md", {
    as: "raw",
    eager: true,
  });

  const file = blogFiles[`../../blogs/${slug}.md`];

  if (!file) {
    return (
      <Layout>
        <div className="section-padding bg-background">
          <div className="container mx-auto container-padding text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/blog" className="text-ai-cyan font-medium hover:underline">
              Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const { data, content } = matter(file);
  const keywords = data.keywords || "";
  const canonicalUrl = `https://vmkdxailabs.com/blog/${slug}`;

  return (
    <Layout>
      <Helmet>
        <title>{data.title} | VMKD X AI LABS</title>
        <meta name="description" content={data.description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${data.title} | VMKD X AI LABS`} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content="https://vmkdxailabs.com/og-image.png" />
        <meta property="og:site_name" content="VMKD X AI LABS" />
        <meta property="article:published_time" content={data.date} />
        <meta property="article:author" content="VMKD X AI LABS" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@VMKDXAILabs" />
        <meta name="twitter:title" content={`${data.title} | VMKD X AI LABS`} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content="https://vmkdxailabs.com/og-image.png" />

        {/* JSON-LD: BlogPosting */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": data.title,
            "description": data.description,
            "datePublished": data.date,
            "dateModified": data.date,
            "url": canonicalUrl,
            "author": {
              "@type": "Organization",
              "name": "VMKD X AI LABS",
              "url": "https://vmkdxailabs.com/",
            },
            "publisher": {
              "@type": "Organization",
              "name": "VMKD X AI LABS",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vmkdxailabs.com/logo.png",
              },
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
          })}
        </script>

        {/* JSON-LD: BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vmkdxailabs.com/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://vmkdxailabs.com/blog" },
              { "@type": "ListItem", "position": 3, "name": data.title, "item": canonicalUrl },
            ],
          })}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto container-padding py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-ai-cyan transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/blog" className="hover:text-ai-cyan transition-colors">
              Blog
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground truncate max-w-xs">{data.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="section-padding bg-background">
        <div className="container mx-auto container-padding max-w-3xl">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
              {data.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={data.date}>
                {new Date(data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>by VMKD X AI LABS</span>
            </div>
          </header>

          <div className="prose prose-lg prose-invert max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-ai-cyan prose-strong:text-foreground prose-li:text-muted-foreground">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Explore More Section */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto container-padding max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 font-display">Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exploreLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between bg-card p-5 rounded-xl border border-border hover:border-ai-cyan/30 transition-all group"
              >
                <span className="font-medium text-foreground group-hover:text-ai-cyan transition-colors">
                  {link.label}
                </span>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-ai-cyan transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
