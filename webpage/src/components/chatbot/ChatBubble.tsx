import ReactMarkdown from "react-markdown";
import type { ChatMessage } from "./types";
import AudioPlayer from "./AudioPlayer";

interface ChatBubbleProps {
  message: ChatMessage;
  isPlaying: boolean;
  currentUrl: string | null;
  onPlayAudio: (url: string) => void;
  onPauseAudio: () => void;
}

const BotAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ai-cyan/30 to-ai-cyan-dark/30 flex items-center justify-center flex-shrink-0">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-ai-cyan">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.07A7.001 7.001 0 0 1 7.07 19H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h-1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
        fill="currentColor"
        opacity="0.5"
      />
      <circle cx="9" cy="14" r="1.5" fill="currentColor" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" />
    </svg>
  </div>
);

const ChatBubble = ({ message, isPlaying, currentUrl, onPlayAudio, onPauseAudio }: ChatBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2 px-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && <BotAvatar />}

      <div className={`max-w-[85%] ${isUser ? "ml-auto" : "mr-auto"}`}>
        <div
          className={`px-4 py-3 text-[13px] leading-relaxed break-words ${
            isUser
              ? "bg-ai-cyan text-navy-dark rounded-2xl rounded-tr-sm font-medium"
              : "bg-card border border-border text-foreground rounded-2xl rounded-tl-sm shadow-sm"
          }`}
        >
          {isUser ? (
            <span className="whitespace-pre-wrap">{message.content}</span>
          ) : (
            <div className="chatbot-markdown">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-ai-cyan">{children}</strong>
                  ),
                  ul: ({ children }) => <ul className="mb-2 last:mb-0 space-y-1.5">{children}</ul>,
                  ol: ({ children }) => (
                    <ol className="mb-2 last:mb-0 space-y-1.5 list-decimal list-inside">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan/60 mt-1.5 flex-shrink-0" />
                      <span>{children}</span>
                    </li>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ai-cyan underline underline-offset-2 hover:text-ai-cyan-light transition-colors"
                    >
                      {children}
                    </a>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-base font-bold text-foreground mb-2">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-sm font-bold text-foreground mb-1.5">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-semibold text-foreground mb-1">{children}</h3>
                  ),
                  code: ({ children }) => (
                    <code className="px-1.5 py-0.5 bg-muted/50 rounded text-xs font-mono text-ai-cyan">
                      {children}
                    </code>
                  ),
                  hr: () => <hr className="my-2 border-border/50" />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {message.audioUrl && !isUser && (
          <AudioPlayer
            audioUrl={message.audioUrl}
            isPlaying={isPlaying}
            currentUrl={currentUrl}
            onPlay={onPlayAudio}
            onPause={onPauseAudio}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
