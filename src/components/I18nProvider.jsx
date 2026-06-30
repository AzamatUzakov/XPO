import { createContext, useContext, useCallback, useMemo } from "react";

const I18nContext = createContext({
  locale: "ru",
  translations: {},
  t: (key) => key,
});

function getValueFromPath(source, path) {
  if (!source || !path) return undefined;
  return path.split(".").reduce((current, segment) => {
    if (current && typeof current === "object") {
      return current[segment];
    }
    return undefined;
  }, source);
}

export function I18nProvider({ locale, translations, children }) {
  const t = useCallback(
    (path, fallback) => {
      const value = getValueFromPath(translations, path);
      if (value === undefined || value === null) {
        return fallback ?? path;
      }
      return value;
    },
    [translations]
  );

  const value = useMemo(
    () => ({ locale, translations, t }),
    [locale, translations, t]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
