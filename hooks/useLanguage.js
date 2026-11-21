"use client";

import React from "react";
import en from "../lib/i18n/en.js";
import km from "../lib/i18n/km.js";

const DICTIONARIES = { en, km };
const STORAGE_KEY = "pteah-language";

const LanguageContext = React.createContext({
  language: "en",
  t: en,
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = React.useState("en");

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "km") setLanguageState(stored);
    } catch {
      // localStorage can be unavailable (private browsing, etc.) — default stays "en".
    }
  }, []);

  const setLanguage = (next) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore write failures; the choice just won't persist across reloads.
    }
  };

  const value = { language, t: DICTIONARIES[language], setLanguage };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export default function useLanguage() {
  return React.useContext(LanguageContext);
}
