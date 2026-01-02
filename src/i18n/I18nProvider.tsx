import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, type Lang } from "./translations";

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations["en"]) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
	const saved = localStorage.getItem("lang");
	if (saved === "en" || saved === "ru" || saved === "ua") return saved;
	return "ua"; // ✅ default Ukrainian
  });

  const setLang = (l: Lang) => setLangState(l);

  useEffect(() => {
	localStorage.setItem("lang", lang);
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => {
	return {
	  lang,
	  setLang,
	  t: (key) => translations[lang][key] ?? translations.en[key],
	};
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
};