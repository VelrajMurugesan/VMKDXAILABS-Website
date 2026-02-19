import type { Language } from "./types";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface LanguageSelectorProps {
  value: Language;
  onChange: (lang: Language) => void;
}

const languages: { value: Language; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "ta", label: "Tamil" },
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
];

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = languages.find((l) => l.value === value) || languages[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors text-[11px]"
        aria-label="Select language"
      >
        <Globe size={12} />
        <span>{current.label}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 min-w-[110px]">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => {
                onChange(lang.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-ai-cyan/10 transition-colors ${
                value === lang.value ? "text-ai-cyan bg-ai-cyan/5 font-medium" : "text-foreground"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
