import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CTASection } from "@/components/home/CTASection";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, Users, TrendingUp, Globe, Building2, Factory, Heart, ShoppingCart, GraduationCap, Briefcase, BarChart3, Cpu, Cloud, Workflow, Database, Shield, Zap, Award, Target, Lightbulb, Eye, BookOpen, BookMarked, Code, Braces, Bot, GitBranch } from "lucide-react";
import { useRef } from "react";
import { StaggerContainer, staggerItemVariants } from "@/components/animations/ParallaxSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import aiServicesImg from "@/assets/ai-handshake.png";
import aiAutomationImg from "@/assets/ai-automation.jpg";

const stats = [
  { icon: Users, value: "2+", label: "Enterprise Clients" },
  { icon: TrendingUp, value: "98%", label: "Client Satisfaction" },
  { icon: Globe, value: "1+", label: "Countries Served" },
  { icon: CheckCircle, value: "5+", label: "Projects Delivered" },
];

const industries = [
  { icon: Building2, name: "Banking & Finance" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Heart, name: "Healthcare" },
  { icon: ShoppingCart, name: "Retail & E-commerce" },
  { icon: Shield, name: "Insurance" },
  { icon: GraduationCap, name: "Education" },
  { icon: BookOpen, name: "ePublishing" },
  { icon: BookMarked, name: "eBooks Automation" },
  { icon: Briefcase, name: "Professional Services" },
];

const technologies = [
  { icon: Cpu, name: "Machine Learning" },
  { icon: BarChart3, name: "Data Analytics" },
  { icon: Cloud, name: "Cloud AI" },
  { icon: Workflow, name: "Automation" },
  { icon: Database, name: "LLM & RAG" },
  { icon: Shield, name: "Enterprise Security" },
  { icon: Code, name: "Java" },
  { icon: Braces, name: "Python" },
  { icon: Bot, name: "AutoGen" },
  { icon: GitBranch, name: "N8N" },
];

const benefits = [
  {
    title: "Reduce Operational Costs",
    description: "Automate repetitive tasks and streamline processes to cut operational expenses by up to 40%.",
    stat: "40%",
    statLabel: "Cost Reduction"
  },
  {
    title: "Accelerate Decision Making",
    description: "Real-time analytics and AI insights enable faster, data-driven decisions across your organization.",
    stat: "10x",
    statLabel: "Faster Insights"
  },
  {
    title: "Enhance Customer Experience",
    description: "24/7 AI-powered support and personalized interactions that delight customers and boost retention.",
    stat: "95%",
    statLabel: "Satisfaction Rate"
  },
  {
    title: "Scale Without Limits",
    description: "Cloud-native AI solutions that grow with your business, handling any volume of data or users.",
    stat: "∞",
    statLabel: "Scalability"
  },
];

const CountUpNumber = ({ value }: { value: string }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      {value}
    </motion.span>
  );
};

