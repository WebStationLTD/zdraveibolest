"use client";

import { useState } from "react";
import Swal from "sweetalert2";

// Вашата форма с ID aa9d837 (decimal ID трябва да го намерим или използваме hex)
const URL_FORM =
  "https://zdraveibolest.admin-panels.com/wp-json/contact-form-7/v1/contact-forms/aa9d837/feedback";

export default function PatientJourneyContactForm() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phoneNumber = e.target["phone-number"].value;
    const message = e.target.message.value;

    formData.append("_wpcf7_unit_tag", "aa9d837");
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-tel", phoneNumber);
    formData.append("your-message", message);

    const reqOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const req = await fetch(URL_FORM, reqOptions);
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
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10 rounded-xl">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#04737d] rounded-full animate-spin"></div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={`p-6 md:p-8 ${loading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <div className="space-y-6">
          {/* Име */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Име*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all"
              placeholder="Вашето име"
            />
            {errors["your-name"] && (
              <p className="text-red-600 text-sm mt-1">
                {errors["your-name"]}
              </p>
            )}
          </div>

          {/* Имейл */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Имейл*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
            {errors["your-email"] && (
              <p className="text-red-600 text-sm mt-1">
                {errors["your-email"]}
              </p>
            )}
          </div>

          {/* Телефон */}
          <div>
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Телефон*
            </label>
            <input
              id="phone-number"
              name="phone-number"
              type="tel"
              autoComplete="tel"
              required
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all"
              placeholder="+359 XXX XXX XXX"
            />
            {errors["your-tel"] && (
              <p className="text-red-600 text-sm mt-1">
                {errors["your-tel"]}
              </p>
            )}
          </div>

          {/* Съобщение */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Съобщение
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all resize-none"
              placeholder="Какво бихте искали да ни кажете?"
              defaultValue={""}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#04737d] to-[#035a63] hover:from-[#035a63] hover:to-[#024248] px-6 py-4 text-center text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Изпраща се..." : "Изпрати запитване"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}





