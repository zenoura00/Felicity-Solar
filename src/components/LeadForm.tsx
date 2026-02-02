"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { trackFormSubmit } from "@/lib/analytics";

interface LeadFormProps {
  source: string; // Where the lead came from (product name, page, etc.)
  productName?: string;
  compact?: boolean;
}

export default function LeadForm({ source, productName, compact = false }: LeadFormProps) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "leads",
          ...formData,
          source,
          productName: productName || "",
          timestamp: new Date().toISOString(),
        }).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", message: "" });
        trackFormSubmit(source);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-500/10 border border-green-500/30 rounded-xl ${compact ? "p-4" : "p-6"} text-center`}>
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">
          {language === "ar" ? "تم إرسال طلبك بنجاح!" : "Your request has been sent!"}
        </h3>
        <p className="text-gray-400 text-sm">
          {language === "ar" ? "سنتواصل معك قريباً" : "We will contact you soon"}
        </p>
      </div>
    );
  }

  return (
    <form
      name="leads"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={`bg-gradient-to-b from-white/10 to-white/5 rounded-xl ${compact ? "p-4" : "p-6"} border border-white/10`}
    >
      <input type="hidden" name="form-name" value="leads" />
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="productName" value={productName || ""} />
      <p className="hidden">
        <label>
          Don't fill this out: <input name="bot-field" />
        </label>
      </p>

      <h3 className={`${compact ? "text-base" : "text-lg"} font-bold text-white mb-4`}>
        {language === "ar" ? "احصل على عرض سعر" : "Get a Quote"}
      </h3>

      <div className="space-y-3">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={language === "ar" ? "الاسم *" : "Name *"}
            className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder={language === "ar" ? "رقم الهاتف *" : "Phone *"}
            className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {!compact && (
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder={language === "ar" ? "رسالتك (اختياري)" : "Your message (optional)"}
              className="w-full px-4 py-2.5 bg-black/50 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {language === "ar" ? "إرسال الطلب" : "Send Request"}
        </button>
      </div>

      <p className="text-gray-500 text-xs mt-3 text-center">
        {language === "ar" ? "سنتواصل معك خلال 24 ساعة" : "We will contact you within 24 hours"}
      </p>
    </form>
  );
}
