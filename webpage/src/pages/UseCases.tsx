import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTASection } from "@/components/home/CTASection";
import { motion } from "framer-motion";
import { Building2, Factory, Heart, ShoppingCart, GraduationCap, Briefcase, Truck, Banknote, Shield, BookOpen, BookMarked, CheckCircle } from "lucide-react";

const useCases = [
  {
    icon: Building2,
    industry: "Banking & Finance",
    title: "Intelligent Financial Operations",
    description: "Transform banking operations with AI-powered solutions for fraud detection, risk assessment, and customer service automation.",
    cases: [
      {
        name: "Fraud Detection System",
        description: "Real-time AI fraud detection reducing fraudulent transactions by 95%",
      },
      {
        name: "Loan Processing Automation",
        description: "Automated loan underwriting reducing processing time from days to hours",
      },
      {
        name: "AI Customer Service",
        description: "24/7 chatbot handling 80% of customer queries without human intervention",
      },
      {
        name: "Risk Assessment AI",
        description: "Predictive models for credit scoring and portfolio risk management",
      },
    ],
  },
  {
    icon: Factory,
    industry: "Manufacturing",
    title: "Smart Manufacturing Solutions",
    description: "Optimize production, predict maintenance needs, and improve quality control with AI-driven manufacturing intelligence.",
    cases: [
      {
        name: "Predictive Maintenance",
        description: "AI predicting equipment failures 30 days in advance, reducing downtime by 50%",
      },
      {
        name: "Quality Control Vision AI",
        description: "Computer vision detecting defects with 99.5% accuracy on production lines",
      },
      {
        name: "Supply Chain Optimization",
        description: "AI-driven demand forecasting and inventory optimization",
      },
      {
        name: "Production Planning AI",
        description: "Intelligent scheduling maximizing throughput and resource utilization",
      },
    ],
  },
  {
    icon: Heart,
    industry: "Healthcare",
    title: "AI-Powered Healthcare Innovation",
    description: "Enhance patient care, streamline operations, and accelerate medical research with healthcare AI solutions.",
    cases: [
      {
        name: "Medical Image Analysis",
        description: "AI assisting radiologists with faster, more accurate diagnosis",
      },
      {
        name: "Patient Flow Optimization",
        description: "Predictive scheduling reducing wait times and improving bed utilization",
      },
      {
        name: "Clinical Documentation AI",
        description: "Automated medical transcription and documentation",
      },
      {
        name: "Drug Discovery Acceleration",
        description: "AI models speeding up drug candidate identification",
      },
    ],
  },
  {
    icon: ShoppingCart,
    industry: "Retail & E-commerce",
    title: "Intelligent Retail Experience",
    description: "Create personalized shopping experiences, optimize inventory, and boost sales with retail AI solutions.",
    cases: [
      {
        name: "Personalization Engine",
        description: "AI recommendations increasing average order value by 35%",
      },
      {
        name: "Demand Forecasting",
        description: "Accurate inventory predictions reducing stockouts by 40%",
      },
      {
        name: "Price Optimization",
        description: "Dynamic pricing maximizing margins while staying competitive",
      },
      {
        name: "Customer Service Chatbot",
        description: "AI handling returns, tracking, and product queries 24/7",
      },
    ],
  },
  {
    icon: Shield,
    industry: "Insurance",
    title: "AI-Powered Insurance Solutions",
    description: "Modernize insurance operations with AI-driven underwriting, claims processing, and risk assessment for faster, smarter decisions.",
    cases: [
      {
        name: "Claims Processing Automation",
        description: "AI automating claims triage and settlement, reducing processing time by 60%",
      },
      {
        name: "Underwriting Intelligence",
        description: "Predictive models for risk assessment and premium optimization with 95% accuracy",
      },
      {
        name: "Fraud Detection & Prevention",
        description: "Real-time AI identifying fraudulent claims, saving millions annually",
      },
      {
        name: "Customer Self-Service Portal",
        description: "AI chatbot handling policy inquiries, renewals, and claims filing 24/7",
      },
    ],
  },
  {
    icon: Briefcase,
    industry: "Professional Services",
    title: "AI for Service Excellence",
    description: "Streamline operations, improve client delivery, and enhance decision-making with professional services AI.",
    cases: [
      {
        name: "Document Intelligence",
        description: "AI extracting and analyzing data from contracts and legal documents",
      },
      {
        name: "Knowledge Management",
        description: "RAG-powered systems providing instant access to organizational knowledge",
      },
      {
        name: "Resource Optimization",
        description: "AI matching skills to projects for optimal team composition",
      },
      {
        name: "Proposal Generation",
        description: "AI-assisted proposal writing reducing turnaround time by 60%",
      },
    ],
  },
  {
    icon: Truck,
    industry: "Logistics & Supply Chain",
    title: "Smart Logistics Operations",
    description: "Optimize routes, predict demand, and streamline warehouse operations with AI-powered logistics.",
    cases: [
      {
        name: "Route Optimization",
        description: "AI planning reducing delivery costs by 25% and improving on-time delivery",
      },
      {
        name: "Warehouse Automation",
        description: "Intelligent picking and packing systems increasing efficiency by 40%",
      },
      {
        name: "Demand Sensing",
        description: "Real-time demand prediction for proactive inventory positioning",
      },
      {
        name: "Fleet Management AI",
        description: "Predictive maintenance and driver optimization for fleet operations",
      },
    ],
  },
  {
    icon: GraduationCap,
    industry: "Education",
    title: "AI-Enhanced Learning",
    description: "Transform educational experiences with personalized learning, automated assessment, and intelligent tutoring.",
    cases: [
      {
        name: "Adaptive Learning Platform",
        description: "AI personalizing content and pace for each student's needs",
      },
      {
        name: "Automated Grading",
        description: "AI assessment reducing grading time by 80% with consistent scoring",
      },
      {
        name: "Student Success Prediction",
        description: "Early warning systems identifying at-risk students for intervention",
      },
      {
        name: "AI Tutoring Assistant",
        description: "24/7 tutoring chatbot answering student questions and providing guidance",
      },
    ],
  },
  {
    icon: Banknote,
    industry: "HR & Operations",
    title: "Intelligent Workforce Management",
    description: "Automate HR processes, optimize workforce planning, and enhance employee experience with HR AI solutions.",
    cases: [
      {
        name: "Recruitment Automation",
        description: "AI screening and shortlisting candidates, reducing time-to-hire by 50%",
      },
      {
        name: "Attendance & Payroll",
        description: "Automated attendance tracking and payroll processing with zero errors",
      },
      {
        name: "Employee Engagement AI",
        description: "Sentiment analysis and pulse surveys for workforce insights",
      },
      {
        name: "Performance Analytics",
        description: "AI-driven performance management and skill gap analysis",
      },
    ],
  },
  {
    icon: BookOpen,
    industry: "ePublishing",
    title: "AI-Powered Digital Publishing",
    description: "Revolutionize digital publishing workflows with AI-driven content creation, formatting, distribution, and analytics for publishers and authors.",
    cases: [
      {
        name: "Automated Content Formatting",
        description: "AI converting manuscripts into multiple digital formats (ePub, PDF, MOBI) instantly",
      },
      {
        name: "Metadata & SEO Optimization",
        description: "AI-generated metadata, keywords, and descriptions boosting discoverability by 60%",
      },
      {
        name: "Content Localization",
        description: "AI translation and localization for publishing in 50+ languages",
      },
      {
        name: "Sales & Royalty Analytics",
        description: "Real-time dashboards tracking sales, royalties, and reader engagement across platforms",
      },
    ],
  },
  {
    icon: BookMarked,
    industry: "eBooks Automation",
    title: "Intelligent eBook Production",
    description: "Automate the entire eBook lifecycle from creation to distribution with AI-powered tools for authors, publishers, and content creators.",
    cases: [
      {
        name: "AI eBook Generation",
        description: "Automated eBook creation from raw content with professional layouts and formatting",
      },
      {
        name: "Cover Design AI",
        description: "AI-generated book covers and interior illustrations tailored to genre and audience",
      },
      {
        name: "Multi-Platform Distribution",
        description: "One-click publishing to Amazon Kindle, Apple Books, Google Play, and 20+ platforms",
      },
      {
        name: "Reader Engagement Analytics",
        description: "AI tracking reading patterns, drop-off points, and content performance metrics",
      },
    ],
  },
];

