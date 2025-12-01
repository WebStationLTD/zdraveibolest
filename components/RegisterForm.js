"use client";

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterForm({ therapeuticAreas = [], onSuccess, redirectAfterSuccess = true }) {
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    therapeutic_area: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Потребителското име е задължително';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Потребителското име трябва да е минимум 3 символа';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Имейлът е задължителен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Невалиден имейл адрес';
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Името е задължително';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Фамилията е задължителна';
    }

    if (!formData.password) {
      newErrors.password = 'Паролата е задължителна';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Паролата трябва да е минимум 6 символа';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Паролите не съвпадат';
    }

    if (!formData.therapeutic_area) {
      newErrors.therapeutic_area = 'Моля, изберете терапевтична област';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        therapeutic_area: formData.therapeutic_area,
      });

      if (result.success) {
        setSuccess(true);
        // Redirect to home page after 2 seconds (only if redirectAfterSuccess is true)
        if (redirectAfterSuccess) {
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          // Close modal after 1 second if no redirect
          setTimeout(() => {
            if (onSuccess) {
              onSuccess(result.user);
            }
          }, 1000);
        }
      } else {
        setErrors({ general: result.error || 'Регистрацията не беше успешна' });
      }
    } catch (error) {
      setErrors({ general: 'Възникна грешка. Моля, опитайте отново.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-[#04737d]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Регистрацията е успешна!
        </h3>
        <p className="text-gray-600 mb-6">
          {redirectAfterSuccess 
            ? 'Вашият акаунт беше създаден успешно. Сега можете да разгледате пълното съдържание.'
            : 'Вашият акаунт беше създаден успешно! Зареждаме съдържанието...'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      {/* First Name & Last Name - Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
            Име <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border ${
              errors.first_name ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
            placeholder="Вашето име"
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
            Фамилия <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border ${
              errors.last_name ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
            placeholder="Вашата фамилия"
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
          )}
        </div>
      </div>

      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Потребителско име <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border ${
            errors.username ? 'border-red-300' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
          placeholder="Изберете потребителско име"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Имейл адрес <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border ${
            errors.email ? 'border-red-300' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Password & Confirm Password - Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Парола <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border ${
              errors.password ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
            placeholder="Минимум 6 символа"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Потвърди парола <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border ${
              errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
            placeholder="Повторете паролата"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Therapeutic Area Select */}
      <div>
        <label htmlFor="therapeutic_area" className="block text-sm font-medium text-gray-700 mb-1">
          За коя болест проявявате интерес? <span className="text-red-500">*</span>
        </label>
        <select
          id="therapeutic_area"
          name="therapeutic_area"
          value={formData.therapeutic_area}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border ${
            errors.therapeutic_area ? 'border-red-300' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors bg-white`}
        >
          <option value="">Изберете терапевтична област</option>
          {therapeuticAreas.map((area) => (
            <option key={area.id} value={area.slug}>
              {area.title.rendered}
            </option>
          ))}
        </select>
        {errors.therapeutic_area && (
          <p className="mt-1 text-sm text-red-600">{errors.therapeutic_area}</p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          Тази информация ни помага да Ви предоставим по-качествена и персонализирана информация за клиничните проучвания, които могат да Ви бъдат полезни.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Регистрация...' : 'Регистрирай се'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Вече имате акаунт?{' '}
        <Link href="/login" className="text-[#04737d] hover:text-[#035057] font-medium">
          Влезте тук
        </Link>
      </p>
    </form>
  );
}

