import type { ChatRequest, ChatResponse, VoiceResponse, Language, LeadData } from "./types";

const API_BASE = "/api";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    if (res.status === 429) throw new Error("Too many requests. Please wait a moment.");
    throw new Error("Failed to get response. Please try again.");
  }

  const data: ChatResponse = await res.json();

  // Send lead email via EmailJS if lead data is present
  if (data.lead) {
    sendLeadEmail(data.lead, "text").catch(() => {});
  }

  return data;
}

export async function sendVoiceMessage(
  audioBlob: Blob,
  language: Language,
  sessionId: string
): Promise<VoiceResponse> {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");
  formData.append("language", language);
  formData.append("session_id", sessionId);

  const res = await fetch(`${API_BASE}/voice`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    if (res.status === 429) throw new Error("Too many requests. Please wait a moment.");
    throw new Error("Failed to process voice. Please try again.");
  }

  const data: VoiceResponse = await res.json();

  // Send lead email via EmailJS if lead data is present
  if (data.lead) {
    sendLeadEmail(data.lead, "voice").catch(() => {});
  }

  return data;
}

async function sendLeadEmail(lead: LeadData, source: string): Promise<void> {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_CONTACT_TEMPLATE_ID) {
    console.warn("EmailJS not configured, lead email not sent:", lead);
    return;
  }

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_CONTACT_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          name: lead.name,
          email: lead.email,
          company: "",
          phone: lead.mobile,
          subject: `AI Chatbot Lead (${source.toUpperCase()})`,
          requirement: lead.requirement,
        },
      }),
    });

    if (res.ok) {
      console.log("Lead email sent successfully via EmailJS");
    } else {
      console.error("EmailJS error:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Failed to send lead email:", err);
  }
}
