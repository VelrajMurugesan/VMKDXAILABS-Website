import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto container-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
            Ready to get started?
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Book a free 30-minute consultation. We'll map out exactly how AI can
            save you time and money.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/book-demo">
              <Button
                size="lg"
                className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold btn-glow px-8 group"
              >
                Book Free Consultation
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-muted px-8"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
            <a
              href="tel:+917824030723"
              className="flex items-center gap-2 hover:text-ai-cyan transition-colors"
            >
              <Phone size={16} className="text-ai-cyan" />
              <span className="text-sm">+91-7824030723</span>
            </a>
            <a
              href="mailto:info@vmkdxailabs.com"
              className="flex items-center gap-2 hover:text-ai-cyan transition-colors"
            >
              <Mail size={16} className="text-ai-cyan" />
              <span className="text-sm">info@vmkdxailabs.com</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
