import { useState, useRef, useCallback } from "react";

interface UseAudioRecorderReturn {
  isRecording: boolean;
  duration: number;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob | null>;
  cancelRecording: () => void;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resolveRef = useRef<((blob: Blob | null) => void) | null>(null);
  const mimeTypeRef = useRef<string>("audio/webm");

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopTracks = useCallback((recorder: MediaRecorder | null) => {
    try {
      recorder?.stream.getTracks().forEach((t) => t.stop());
    } catch {
      // ignore
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      mimeTypeRef.current = mimeType;

      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeTypeRef.current });
        console.log("[VoiceRecorder] Recording stopped, blob size:", blob.size);
        if (resolveRef.current) {
          resolveRef.current(blob);
          resolveRef.current = null;
        }
        stopTracks(recorder);
      };

      recorder.onerror = (e) => {
        console.error("[VoiceRecorder] MediaRecorder error:", e);
        resolveRef.current?.(null);
        resolveRef.current = null;
        stopTimer();
        stopTracks(recorder);
        setIsRecording(false);
        setDuration(0);
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250);

      setIsRecording(true);
      setDuration(0);

      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setDuration(elapsed);

        // Auto-stop at 30 seconds
        if (elapsed >= 30 && mediaRecorderRef.current?.state === "recording") {
          console.log("[VoiceRecorder] Auto-stop at 30s");
          stopTimer();
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      }, 500);

      console.log("[VoiceRecorder] Recording started");
    } catch (err) {
      console.error("[VoiceRecorder] Failed to start:", err);
      throw new Error("Microphone access denied. Please allow microphone access.");
    }
  }, [stopTimer, stopTracks]);

  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;

      if (!recorder || recorder.state === "inactive") {
        console.warn("[VoiceRecorder] No active recorder to stop");
        resolve(null);
        return;
      }

      stopTimer();
      resolveRef.current = resolve;

      // Set a safety timeout — if onstop doesn't fire in 2s, resolve with what we have
      const safetyTimeout = setTimeout(() => {
        if (resolveRef.current) {
          console.warn("[VoiceRecorder] Safety timeout — resolving with collected chunks");
          const blob = new Blob(chunksRef.current, { type: mimeTypeRef.current });
          resolveRef.current(blob.size > 0 ? blob : null);
          resolveRef.current = null;
          stopTracks(recorder);
        }
      }, 2000);

      const originalResolve = resolveRef.current;
      resolveRef.current = (blob) => {
        clearTimeout(safetyTimeout);
        originalResolve(blob);
      };

      console.log("[VoiceRecorder] Stopping recorder, state:", recorder.state);
      recorder.stop();
      setIsRecording(false);
      setDuration(0);
    });
  }, [stopTimer, stopTracks]);

  const cancelRecording = useCallback(() => {
    console.log("[VoiceRecorder] Cancelled");
    stopTimer();
    resolveRef.current = null;
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
    stopTracks(recorder);
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    setIsRecording(false);
    setDuration(0);
  }, [stopTimer, stopTracks]);

  return { isRecording, duration, startRecording, stopRecording, cancelRecording };
}
