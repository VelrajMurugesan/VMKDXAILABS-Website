import { useEffect, useRef } from "react";
import type { ChatMessage } from "./types";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import WelcomeMessage from "./WelcomeMessage";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isPlaying: boolean;
  currentUrl: string | null;
  onPlayAudio: (url: string) => void;
  onPauseAudio: () => void;
  onQuickAction: (text: string) => void;
}

const ChatMessages = ({
  messages,
  isLoading,
  isPlaying,
  currentUrl,
  onPlayAudio,
  onPauseAudio,
  onQuickAction,
}: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      {messages.length === 0 ? (
        <WelcomeMessage onQuickAction={onQuickAction} />
      ) : (
        <div className="flex flex-col gap-3 py-4">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              isPlaying={isPlaying}
              currentUrl={currentUrl}
              onPlayAudio={onPlayAudio}
              onPauseAudio={onPauseAudio}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
