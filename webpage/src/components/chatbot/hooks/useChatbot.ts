import { useState, useCallback, useRef } from "react";
import type { ChatMessage, Language } from "../types";
import { sendChatMessage, sendVoiceMessage } from "../api";

interface UseChatbotReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  language: Language;
  sessionId: string;
  setLanguage: (lang: Language) => void;
  sendText: (text: string) => Promise<void>;
  sendVoice: (audioBlob: Blob) => Promise<void>;
  clearMessages: () => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function useChatbot(): UseChatbotReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("auto");
  const sessionIdRef = useRef(generateId());

  const sendText = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: text,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        // Build history from last 10 messages
        const history = [...messages, userMsg].slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await sendChatMessage({
          message: text,
          language,
          session_id: sessionIdRef.current,
          history,
        });

        const assistantMsg: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: response.reply,
          language: response.language,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (error) {
        const errorMsg: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Sorry, something went wrong. Please try again.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, language]
  );

  const sendVoice = useCallback(
    async (audioBlob: Blob) => {
      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: "🎤 Voice message...",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        console.log("[Chatbot] Sending voice, blob size:", audioBlob.size, "language:", language);
        const response = await sendVoiceMessage(
          audioBlob,
          language,
          sessionIdRef.current
        );
        console.log("[Chatbot] Voice response received:", response.detected_language);

        // Update user message with transcript
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsg.id ? { ...m, content: response.transcript } : m
          )
        );

        const assistantMsg: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: response.reply,
          language: response.detected_language,
          audioUrl: response.audio_url,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (error) {
        // Update user message on error
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsg.id ? { ...m, content: "🎤 (failed to process)" } : m
          )
        );

        const errorMsg: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Sorry, I couldn't process your voice message. Please try again.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [language]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    sessionIdRef.current = generateId();
  }, []);

  return {
    messages,
    isLoading,
    language,
    sessionId: sessionIdRef.current,
    setLanguage,
    sendText,
    sendVoice,
    clearMessages,
  };
}
