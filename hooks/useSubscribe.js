"use client";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useSubscribe() {
  const [loading, setLoading] = useState(false);

  const subscribe = async (email, clearInput) => {
    setLoading(true);

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Грешка при абонирането!",
        text: "Моля, въведете валиден имейл адрес.",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        clearInput(); // Clear input field
        Swal.fire({
          icon: "success",
          title: "Успешен абонамент!",
          text: "Вие се абонирахте успешно за нашия бюлетин. Очаквайте новини и актуализации на вашия имейл!",
          timer: 4000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Грешка при абонирането!",
          text: "Моля, опитайте отново по-късно.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Неуспешно абониране!",
        text: "Проверете връзката с интернет и опитайте отново.",
      });
    }
    setLoading(false);
  };

  return { subscribe, loading };
}
