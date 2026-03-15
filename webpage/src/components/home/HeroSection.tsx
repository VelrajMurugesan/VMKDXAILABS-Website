import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/75 to-navy" />
      </motion.div>

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern z-[1]" />

      {/* Single accent orb */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-ai-cyan/8 rounded-full blur-3xl z-[2]" />

      <motion.div
        className="container mx-auto container-padding relative z-10 py-20"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-4xl">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 font-display"
          >
            We build AI that
            <br />
            <span className="text-gradient-glow">runs your business.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed"
          >
            Chatbots, voice agents, automation workflows, and custom LLM
            solutions — from idea to production in weeks, not months.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/book-demo">
              <Button
                size="lg"
                className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold btn-glow px-8 py-6 text-base group"
              >
                Book a Free Call
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button
                size="lg"
                variant="outline"
                className="border-ai-cyan/40 text-ai-cyan hover:bg-ai-cyan/10 px-8 py-6 text-base"
              >
                See What We Build
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[4]" />
    </section>
  );
};
