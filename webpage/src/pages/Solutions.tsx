import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTASection } from "@/components/home/CTASection";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import {
  StaggerContainer,
  staggerItemVariants,
} from "@/components/animations/ParallaxSection";

interface Project {
  title: string;
  description: string;
  tags: string[];
  media: {
    type: "video" | "image";
    src: string;
    poster?: string; // thumbnail for videos
  };
  liveUrl?: string;
}

const projects: Project[] = [
  // Add your projects here. Examples:
  // {
  //   title: "AI Chatbot for E-commerce",
  //   description: "Multilingual support bot handling 500+ queries/day with 90% resolution rate.",
  //   tags: ["LangChain", "FastAPI", "React"],
  //   media: { type: "video", src: "/projects/chatbot-demo.mp4", poster: "/projects/chatbot-thumb.jpg" },
  //   liveUrl: "https://example.com",
  // },
  // {
  //   title: "Invoice Automation Pipeline",
  //   description: "End-to-end invoice processing with OCR and approval workflows.",
  //   tags: ["Python", "n8n", "OpenAI"],
  //   media: { type: "image", src: "/projects/invoice-demo.png" },
  // },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div variants={staggerItemVariants}>
    <motion.div
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-ai-cyan/30 transition-all duration-300 h-full flex flex-col"
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Media */}
      <div className="relative aspect-video bg-navy/50 overflow-hidden">
        {project.media.type === "video" ? (
          <>
            <video
              src={project.media.src}
              poster={project.media.poster}
              muted
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-ai-cyan/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="text-navy ml-0.5" size={20} fill="currentColor" />
              </div>
            </div>
          </>
        ) : (
          <img
            src={project.media.src}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-ai-cyan transition-colors font-display">
            {project.title}
          </h3>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ai-cyan hover:text-ai-cyan-dark transition-colors flex-shrink-0 mt-1"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-ai-cyan/8 text-ai-cyan/80 border border-ai-cyan/15"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Solutions = () => {
  return (
    <Layout>
      <SEOHead
        title="Our Work | AI Projects & Solutions — VMKD X AI LABS"
        description="See our AI projects in action — chatbots, automation pipelines, voice agents, and custom AI solutions built for real businesses."
        canonical="https://vmkdxailabs.com/solutions"
        keywords="AI projects, AI portfolio, AI automation demos, chatbot development, voice AI agents"
      />
      <PageHeader
        title="Our Work"
        subtitle="Real projects. Real results. See what we've built for businesses like yours."
      />

      <section className="py-8 md:py-16 bg-background">
        <div className="container mx-auto container-padding">
          {projects.length > 0 ? (
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              staggerDelay={0.1}
            >
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </StaggerContainer>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-2xl bg-ai-cyan/10 flex items-center justify-center mx-auto mb-6">
                <Play className="text-ai-cyan" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3 font-display">
                Project showcases coming soon
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're preparing video demos and case studies of our latest AI projects. Check back soon.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Solutions;
