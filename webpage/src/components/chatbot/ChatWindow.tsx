import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useChatbot } from "./hooks/useChatbot";
import { useAudioRecorder } from "./hooks/useAudioRecorder";
import { useAudioPlayer } from "./hooks/useAudioPlayer";

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const { messages, isLoading, language, setLanguage, sendText, sendVoice, clearMessages } =
    useChatbot();
  const { isRecording, duration, startRecording, stopRecording, cancelRecording } =
    useAudioRecorder();
  const { isPlaying, currentUrl, play, pause, stop } = useAudioPlayer();

  const handleStopRecording = async () => {
    const blob = await stopRecording();
    if (blob) {
      stop();
      sendVoice(blob);
    }
  };

  const handleSendText = (text: string) => {
    stop();
    sendText(text);
  };

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[380px] h-[min(560px,calc(100vh-6rem))] flex flex-col bg-background border border-border rounded-2xl overflow-hidden animate-fade-in"
      style={{ boxShadow: "0 8px 40px -8px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)" }}
    >
      <ChatHeader
        language={language}
        onLanguageChange={setLanguage}
        onClose={onClose}
        onClear={clearMessages}
      />

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        isPlaying={isPlaying}
        currentUrl={currentUrl}
        onPlayAudio={play}
        onPauseAudio={pause}
        onQuickAction={handleSendText}
      />

      <ChatInput
        isLoading={isLoading}
        isRecording={isRecording}
        recordingDuration={duration}
        onSendText={handleSendText}
        onStartRecording={startRecording}
        onStopRecording={handleStopRecording}
        onCancelRecording={cancelRecording}
      />
    </div>
  );
};

export default ChatWindow;
