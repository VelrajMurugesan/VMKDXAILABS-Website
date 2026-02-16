import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const blogs = [
  {
    slug: "ai-automation-for-small-business",
    title: "AI Automation for Small Businesses: A Complete Guide",
    description:
      "Learn how AI automation helps small businesses reduce costs, save time, and scale faster with intelligent tools and workflows.",
    date: "2026-01-29",
  },
  {
    slug: "ai-automation-for-epublishing",
    title: "AI Automation for ePublishing: Transforming Digital Publishing",
    description:
      "Discover how AI is revolutionizing ePublishing with automated formatting, metadata optimization, content localization, and distribution.",
    date: "2026-02-05",
  },
  {
    slug: "ai-agents-for-business-automation",
    title: "AI Agents for Business Automation: The Complete Guide",
    description:
      "Explore how AI agents are transforming business operations — from customer service to supply chain — using AutoGen, N8N, and LLMs.",
    date: "2026-02-10",
  },
  {
    slug: "how-to-choose-ai-development-partner",
    title: "How to Choose the Right AI Development Partner",
    description:
      "A practical guide to evaluating and selecting the best AI development company for your business needs.",
    date: "2026-02-14",
  },
];

export default function BlogList() {
  return (
    <Layout>
      <Helmet>
        <title>AI Blog | AI Automation, AI Agents & Business Insights — VMKD X AI LABS</title>
        <meta
          name="description"
          content="Read the latest insights on AI automation, AI agents, ePublishing, and business transformation from VMKD X AI LABS. Expert articles on AI trends and strategies."
        />
        <meta
          name="keywords"
          content="AI blog, AI automation articles, AI agents insights, ePublishing AI, AI business blog, VMKD X AI LABS blog"
        />
        <link rel="canonical" href="https://vmkdxailabs.com/blog" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vmkdxailabs.com/blog" />
        <meta
          property="og:title"
          content="AI Blog | AI Automation, AI Agents & Business Insights — VMKD X AI LABS"
        />
        <meta
          property="og:description"
          content="Read the latest insights on AI automation, AI agents, ePublishing, and business transformation from VMKD X AI LABS."
        />
        <meta property="og:image" content="https://vmkdxailabs.com/og-image.png" />
        <meta property="og:site_name" content="VMKD X AI LABS" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@VMKDXAILabs" />
        <meta
          name="twitter:title"
          content="AI Blog | AI Automation, AI Agents & Business Insights — VMKD X AI LABS"
        />
        <meta
          name="twitter:description"
          content="Read the latest insights on AI automation, AI agents, ePublishing, and business transformation from VMKD X AI LABS."
        />
        <meta name="twitter:image" content="https://vmkdxailabs.com/og-image.png" />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "VMKD X AI LABS Blog",
            "url": "https://vmkdxailabs.com/blog",
            "description":
              "Expert articles on AI automation, AI agents, ePublishing, and business transformation.",
            "publisher": {
              "@type": "Organization",
              "name": "VMKD X AI LABS",
              "url": "https://vmkdxailabs.com/",
            },
            "blogPost": blogs.map((blog) => ({
              "@type": "BlogPosting",
              "headline": blog.title,
              "description": blog.description,
              "datePublished": blog.date,
              "url": `https://vmkdxailabs.com/blog/${blog.slug}`,
              "author": {
                "@type": "Organization",
                "name": "VMKD X AI LABS",
              },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vmkdxailabs.com/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://vmkdxailabs.com/blog" },
            ],
          })}
        </script>
      </Helmet>

      <PageHeader

        title="AI Automation & Business Insights"
        subtitle="Expert articles on AI automation, AI agents, ePublishing, and strategies for business transformation."
      />

      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 card-shadow border border-border hover:border-ai-cyan/30 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar size={14} className="text-ai-cyan" />
                  <time dateTime={blog.date}>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3 font-display group-hover:text-ai-cyan transition-colors">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                  {blog.description}
                </p>
                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-ai-cyan font-medium text-sm hover:gap-3 transition-all"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
