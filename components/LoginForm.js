"use client";

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { requestPasswordReset } from '../services/auth';

export default function LoginForm({ onSuccess, redirectAfterSuccess = true }) {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

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
        const errorMsg = result.error || 'Грешно потребителско име или парола';
        if (errorMsg.toLowerCase().includes('потвърдете имейл') || errorMsg.toLowerCase().includes('requires_verification')) {
          setErrors({ verification: errorMsg });
        } else {
          setErrors({ general: errorMsg });
        }
      }
    } catch (error) {
      setErrors({ general: 'Възникна грешка. Моля, опитайте отново.' });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    if (!forgotEmail.trim()) {
      setForgotError('Моля въведете имейл адрес');
      return;
    }
    setForgotLoading(true);
    try {
      await requestPasswordReset(forgotEmail.trim());
      setForgotSuccess(true);
    } catch (err) {
      setForgotError(err.message || 'Възникна грешка. Моля, опитайте отново.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}
      {errors.verification && (
        <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200 flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-yellow-800">{errors.verification}</p>
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
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Парола <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => { setShowForgot(!showForgot); setForgotError(''); setForgotSuccess(false); setForgotEmail(''); }}
            className="text-sm text-[#04737d] hover:text-[#035057] font-medium transition-colors"
          >
            Забравена парола?
          </button>
        </div>
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

      {/* Forgot Password Inline Panel */}
      {showForgot && (
        <div className="rounded-xl border border-[#04737d]/25 bg-[#04737d]/5 p-5 space-y-4">
          <p className="text-sm font-medium text-gray-800">
            Въведете имейл адреса си и ще ви изпратим линк за нулиране на паролата.
          </p>
          {forgotSuccess ? (
            <div className="flex items-start gap-3 rounded-lg bg-green-50 border border-green-200 p-4">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm text-green-800">
                Ако имейлът е регистриран в системата, ще получите линк за нулиране на паролата.
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => { setForgotEmail(e.target.value); setForgotError(''); }}
                placeholder="Вашият имейл адрес"
                className={`flex-1 px-4 py-2.5 border ${
                  forgotError ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors text-sm`}
              />
              <button
                type="button"
                onClick={handleForgotSubmit}
                disabled={forgotLoading}
                className="px-4 py-2.5 bg-[#04737d] hover:bg-[#035057] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {forgotLoading ? 'Изпращане...' : 'Изпрати'}
              </button>
            </div>
          )}
          {forgotError && (
            <p className="text-sm text-red-600">{forgotError}</p>
          )}
        </div>
      )}

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

