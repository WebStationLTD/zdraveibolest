"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "../../services/auth";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const key = searchParams.get("key") || "";
  const login = searchParams.get("login") || "";

  const [formData, setFormData] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  useEffect(() => {
    if (!key || !login) {
      setInvalidLink(true);
    }
  }, [key, login]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "Моля въведете нова парола";
    } else if (formData.password.length < 6) {
      newErrors.password = "Паролата трябва да е поне 6 символа";
    }
    if (!formData.confirm) {
      newErrors.confirm = "Моля потвърдете паролата";
    } else if (formData.password !== formData.confirm) {
      newErrors.confirm = "Паролите не съвпадат";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      await resetPassword(key, login, formData.password);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3500);
    } catch (err) {
      setErrors({ general: err.message || "Грешка при смяна на паролата. Линкът може да е изтекъл." });
    } finally {
      setLoading(false);
    }
  };

  if (invalidLink) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Невалиден линк</h3>
        <p className="text-sm text-gray-600">
          Линкът за нулиране на паролата е невалиден или липсва. Моля, опитайте отново.
        </p>
        <Link
          href="/login"
          className="inline-block mt-2 px-6 py-2.5 bg-[#04737d] hover:bg-[#035057] text-white text-sm font-medium rounded-lg transition-colors"
        >
          Обратно към вход
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Паролата е сменена!</h3>
        <p className="text-sm text-gray-600">
          Вашата парола беше успешно нулирана. Пренасочваме ви към страницата за вход...
        </p>
        <Link
          href="/login"
          className="inline-block mt-2 px-6 py-2.5 bg-[#04737d] hover:bg-[#035057] text-white text-sm font-medium rounded-lg transition-colors"
        >
          Вход
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Нова парола <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border ${
            errors.password ? "border-red-300" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
          placeholder="Въведете нова парола"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
          Потвърди парола <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="confirm"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border ${
            errors.confirm ? "border-red-300" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
          placeholder="Потвърдете новата парола"
        />
        {errors.confirm && <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Запазване..." : "Запази новата парола"}
      </button>

      <p className="text-center text-sm text-gray-600">
        <Link href="/login" className="text-[#04737d] hover:text-[#035057] font-medium">
          Обратно към вход
        </Link>
      </p>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Нова парола</h2>
          <p className="text-gray-600">Задайте нова парола за вашия акаунт</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <Suspense fallback={<div className="text-center text-gray-500 py-8">Зареждане...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
