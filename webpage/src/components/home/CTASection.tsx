import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    <section className="section-padding hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ai-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-ai-purple/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto container-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 border border-ai-cyan/30 text-ai-cyan text-sm font-medium mb-6"
          >
            Get Started Today
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-display">
            Ready to Transform Your Business with{" "}
            <span className="text-gradient-glow">AI?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Schedule a free consultation with our AI experts. Discover how intelligent automation can reduce costs, improve efficiency, and accelerate growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold btn-glow px-8 group">
                  Book Free AI Consultation
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </motion.div>
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" 
                 onClick={() => navigate("/book-demo")}
                 className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold btn-glow px-8">
                  Contact Us
                </Button>
              </motion.div>
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60">
            <a href="tel:+917824030723" className="flex items-center gap-2 hover:text-ai-cyan transition-colors">
              <Phone size={18} className="text-ai-cyan" />
              <span>+91-7824030723</span>
            </a>
            <a href="mailto:info@vmkdxailabs.com" className="flex items-center gap-2 hover:text-ai-cyan transition-colors">
              <Mail size={18} className="text-ai-cyan" />
              <span>info@vmkdxailabs.com</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};