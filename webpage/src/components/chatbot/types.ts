export type Language = "auto" | "ta" | "en" | "hi";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  language?: string;
  audioUrl?: string;
  timestamp: number;
}

export interface ChatRequest {
  message: string;
  language: Language;
  session_id: string;
  history: { role: "user" | "assistant"; content: string }[];
}

export interface LeadData {
  name: string;
  mobile: string;
  email: string;
  requirement: string;
}

export interface ChatResponse {
  reply: string;
  language: string;
  lead?: LeadData | null;
}

export interface VoiceResponse {
  transcript: string;
  reply: string;
  audio_url: string;
  detected_language: string;
  lead?: LeadData | null;
}
