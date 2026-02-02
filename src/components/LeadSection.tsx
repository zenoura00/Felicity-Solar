"use client";

import LeadForm from "./LeadForm";
import { useLanguage } from "@/lib/language-context";

export default function LeadSection() {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a1628] to-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === "ar" ? "احصل على استشارة مجانية" : "Get a Free Consultation"}
            </h2>
            <p className="text-gray-400 mb-6">
              {language === "ar"
                ? "أرسل لنا بياناتك وسيتواصل معك أحد خبرائنا خلال 24 ساعة لمساعدتك في اختيار النظام المناسب لاحتياجاتك"
                : "Send us your details and one of our experts will contact you within 24 hours to help you choose the right system for your needs"}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                {language === "ar" ? "استشارة مجانية بدون أي التزام" : "Free consultation with no obligation"}
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                {language === "ar" ? "خبراء متخصصون في الطاقة الشمسية" : "Solar energy specialists"}
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                {language === "ar" ? "أسعار تنافسية وضمان شامل" : "Competitive prices and comprehensive warranty"}
              </li>
            </ul>
          </div>

          {/* Lead Form */}
          <div>
            <LeadForm source="Home Page" />
          </div>
        </div>
      </div>
    </section>
  );
}
