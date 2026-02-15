import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTASection } from "@/components/home/CTASection";
import { motion } from "framer-motion";
import {
  Bot, 
  BarChart3, 
  Code, 
  Cog, 
  MessageSquare, 
  Brain, 
  Database, 
  Workflow,
  Mic,
  Cloud,
  GraduationCap,
  Rocket,
  CheckCircle
} from "lucide-react";

const solutions = [
  {
    icon: Bot,
    title: "AI Business Automation",
    description: "Automate complex business processes across HR, Finance, and Operations with intelligent AI systems that learn, adapt, and continuously improve.",
    features: [
      "Document Processing & OCR",
      "Invoice & Receipt Automation",
      "Approval Workflow Automation",
      "Compliance & Audit Automation",
    ],
    outcomes: ["40% cost reduction", "90% faster processing", "99.5% accuracy"],
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Development",
    description: "Build intelligent conversational AI chatbots for customer support, sales, HR, and internal operations with natural language understanding.",
    features: [
      "Multi-language Support",
      "Intent Recognition & NLU",
      "CRM/ERP Integration",
      "Omnichannel Deployment",
    ],
    outcomes: ["24/7 availability", "80% query resolution", "50% cost savings"],
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    description: "Streamline repetitive tasks and optimize end-to-end business processes with intelligent automation and robotic process automation.",
    features: [
      "Process Discovery & Mapping",
      "RPA Implementation",
      "Intelligent Document Processing",
      "Workflow Orchestration",
    ],
    outcomes: ["70% time savings", "Zero manual errors", "Faster turnaround"],
  },
  {
    icon: BarChart3,
    title: "Data Analytics & AI Insights",
    description: "Transform raw data into actionable insights with advanced analytics, predictive modeling, and real-time business intelligence dashboards.",
    features: [
      "Predictive Analytics",
      "Real-time Dashboards",
      "Customer Behavior Analysis",
      "Revenue Forecasting",
    ],
    outcomes: ["10x faster insights", "Data-driven decisions", "Improved ROI"],
  },
  {
    icon: Code,
    title: "Custom AI Development",
    description: "Tailored AI solutions built specifically for your unique business requirements, from NLP to computer vision and beyond.",
    features: [
      "Natural Language Processing",
      "Computer Vision Solutions",
      "Recommendation Engines",
      "AI-powered Search",
    ],
    outcomes: ["Custom fit solutions", "Competitive advantage", "Innovation edge"],
  },
  {
    icon: Brain,
    title: "AI Consulting & Strategy",
    description: "Expert guidance on AI adoption, technology selection, implementation roadmaps, and organizational change management.",
    features: [
      "AI Readiness Assessment",
      "Technology Stack Selection",
      "ROI Analysis & Planning",
      "Change Management",
    ],
    outcomes: ["Clear roadmap", "Risk mitigation", "Faster adoption"],
  },
  {
    icon: Database,
    title: "LLM Integration & RAG Systems",
    description: "Integrate large language models with your enterprise data using retrieval-augmented generation for accurate, context-aware AI responses.",
    features: [
      "Enterprise LLM Deployment",
      "Knowledge Base Integration",
      "Document Q&A Systems",
      "Semantic Search",
    ],
    outcomes: ["Accurate responses", "Reduced hallucination", "Enterprise context"],
  },
  {
    icon: Mic,
    title: "Voice AI & Workflow Automation",
    description: "Voice-enabled AI assistants and automated workflow orchestration for hands-free productivity and enhanced user experience.",
    features: [
      "Voice Command Systems",
      "Speech-to-Text/Text-to-Speech",
      "Voice Biometrics",
      "Call Center Automation",
    ],
    outcomes: ["Hands-free operations", "Improved accessibility", "Faster service"],
  },
  {
    icon: Cog,
    title: "Digital Transformation",
    description: "End-to-end digital transformation using AI, cloud, and modern technologies to future-proof your business operations.",
    features: [
      "Legacy System Modernization",
      "Cloud Migration",
      "API-first Architecture",
      "Microservices Design",
    ],
    outcomes: ["Future-ready systems", "Increased agility", "Lower TCO"],
  },
  {
    icon: GraduationCap,
    title: "AI Training for Teams",
    description: "Comprehensive AI training programs to upskill your workforce and build internal AI capabilities for sustainable innovation.",
    features: [
      "Customized Training Programs",
      "Hands-on Workshops",
      "AI Tool Proficiency",
      "Best Practices & Ethics",
    ],
    outcomes: ["Skilled workforce", "Internal AI expertise", "Culture of innovation"],
  },
  {
    icon: Rocket,
    title: "SaaS & MVP Development",
    description: "Build scalable SaaS products and MVPs with AI-powered features, from concept validation to market launch.",
    features: [
      "Product Strategy & Design",
      "Rapid Prototyping",
      "AI Feature Integration",
      "Scalable Architecture",
    ],
    outcomes: ["Faster time-to-market", "Validated concepts", "Investor-ready"],
  },
  {
    icon: Cloud,
    title: "Cloud AI Deployment",
    description: "Deploy and scale AI solutions on cloud infrastructure with enterprise-grade security, performance, and reliability.",
    features: [
      "AWS/Azure/GCP Deployment",
      "MLOps & CI/CD Pipelines",
      "Auto-scaling Infrastructure",
      "Security & Compliance",
    ],
    outcomes: ["99.9% uptime", "Infinite scalability", "Enterprise security"],
  },
];

const Solutions = () => {
  return (
    <Layout>
      <Helmet>
        <title>AI Solutions | AI Automation, Chatbots, LLM, Data Analytics — VMKD X AI LABS</title>
        <meta name="description" content="Explore VMKD X AI LABS AI solutions: business automation, AI chatbots, LLM & RAG, data analytics, ePublishing, eBooks automation, custom development with Java, Python, AutoGen & N8N." />
        <link rel="canonical" href="https://vmkdxailabs.com/solutions" />
      </Helmet>
      <PageHeader
        badge="Solutions"
        title="Enterprise AI Solutions"
        subtitle="Comprehensive AI services designed to transform your business operations, accelerate digital transformation, and drive measurable results."
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl p-8 card-shadow border border-border hover:border-ai-cyan/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ai-cyan/20 to-ai-purple/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <solution.icon className="text-ai-cyan" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3 font-display group-hover:text-ai-cyan transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {solution.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Key Features:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {solution.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle size={14} className="text-ai-cyan flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {solution.outcomes.map((outcome) => (
                        <span
                          key={outcome}
                          className="px-3 py-1 bg-ai-cyan/10 text-ai-cyan text-xs font-medium rounded-full"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Solutions;