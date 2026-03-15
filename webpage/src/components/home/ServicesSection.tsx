import { motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Code,
  Database,
  Mic,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  StaggerContainer,
  staggerItemVariants,
} from "@/components/animations/ParallaxSection";

const services = [
  {
    icon: Bot,
    title: "AI Business Automation",
    description:
      "End-to-end workflow automation — from invoice processing to HR onboarding — that eliminates manual bottlenecks.",
    tools: ["n8n", "Python", "OpenAI"],
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Development",
    description:
      "Multilingual support bots that handle English, Hindi & Tamil queries 24/7 with human-like accuracy.",
    tools: ["LangChain", "FastAPI", "WebSocket"],
  },
  {
    icon: Code,
    title: "Custom AI Development",
    description:
      "Purpose-built models for your domain — computer vision, NLP, anomaly detection, and beyond.",
    tools: ["PyTorch", "OpenCV", "ONNX"],
  },
  {
    icon: Database,
    title: "LLM Integration & RAG",
    description:
      "Turn thousands of internal documents into a searchable knowledge base your team can query in plain English.",
    tools: ["GPT-4", "Pinecone", "LangChain"],
  },
  {
    icon: Mic,
    title: "Voice AI Agents",
    description:
      "AI phone agents that qualify leads, book appointments, and update your CRM — all without human intervention.",
    tools: ["Twilio", "Whisper", "Google TTS"],
  },
  {
    icon: Rocket,
    title: "SaaS & MVP Development",
    description:
      "Go from idea to production-ready SaaS — auth, billing, AI features — shipped in 8 weeks or less.",
    tools: ["Next.js", "Stripe", "OpenAI"],
  },
];

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className="section-padding bg-muted/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />

      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-4"
          >
            What We Build
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display"
          >
            AI solutions that deliver results
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            We don't do generic. Every solution is built for your specific
            business problem.
          </motion.p>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={staggerItemVariants}>
              <motion.div
                className="group h-full bg-card rounded-2xl p-8 border border-border hover:border-ai-cyan/30 transition-all duration-300 flex flex-col"
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ai-cyan/20 to-ai-cyan-dark/20 flex items-center justify-center mb-5 group-hover:from-ai-cyan/30 group-hover:to-ai-cyan-dark/30 transition-all">
                  <service.icon className="text-ai-cyan" size={24} />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-ai-cyan transition-colors font-display">
                  {service.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {service.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-ai-cyan/8 text-ai-cyan/80 border border-ai-cyan/15"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/solutions">
            <Button
              variant="outline"
              size="lg"
              className="border-ai-cyan/30 text-ai-cyan hover:bg-ai-cyan/10"
            >
              View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
