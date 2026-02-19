import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 sm:right-6 z-[60] w-14 h-14 rounded-full bg-ai-cyan hover:bg-ai-cyan-dark text-navy-dark shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group btn-glow"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X size={22} className="transition-transform duration-200" />
        ) : (
          <MessageCircle size={22} className="transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>
    </>
  );
};

export default ChatWidget;
