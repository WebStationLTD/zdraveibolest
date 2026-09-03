"use client";

import { useState } from "react";
import Swal from "sweetalert2";

const URL_FORM =
  "https://zdraveibolest.admin-panels.com/wp-json/contact-form-7/v1/contact-forms/6/feedback";

const fieldClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all";

export default function ContactForm() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const phoneNumber = e.target["phone-number"].value;
    const message = e.target.message.value;

    formData.append("_wpcf7_unit_tag", "6");
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-subject", subject);
    formData.append("tel-603", phoneNumber);
    formData.append("your-message", message);

    try {
      const req = await fetch(URL_FORM, {
        method: "POST",
        body: formData,
      });
      const response = await req.json();

      if (response.status === "validation_failed") {
        let fieldErrors = {};
        response.invalid_fields.forEach((field) => {
          fieldErrors[field.field] = field.message;
        });
        setErrors(fieldErrors);
      } else if (response.status === "mail_sent") {
        Swal.fire({
          icon: "success",
          title: "Успешно изпратено!",
          text: "Очаквайте отговор скоро : )",
          timer: 4000,
        });
        setErrors({});
        e.target.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Грешка при изпращане!",
          text: "Моля, опитайте отново по-късно.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Неуспешно изпращане!",
        text: "Проверете връзката с интернет и опитайте отново.",
      });
    }

    setLoading(false);
  }

  return (
    <div className="relative px-6 pt-16 pb-20 sm:pb-24 lg:px-8 lg:py-20">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#04737d] rounded-full animate-spin" />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`mx-auto max-w-xl lg:mr-0 lg:max-w-lg ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Изпратете запитване
            </h2>
            <div className="w-12 h-1 bg-[#04737d] rounded-full" />
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Име*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Вашето име"
                className={fieldClass}
              />
              {errors["your-name"] && (
                <p className="text-red-600 text-sm mt-1">{errors["your-name"]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Имейл*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                className={fieldClass}
              />
              {errors["your-email"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["your-email"]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Телефон*
              </label>
              <input
                id="phone-number"
                name="phone-number"
                type="tel"
                autoComplete="tel"
                placeholder="+359 ..."
                className={fieldClass}
              />
              {errors["tel-603"] && (
                <p className="text-red-600 text-sm mt-1">{errors["tel-603"]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Тема*
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Тема на запитването"
                className={fieldClass}
              />
              {errors["your-subject"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["your-subject"]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Съобщение
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Напишете съобщението си тук..."
                className={`${fieldClass} resize-none`}
                defaultValue={""}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              Изпрати запитване
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
