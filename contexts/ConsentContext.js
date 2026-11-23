"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CONSENT_COOKIE = "zb_consent_v1";
const CONSENT_VERSION = 1;
const ONE_YEAR = 60 * 60 * 24 * 365;

const ConsentContext = createContext(null);

const currentPreferences = (externalMedia = false) => ({
  necessary: true,
  externalMedia,
  analytics: false,
  marketing: false,
});

function readConsentCookie() {
  const raw = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")
    .slice(1)
    .join("=");

  if (!raw) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.preferences?.externalMedia !== "boolean"
    ) {
      return null;
    }

    return {
      version: CONSENT_VERSION,
      savedAt: parsed.savedAt,
      preferences: currentPreferences(parsed.preferences.externalMedia),
    };
  } catch {
    return null;
  }
}

function writeConsentCookie(consent) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(
    JSON.stringify(consent)
  )}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax${secure}`;

  // Старият банер не е давал информирано съгласие за отделни категории.
  document.cookie =
    "brdLawCookieConsent=; Path=/; Max-Age=0; SameSite=Lax" + secure;
}

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsentCookie());
    setReady(true);
  }, []);

  const savePreferences = useCallback(
    (preferences) => {
      const nextConsent = {
        version: CONSENT_VERSION,
        savedAt: new Date().toISOString(),
        preferences: currentPreferences(Boolean(preferences.externalMedia)),
      };
      const isRevokingExternalMedia =
        consent?.preferences.externalMedia &&
        !nextConsent.preferences.externalMedia;

      writeConsentCookie(nextConsent);
      setConsent(nextConsent);
      setSettingsOpen(false);

      // Reload removes already initialized third-party players and scripts.
      if (isRevokingExternalMedia) {
        window.location.reload();
      }
    },
    [consent]
  );

  const acceptAll = useCallback(
    () => savePreferences(currentPreferences(true)),
    [savePreferences]
  );

  const rejectOptional = useCallback(
    () => savePreferences(currentPreferences(false)),
    [savePreferences]
  );

  const allowExternalMedia = useCallback(
    () => savePreferences(currentPreferences(true)),
    [savePreferences]
  );

  const value = useMemo(
    () => ({
      ready,
      hasDecision: Boolean(consent),
      preferences: consent?.preferences ?? currentPreferences(false),
      acceptAll,
      rejectOptional,
      savePreferences,
      allowExternalMedia,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [
      ready,
      consent,
      acceptAll,
      rejectOptional,
      savePreferences,
      allowExternalMedia,
      settingsOpen,
    ]
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent трябва да се използва в ConsentProvider");
  }

  return context;
}
