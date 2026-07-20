"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultLocale, dictionaries, locales, type Dictionary, type Locale } from "./dictionaries";

const STORAGE_KEY = "umka-lang";

type I18nContextValue = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) setLocaleState(stored);
  }, []);

  useEffect(() => {
    // "kz" is our internal locale key (matches the flag/UI convention), but it is not
    // a valid BCP-47 language subtag - Kazakh's ISO 639-1 code is "kk" ("kz" is a country code).
    document.documentElement.lang = locale === "kz" ? "kk" : locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <I18nContext.Provider value={{ locale, dict: dictionaries[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().dict;
}
