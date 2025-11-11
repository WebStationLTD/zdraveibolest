'use client'

import { PhoneIcon } from '@heroicons/react/24/solid';

export default function CallButton() {
  const phoneNumber = '+359888888888';
  const displayNumber = '+359 888 888 888';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`tel:${phoneNumber}`}
        className="flex items-center justify-center p-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-opacity-50"
        aria-label={`Обадете се на ${displayNumber}`}
        title={`Обадете се на ${displayNumber}`}
      >
        <PhoneIcon className="h-6 w-6" />
      </a>
    </div>
  );
} 