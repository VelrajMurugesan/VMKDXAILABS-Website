import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTASection } from "@/components/home/CTASection";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Lightbulb, Handshake, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Business-First Approach",
    description: "We focus on solving real business problems, not just implementing technology for technology's sake.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Excellence",
    description: "Continuously evolving our solutions with the latest AI advancements and best practices.",
  },
  {
    icon: Handshake,
    title: "Client Partnership",
    description: "Building long-term relationships based on trust, transparency, and mutual success.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "A team of seasoned AI professionals, data scientists, and industry experts.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security and compliance measures in every solution we deliver.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Measurable outcomes and ROI-focused implementations that drive business value.",
  },
];

const expertise = [
  "Artificial Intelligence & Machine Learning",
  "Large Language Models (LLMs)",
  "Retrieval-Augmented Generation (RAG)",
  "Natural Language Processing",
  "Computer Vision",
  "Predictive Analytics",
  "Cloud Computing (AWS, Azure, GCP)",
  "DevOps & MLOps",
  "SaaS Development",
  "API Integration",
];

const About = () => {
  return (
    <Layout>
      <SEOHead
        title="About VMKD X AI LABS | AI Automation Company & Enterprise AI Partner"
        description="Learn about VMKD X AI LABS — a global AI automation company transforming enterprises with custom AI solutions, business automation, AI agents, and digital transformation services."
        canonical="https://vmkdxailabs.com/about"
        keywords="AI consulting company India, enterprise AI partner, AI automation company, about VMKD X AI LABS"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vmkdxailabs.com/" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://vmkdxailabs.com/about" }
          ]
        }}
      />
      <PageHeader

        title="Transforming Businesses Through Intelligent AI"
        subtitle="We are a global AI consulting company dedicated to helping enterprises unlock the full potential of artificial intelligence and digital transformation."
      />

      {/* Company Overview */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-display">
                VMKD X AI LABS Business Solution
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  VMKD X AI LABS Business Solution is a leading AI consulting and technology company headquartered in Trichy, Tamil Nadu, India. We specialize in helping enterprises worldwide automate processes, gain actionable insights, and scale operations through intelligent AI solutions.
                </p>
                <p>
                  Founded with a vision to democratize AI for businesses of all sizes, we bring together deep technical expertise with practical business understanding to deliver solutions that create real, measurable impact.
                </p>
                <p>
                  Our team comprises AI researchers, data scientists, LLM specialists, and business consultants who work collaboratively to understand your unique challenges and craft tailored solutions that drive results.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-muted rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "2+", label: "Enterprise Clients" },
                  { value: "5+", label: "Projects Delivered" },
                  { value: "1+", label: "Countries Served" },
                  { value: "98%", label: "Client Satisfaction" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-6 bg-card rounded-xl card-shadow"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-ai-cyan mb-2 font-display">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl card-shadow border border-border hover:border-ai-cyan/30 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ai-cyan/30 to-ai-cyan-dark/30 flex items-center justify-center mb-6">
                <Eye className="text-ai-cyan" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-display">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted AI partner for enterprises worldwide, enabling them to achieve operational excellence and competitive advantage through intelligent automation, advanced analytics, and innovative AI solutions that transform how businesses operate in the digital age.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card p-8 rounded-2xl card-shadow border border-border hover:border-ai-cyan/30 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ai-cyan/30 to-ai-cyan-dark/30 flex items-center justify-center mb-6">
                <Target className="text-ai-cyan" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-display">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with practical, scalable AI solutions that solve real problems, drive efficiency, and unlock new opportunities for growth – while maintaining the highest standards of security, ethical AI practices, and delivering measurable ROI.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-4"
            >
              Our Values
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display"
            >
              Core Values That Drive Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl card-shadow border border-border text-center hover:border-ai-cyan/30 transition-all group"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-ai-cyan/30 to-ai-cyan-dark/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="text-ai-cyan" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-display">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-4"
            >
              Our Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display"
            >
              Technologies & Skills
            </motion.h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {expertise.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2.5 bg-card rounded-full border border-border hover:border-ai-cyan/30 text-sm font-medium text-foreground transition-all"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;