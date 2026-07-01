import ru from "../i18n/ru.json";
import en from "../i18n/en.json";
import uz from "../i18n/uz.json";

export const defaultLocale = "ru";
export const locales = ["ru", "en", "uz"];
export const prefixDefaultLocale = false;

export const localePrefixes: Record<string, string> = {
  ru: "",
  en: "/en",
  uz: "/uz",
};

export function getLocaleFromPath(pathname: string) {
  const [, first] = pathname.split("/").filter(Boolean);
  if (first && locales.includes(first)) {
    return first;
  }
  return defaultLocale;
}

export function stripLocaleFromPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && locales.includes(segments[0])) {
    segments.shift();
  }
  return "/" + segments.join("/");
}

export function getLocalizedPath(pathname: string, locale: string) {
  const cleaned = stripLocaleFromPath(pathname);
  if (locale === defaultLocale) return cleaned === "/" ? "/" : cleaned;
  return `${localePrefixes[locale] || `/${locale}`}${cleaned === "/" ? "" : cleaned}`;
}

export const translations: Record<string, any> = {
  ru,
  en,
  uz,
};

export type Translations = typeof ru;
