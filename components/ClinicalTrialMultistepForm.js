"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";

// Bulgarian cities list
const BULGARIAN_CITIES = [
  "София",
  "Пловдив",
  "Варна",
  "Бургас",
  "Русе",
  "Стара Загора",
  "Плевен",
  "Сливен",
  "Добрич",
  "Шумен",
  "Перник",
  "Хасково",
  "Враца",
  "Кюстендил",
  "Благоевград",
  "Пазарджик",
  "Велико Търново",
  "Ямбол",
  "Габрово",
  "Видин",
  "Монтана",
  "Ловеч",
  "Силистра",
  "Разград",
  "Търговище",
  "Смолян",
  "Кърджали",
].sort((a, b) => a.localeCompare(b, "bg"));

// Smoking status options
const SMOKING_OPTIONS = [
  { value: "", label: "Изберете" },
  { value: "never", label: "Никога не съм пушил/а" },
  { value: "former", label: "Бивш пушач" },
  { value: "current", label: "Пуша в момента" },
  { value: "occasional", label: "Пуша рядко/социално" },
];

// Gender options
const GENDER_OPTIONS = [
  { value: "", label: "Изберете" },
  { value: "male", label: "Мъж" },
  { value: "female", label: "Жена" },
  { value: "other", label: "Друго" },
  { value: "prefer_not_to_say", label: "Предпочитам да не отговарям" },
];

// Zod validation schemas for each step
const step1Schema = z.object({
  first_name: z.string().min(1, "Името е задължително"),
  last_name: z.string().min(1, "Фамилията е задължителна"),
  email: z.string().email("Невалиден имейл адрес"),
  phone: z.string().min(1, "Телефонът е задължителен"),
});

const step2Schema = z.object({
  birth_year: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const year = parseInt(val);
        return year >= 1920 && year <= new Date().getFullYear();
      },
      { message: "Невалидна година" }
    ),
  gender: z.string().optional(),
  city: z.string().optional(),
  therapeutic_area: z.string().optional(),
});

const step3Schema = z.object({
  current_conditions: z.string().optional(),
  current_medications: z.string().optional(),
  smoking_status: z.string().optional(),
  additional_info: z.string().optional(),
  privacy_consent: z.boolean().refine((val) => val === true, {
    message: "Трябва да се съгласите с политиката за поверителност",
  }),
});

const STORAGE_KEY = "clinical_trial_form_data";

