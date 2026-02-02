// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Sheets Web App URL - Replace with your actual URL
const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || "";

// Get device type
const getDeviceType = (): string => {
  if (typeof window === "undefined") return "unknown";
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
    return "mobile";
  }
  if (/tablet|ipad/i.test(userAgent)) {
    return "tablet";
  }
  return "desktop";
};

// Get current page path
const getCurrentPage = (): string => {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
};

// Send event to Google Sheets
const sendToGoogleSheets = async (eventData: {
  event: string;
  page: string;
  timestamp: string;
  device: string;
  source: string;
  label?: string;
}) => {
  if (!GOOGLE_SHEETS_URL) {
    console.warn("Google Sheets URL not configured");
    return;
  }

  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
  }
};

// Track WhatsApp click event
export const trackWhatsAppClick = () => {
  const eventData = {
    event: "whatsapp_click",
    page: getCurrentPage(),
    timestamp: new Date().toISOString(),
    device: getDeviceType(),
    source: "website",
  };

  // Send to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: "WhatsApp Button",
      value: 1,
    });
  }

  // Send to Google Sheets
  sendToGoogleSheets(eventData);
};

// Track Phone click event
export const trackPhoneClick = (label: string = "Phone Button") => {
  const eventData = {
    event: "phone_click",
    page: getCurrentPage(),
    timestamp: new Date().toISOString(),
    device: getDeviceType(),
    source: "website",
    label,
  };

  // Send to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "phone_click", {
      event_category: "engagement",
      event_label: label,
      value: 1,
    });
  }

  // Send to Google Sheets
  sendToGoogleSheets(eventData);
};

// Track form submission
export const trackFormSubmit = (formName: string) => {
  const eventData = {
    event: "form_submit",
    page: getCurrentPage(),
    timestamp: new Date().toISOString(),
    device: getDeviceType(),
    source: "website",
    label: formName,
  };

  // Send to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_submit", {
      event_category: "engagement",
      event_label: formName,
      value: 1,
    });
  }

  // Send to Google Sheets
  sendToGoogleSheets(eventData);
};

// Track page view
export const trackPageView = (pageName: string) => {
  const eventData = {
    event: "page_view",
    page: getCurrentPage(),
    timestamp: new Date().toISOString(),
    device: getDeviceType(),
    source: "website",
    label: pageName,
  };

  // Send to Google Sheets
  sendToGoogleSheets(eventData);
};

// Track product view
export const trackProductView = (productName: string) => {
  const eventData = {
    event: "product_view",
    page: getCurrentPage(),
    timestamp: new Date().toISOString(),
    device: getDeviceType(),
    source: "website",
    label: productName,
  };

  // Send to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      event_category: "ecommerce",
      event_label: productName,
      value: 1,
    });
  }

  // Send to Google Sheets
  sendToGoogleSheets(eventData);
};
