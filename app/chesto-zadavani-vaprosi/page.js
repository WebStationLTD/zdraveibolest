"use client";

import { useState, useEffect } from "react";
import { ChevronDownIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { faqSections } from "../../lib/faq-data";
// Custom Accordion Item Component
function AccordionItem({ question, answer, accentColor, isOpen, onClick }) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-2 ${
        isOpen ? "border-[#04737d]/30" : "border-transparent"
      }`}
    >
      <button 
        onClick={onClick}
        className="flex items-center justify-between w-full px-6 py-5 text-left"
      >
        <span className={`font-semibold text-base md:text-lg pr-4 ${
          isOpen ? accentColor : "text-gray-900"
        }`}>
          {question}
        </span>
        <ChevronDownIcon 
          className={`h-6 w-6 flex-shrink-0 transition-all duration-300 ${
            isOpen 
              ? `rotate-180 ${accentColor}` 
              : "text-gray-400"
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <div className="pt-2 border-t border-gray-100">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    fetch("https://zdraveibolest.admin-panels.com/wp-json/wp/v2/contacts?_fields=acf")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) setContactInfo(data[0].acf);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#04737d] via-[#035a63] to-[#024248] py-16 md:py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#fd9300] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto w-[95%] md:w-[80%] text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
            Често задавани въпроси
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Отговори на най-важните въпроси за клиничните изпитвания. Прочетете внимателно и се свържете с нас, ако имате допълнителни въпроси.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-[95%] md:w-[80%]">
          {/* Section Tabs/Buttons */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
            {faqSections.map((section, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveSection(index);
                  setOpenQuestionIndex(null); // Reset open question when changing section
                }}
                className={`px-6 py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 ${
                  activeSection === index
                    ? `${section.color} text-white shadow-xl scale-105`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Active Section Questions */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqSections[activeSection].questions.map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  accentColor={faqSections[activeSection].accentColor}
                  isOpen={openQuestionIndex === index}
                  onClick={() => setOpenQuestionIndex(openQuestionIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto w-[95%] md:w-[80%]">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Не намирате отговора, който търсите?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Ако не намирате нужната информация, не се колебайте да се свържете с нас директно. Нашият екип е на ваше разположение да отговори на всички ваши въпроси.
              </p>
              
              {/* Contact Options */}
              {(() => {
                const phone = contactInfo?.phone_number || null;
                const emails = contactInfo?.email
                  ? contactInfo.email.split(/[,;\n]+/).map((e) => e.trim()).filter(Boolean)
                  : [];
                const totalItems = (phone ? 1 : 0) + emails.length;
                const colClass = totalItems >= 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";
                return (
                  <div className={`grid ${colClass} gap-6 mb-8`}>
                    {/* Phone */}
                    <a
                      href={`tel:${phone || ""}`}
                      className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#04737d] to-[#035a63] rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <PhoneIcon className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-white/80 text-sm mb-2 font-medium">Обадете ни се</p>
                      <p className="text-white text-lg font-bold">{phone || "—"}</p>
                    </a>

                    {/* Emails */}
                    {emails.map((email, i) => (
                      <a
                        key={i}
                        href={`mailto:${email}`}
                        className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#fd9300] to-[#e48400] rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                      >
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <EnvelopeIcon className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-white/80 text-sm mb-2 font-medium">Пишете ни</p>
                        <p className="text-white text-base font-bold break-all text-center">{email}</p>
                      </a>
                    ))}

                    {/* Fallback if no contact info loaded yet */}
                    {emails.length === 0 && (
                      <a
                        href="mailto:"
                        className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#fd9300] to-[#e48400] rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                      >
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <EnvelopeIcon className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-white/80 text-sm mb-2 font-medium">Пишете ни</p>
                        <p className="text-white text-base font-bold">—</p>
                      </a>
                    )}
                  </div>
                );
              })()}

              {/* CTA Button */}
              <Link
                href="/patiat-na-patsienta"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#04737d] to-[#035a63] hover:from-[#035a63] hover:to-[#024248] text-white text-base md:text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                Научете повече за участието
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Illustration */}
      <div className="relative -mt-1">
        <img
          src="/Footer Illustration.svg"
          alt="Медицински специалисти"
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
    </div>
  );
}

