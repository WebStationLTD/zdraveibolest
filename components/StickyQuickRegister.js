"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getServices } from "../services/services";
import Link from "next/link";
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

// Diseases by therapeutic area (same as in RegisterForm)
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

export default function StickyQuickRegister() {
  const { isAuthenticated, quickRegister, loading: authLoading } = useAuth();
  // State for controlling form visibility with delay
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [therapeuticAreas, setTherapeuticAreas] = useState([]);
  const [availableDiseases, setAvailableDiseases] = useState([]);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    therapeutic_area: "",
    disease: "",
    privacy_consent: false,
  });

  // Load therapeutic areas
  useEffect(() => {
    const loadTherapeuticAreas = async () => {
      try {
        const areas = await getServices();
        setTherapeuticAreas(areas || []);
      } catch (error) {
        console.error("Error loading therapeutic areas:", error);
      }
    };
    loadTherapeuticAreas();
  }, []);

  // Delayed visibility effect - show form after 7-8 seconds (7500ms)
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsVisible(true);
    }, 7500); // 7.5 seconds delay

    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(delayTimer);
  }, []); // Empty dependency array - runs only once on mount


  // Don't show if user is already authenticated, auth is loading, or visibility delay hasn't passed
  if (isAuthenticated || authLoading || !isVisible) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Update available diseases when therapeutic area changes
    if (name === "therapeutic_area") {
      const diseases = DISEASES_BY_AREA[value] || [];
      setAvailableDiseases(diseases);
      // Reset disease selection
      setFormData((prev) => ({ ...prev, disease: "" }));
    }

    setError("");
  };

  const validateForm = () => {
    if (!formData.first_name.trim()) return "Името е задължително";
    if (!formData.last_name.trim()) return "Фамилията е задължителна";
    if (!formData.email.trim()) return "Имейлът е задължителен";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Невалиден имейл адрес";
    if (!formData.phone.trim()) return "Телефонът е задължителен";
    if (!/^(\+359|0)[0-9\s\-]{7,14}$/.test(formData.phone.trim())) return "Невалиден телефонен номер (пр. 0888 123 456)";
    if (!formData.password) return "Паролата е задължителна";
    if (formData.password.length < 6)
      return "Паролата трябва да е минимум 6 символа";
    if (formData.password !== formData.confirm_password)
      return "Паролите не съвпадат";
    if (!formData.privacy_consent)
      return "Трябва да се съгласите с политиката за поверителност";
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
    setError("");

    try {
      const result = await quickRegister({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        acf_phone_number: formData.phone,
        password: formData.password,
        acf_therapeutic_area: formData.therapeutic_area,
        acf_current_diseases: formData.disease,
      });

      if (result.success) {
        setRegisteredEmail(formData.email);
        setSuccess(true);
      } else {
        setError(result.error || "Регистрацията не беше успешна");
      }
    } catch (err) {
      setError("Възникна грешка. Моля, опитайте отново.");
    } finally {
      setLoading(false);
    }
  };

  // Don't render if closed
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed left-0 top-[70px] z-40 hidden lg:block">
      <div
        className={`relative bg-white rounded-r-2xl shadow-2xl border border-l-0 border-gray-200 transition-all duration-300 ${
          isMinimized ? "w-12" : "w-[300px]"
        }`}
      >
        {/* Minimize/Maximize Toggle */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute -right-3 top-14 w-6 h-6 bg-[#04737d] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#035057] transition-colors z-10"
          aria-label={isMinimized ? "Разгъни" : "Сгъни"}
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
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              Бърза регистрация
            </span>
          </div>
        ) : (
          // Expanded State
          <div className="p-5 max-h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden">
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900 leading-tight">
                Регистрирай се и получи достъп до най-новите възможности за
                лечение и информация за заболявания
              </h3>
            </div>

            {success ? (
              // Success State
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-[#04737d]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#04737d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">
                  Потвърдете имейл адреса си
                </h4>
                <p className="text-xs text-gray-500 mb-1">Изпратихме линк за потвърждение на:</p>
                <p className="text-xs font-semibold text-[#04737d] mb-3 break-all">{registeredEmail}</p>
                <p className="text-xs text-gray-500">
                  Кликнете на линка в имейла, за да активирате акаунта си. Проверете и папката <strong>Спам</strong>.
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

                {/* First Name + Last Name */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="quick_first_name" className="block text-xs font-medium text-gray-700 mb-1">
                      Име<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="quick_first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent"
                      placeholder="Вашето име"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="quick_last_name" className="block text-xs font-medium text-gray-700 mb-1">
                      Фамилия<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="quick_last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent"
                      placeholder="Вашата фамилия"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="quick_email"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Имейл адрес<span className="text-red-500">*</span>
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
                  <label
                    htmlFor="quick_phone"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
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

                {/* Therapeutic Area Select */}
                <div>
                  <label
                    htmlFor="quick_therapeutic_area"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    За коя болест проявявате интерес?
                  </label>
                  <select
                    id="quick_therapeutic_area"
                    name="therapeutic_area"
                    value={formData.therapeutic_area}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent bg-white"
                  >
                    <option value="">Изберете терапевтична област</option>
                    {therapeuticAreas.map((area) => (
                      <option key={area.id} value={area.slug}>
                        {area.title.rendered}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Disease Select (Cascading) */}
                {availableDiseases.length > 0 && (
                  <div className="overflow-hidden transition-all duration-500 ease-in-out">
                    <label
                      htmlFor="quick_disease"
                      className="block text-xs font-medium text-gray-700 mb-1"
                    >
                      Конкретно заболяване (по избор)
                    </label>
                    <select
                      id="quick_disease"
                      name="disease"
                      value={formData.disease}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent bg-white"
                    >
                      <option value="">Изберете заболяване</option>
                      {availableDiseases.map((disease, index) => (
                        <option key={index} value={disease}>
                          {disease}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Password */}
                <div>
                  <label
                    htmlFor="quick_password"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
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
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="quick_confirm_password" className="block text-xs font-medium text-gray-700 mb-1">
                    Потвърди парола<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="quick_confirm_password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04737d] focus:border-transparent pr-10"
                      placeholder="Повторете паролата"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
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
                  <label
                    htmlFor="quick_privacy"
                    className="text-[10px] text-gray-500 leading-tight"
                  >
                    Съгласен съм личните ми данни да бъдат обработвани за целите
                    на регистрация в базата данни за клинични проучвания,
                    съгласно{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-[#04737d] hover:underline"
                    >
                      Политика за поверителност
                    </Link>
                    .
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#f5a524] hover:bg-[#e09000] text-white font-semibold rounded-full transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Регистрация..." : "Регистрация"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
