import { Briefcase, MessageSquare, HelpCircle } from "lucide-react";

interface WelcomeMessageProps {
  onQuickAction: (text: string) => void;
}

const quickActions = [
  { icon: Briefcase, label: "What services do you offer?" },
  { icon: MessageSquare, label: "How can I contact you?" },
  { icon: HelpCircle, label: "Tell me about AI chatbots" },
];

const WelcomeMessage = ({ onQuickAction }: WelcomeMessageProps) => (
  <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ai-cyan/15 to-ai-cyan-dark/10 flex items-center justify-center mb-4 border border-ai-cyan/15">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-ai-cyan">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.07A7.001 7.001 0 0 1 7.07 19H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h-1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" fill="currentColor" opacity="0.5"/>
        <circle cx="9" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="14" r="1.5" fill="currentColor"/>
      </svg>
    </div>
    <h3 className="text-base font-semibold text-foreground mb-1 font-display">
      Hi! I'm VMKD AI Assistant
    </h3>
    <p className="text-xs text-muted-foreground mb-6 leading-relaxed max-w-[260px]">
      Ask me anything about our AI solutions and services. I speak Tamil, English & Hindi!
    </p>
    <div className="flex flex-col gap-2 w-full">
      {quickActions.map((action) => (
        <button
          key={action.label}
          onClick={() => onQuickAction(action.label)}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-background border border-border hover:border-ai-cyan/30 hover:bg-ai-cyan/5 transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-ai-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ai-cyan/20 transition-colors">
            <action.icon size={14} className="text-ai-cyan" />
          </div>
          <span className="text-xs text-foreground group-hover:text-ai-cyan transition-colors font-medium">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default WelcomeMessage;
