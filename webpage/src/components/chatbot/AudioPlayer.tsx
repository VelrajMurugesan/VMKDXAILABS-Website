import { Volume2, Pause } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  isPlaying: boolean;
  currentUrl: string | null;
  onPlay: (url: string) => void;
  onPause: () => void;
}

const AudioPlayer = ({ audioUrl, isPlaying, currentUrl, onPlay, onPause }: AudioPlayerProps) => {
  const isThisPlaying = isPlaying && currentUrl === audioUrl;

  return (
    <button
      onClick={() => (isThisPlaying ? onPause() : onPlay(audioUrl))}
      className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ai-cyan/10 hover:bg-ai-cyan/20 text-ai-cyan text-xs font-medium transition-colors"
      aria-label={isThisPlaying ? "Pause audio" : "Play audio"}
    >
      {isThisPlaying ? <Pause size={14} /> : <Volume2 size={14} />}
      {isThisPlaying ? "Pause" : "Play reply"}
    </button>
  );
};

export default AudioPlayer;
