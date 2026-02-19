import { X, RotateCcw } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import type { Language } from "./types";

interface ChatHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onClose: () => void;
  onClear: () => void;
}

const ChatHeader = ({ language, onLanguageChange, onClose, onClear }: ChatHeaderProps) => (
  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-navy via-navy-light to-navy border-b border-ai-cyan/10 rounded-t-2xl">
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ai-cyan/20 to-ai-cyan/5 flex items-center justify-center border border-ai-cyan/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-ai-cyan">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.07A7.001 7.001 0 0 1 7.07 19H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h-1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" fill="currentColor" opacity="0.5"/>
            <circle cx="9" cy="14" r="1.5" fill="currentColor"/>
            <circle cx="15" cy="14" r="1.5" fill="currentColor"/>
          </svg>
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-navy" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white font-display leading-tight">VMKD AI Assistant</h3>
        <p className="text-[11px] text-ai-cyan/70">Online | Ask about our AI solutions</p>
      </div>
    </div>
    <div className="flex items-center gap-0.5">
      <LanguageSelector value={language} onChange={onLanguageChange} />
      <button
        onClick={onClear}
        className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
        aria-label="Clear chat"
        title="Clear chat"
      >
        <RotateCcw size={14} />
      </button>
      <button
        onClick={onClose}
        className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
        aria-label="Close chat"
      >
        <X size={16} />
      </button>
    </div>
  </div>
);

export default ChatHeader;
