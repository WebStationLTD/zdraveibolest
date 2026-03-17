"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Slug-овете от WordPress API съвпадат директно с ключовете в DISEASES_BY_AREA - не е нужно mapping или normalization!

/**
 * Предефиниран списък със заболявания по терапевтични области
 * Ключовете съвпадат ТОЧНО с WordPress slug-овете от API
 */
const DISEASES_BY_AREA = {
  "akusher-ginekologia": [
    "Лейомиома на матката (маточни миоми)",
    "Ендометриоза – тазова",
    "Аденомиоза",
    "Синдром на поликистозните яйчници (PCOS)",
    "Хиперменорея",
    "Дисменорея",
    "Аменорея",
    "Бактериална вагиноза",
    "Вулвовагинална кандидоза",
    "HPV инфекция",
    "Цервикална дисплазия (CIN I–III)",
    "Инфертилитет – женски фактор",
    "Прееклампсия",
    "Гестационен диабет",
    "Преждевременно раждане",
  ],
  alergologia: [
    "Сезонен алергичен ринит",
    "Целогодишен алергичен ринит",
    "Алергична бронхиална астма",
    "Атопичен дерматит",
    "Ангиоедем (оток на Квинке)",
    "Хронична спонтанна уртикария",
    "Физикална уртикария",
    "Анафилактична реакция",
    "Хранителна алергия – IgE-медиирана",
    "Лекарствена алергия",
    "Алергия към ужилвания от насекоми",
    "Алергичен конюнктивит",
    "Контактен алергичен дерматит",
  ],
  pulmologia: [
    "Бронхиална астма",
    "ХОББ – GOLD I–IV",
    "Хроничен бронхит",
    "Емфизем",
    "Пневмония – бактериална",
    "Пневмония – вирусна",
    "Интерстициална белодробна фиброза",
    "Идиопатична белодробна фиброза",
    "Обструктивна сънна апнея",
    "Белодробна хипертония",
    "Бронхоекстазии",
    "Туберкулоза – белодробна",
  ],
  kardiologia: [
    "Артериална хипертония",
    "Исхемична болест на сърцето",
    "Стабилна стенокардия",
    "Нестабилна стенокардия",
    "Остър миокарден инфаркт",
    "Хронична сърдечна недостатъчност",
    "Предсърдно мъждене",
    "Суправентрикуларни тахикардии",
    "Камерни аритмии",
    "Дилатативна кардиомиопатия",
    "Хипертрофична кардиомиопатия",
    "Аортна стеноза",
    "Митрална регургитация",
  ],
  gastroenterologia: [
    "Остър гастрит",
    "Хроничен гастрит",
    "Helicobacter pylori инфекция",
    "ГЕРБ",
    "Язва на стомаха",
    "Язва на дванадесетопръстника",
    "Синдром на раздразненото черво",
    "Болест на Крон",
    "Улцерозен колит",
    "Чернодробна стеатоза (NAFLD)",
    "Неалкохолен стеатохепатит (NASH)",
    "Хроничен хепатит B",
    "Хроничен хепатит C",
    "Жлъчнокаменна болест",
    "Хроничен панкреатит",
  ],
  nefrologia: [
    "Хронично бъбречно заболяване",
    "Остър бъбречен увреда",
    "Диабетна нефропатия",
    "Хипертонична нефропатия",
    "Гломерулонефрит",
    "Пиелонефрит",
    "Поликистозна бъбречна болест",
    "Нефролитиаза",
    "Нефротичен синдром",
  ],
  nevrologia: [
    "Исхемичен инсулт",
    "Хеморагичен инсулт",
    "Мигрена",
    "Епилепсия",
    "Болест на Паркинсон",
    "Алцхаймерова болест",
    "Множествена склероза – RRMS",
    "Множествена склероза – прогресивна форма",
    "Полиневропатия",
    "Радикулопатия",
    "Дискова херния",
  ],
  revmatologia: [
    "Ревматоиден артрит",
    "Остеоартрит",
    "Анкилозиращ спондилит",
    "Псориатичен артрит",
    "Подагра",
    "Системен лупус еритематозус",
    "Синдром на Сьогрен",
    "Васкулити – ANCA-асоциирани",
    "Остеопороза",
  ],
  hematologia: [
    "Желязодефицитна анемия",
    "Мегалобластна анемия",
    "Апластична анемия",
    "Хронична лимфоцитна левкемия",
    "Остра миелоидна левкемия",
    "Ходжкинов лимфом",
    "Неходжкинов лимфом",
    "Множествен миелом",
    "Тромбоцитопения",
    "Тромбофилия",
    "Хемофилия",
    "Полицитемия вера",
  ],
  onkologia: [
    "Карцином на млечната жлеза",
    "Недребноклетъчен рак на белия дроб",
    "Дребноклетъчен рак на белия дроб",
    "Колоректален карцином",
    "Простатен карцином",
    "Овариален карцином",
    "Цервикален карцином",
    "Хепатоцелуларен карцином",
    "Панкреасен аденокарцином",
    "Меланом",
    "Рак на бъбрека",
    "Рак на пикочния мехур",
  ],
  endokrinologia: [
    "Захарен диабет тип 1",
    "Захарен диабет тип 2",
    "Предиабет (Инсулинова резистентност)",
    "Хипотиреоидизъм",
    "Хипертиреоидизъм",
    "Тиреоидит на Хашимото",
    "Базедова болест",
    "Нодуларна гуша",
    "Затлъстяване",
    "Метаболитен синдром",
    "Хиперпаратиреоидизъм",
    "Остеопороза",
    "Хипофизен аденом",
  ],
  dermatologia: [
    "Атопичен дерматит",
    "Псориазис вулгарис",
    "Акне вулгарис",
    "Розацея",
    "Себореен дерматит",
    "Контактен дерматит",
    "Уртикария",
    "Гъбични кожни инфекции",
    "Херпес симплекс",
    "Херпес зостер",
    "Меланом",
    "Базоцелуларен карцином",
  ],
};

