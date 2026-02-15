import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Calendar, Users, Lightbulb, ArrowRight, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { sendEmail } from "@/lib/emailjs";

const benefits = [
  {
    icon: Calendar,
    title: "Free 30-Minute Consultation",
    description: "No obligations – just a focused conversation about your AI needs and goals.",
  },
  {
    icon: Users,
    title: "Expert AI Specialists",
    description: "Meet with our senior AI consultants who understand your industry challenges.",
  },
  {
    icon: Lightbulb,
    title: "Custom Recommendations",
    description: "Receive tailored AI solution recommendations that fit your business needs.",
  },
];

const sessionTopics = [
  "Analysis of your current business processes and pain points",
  "Identification of high-impact AI automation opportunities",
  "Custom AI solution recommendations for your use cases",
  "ROI projections and implementation timeline estimates",
  "Technology stack recommendations and architecture overview",
  "Next steps and implementation roadmap",
];

const BookDemo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      await sendEmail(import.meta.env.VITE_EMAILJS_BOOK_DEMO_TEMPLATE_ID, {
        firstName: data.get("firstName") as string,
        lastName: data.get("lastName") as string,
        email: data.get("email") as string,
        company: data.get("company") as string,
        phone: data.get("phone") as string,
        role: data.get("role") as string,
        message: data.get("message") as string,
      });
      toast.success("Thank you! We'll contact you within 24 hours to schedule your consultation.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again or email us directly at info@vmkdxailabs.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Book a Free AI Demo | AI Automation Consultation — VMKD X AI LABS"
        description="Book a free AI consultation with VMKD X AI LABS. Get a personalized demo of our AI automation, AI agents, chatbots, and business solutions tailored to your needs."
        canonical="https://vmkdxailabs.com/book-demo"
        keywords="free AI consultation, AI automation demo, book AI demo, AI business consultation"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vmkdxailabs.com/" },
            { "@type": "ListItem", "position": 2, "name": "Book Demo", "item": "https://vmkdxailabs.com/book-demo" }
          ]
        }}
      />
      <PageHeader
        badge="Book a Demo"
        title="Schedule Your Free AI Consultation"
        subtitle="Discover how VMKD X AI LABS can transform your business operations with intelligent automation and AI-powered solutions tailored to your needs."
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-4">
                Why Book a Demo
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 font-display">
                What You'll Get
              </h2>
              <div className="space-y-6 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ai-cyan/20 to-ai-purple/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="text-ai-cyan" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 font-display">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4 font-display">In Your Demo Session, We'll Cover:</h3>
                <ul className="space-y-3">
                  {sessionTopics.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="text-ai-cyan mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground font-display">Prefer to Talk First?</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+917824030723"
                    className="flex items-center gap-3 text-muted-foreground hover:text-ai-cyan transition-colors"
                  >
                    <Phone size={18} className="text-ai-cyan" />
                    <span>+91-7824030723</span>
                  </a>
                  <a
                    href="mailto:info@vmkdxailabs.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-ai-cyan transition-colors"
                  >
                    <Mail size={18} className="text-ai-cyan" />
                    <span>info@vmkdxailabs.com</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              id="request-demo" 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl card-shadow border border-border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2 font-display">
                Request Your Demo
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill in your details and we'll reach out within 24 hours to schedule your consultation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="bg-background"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    name="role"
                    placeholder="CEO, CTO, Manager, etc."
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">What challenges are you looking to solve with AI? *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your business challenges, goals, and what you're hoping to achieve with AI..."
                    rows={4}
                    required
                    className="bg-background resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-ai-cyan hover:bg-ai-cyan-dark text-navy font-semibold btn-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Book My Free Demo"}
                  <ArrowRight className="ml-2" size={18} />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to our privacy policy. We'll never share your information with third parties.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookDemo;