import { useState, useRef, useCallback } from "react";

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  currentUrl: string | null;
  play: (url: string) => void;
  pause: () => void;
  stop: () => void;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentUrl(null);
  }, []);

  const play = useCallback(
    (url: string) => {
      // Stop any current playback
      stop();

      const audio = new Audio(url);
      audioRef.current = audio;
      setCurrentUrl(url);

      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentUrl(null);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsPlaying(false);
        setCurrentUrl(null);
        audioRef.current = null;
      };

      audio.play().catch(() => {
        setIsPlaying(false);
        setCurrentUrl(null);
      });
    },
    [stop]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  return { isPlaying, currentUrl, play, pause, stop };
}
