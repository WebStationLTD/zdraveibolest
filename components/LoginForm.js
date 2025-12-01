"use client";

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm({ onSuccess, redirectAfterSuccess = true }) {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      newErrors.username = 'Потребителското име или имейл е задължително';
    }

    if (!formData.password) {
      newErrors.password = 'Паролата е задължителна';
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
      const result = await login(formData.username, formData.password);

      if (result.success) {
        if (onSuccess) {
          onSuccess(result.user);
        }
        // Redirect to home page after successful login (only if redirectAfterSuccess is true)
        if (redirectAfterSuccess) {
          router.push('/');
        }
      } else {
        setErrors({ general: result.error || 'Грешно потребителско име или парола' });
      }
    } catch (error) {
      setErrors({ general: 'Възникна грешка. Моля, опитайте отново.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      {/* Username/Email */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Потребителско име или имейл <span className="text-red-500">*</span>
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
          placeholder="Въведете потребителско име или имейл"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      {/* Password */}
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
          placeholder="Въведете парола"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Вход...' : 'Влез'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Нямате акаунт?{' '}
        <Link href="/register" className="text-[#04737d] hover:text-[#035057] font-medium">
          Регистрирайте се тук
        </Link>
      </p>
    </form>
  );
}

