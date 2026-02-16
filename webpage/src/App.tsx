import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import WhyVMKD from "./pages/WhyHantas";
import UseCases from "./pages/UseCases";
import BookDemo from "./pages/BookDemo";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BlogList from "./pages/blog/BlogList";
import BlogPost from "./pages/blog/BlogPost";

const queryClient = new QueryClient();

function GARouteTracker() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-TFV1B1S58Q", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GARouteTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/why-vmkd" element={<WhyVMKD />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
