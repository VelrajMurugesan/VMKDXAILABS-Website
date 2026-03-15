import { motion } from "framer-motion";
import { Phone, Clock, Globe, Zap, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Clock,
    label: "24/7 Available",
  },
  {
    icon: Globe,
    label: "English, Tamil, Hindi",
  },
  {
    icon: Zap,
    label: "Powered by GPT-4o",
  },
];

export const CallAgentSection = () => {
  return (
    <section className="section-padding hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ai-cyan/8 rounded-full blur-3xl" />

      <div className="container mx-auto container-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 border border-ai-cyan/30 text-ai-cyan text-sm font-medium mb-6">
              Live AI Voice Agent
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-display leading-tight">
              Call our AI agent.
              <br />
              <span className="text-gradient-glow">Right now.</span>
            </h2>

            <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
              No forms, no waiting. Talk to our AI-powered phone agent and get
              instant answers about our services — in your language.
            </p>

            <motion.a
              href="tel:+14066938267"
              className="inline-flex items-center gap-3 text-3xl md:text-4xl font-bold text-ai-cyan mb-8 hover:text-ai-cyan-light transition-colors font-display"
              whileHover={{ scale: 1.02 }}
            >
              <Phone size={32} />
              +1 (406) 693-8267
            </motion.a>

            <div className="block">
              <a href="tel:+14066938267">
                <Button
                  size="lg"
                  className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold btn-glow px-8 group"
                >
                  <PhoneCall className="mr-2" size={18} />
                  Call Now
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              {/* Simulated conversation */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-ai-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone size={14} className="text-ai-cyan" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                    <p className="text-white/80 text-sm">
                      Hi! I'm the VMKD AI assistant. How can I help you today?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-ai-cyan/20 rounded-2xl rounded-tr-sm px-4 py-3">
                    <p className="text-white/80 text-sm">
                      I need an AI chatbot for my e-commerce store.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-ai-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone size={14} className="text-ai-cyan" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                    <p className="text-white/80 text-sm">
                      Great choice! We build multilingual chatbots with product
                      recommendations, order tracking, and live handoff. Want me
                      to book a consultation?
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
                  >
                    <feature.icon size={14} className="text-ai-cyan" />
                    <span className="text-xs text-white/70 font-medium">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
