import { useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import VoiceRecorder from "./VoiceRecorder";

interface ChatInputProps {
  isLoading: boolean;
  isRecording: boolean;
  recordingDuration: number;
  onSendText: (text: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onCancelRecording: () => void;
}

const ChatInput = ({
  isLoading,
  isRecording,
  recordingDuration,
  onSendText,
  onStartRecording,
  onStopRecording,
  onCancelRecording,
}: ChatInputProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSendText(trimmed);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-card/50 px-3 py-2.5">
      <div className="flex items-end gap-1.5">
        <VoiceRecorder
          isRecording={isRecording}
          duration={recordingDuration}
          isLoading={isLoading}
          onStart={onStartRecording}
          onStop={onStopRecording}
          onCancel={onCancelRecording}
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isRecording ? "Recording..." : "Type a message..."}
          disabled={isLoading || isRecording}
          rows={1}
          className="flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-ai-cyan/40 focus:ring-1 focus:ring-ai-cyan/20 disabled:opacity-40 max-h-[80px] overflow-y-auto transition-colors"
          style={{ minHeight: "36px" }}
        />

        <button
          onClick={handleSend}
          disabled={!text.trim() || isLoading || isRecording}
          className="p-2 rounded-xl bg-ai-cyan hover:bg-ai-cyan-dark text-navy-dark transition-all disabled:opacity-20 disabled:cursor-not-allowed flex-shrink-0 hover:shadow-md"
          aria-label="Send message"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
