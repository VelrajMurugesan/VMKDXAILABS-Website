import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowRight, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import footerBanner from "@/assets/footer-banner.png";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Why VMKD X AI LABS", path: "/why-vmkd" },
    { name: "Use Cases", path: "/use-cases" },
    { name: "Contact", path: "/contact" },
  ],
  solutions: [
    { name: "AI Business Automation", path: "/solutions" },
    { name: "AI Chatbot Development", path: "/solutions" },
    { name: "Data Analytics & Insights", path: "/solutions" },
    { name: "Custom AI Development", path: "/solutions" },
    { name: "LLM & RAG Systems", path: "/solutions" },
    { name: "Voice AI & Workflow", path: "/solutions" },
  ],
  resources: [
    { name: "AI Blog", path: "/blog" },
    { name: "AI for Small Business", path: "/blog/ai-automation-for-small-business" },
    { name: "AI for ePublishing", path: "/blog/ai-automation-for-epublishing" },
    { name: "AI Agents Guide", path: "/blog/ai-agents-for-business-automation" },
    { name: "Choose AI Partner", path: "/blog/how-to-choose-ai-development-partner" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-navy relative overflow-hidden">

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
            <Link to="/book-demo">
              <Button size="lg" className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold btn-glow px-8 group">
                Book Free Consultation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-xl font-bold text-white font-display">
                VMKD X <span className="text-ai-cyan">AI LABS</span>
              </span>
              <span className="block text-xs text-white/50 tracking-wider">
                BUSINESS SOLUTION
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Transforming enterprises with intelligent AI solutions. From automation to analytics, we help businesses scale efficiently and make data-driven decisions.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@vmkdxailabs.com"
                className="flex items-center gap-3 text-white/70 hover:text-ai-cyan transition-colors group"
              >
                <Mail size={18} className="text-ai-cyan" />
                <span>info@vmkdxailabs.com</span>
              </a>
              <a
                href="tel:+917824030723"
                className="flex items-center gap-3 text-white/70 hover:text-ai-cyan transition-colors"
              >
                <Phone size={18} className="text-ai-cyan" />
                <span>+91-7824030723</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin size={18} className="text-ai-cyan flex-shrink-0 mt-0.5" />
                <span>Dindigul, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 font-display">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-ai-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
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
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-ai-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 font-display">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-ai-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - 3 Columns */}
        <div className="border-t border-white/10 py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <p className="text-sm text-white/40 text-center md:text-left">
            &copy; {new Date().getFullYear()} VMKD X AI LABS Business Solution. All rights reserved.
          </p>
          <div className="flex justify-center">
            <img src={footerBanner} alt="VMKD X AI LABS" className="h-20 object-contain" />
          </div>
          <div className="flex justify-center md:justify-end">
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
