"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import Link from "next/link";

// Gender options
const GENDER_OPTIONS = [
  { value: "", label: "Изберете" },
  { value: "Мъж", label: "Мъж" },
  { value: "Жена", label: "Жена" },
];

// Marketing channel options
const MARKETING_CHANNELS = [
  { value: "Социални мрежи", label: "Социални мрежи" },
  { value: "Google", label: "Google" },
  { value: "Приятели", label: "Приятели" },
  { value: "Друго", label: "Друго" },
];

// Zod validation schemas for each step
const step1Schema = z.object({
  first_name: z.string().min(1, "Името е задължително"),
  last_name: z.string().min(1, "Фамилията е задължителна"),
  phone: z.string().min(1, "Телефонът е задължителен"),
  email: z.string().email("Невалиден имейл адрес"),
  gender: z.string().min(1, "Полът е задължителен"),
  birth_date: z.string().min(1, "Датата на раждане е задължителна"),
  height: z.string().min(1, "Ръстът е задължителен"),
  weight: z.string().min(1, "Теглото е задължително"),
});

const step2Schema = z.object({
  nicotine_use: z.string().min(1, "Моля, отговорете на този въпрос"),
  allergies: z.string().min(1, "Моля, отговорете на този въпрос"),
  asthma: z.string().min(1, "Моля, отговорете на този въпрос"),
  other_conditions: z.string().min(1, "Моля, попълнете това поле"),
  medications: z.string().min(1, "Моля, отговорете на този въпрос"),
  medications_text: z.string().optional(),
});

const step3Schema = z.object({
  trial_type: z.array(z.string()).min(1, "Моля, изберете поне един тип проучване"),
  marketing_channel: z.string().min(1, "Моля, отговорете на този въпрос"),
  privacy_consent: z.boolean().refine((val) => val === true, {
    message: "Трябва да се съгласите с политиката за поверителност",
  }),
});

