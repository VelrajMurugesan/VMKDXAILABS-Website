import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTASection } from "@/components/home/CTASection";
import { motion } from "framer-motion";
import { Sparkles, Shield, Scale, Handshake, Zap, Users, Award, HeadphonesIcon, Target, Clock, Globe, CheckCircle } from "lucide-react";

const differentiators = [
  {
    icon: Sparkles,
    title: "Custom AI Solutions",
    description: "We don't offer one-size-fits-all solutions. Every AI implementation is tailored to your specific business challenges, workflows, and goals.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Your data security is paramount. We implement industry-leading security protocols, encryption, and compliance measures in every solution.",
  },
  {
    icon: Scale,
    title: "Scalable Architecture",
    description: "Our solutions are built to grow with you. From proof-of-concept to enterprise-wide deployment, our architecture scales seamlessly.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description: "We're not just vendors – we're partners. We stay engaged post-implementation to ensure ongoing success and continuous improvement.",
  },
  {
    icon: Zap,
    title: "Rapid Time-to-Value",
    description: "Our agile methodology ensures you see results quickly. We focus on delivering value in phases, starting with high-impact use cases.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team includes AI researchers, data scientists, LLM specialists, and industry veterans with deep expertise across multiple domains.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "With 5+ successful projects across 1+ countries, we have the experience and expertise to deliver results for your business.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock support ensures your AI systems run smoothly. Our dedicated team is always available to address any concerns.",
  },
];

const processSteps = [
  { 
    step: "01", 
    title: "Discovery", 
    desc: "Deep dive into your business processes, challenges, and goals to identify AI opportunities." 
  },
  { 
    step: "02", 
    title: "Strategy", 
    desc: "Develop a comprehensive roadmap for AI implementation with clear milestones and ROI projections." 
  },
  { 
    step: "03", 
    title: "Implementation", 
    desc: "Build and deploy solutions with agile methodology, ensuring rapid delivery and quality." 
  },
  { 
    step: "04", 
    title: "Optimization", 
    desc: "Continuous monitoring, improvement, and support to maximize value from your AI investment." 
  },
];

const commitments = [
  "Transparent communication at every stage",
  "Fixed-price projects with no hidden costs",
  "Knowledge transfer and team enablement",
  "Post-implementation support and maintenance",
  "Regular progress updates and reviews",
  "Full documentation and training",
  "SLA-backed service guarantees",
  "Dedicated project manager",
];

const WhyHantas = () => {
  return (
    <Layout>
      <SEOHead
        title="Why VMKD X AI LABS | Trusted AI Automation & Development Partner"
        description="Why choose VMKD X AI LABS? Custom AI solutions, enterprise-grade security, rapid deployment, 98% client satisfaction. Your trusted partner for AI automation and digital transformation."
        canonical="https://vmkdxailabs.com/why-vmkd"
        keywords="trusted AI partner, enterprise AI security, AI development partner, why choose VMKD X AI LABS"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vmkdxailabs.com/" },
            { "@type": "ListItem", "position": 2, "name": "Why VMKD X AI LABS", "item": "https://vmkdxailabs.com/why-vmkd" }
          ]
        }}
      />
      <PageHeader

        title="Your Trusted Partner for AI Transformation"
        subtitle="Discover what sets us apart and why leading enterprises across the globe choose VMKD X AI LABS for their digital transformation journey."
      />

      {/* Main Differentiators */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-4"
            >
              Our Differentiators
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display"
            >
              What Sets Us Apart
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              We combine deep technical expertise with practical business understanding to deliver AI solutions that create real impact.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card p-6 rounded-xl card-shadow border border-border hover:border-ai-cyan/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ai-cyan/30 to-ai-cyan-dark/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="text-ai-cyan" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-display">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section-padding hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-ai-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-ai-purple/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto container-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 border border-ai-cyan/30 text-ai-cyan text-sm font-medium mb-6">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
                Business-Focused AI Implementation
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                We don't believe in AI for AI's sake. Our approach starts with understanding your business challenges, then identifying where AI can create the most impact. Every solution we build is designed to deliver measurable ROI.
              </p>
              <div className="space-y-6">
                {processSteps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-ai-cyan/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-ai-cyan font-bold font-display">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white font-display">{item.title}</h4>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-display">Our Commitment</h3>
              <ul className="space-y-4">
                {commitments.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CheckCircle className="text-ai-cyan flex-shrink-0" size={18} />
                    <span className="text-white/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Target, value: "98%", label: "Project Success Rate" },
              { icon: Clock, value: "2-4", label: "Weeks to Deploy" },
              { icon: Globe, value: "1+", label: "Countries Served" },
              { icon: Users, value: "2+", label: "Enterprise Clients" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-ai-cyan/30 to-ai-cyan-dark/30 flex items-center justify-center mb-4">
                  <stat.icon className="text-ai-cyan" size={28} />
                </div>
                <div className="text-3xl font-bold text-foreground font-display">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default WhyHantas;