const UseCases = () => {
  return (
    <Layout>
      <SEOHead
        title="AI Use Cases | Industry Solutions for Banking, Healthcare, Insurance — VMKD X AI LABS"
        description="Explore VMKD X AI LABS AI use cases across Banking, Healthcare, Insurance, ePublishing, eBooks Automation, Manufacturing, Retail, Education, Logistics & more. Real AI solutions for every industry."
        canonical="https://vmkdxailabs.com/use-cases"
        keywords="AI for banking, AI for ePublishing, AI for healthcare, AI for insurance, AI for manufacturing, AI industry solutions"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vmkdxailabs.com/" },
            { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://vmkdxailabs.com/use-cases" }
          ]
        }}
      />
      <PageHeader

        title="Industry Solutions & Use Cases"
        subtitle="Explore how VMKD X AI LABS delivers transformative results across industries with practical AI implementations that solve real business challenges."
      />

      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto container-padding">
          <div className="space-y-16">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.industry}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 md:p-10 card-shadow border border-border hover:border-ai-cyan/30 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Header */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ai-cyan/20 to-ai-purple/20 flex items-center justify-center">
                        <useCase.icon className="text-ai-cyan" size={28} />
                      </div>
                      <span className="px-3 py-1 bg-ai-cyan/10 text-ai-cyan text-sm font-medium rounded-full">
                        {useCase.industry}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 font-display">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>

                  {/* Use Cases Grid */}
                  <div className="lg:w-2/3">
                    <div className="grid md:grid-cols-2 gap-4">
                      {useCase.cases.map((caseItem) => (
                        <motion.div
                          key={caseItem.name}
                          className="bg-muted/50 rounded-xl p-5 hover:bg-muted transition-colors"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle className="text-ai-cyan flex-shrink-0 mt-0.5" size={18} />
                            <div>
                              <h4 className="font-semibold text-foreground mb-1 font-display">
                                {caseItem.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {caseItem.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
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

export default UseCases;