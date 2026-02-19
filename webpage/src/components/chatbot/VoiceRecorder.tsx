import { Mic, Square, X } from "lucide-react";

interface VoiceRecorderProps {
  isRecording: boolean;
  duration: number;
  isLoading: boolean;
  onStart: () => void;
  onStop: () => void;
  onCancel: () => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const VoiceRecorder = ({ isRecording, duration, isLoading, onStart, onStop, onCancel }: VoiceRecorderProps) => {
  if (isRecording) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-medium text-red-400 tabular-nums">
            {formatDuration(duration)}
          </span>
        </div>
        <button
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-white/10 text-foreground/50 hover:text-foreground transition-colors"
          aria-label="Cancel recording"
        >
          <X size={16} />
        </button>
        <button
          onClick={onStop}
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
          aria-label="Stop recording"
        >
          <Square size={14} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onStart}
      disabled={isLoading}
      className="p-2 rounded-full hover:bg-ai-cyan/10 text-foreground/50 hover:text-ai-cyan transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      aria-label="Start voice recording"
    >
      <Mic size={18} />
    </button>
  );
};

export default VoiceRecorder;
