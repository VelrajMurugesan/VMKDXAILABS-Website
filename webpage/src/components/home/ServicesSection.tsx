import { motion } from "framer-motion";
import { 
  Bot, 
  BarChart3, 
  Code, 
  Cog, 
  MessageSquare, 
  Brain, 
  Mic, 
  Cloud, 
  Workflow, 
  GraduationCap, 
  Rocket, 
  Database 
} from "lucide-react";
import { Link } from "react-router-dom";
import { StaggerContainer, staggerItemVariants } from "@/components/animations/ParallaxSection";

const services = [
  {
    icon: Bot,
    title: "AI Business Automation",
    description: "Automate complex workflows across HR, Finance, and Operations with intelligent AI systems that learn and adapt.",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Development",
    description: "Build conversational AI chatbots for customer support, sales, and internal assistance with natural language understanding.",
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    description: "Streamline repetitive tasks and optimize business processes with intelligent automation solutions.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & AI Insights",
    description: "Transform raw data into actionable insights with predictive modeling, real-time dashboards, and advanced analytics.",
  },
  {
    icon: Code,
    title: "Custom AI Development",
    description: "Tailored AI applications built for your specific business needs, from NLP to computer vision.",
  },
  {
    icon: Brain,
    title: "AI Consulting & Strategy",
    description: "Strategic guidance on AI adoption, implementation roadmaps, and organizational change management.",
  },
  {
    icon: Database,
    title: "LLM Integration & RAG Systems",
    description: "Integrate large language models and retrieval-augmented generation for intelligent document processing.",
  },
  {
    icon: Mic,
    title: "Voice AI & Workflow Automation",
    description: "Voice-enabled AI assistants and automated workflow orchestration for enhanced productivity.",
  },
  {
    icon: Cog,
    title: "Digital Transformation",
    description: "End-to-end digital transformation using AI, cloud, and modern technologies to future-proof your business.",
  },
  {
    icon: GraduationCap,
    title: "AI Training for Teams",
    description: "Comprehensive AI training programs to upskill your workforce and build internal AI capabilities.",
  },
  {
    icon: Rocket,
    title: "SaaS Product Development",
    description: "Build scalable SaaS products with AI-powered features, from concept to market launch.",
  },
  {
    icon: Cloud,
    title: "Cloud AI Deployment",
    description: "Deploy and scale AI solutions on cloud infrastructure with enterprise-grade security and performance.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-muted/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />

      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-4"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display"
          >
            Comprehensive AI Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Enterprise-ready AI services designed to transform your business operations and drive measurable results.
          </motion.p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.08}>
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItemVariants}
            >
              <motion.div 
                className="group h-full bg-card rounded-xl p-6 card-shadow hover:shadow-xl transition-all duration-300 border border-border hover:border-ai-cyan/30"
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-ai-cyan/20 to-ai-purple/20 flex items-center justify-center mb-4 group-hover:from-ai-cyan/30 group-hover:to-ai-purple/30 transition-all"
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                >
                  <service.icon className="text-ai-cyan" size={24} />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-ai-cyan transition-colors font-display">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};