const Index = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: statsProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: whyProgress } = useScroll({
    target: whyRef,
    offset: ["start end", "end start"],
  });

  const statsY = useTransform(statsProgress, [0, 1], ["0%", "5%"]);
  const whyImageY = useTransform(whyProgress, [0, 1], ["-10%", "10%"]);

  return (
    <Layout>
      <SEOHead
        title="VMKD X AI LABS | AI Automation, AI Agents, Business Solutions & Custom Development"
        description="VMKD X AI LABS — Global AI automation company. AI agents, business solutions, startup MVP, ePublishing, eBooks automation, AI training, freelancing, custom development using Java, Python, AutoGen & N8N."
        canonical="https://vmkdxailabs.com/"
        keywords="AI automation company, AI agents for business, ePublishing automation, eBooks automation, AI development India"
      />
      <HeroSection />
      
      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-muted/50 relative overflow-hidden">
        <motion.div style={{ y: statsY }} className="container mx-auto container-padding">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.1}>
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItemVariants}
                className="text-center"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-ai-cyan/30 to-ai-cyan-dark/30 mb-4"
                  whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                >
                  <stat.icon className="text-ai-cyan" size={28} />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1 font-display">
                  <CountUpNumber value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </StaggerContainer>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-background relative overflow-hidden">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                About VMKD X AI LABS
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
                Transforming Businesses with <span className="text-ai-cyan">Intelligent AI</span>
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                VMKD X AI LABS Business Solution is a global AI consulting company dedicated to helping enterprises unlock the power of artificial intelligence. We specialize in creating custom AI solutions that solve real business challenges.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <Target className="text-ai-cyan mx-auto mb-2" size={28} />
                  <h4 className="font-semibold text-foreground mb-1">Mission</h4>
                  <p className="text-xs text-muted-foreground">Empower businesses with AI</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <Eye className="text-ai-cyan mx-auto mb-2" size={28} />
                  <h4 className="font-semibold text-foreground mb-1">Vision</h4>
                  <p className="text-xs text-muted-foreground">Lead global AI transformation</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <Lightbulb className="text-ai-cyan mx-auto mb-2" size={28} />
                  <h4 className="font-semibold text-foreground mb-1">Values</h4>
                  <p className="text-xs text-muted-foreground">Innovation, Trust, Excellence</p>
                </div>
              </div>
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
                  alt="AI Technology Visualization"
                  className="w-full h-80 object-cover img-green-tint"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Benefits Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-4"
            >
              Business Impact
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display"
            >
              Why Businesses Choose AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Measurable outcomes that drive real business transformation
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-ai-cyan/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-4xl font-bold text-ai-cyan mb-1 font-display">{benefit.stat}</div>
                <div className="text-sm text-muted-foreground mb-4">{benefit.statLabel}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-display group-hover:text-ai-cyan transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section id="why-us" ref={whyRef} className="section-padding hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-ai-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-ai-purple/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto container-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.span 
                className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 border border-ai-cyan/30 text-ai-cyan text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Why VMKD X AI LABS
              </motion.span>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-display"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Your Trusted Partner for AI Transformation
              </motion.h2>
              <motion.p 
                className="text-white/70 mb-8 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We don't just implement AI – we partner with you to understand your business challenges and deliver solutions that create real, measurable impact.
              </motion.p>
              <ul className="space-y-4 mb-8">
                {[
                  "Custom AI solutions tailored to your business",
                  "Enterprise-grade security and compliance",
                  "Dedicated support and long-term partnership",
                  "Proven track record with global clients",
                  "Rapid deployment with agile methodology",
                ].map((item, index) => (
                  <motion.li 
                    key={item} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <CheckCircle className="text-ai-cyan mt-1 flex-shrink-0" size={20} />
                    <span className="text-white/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link to="/book-demo">
                <Button className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold btn-glow">
                  Start Your AI Journey
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <motion.div 
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden"
                style={{ y: whyImageY }}
              >
                <div className="relative rounded-xl overflow-hidden mb-6">
                  <img 
                    src={aiAutomationImg}
                    alt="AI Automation"
                    className="w-full h-48 object-cover img-green-tint"
                    loading="lazy"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Zap, label: "Fast Deployment", value: "2-4 Weeks" },
                    { icon: Shield, label: "Security First", value: "Enterprise Grade" },
                    { icon: Award, label: "Success Rate", value: "98%" },
                    { icon: Globe, label: "Global Reach", value: "20+ Countries" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="bg-white/5 rounded-xl p-4 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <item.icon className="text-ai-cyan mx-auto mb-2" size={28} />
                      <div className="text-xl font-bold text-white font-display">{item.value}</div>
                      <div className="text-xs text-white/60">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="section-padding-sm bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-display"
            >
              Industries We Serve
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Delivering AI solutions across diverse industry verticals
            </motion.p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-card px-5 py-3 rounded-full border border-border hover:border-ai-cyan/30 transition-all"
              >
                <industry.icon size={20} className="text-ai-cyan" />
                <span className="text-sm font-medium text-foreground">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding-sm bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-display"
            >
              Technologies & Expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Cutting-edge AI technologies powering enterprise solutions
            </motion.p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex items-center gap-3 bg-gradient-to-br from-ai-cyan/10 to-ai-purple/10 px-5 py-3 rounded-xl border border-ai-cyan/20 hover:border-ai-cyan/40 transition-all"
              >
                <tech.icon size={20} className="text-ai-cyan" />
                <span className="text-sm font-medium text-foreground">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Index;
