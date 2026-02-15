import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoLight from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Solutions", path: "/solutions" },
  { name: "Use Cases", path: "/use-cases" },
  { name: "Why Us", path: "/why-vmkd" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy/95 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src={logoLight}
              alt="VMKD X AI LABS"
              className="h-10 w-auto dark:hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <motion.img
              src={logoDark}
              alt="VMKD X AI LABS"
              className="h-10 w-auto hidden dark:block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-white font-display">
                VMKD X <span className="text-ai-cyan">AI LABS</span>
              </span>
              <span className="block text-[10px] text-white/60 -mt-1 tracking-wider">
                BUSINESS SOLUTION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-ai-cyan bg-ai-cyan/10"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+917824030723"
              className="flex items-center gap-2 text-sm text-white/80 hover:text-ai-cyan transition-colors"
            >
              <Phone size={16} />
              <span className="hidden xl:inline">+91-7824030723</span>
            </a>
            <Link to="/book-demo">
              <Button className="bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold btn-glow px-6">
                Book Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy/98 backdrop-blur-xl border-b border-white/10"
          >
            <nav className="container mx-auto container-padding py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    isActive(item.path)
                      ? "text-ai-cyan bg-ai-cyan/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-white/10 space-y-3">
                <a
                  href="tel:+917824030723"
                  className="flex items-center gap-2 text-sm text-white/80 px-4"
                >
                  <Phone size={16} className="text-ai-cyan" />
                  +91-7824030723
                </a>
                <Link to="/book-demo" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold btn-glow">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
