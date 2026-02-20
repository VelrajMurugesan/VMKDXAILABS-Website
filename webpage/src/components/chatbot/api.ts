import type { ChatRequest, ChatResponse, VoiceResponse, Language, LeadData } from "./types";
import { sendEmail } from "@/lib/emailjs";

const API_BASE = "/api";

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
    sendLeadEmail(data.lead, "text").catch((err) =>
      console.error("Lead email failed:", err)
    );
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
    sendLeadEmail(data.lead, "voice").catch((err) =>
      console.error("Lead email failed:", err)
    );
  }

  return data;
}

async function sendLeadEmail(lead: LeadData, source: string): Promise<void> {
  const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;

  await sendEmail(templateId, {
    name: lead.name,
    email: lead.email,
    company: "",
    phone: lead.mobile,
    subject: `AI Chatbot Lead (${source.toUpperCase()})`,
    requirement: lead.requirement,
  });

  console.log("Lead email sent successfully via EmailJS");
}