export default function ClinicalTrialMultistepForm({ studyId }) {
  const {
    user,
    isAuthenticated,
    loading: authLoading,
    updateProfile,
    createApplication,
  } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [therapeuticAreas, setTherapeuticAreas] = useState([]);

  // Get the appropriate schema for current step
  const getCurrentSchema = () => {
    switch (currentStep) {
      case 1:
        return step1Schema;
      case 2:
        return step2Schema;
      case 3:
        return step3Schema;
      default:
        return step1Schema;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    setError: setFieldError,
  } = useForm();

  const watchedFields = watch();

  // Fetch therapeutic areas from API
  useEffect(() => {
    const fetchTherapeuticAreas = async () => {
      try {
        const response = await fetch(
          "https://zdraveibolest.admin-panels.com/wp-json/wp/v2/services?_fields=id,slug,title&per_page=100&orderby=date&order=desc"
        );
        if (response.ok) {
          const data = await response.json();
          setTherapeuticAreas(data);
          console.log("✅ Therapeutic areas loaded:", data);
        } else {
          console.error("Failed to fetch therapeutic areas:", response.status);
        }
      } catch (error) {
        console.error("Error fetching therapeutic areas:", error);
      }
    };
    fetchTherapeuticAreas();
  }, []);

  // Pre-fill form with user data on mount
  useEffect(() => {
    if (user && !authLoading) {
      // ВАЖНО: Винаги инициализирай privacy_consent с false
      setValue("privacy_consent", false);
      
      // Check if we have saved form data in session storage
      const savedData = sessionStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          // ВАЖНО: НЕ зареждай privacy_consent от sessionStorage!
          delete parsedData.privacy_consent;
          Object.keys(parsedData).forEach((key) => {
            setValue(key, parsedData[key]);
          });
          return;
        } catch (e) {
          console.error("Error parsing saved form data:", e);
        }
      }

      // Otherwise, pre-fill with user data (check both with and without acf_ prefix)
      setValue("first_name", user.first_name || "");
      setValue("last_name", user.last_name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || user.acf_phone_number || "");
      setValue("birth_year", user.birth_year || user.acf_birth_year || "");
      setValue("gender", user.gender || user.acf_gender || "");
      setValue("city", user.city || user.acf_city || "");
      setValue("therapeutic_area", user.therapeutic_area || user.acf_therapeutic_area || "");
      setValue("current_conditions", user.current_conditions || user.acf_current_diseases || "");
      setValue("current_medications", user.current_medications || user.acf_current_medications || "");
      setValue("smoking_status", user.smoking_status || user.acf_smoking_status || "");
      setValue("additional_info", user.additional_info || user.acf_additional_health_info || "");
      
      console.log("✅ FORM PRE-FILLED with user data:", {
        birth_year: user.birth_year || user.acf_birth_year,
        city: user.city || user.acf_city,
        gender: user.gender || user.acf_gender,
        therapeutic_area: user.therapeutic_area || user.acf_therapeutic_area,
      });
    }
  }, [user, authLoading, setValue]);

  // Save form data to sessionStorage on every change
  useEffect(() => {
    if (Object.keys(watchedFields).length > 0) {
      // ВАЖНО: НЕ записвай privacy_consent в sessionStorage
      const { privacy_consent, ...fieldsToSave } = watchedFields;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fieldsToSave));
    }
  }, [watchedFields]);

  // Don't show form if user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Show loading state
  if (authLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="animate-spin h-10 w-10 text-[#04737d]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-gray-600">Зареждане на профила...</p>
        </div>
      </div>
    );
  }

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      setError("");
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError("");
  };

  const onSubmit = async (data) => {
    // ВАЖНО: Submit само ако сме на стъпка 3!
    if (currentStep !== 3) {
      console.log("⚠️ Submit prevented - not on step 3");
      return;
    }

    // Валидирай с step3Schema
    try {
      step3Schema.parse(data);
    } catch (err) {
      console.error("Validation error:", err);
      if (err.errors) {
        // Zod errors имат структура: [{ path: ["field_name"], message: "..." }]
        err.errors.forEach((error) => {
          const fieldName = error.path[0];
          setFieldError(fieldName, { type: "manual", message: error.message });
        });
      }
      setError("Моля, попълнете всички задължителни полета правилно.");
      setSubmitting(false);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      console.log("📤 MULTISTEP FORM - Изпращане на данни:", data);

      // Step 1: Update user profile with correct ACF field names
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        acf_phone_number: data.phone || "",
        acf_birth_year: data.birth_year || "",
        acf_gender: data.gender || "",
        acf_city: data.city || "",
        acf_therapeutic_area: data.therapeutic_area || "",
        acf_current_diseases: data.current_conditions || "",
        acf_current_medications: data.current_medications || "",
        acf_smoking_status: data.smoking_status || "",
        acf_additional_health_info: data.additional_info || "",
      };

      console.log("📤 UPDATE PROFILE - Payload:", profilePayload);

      const profileResult = await updateProfile(profilePayload);

      console.log("📥 UPDATE PROFILE - Result:", profileResult);

      if (!profileResult.success) {
        throw new Error(
          profileResult.error || "Грешка при обновяване на профила"
        );
      }

      // Step 2: Create application entry (CPT)
      const applicationData = {
        applicant_id: user.id || user.user_id,
        target_study_id: studyId || 0,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone || user.phone || user.acf_phone_number || "",
        birth_year: data.birth_year || user.birth_year || user.acf_birth_year || "",
        gender: data.gender || user.gender || user.acf_gender || "",
        city: data.city || user.city || user.acf_city || "",
        current_diseases: data.current_conditions || user.current_conditions || user.acf_current_diseases || "",
        current_medications: data.current_medications || user.current_medications || user.acf_current_medications || "",
        smoking_status: data.smoking_status || user.smoking_status || user.acf_smoking_status || "",
        additional_health_info: data.additional_info || user.additional_info || user.acf_additional_health_info || "",
      };

      const applicationResult = await createApplication(applicationData);

      if (!applicationResult.success) {
        throw new Error(
          applicationResult.error || "Грешка при създаване на кандидатурата"
        );
      }

      // Clear saved form data
      sessionStorage.removeItem(STORAGE_KEY);

      setSuccess(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.message || "Възникна грешка. Моля, опитайте отново.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewApplication = () => {
    // Reset form state
    setSuccess(false);
    setCurrentStep(1);
    setError("");
    // Clear session storage
    sessionStorage.removeItem(STORAGE_KEY);
    // Reset form to user data (don't clear personal info)
    if (user) {
      setValue("first_name", user.first_name || "");
      setValue("last_name", user.last_name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || user.acf_phone_number || "");
      setValue("birth_year", user.birth_year || user.acf_birth_year || "");
      setValue("gender", user.gender || user.acf_gender || "");
      setValue("city", user.city || user.acf_city || "");
      setValue("therapeutic_area", user.therapeutic_area || user.acf_therapeutic_area || "");
      setValue("current_conditions", user.current_conditions || user.acf_current_diseases || "");
      setValue("current_medications", user.current_medications || user.acf_current_medications || "");
      setValue("smoking_status", user.smoking_status || user.acf_smoking_status || "");
      setValue("additional_info", user.additional_info || user.acf_additional_health_info || "");
      setValue("privacy_consent", false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Благодарим Ви!
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Вашата заявка за клинично изпитване е изпратена успешно. Ще се
            свържем с Вас в най-кратък срок.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              onClick={handleNewApplication}
              className="px-8 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-lg transition-colors"
            >
              Кандидатствай за друго проучване
            </button>
            <a
              href="/klinichni-prouchvaniya/nameri-klinichno-prouchvane"
              className="px-8 py-3 border-2 border-[#04737d] text-[#04737d] hover:bg-[#04737d] hover:text-white font-medium rounded-lg transition-colors"
            >
              Разгледай проучвания
            </a>
          </div>
        </div>
      </div>
    );
  }

  const progress = (currentStep / 3) * 100;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Намерете клиничното изпитване
        </h2>
        <div className="w-16 h-1 bg-[#04737d] mx-auto rounded-full"></div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Стъпка {currentStep} от 3
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className="bg-[#04737d] h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Labels */}
        <div className="flex justify-between mt-4">
          <div
            className={`flex flex-col items-center ${
              currentStep >= 1 ? "text-[#04737d]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 1
                  ? "bg-[#04737d] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              1
            </div>
            <span className="text-xs font-medium">Лични данни</span>
          </div>
          <div
            className={`flex flex-col items-center ${
              currentStep >= 2 ? "text-[#04737d]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 2
                  ? "bg-[#04737d] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              2
            </div>
            <span className="text-xs font-medium">Демография</span>
          </div>
          <div
            className={`flex flex-col items-center ${
              currentStep >= 3 ? "text-[#04737d]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 3
                  ? "bg-[#04737d] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              3
            </div>
            <span className="text-xs font-medium">Здравна информация</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => {
        if (e.key === 'Enter' && currentStep !== 3) {
          e.preventDefault();
        }
      }}>
        <AnimatePresence mode="wait">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Име <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    {...register("first_name")}
                    className={`w-full px-4 py-3 border ${
                      errors.first_name ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white`}
                    placeholder="Вашето име"
                  />
                  {errors.first_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Фамилия <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    {...register("last_name")}
                    className={`w-full px-4 py-3 border ${
                      errors.last_name ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white`}
                    placeholder="Вашата фамилия"
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Имейл <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`w-full px-4 py-3 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Телефон <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={`w-full px-4 py-3 border ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white`}
                    placeholder="+359 888 123 456"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Demographics */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="birth_year"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Година на раждане
                </label>
                <input
                  type="number"
                  id="birth_year"
                  {...register("birth_year")}
                  min="1920"
                  max={new Date().getFullYear()}
                  className={`w-full px-4 py-3 border ${
                    errors.birth_year ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white`}
                  placeholder="1985"
                />
                {errors.birth_year && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.birth_year.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Пол
                  </label>
                  <select
                    id="gender"
                    {...register("gender")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                  >
                    {GENDER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Град
                  </label>
                  <select
                    id="city"
                    {...register("city")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Изберете</option>
                    {BULGARIAN_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Medical Information */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="therapeutic_area"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  За коя болест проявявате интерес?{" "}
                  <span className="text-red-500">*</span>
                </label>
                {user?.therapeutic_area || user?.acf_therapeutic_area ? (
                  // Ако вече има попълнена терапевтична област - показваме я като текст
                  <div className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                    {therapeuticAreas.find(
                      (area) =>
                        area.slug ===
                        (user.therapeutic_area || user.acf_therapeutic_area)
                    )?.title?.rendered ||
                      user.therapeutic_area ||
                      user.acf_therapeutic_area}
                    <input
                      type="hidden"
                      {...register("therapeutic_area")}
                      value={user.therapeutic_area || user.acf_therapeutic_area}
                    />
                  </div>
                ) : (
                  // Ако няма - показваме dropdown
                  <>
                    <select
                      id="therapeutic_area"
                      {...register("therapeutic_area")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Изберете терапевтична област</option>
                      {therapeuticAreas.map((area) => (
                        <option key={area.id} value={area.slug}>
                          {area.title.rendered}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-xs text-gray-500">
                      Тази информация ни помага да Ви предоставим по-качествена
                      и персонализирана информация за клиничните проучвания,
                      които могат да Ви бъдат полезни.
                    </p>
                  </>
                )}
              </div>

              <div>
                <label
                  htmlFor="current_conditions"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Настоящи заболявания
                </label>
                <input
                  type="text"
                  id="current_conditions"
                  {...register("current_conditions")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white"
                  placeholder="Напр. диабет тип 2, хипертония..."
                />
              </div>

              <div>
                <label
                  htmlFor="current_medications"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Прием на медикаменти
                </label>
                <input
                  type="text"
                  id="current_medications"
                  {...register("current_medications")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white"
                  placeholder="Напр. метформин, лизиноприл..."
                />
              </div>

              <div>
                <label
                  htmlFor="smoking_status"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Пушене
                </label>
                <select
                  id="smoking_status"
                  {...register("smoking_status")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                >
                  {SMOKING_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="additional_info"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Допълнителна здравна информация/коментар
                </label>
                <textarea
                  id="additional_info"
                  {...register("additional_info")}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white resize-none"
                  placeholder="Споделете допълнителна информация, която смятате за важна..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy_consent"
                  {...register("privacy_consent")}
                  className="mt-1 w-4 h-4 text-[#04737d] border-gray-300 rounded focus:ring-[#04737d] cursor-pointer"
                />
                <label
                  htmlFor="privacy_consent"
                  className="text-sm text-gray-600"
                >
                  Съгласен съм личните ми данни да бъдат обработвани за целите
                  на регистрация в базата данни за клинични проучвания, съгласно{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#04737d] hover:underline"
                  >
                    Политика за поверителност
                  </Link>
                  . <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.privacy_consent && (
                <p className="text-sm text-red-600">
                  {errors.privacy_consent.message}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-6 py-3 border border-gray-300 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? "opacity-50 cursor-not-allowed text-gray-400"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Назад
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-lg transition-colors"
            >
              Напред
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-3 bg-[#f5a524] hover:bg-[#e09000] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Изпращане..." : "Завърши регистрацията"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
