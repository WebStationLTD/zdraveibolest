"use client";

import dynamic from "next/dynamic";

// Динамично зареждане на StickyQuickRegister само на клиента
const StickyQuickRegister = dynamic(() => import("./StickyQuickRegister"), {
  ssr: false,
});

export default function StickyQuickRegisterWrapper() {
  return <StickyQuickRegister />;
}
