import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CTASection } from "@/components/home/CTASection";
import { CallAgentSection } from "@/components/home/CallAgentSection";
import { motion } from "framer-motion";
import {
  Search,
  Map,
  Wrench,
  Rocket,
  CheckCircle,
} from "lucide-react";
import {
  StaggerContainer,
  staggerItemVariants,
} from "@/components/animations/ParallaxSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import aiServicesImg from "@/assets/ai-handshake.png";

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description:
      "We audit your workflows, data, and pain points to find the highest-impact AI opportunities.",
  },
  {
    icon: Map,
    step: "02",
    title: "Strategy",
    description:
      "A clear roadmap with timelines, tech stack, and expected ROI — no guesswork.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Build",
    description:
      "Agile sprints with weekly demos. You see progress from week one, not month three.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Deploy & Scale",
    description:
      "Production deployment with monitoring, support, and iteration as your needs grow.",
  },
];

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="VMKD X AI LABS | AI Automation, AI Agents & Custom Development"
        description="VMKD X AI LABS — AI automation company building chatbots, voice agents, LLM solutions, and custom AI for businesses. From idea to production in weeks."
        canonical="https://vmkdxailabs.com/"
        keywords="AI automation company, AI agents for business, AI chatbot development, custom AI solutions, LLM integration"
      />

      <HeroSection />

      {/* About — concise, no filler stats */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-6">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
                Your growth partner,
                <br />
                <span className="text-ai-cyan">powered by AI.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We're a team of engineers, strategists, and AI specialists based
                in Dindigul, India — working with businesses worldwide. We
                obsess over turning complex AI into simple, working products
                that actually move the needle for your bottom line.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Built and deployed AI for multiple domains",
                  "End-to-end ownership — from architecture to production, one expert handles it all",
                  "We stay on after launch — monitoring, iterating, improving",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle
                      className="text-ai-cyan flex-shrink-0"
                      size={18}
                    />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="border-ai-cyan/30 text-ai-cyan hover:bg-ai-cyan/10"
                >
                  Learn More About Us
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={aiServicesImg}
                  alt="AI Technology"
                  className="w-full h-80 lg:h-96 object-cover img-green-tint"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* How We Work — process section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-4"
            >
              How We Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display"
            >
              From problem to production
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              A proven 4-step process that keeps projects on time and on budget.
            </motion.p>
          </div>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.1}
          >
            {processSteps.map((step, index) => (
              <motion.div key={step.title} variants={staggerItemVariants}>
                <motion.div
                  className="group relative bg-card rounded-2xl p-8 border border-border hover:border-ai-cyan/30 transition-all duration-300 h-full"
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  {/* Step number */}
                  <span className="text-5xl font-bold text-ai-cyan/10 font-display absolute top-4 right-6 group-hover:text-ai-cyan/20 transition-colors">
                    {step.step}
                  </span>

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ai-cyan/20 to-ai-cyan-dark/20 flex items-center justify-center mb-5">
                    <step.icon className="text-ai-cyan" size={24} />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-ai-cyan transition-colors font-display">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>

                  {/* Connector line (not on last item) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-ai-cyan/20" />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CallAgentSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
