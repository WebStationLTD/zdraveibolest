"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function StickyQuickRegister() {
  const { isAuthenticated, quickRegister, loading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(5); // For closing countdown
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    privacy_consent: false,
  });

  // Countdown effect
  useEffect(() => {
    let timer;
    if (success && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [success, countdown]);

  // Close effect (separate from countdown to avoid setState in render)
  useEffect(() => {
    if (success && countdown === 0) {
      setIsOpen(false);
    }
  }, [success, countdown]);

  // Don't show if user is already authenticated
  if (isAuthenticated || authLoading) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) return 'Имейлът е задължителен';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Невалиден имейл адрес';
    if (!formData.password) return 'Паролата е задължителна';
    if (formData.password.length < 6) return 'Паролата трябва да е минимум 6 символа';
    if (!formData.privacy_consent) return 'Трябва да се съгласите с политиката за поверителност';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await quickRegister({
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (result.success) {
        setSuccess(true);
        // No manual close here, useEffect handles it
      } else {
        setError(result.error || 'Регистрацията не беше успешна');
      }
    } catch (err) {
      setError('Възникна грешка. Моля, опитайте отново.');
    } finally {
      setLoading(false);
    }
  };

  // Don't render if closed
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div 
        className={`bg-white rounded-r-2xl shadow-2xl border border-l-0 border-gray-200 transition-all duration-300 ${
          isMinimized ? 'w-12' : 'w-[280px]'
        }`}
      >
        {/* Minimize/Maximize Toggle */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute -right-3 top-14 w-6 h-6 bg-[#04737d] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#035057] transition-colors"
          aria-label={isMinimized ? 'Разгъни' : 'Сгъни'}
        >
          {isMinimized ? (
            <ChevronDownIcon className="w-4 h-4 rotate-[-90deg]" />
          ) : (
            <ChevronUpIcon className="w-4 h-4 rotate-[-90deg]" />
          )}
        </button>

        {isMinimized ? (
          // Minimized State - Vertical Text
          <div className="py-8 px-2 flex flex-col items-center justify-center">
            <span 
              className="text-[#04737d] font-semibold text-sm whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              Бърза регистрация
            </span>
          </div>
        ) : (
          // Expanded State
          <div className="p-5">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Затвори"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-4 pr-6">
              <h3 className="text-base font-bold text-gray-900 leading-tight">
                Намерете клиничното изпитване за вас или помогнете на други хора:
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Регистрирайте се през кратка контактна форма, а ние ще се свържем с Вас.
              </p>
            </div>

            {success ? (
              // Success State
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">
                  Регистрацията е успешна! 🎉
                </h4>
                <p className="text-xs text-gray-600 mb-4">
                  Вашият акаунт беше създаден успешно.
                </p>
                <div className="bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-lg relative mb-4">
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="block sm:inline text-xs">
                      Изпратихме ви welcome email с данни за вход и полезна информация.
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Формата ще се затвори след {countdown} секунди...
                </p>
              </div>
            ) : (
              // Form
              <form onSubmit={handleSubmit} className="space-y-3">
                {error && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-600">{error}</p>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label htmlFor="quick_email" className="block text-xs font-medium text-gray-700 mb-1">
                    Имейл<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="quick_email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="quick_phone" className="block text-xs font-medium text-gray-700 mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="quick_phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent"
                    placeholder="+359 888 123 456"
                    autoComplete="tel"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="quick_password" className="block text-xs font-medium text-gray-700 mb-1">
                    Парола<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="quick_password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent pr-10"
                      placeholder="Мин. 6 символа"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Privacy Consent */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="quick_privacy"
                    name="privacy_consent"
                    checked={formData.privacy_consent}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 text-[#04737d] border-gray-300 rounded focus:ring-[#04737d] cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="quick_privacy" className="text-[10px] text-gray-500 leading-tight">
                    Съгласен съм личните ми данни да бъдат обработвани за целите на регистрация в базата данни за клинични проучвания, съгласно{' '}
                    <Link href="/privacy-policy" className="text-[#04737d] hover:underline">
                      Политика за поверителност
                    </Link>.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#f5a524] hover:bg-[#e09000] text-white font-semibold rounded-full transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Регистрация...' : 'Регистрация'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

