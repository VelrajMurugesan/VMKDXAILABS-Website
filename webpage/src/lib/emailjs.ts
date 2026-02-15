import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function sendEmail(templateId: string, templateParams: Record<string, string>) {
  return emailjs.send(SERVICE_ID, templateId, templateParams, { publicKey: PUBLIC_KEY });
}
