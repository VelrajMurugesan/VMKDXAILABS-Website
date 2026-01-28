import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowRight, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import hantasLogo from "@/assets/hantas-logo.png";

const footerLinks = {
  company: [
    { name: "About Us", anchor: "about" },
    { name: "Why Hantas AI", anchor: "why-us" },
    { name: "Industries", anchor: "industries" },
    { name: "Contact", anchor: "contact" },
  ],
  solutions: [
    { name: "AI Business Automation", anchor: "services" },
    { name: "AI Chatbot Development", anchor: "services" },
    { name: "Data Analytics & Insights", anchor: "services" },
    { name: "Custom AI Development", anchor: "services" },
    { name: "LLM & RAG Systems", anchor: "services" },
    { name: "Voice AI & Workflow", anchor: "services" },
  ],
  services: [
    { name: "AI Consulting", anchor: "services" },
    { name: "SaaS Development", anchor: "services" },
    { name: "MVP Building", anchor: "services" },
    { name: "Cloud AI Deployment", anchor: "services" },
    { name: "AI Training", anchor: "services" },
  ],
};

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contact" className="bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 to-transparent" />

      <div className="container mx-auto container-padding relative z-10">
        {/* CTA Section */}
        <div className="py-16 border-b border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-2">
                Ready to Transform Your Business?
              </h3>
              <p className="text-white/60 max-w-xl">
                Schedule a free consultation with our AI experts today.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              <Button size="lg" className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold px-8 group">
                Book Free Consultation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </a>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={hantasLogo} alt="Hantas AI" className="h-12 w-auto" />
              <div>
                <span className="text-xl font-bold text-white font-display">
                  Hantas <span className="text-ai-cyan">AI</span>
                </span>
                <span className="block text-xs text-white/50 tracking-wider">
                  BUSINESS SOLUTION
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Transforming enterprises with intelligent AI solutions. From automation to analytics, we help businesses scale efficiently and make data-driven decisions.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:contact@hantasai.com"
                className="flex items-center gap-3 text-white/70 hover:text-ai-cyan transition-colors group"
              >
                <Mail size={18} className="text-ai-cyan" />
                <span>contact@hantasai.com</span>
              </a>
              <a
                href="tel:+919688884069"
                className="flex items-center gap-3 text-white/70 hover:text-ai-cyan transition-colors"
              >
                <Phone size={18} className="text-ai-cyan" />
                <span>+91 96888 84069</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin size={18} className="text-ai-cyan flex-shrink-0 mt-0.5" />
                <span>Trichy, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 font-display">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={`/#${link.anchor}`}
                    onClick={(e) => scrollToSection(e, link.anchor)}
                    className="text-sm text-white/60 hover:text-ai-cyan transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 font-display">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <a
                    href={`/#${link.anchor}`}
                    onClick={(e) => scrollToSection(e, link.anchor)}
                    className="text-sm text-white/60 hover:text-ai-cyan transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 font-display">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={`/#${link.anchor}`}
                    onClick={(e) => scrollToSection(e, link.anchor)}
                    className="text-sm text-white/60 hover:text-ai-cyan transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Hantas AI Business Solution. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-ai-cyan/20 flex items-center justify-center text-white/60 hover:text-ai-cyan transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-ai-cyan/20 flex items-center justify-center text-white/60 hover:text-ai-cyan transition-all"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