/**
 * Намира списък със заболявания на база slug от WordPress
 * @param {string} slug - Slug на терапевтична област от WordPress API
 * @returns {Array} - Масив със заболявания
 */
const getDiseasesByAreaSlug = (slug) => {
  if (!slug) return [];

  // Slug-овете от WordPress съвпадат директно с ключовете в DISEASES_BY_AREA
  return DISEASES_BY_AREA[slug] || [];
};

export default function RegisterForm({
  therapeuticAreas = [],
  onSuccess,
  redirectAfterSuccess = true,
}) {
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    therapeutic_area: "",
    disease: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [availableDiseases, setAvailableDiseases] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Ако се променя терапевтичната област, актуализираме списъка със заболявания
    if (name === "therapeutic_area") {
      const diseases = getDiseasesByAreaSlug(value);
      setAvailableDiseases(diseases);
      // Нулираме избраното заболяване при смяна на областта
      setFormData((prev) => ({ ...prev, disease: "" }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Имейлът е задължителен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Невалиден имейл адрес";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефонът е задължителен";
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Името е задължително";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Фамилията е задължителна";
    }

    if (!formData.password) {
      newErrors.password = "Паролата е задължителна";
    } else if (formData.password.length < 6) {
      newErrors.password = "Паролата трябва да е минимум 6 символа";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Паролите не съвпадат";
    }

    if (!formData.therapeutic_area) {
      newErrors.therapeutic_area = "Моля, изберете терапевтична област";
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
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        acf_therapeutic_area: formData.therapeutic_area,
        acf_current_diseases: formData.disease,
      });

      if (result.success) {
        setRegisteredEmail(formData.email);
        setSuccess(true);
      } else {
        setErrors({ general: result.error || "Регистрацията не беше успешна" });
      }
    } catch (error) {
      setErrors({ general: "Възникна грешка. Моля, опитайте отново." });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-[#04737d]/10 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Потвърдете имейл адреса си
        </h3>
        <p className="text-gray-600 mb-2">
          Изпратихме имейл за потвърждение на:
        </p>
        <p className="font-semibold text-[#04737d] mb-6 text-lg">{registeredEmail}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 text-left">
          <p className="text-sm text-blue-800 font-medium mb-2">Как да активирате акаунта си:</p>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Отворете имейла, който сме изпратили</li>
            <li>Кликнете на бутона <strong>„Потвърди имейл"</strong></li>
            <li>Акаунтът ви ще бъде активиран автоматично</li>
          </ol>
        </div>
        <p className="text-xs text-gray-500">
          Не получихте имейл? Проверете папката <strong>Спам</strong>.
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
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Име <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border ${
              errors.first_name ? "border-red-300" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
            placeholder="Вашето име"
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Фамилия <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border ${
              errors.last_name ? "border-red-300" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
            placeholder="Вашата фамилия"
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Имейл адрес (Потребителско име) <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border ${
            errors.email ? "border-red-300" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
          placeholder="your@email.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Телефон <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border ${
            errors.phone ? "border-red-300" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
          placeholder="+359 888 123 456"
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* Password & Confirm Password - Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Парола <span className="text-red-500">*</span>
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
            placeholder="Минимум 6 символа"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Потвърди парола <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border ${
              errors.confirmPassword ? "border-red-300" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors`}
            placeholder="Повторете паролата"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Therapeutic Area Select */}
      <div>
        <label
          htmlFor="therapeutic_area"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          За коя болест проявявате интерес?{" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          id="therapeutic_area"
          name="therapeutic_area"
          value={formData.therapeutic_area}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border ${
            errors.therapeutic_area ? "border-red-300" : "border-gray-300"
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
          Тази информация ни помага да Ви предоставим по-качествена и
          персонализирана информация за клиничните проучвания, които могат да Ви
          бъдат полезни.
        </p>
      </div>

      {/* Disease Select (Cascading - shows only when therapeutic area is selected) */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          availableDiseases.length > 0
            ? "max-h-40 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {availableDiseases.length > 0 && (
          <div>
            <label
              htmlFor="disease"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Изберете конкретно заболяване (по избор)
            </label>
            <select
              id="disease"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border ${
                errors.disease ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent transition-colors bg-white`}
            >
              <option value="">Изберете заболяване</option>
              {availableDiseases.map((disease, index) => (
                <option key={index} value={disease}>
                  {disease}
                </option>
              ))}
            </select>
            {errors.disease && (
              <p className="mt-1 text-sm text-red-600">{errors.disease}</p>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Регистрация..." : "Регистрирай се"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Вече имате акаунт?{" "}
        <Link
          href="/login"
          className="text-[#04737d] hover:text-[#035057] font-medium"
        >
          Влезте тук
        </Link>
      </p>
    </form>
  );
}
