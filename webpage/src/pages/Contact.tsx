import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "info@vmkdxailabs.com",
    subtitle: "For general inquiries",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91-7824030723",
    subtitle: "Mon-Sat, 9AM-7PM IST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Dindigul, Tamil Nadu, India",
    subtitle: "Headquarters",
  },
  {
    icon: Clock,
    title: "Response Time",
    details: "Within 24 Hours",
    subtitle: "We reply promptly",
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Thank you for your message! We'll get back to you within 24 hours.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact VMKD X AI LABS | Get AI Automation & Development Support</title>
        <meta name="description" content="Contact VMKD X AI LABS for AI automation, AI agents, business solutions, startup projects, freelancing, and custom AI development. Reach us at info@vmkdxailabs.com." />
        <link rel="canonical" href="https://vmkdxailabs.com/contact" />
      </Helmet>
      <PageHeader
        badge="Contact Us"
        title="Get in Touch"
        subtitle="Have questions about our AI solutions? We're here to help. Reach out and let's start a conversation about transforming your business."
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl card-shadow border border-border text-center hover:border-ai-cyan/30 transition-all group"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-ai-cyan/20 to-ai-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <info.icon className="text-ai-cyan" size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-1 font-display">{info.title}</h3>
                <p className="text-foreground font-medium">{info.details}</p>
                <p className="text-sm text-muted-foreground">{info.subtitle}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-ai-cyan/10 text-ai-cyan text-sm font-medium mb-4">
                Let's Connect
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-display">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you have a question about our services, pricing, or want to discuss how AI can transform your business, our team is ready to help. Fill out the form and we'll be in touch within 24 hours.
              </p>

              <div className="bg-muted/50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4 font-display">What happens next?</h3>
                <ol className="space-y-3">
                  {[
                    "We'll review your message within 24 hours",
                    "A member of our team will reach out to you",
                    "We'll schedule a discovery call to discuss your needs",
                    "You'll receive a customized solution proposal",
                  ].map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-ai-cyan/20 text-ai-cyan text-sm font-medium flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground font-display">Direct Contact:</h3>
                <div className="space-y-3">
                  <a
                    href="mailto:info@vmkdxailabs.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-ai-cyan transition-colors"
                  >
                    <Mail size={18} className="text-ai-cyan" />
                    <span>info@vmkdxailabs.com</span>
                  </a>
                  <a
                    href="tel:+917824030723"
                    className="flex items-center gap-3 text-muted-foreground hover:text-ai-cyan transition-colors"
                  >
                    <Phone size={18} className="text-ai-cyan" />
                    <span>+91-7824030723</span>
                  </a>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin size={18} className="text-ai-cyan flex-shrink-0 mt-0.5" />
                    <span>Dindigul, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>
            </motion.div> 

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl card-shadow border border-border"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc."
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    required
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirement">Your Requirement *</Label>
                  <Textarea
                    id="requirement"
                    placeholder="Tell us about your project or inquiry..."
                    rows={5}
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
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight className="ml-2" size={18} />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your privacy is important to us. We'll never share your information with third parties.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;