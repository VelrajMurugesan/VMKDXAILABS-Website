import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, Bot, Brain, BarChart3 } from "lucide-react";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FloatingElement } from "@/components/animations/ParallaxSection";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={sectionRef} className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ y: backgroundY }}
      >
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy" />
      </motion.div>
      
      {/* Animated Grid Pattern */}
      <motion.div className="absolute inset-0 grid-pattern z-[1]" style={{ y: backgroundY }} />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        <FloatingElement duration={8} distance={40} className="absolute -top-20 -right-20">
          <div className="w-96 h-96 bg-ai-cyan/20 rounded-full blur-3xl" />
        </FloatingElement>
        <FloatingElement duration={10} delay={2} distance={30} className="absolute -bottom-40 -left-40">
          <div className="w-[600px] h-[600px] bg-ai-purple/15 rounded-full blur-3xl" />
        </FloatingElement>
        <FloatingElement duration={6} delay={1} distance={20} className="absolute top-1/3 right-1/4">
          <div className="w-48 h-48 bg-ai-cyan/10 rounded-full blur-2xl" />
        </FloatingElement>
      </div>

      {/* Neural Network Lines (Decorative) */}
      <div className="absolute inset-0 opacity-20 z-[3]">
        <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <motion.path
            d="M0,540 Q480,300 960,540 T1920,540"
            stroke="url(#gradient1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,700 Q480,500 960,700 T1920,700"
            stroke="url(#gradient2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(185 100% 50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(185 100% 50%)" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(185 100% 50%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(270 70% 60%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(270 70% 60%)" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(270 70% 60%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.div 
        className="container mx-auto container-padding relative z-10 py-20"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 bg-ai-cyan/10 border border-ai-cyan/30 rounded-full px-5 py-2.5 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={16} className="text-ai-cyan" />
            </motion.div>
            <span className="text-sm font-medium text-white/90">Global AI Consulting & Digital Transformation Partner</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 font-display"
          >
            Intelligent AI Solutions for{" "}
            <span className="text-gradient-glow">Enterprise Growth</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            From AI chatbots and business automation to custom LLM solutions and data analytics — we help global enterprises accelerate digital transformation and unlock unprecedented efficiency.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold px-8 py-6 text-base group">
                  Book Free AI Consultation
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </Button>
              </motion.div>
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold px-8 py-6 text-base">
                  Explore Solutions
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {[
              { icon: Shield, text: "Enterprise Security" },
              { icon: Zap, text: "Rapid Deployment" },
              { icon: Bot, text: "AI Chatbots" },
              { icon: Brain, text: "LLM & RAG Systems" },
              { icon: BarChart3, text: "Data Analytics" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-2 text-white/60 hover:text-ai-cyan transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <item.icon size={18} className="text-ai-cyan" />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[4]" />
    </section>
  );
};