export default function HealthyVolunteerForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    setError: setFieldError,
  } = useForm({
    defaultValues: {
      trial_type: [],
      medications: "",
      privacy_consent: false,
    }
  });

  const watchedFields = watch();
  const medicationsValue = watch("medications");

  const handleNext = async () => {
    let fieldsToValidate;
    
    if (currentStep === 1) {
      fieldsToValidate = ["first_name", "last_name", "phone", "email", "gender", "birth_date", "height", "weight"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["nicotine_use", "allergies", "asthma", "other_conditions", "medications"];
      if (medicationsValue === "Да") {
        fieldsToValidate.push("medications_text");
      }
    }

    const isValid = await trigger(fieldsToValidate);
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
    // Валидация само на стъпка 3
    if (currentStep !== 3) {
      console.log("⚠️ Submit prevented - not on step 3");
      return;
    }

    // Ръчна валидация за step 3
    try {
      step3Schema.parse(data);
    } catch (err) {
      console.error("Validation error:", err);
      if (err.errors) {
        err.errors.forEach((error) => {
          const fieldName = error.path[0];
          setFieldError(fieldName, { type: "manual", message: error.message });
        });
      }
      setError("Моля, попълнете всички задължителни полета правилно.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      console.log("📤 HEALTHY VOLUNTEER FORM - Изпращане на данни:", data);

      // Подготвяме payload за backend
      const payload = {
        acf_first_name: data.first_name,
        acf_last_name: data.last_name,
        acf_phone_number: data.phone,
        acf_email: data.email,
        acf_gender: data.gender,
        acf_birth_date: data.birth_date,
        acf_height: data.height,
        acf_weight: data.weight,
        acf_nicotine_use: data.nicotine_use,
        acf_allergies: data.allergies,
        acf_asthma: data.asthma,
        acf_other_medical_conditions: data.other_conditions,
        acf_current_medications: data.medications,
        acf_current_medications_text: data.medications === "Да" ? data.medications_text : "",
        acf_trial_type: data.trial_type,
        acf_marketing_channel: data.marketing_channel,
      };

      console.log("📤 Payload:", payload);

      const response = await fetch(
        "https://zdraveibolest.admin-panels.com/wp-json/zdravei/v1/create-healthy-application",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Грешка при изпращане на кандидатурата");
      }

      console.log("✅ Success:", result);
      setSuccess(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.message || "Възникна грешка. Моля, опитайте отново.");
    } finally {
      setSubmitting(false);
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
            Вашата кандидатура за здрав доброволец е изпратена успешно. Ще се
            свържем с Вас в най-кратък срок.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/klinichni-prouchvaniya/nameri-klinichno-prouchvane"
              className="px-8 py-3 border-2 border-[#2D8CFF] text-[#2D8CFF] hover:bg-[#2D8CFF] hover:text-white font-medium rounded-lg transition-colors"
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
          Кандидатствай като здрав доброволец
        </h2>
        <p className="text-gray-600">
          Попълнете формата по-долу и ще се свържем с Вас
        </p>
        <div className="w-16 h-1 bg-[#2D8CFF] mx-auto rounded-full mt-3"></div>
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
            className="bg-[#2D8CFF] h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Labels */}
        <div className="flex justify-around mt-4 max-w-2xl mx-auto">
          <div
            className={`flex flex-col items-center ${
              currentStep >= 1 ? "text-[#2D8CFF]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 1
                  ? "bg-[#2D8CFF] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              1
            </div>
            <span className="text-sm font-medium">Лични данни</span>
          </div>
          <div
            className={`flex flex-col items-center ${
              currentStep >= 2 ? "text-[#2D8CFF]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 2
                  ? "bg-[#2D8CFF] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              2
            </div>
            <span className="text-sm font-medium">Здравна информация</span>
          </div>
          <div
            className={`flex flex-col items-center ${
              currentStep >= 3 ? "text-[#2D8CFF]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 3
                  ? "bg-[#2D8CFF] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              3
            </div>
            <span className="text-sm font-medium">Предпочитания</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Пол <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    {...register("gender")}
                    className={`w-full px-4 py-3 border ${
                      errors.gender ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white appearance-none cursor-pointer`}
                  >
                    {GENDER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="birth_date"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Дата на раждане <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="birth_date"
                    {...register("birth_date")}
                    className={`w-full px-4 py-3 border ${
                      errors.birth_date ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white`}
                  />
                  {errors.birth_date && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.birth_date.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Ръст (см) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="height"
                    {...register("height")}
                    min="100"
                    max="250"
                    className={`w-full px-4 py-3 border ${
                      errors.height ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white`}
                    placeholder="175"
                  />
                  {errors.height && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.height.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Тегло (кг) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="weight"
                    {...register("weight")}
                    min="30"
                    max="200"
                    className={`w-full px-4 py-3 border ${
                      errors.weight ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white`}
                    placeholder="70"
                  />
                  {errors.weight && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.weight.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Health Information */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* 2-колонен grid за кратките Да/Не въпроси */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Лява колона */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Употребявате ли в момента продукти, съдържащи никотин? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Да"
                          {...register("nicotine_use")}
                          className="w-4 h-4 text-[#2D8CFF] border-gray-300 focus:ring-[#2D8CFF]"
                        />
                        <span className="text-gray-700">Да</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Не"
                          {...register("nicotine_use")}
                          className="w-4 h-4 text-[#2D8CFF] border-gray-300 focus:ring-[#2D8CFF]"
                        />
                        <span className="text-gray-700">Не</span>
                      </label>
                    </div>
                    {errors.nicotine_use && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.nicotine_use.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Приемате ли лекарства в момента? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Да"
                          {...register("medications")}
                          className="w-4 h-4 text-[#2D8CFF] border-gray-300 focus:ring-[#2D8CFF]"
                        />
                        <span className="text-gray-700">Да</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Не"
                          {...register("medications")}
                          className="w-4 h-4 text-[#2D8CFF] border-gray-300 focus:ring-[#2D8CFF]"
                        />
                        <span className="text-gray-700">Не</span>
                      </label>
                    </div>
                    {errors.medications && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.medications.message}
                      </p>
                    )}
                  </div>

                  {/* Conditional field - показва се само ако medications === "Да" */}
                  {medicationsValue === "Да" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label
                        htmlFor="medications_text"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Моля, опишете какви медикаменти приемате:
                      </label>
                      <input
                        type="text"
                        id="medications_text"
                        {...register("medications_text")}
                        className={`w-full px-4 py-3 border ${
                          errors.medications_text ? "border-red-300" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white`}
                        placeholder="Напр. Аспирин, Метформин..."
                      />
                      {errors.medications_text && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.medications_text.message}
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Дясна колона */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Имате ли алергии? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Да"
                          {...register("allergies")}
                          className="w-4 h-4 text-[#2D8CFF] border-gray-300 focus:ring-[#2D8CFF]"
                        />
                        <span className="text-gray-700">Да</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Не"
                          {...register("allergies")}
                          className="w-4 h-4 text-[#2D8CFF] border-gray-300 focus:ring-[#2D8CFF]"
                        />
                        <span className="text-gray-700">Не</span>
                      </label>
                    </div>
                    {errors.allergies && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.allergies.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Страдате ли от астма? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Да"
                          {...register("asthma")}
                          className="w-4 h-4 text-[#2D8CFF] border-gray-300 focus:ring-[#2D8CFF]"
                        />
                        <span className="text-gray-700">Да</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Не"
                          {...register("asthma")}
                          className="w-4 h-4 text-[#2D8CFF] border-gray-300 focus:ring-[#2D8CFF]"
                        />
                        <span className="text-gray-700">Не</span>
                      </label>
                    </div>
                    {errors.asthma && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.asthma.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Full width textarea за други медицински състояния */}
              <div>
                <label
                  htmlFor="other_conditions"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Имате ли история на други медицински или психични състояния? <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  (напр. рак, хепатит, хранителни разстройства, високо кръвно налягане, сънна апнея)
                </p>
                <textarea
                  id="other_conditions"
                  {...register("other_conditions")}
                  rows={4}
                  className={`w-full px-4 py-3 border ${
                    errors.other_conditions ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-all bg-white resize-none`}
                  placeholder="Опишете накратко или напишете 'Няма'"
                />
                {errors.other_conditions && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.other_conditions.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Preferences */}
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
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Към какъв тип проучване имате интерес да участвате? <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Забележка: Проучванията с престой обикновено са с по-високо заплащане/компенсация
                </p>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value="С престой (пренощуване)"
                      {...register("trial_type")}
                      className="w-4 h-4 text-[#2D8CFF] border-gray-300 rounded focus:ring-[#2D8CFF]"
                    />
                    <span className="text-gray-700">С престой (пренощуване)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value="БЕЗ престой (пренощуване)"
                      {...register("trial_type")}
                      className="w-4 h-4 text-[#2D8CFF] border-gray-300 rounded focus:ring-[#2D8CFF]"
                    />
                    <span className="text-gray-700">БЕЗ престой (пренощуване)</span>
                  </label>
                </div>
                {errors.trial_type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.trial_type.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Откъде разбрахте за нас? <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-6">
                  {MARKETING_CHANNELS.map((channel) => (
                    <label key={channel.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={channel.value}
                        {...register("marketing_channel")}
                        className="w-4 h-4 text-[#04737d] border-gray-300 focus:ring-[#04737d]"
                      />
                      <span className="text-gray-700">{channel.label}</span>
                    </label>
                  ))}
                </div>
                {errors.marketing_channel && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.marketing_channel.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-gray-200">
                <input
                  type="checkbox"
                  id="privacy_consent"
                  {...register("privacy_consent")}
                  className="mt-1 w-4 h-4 text-[#2D8CFF] border-gray-300 rounded focus:ring-[#2D8CFF] cursor-pointer"
                />
                <label
                  htmlFor="privacy_consent"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Съгласен съм личните ми данни да бъдат обработвани за целите
                  на регистрация в базата данни за клинични проучвания, съгласно{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#2D8CFF] hover:underline"
                    target="_blank"
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
              className="px-8 py-3 bg-[#2D8CFF] hover:bg-[#1a6fd4] text-white font-medium rounded-lg transition-colors"
            >
              Напред
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-3 bg-[#1a7a4a] hover:bg-[#145f3a] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Изпращане..." : "Изпрати кандидатурата"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
