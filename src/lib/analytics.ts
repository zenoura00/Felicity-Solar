// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Track WhatsApp click event
export const trackWhatsAppClick = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: "WhatsApp Button",
      value: 1,
    });
  }
};

// Track Phone click event
export const trackPhoneClick = (label: string = "Phone Button") => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "phone_click", {
      event_category: "engagement",
      event_label: label,
      value: 1,
    });
  }
};

// Track form submission
export const trackFormSubmit = (formName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_submit", {
      event_category: "engagement",
      event_label: formName,
      value: 1,
    });
  }
};
