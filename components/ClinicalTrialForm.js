"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

// Bulgarian cities list
const BULGARIAN_CITIES = [
  'София', 'Пловдив', 'Варна', 'Бургас', 'Русе', 'Стара Загора', 'Плевен', 
  'Сливен', 'Добрич', 'Шумен', 'Перник', 'Хасково', 'Враца', 'Кюстендил',
  'Благоевград', 'Пазарджик', 'Велико Търново', 'Ямбол', 'Габрово', 'Видин',
  'Монтана', 'Ловеч', 'Силистра', 'Разград', 'Търговище', 'Смолян', 'Кърджали'
].sort((a, b) => a.localeCompare(b, 'bg'));

// Smoking status options
const SMOKING_OPTIONS = [
  { value: '', label: 'Изберете' },
  { value: 'never', label: 'Никога не съм пушил/а' },
  { value: 'former', label: 'Бивш пушач' },
  { value: 'current', label: 'Пуша в момента' },
  { value: 'occasional', label: 'Пуша рядко/социално' },
];

// Gender options
const GENDER_OPTIONS = [
  { value: '', label: 'Изберете' },
  { value: 'male', label: 'Мъж' },
  { value: 'female', label: 'Жена' },
  { value: 'other', label: 'Друго' },
  { value: 'prefer_not_to_say', label: 'Предпочитам да не отговарям' },
];

export default function ClinicalTrialForm() {
  const { user, isAuthenticated, submitClinicalInquiry, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    birth_year: '',
    gender: '',
    city: '',
    current_conditions: '',
    current_medications: '',
    smoking_status: '',
    additional_info: '',
    privacy_consent: false,
  });

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        first_name: user.first_name || user.firstName || '',
        last_name: user.last_name || user.lastName || '',
        email: user.email || user.user_email || '',
        phone: user.phone || user.user_phone || '',
        birth_year: user.birth_year || '',
        gender: user.gender || '',
        city: user.city || '',
        current_conditions: user.current_conditions || '',
        current_medications: user.current_medications || '',
        smoking_status: user.smoking_status || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.first_name.trim()) return 'Името е задължително';
    if (!formData.last_name.trim()) return 'Фамилията е задължителна';
    if (!formData.email.trim()) return 'Имейлът е задължителен';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Невалиден имейл адрес';
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
      // First update user profile with the new fields
      const profileResult = await updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        birth_year: formData.birth_year,
        gender: formData.gender,
        city: formData.city,
        current_conditions: formData.current_conditions,
        current_medications: formData.current_medications,
        smoking_status: formData.smoking_status,
        additional_info: formData.additional_info,
      });

      if (!profileResult.success) {
        throw new Error(profileResult.error || 'Грешка при обновяване на профила');
      }

      // Then submit the clinical trial inquiry (sends email to admin)
      const inquiryResult = await submitClinicalInquiry(formData);

      if (inquiryResult.success) {
        setSuccess(true);
      } else {
        throw new Error(inquiryResult.error || 'Грешка при изпращане на заявката');
      }
    } catch (err) {
      setError(err.message || 'Възникна грешка. Моля, опитайте отново.');
    } finally {
      setLoading(false);
    }
  };

  // Don't show form if user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Don't show form if profile is already completed (unless success is true from current session)
  if (!success && user?.profile_completed) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 shadow-lg border border-blue-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Профилът Ви е завършен
          </h3>
          <p className="text-gray-600 mb-6">
            Вече сте попълнили подробния си профил. Благодарим Ви за предоставената информация!
          </p>
          <p className="text-sm text-gray-500">
            Ако искате да актуализирате информацията си, моля свържете се с нас.
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Благодарим Ви!
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Вашата заявка за клинично изпитване е изпратена успешно. 
            Ще се свържем с Вас в най-кратък срок.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Намерете клиничното изпитване
        </h2>
        <div className="w-16 h-1 bg-[#04737d] mx-auto rounded-full"></div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields - Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Име
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white"
              placeholder="Вашето име"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Фамилия
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white"
              placeholder="Вашата фамилия"
            />
          </div>
        </div>

        {/* Phone & Email - Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white"
              placeholder="+359 888 123 456"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Имейл
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Birth Year */}
        <div>
          <label htmlFor="birth_year" className="block text-sm font-medium text-gray-700 mb-1.5">
            Година на раждане
          </label>
          <input
            type="number"
            id="birth_year"
            name="birth_year"
            value={formData.birth_year}
            onChange={handleChange}
            min="1920"
            max={new Date().getFullYear()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white"
            placeholder="1985"
          />
        </div>

        {/* Gender & City - Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1.5">
              Пол
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
            >
              {GENDER_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
              Град
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
            >
              <option value="">Изберете</option>
              {BULGARIAN_CITIES.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Conditions */}
        <div>
          <label htmlFor="current_conditions" className="block text-sm font-medium text-gray-700 mb-1.5">
            Настоящи заболявания
          </label>
          <input
            type="text"
            id="current_conditions"
            name="current_conditions"
            value={formData.current_conditions}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white"
            placeholder="Напр. диабет тип 2, хипертония..."
          />
        </div>

        {/* Current Medications */}
        <div>
          <label htmlFor="current_medications" className="block text-sm font-medium text-gray-700 mb-1.5">
            Прием на медикаменти
          </label>
          <input
            type="text"
            id="current_medications"
            name="current_medications"
            value={formData.current_medications}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white"
            placeholder="Напр. метформин, лизиноприл..."
          />
        </div>

        {/* Smoking Status */}
        <div>
          <label htmlFor="smoking_status" className="block text-sm font-medium text-gray-700 mb-1.5">
            Пушене
          </label>
          <select
            id="smoking_status"
            name="smoking_status"
            value={formData.smoking_status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
          >
            {SMOKING_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Info */}
        <div>
          <label htmlFor="additional_info" className="block text-sm font-medium text-gray-700 mb-1.5">
            Допълнителна здравна информация/коментар
          </label>
          <textarea
            id="additional_info"
            name="additional_info"
            value={formData.additional_info}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white resize-none"
            placeholder="Споделете допълнителна информация, която смятате за важна..."
          />
        </div>

        {/* Privacy Consent */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacy_consent"
            name="privacy_consent"
            checked={formData.privacy_consent}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-[#04737d] border-gray-300 rounded focus:ring-[#04737d] cursor-pointer"
          />
          <label htmlFor="privacy_consent" className="text-sm text-gray-600">
            Съгласен съм личните ми данни да бъдат обработвани за целите на регистрация в базата данни за клинични проучвания, съгласно{' '}
            <Link href="/privacy-policy" className="text-[#04737d] hover:underline">
              Политика за поверителност
            </Link>.
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-10 py-4 bg-[#f5a524] hover:bg-[#e09000] text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Изпращане...' : 'Регистрация'}
          </button>
        </div>
      </form>
    </div>
  );
}

