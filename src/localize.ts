import type { HomeAssistant } from './types';
import {
  TRANSLATIONS,
  SUPPORTED_LANGUAGES,
  en,
  type SupportedLanguage,
  type TranslationKey,
} from './locales';

/**
 * Resolve the display language from an explicit override, then the Home
 * Assistant locale (`fr-FR` → `fr`), falling back to English.
 */
export function pickLanguage(
  hass?: Pick<HomeAssistant, 'language'> & Partial<Pick<HomeAssistant, 'locale'>>,
  override?: string,
): SupportedLanguage {
  const candidate = override || hass?.locale?.language || hass?.language || 'en';
  const base = String(candidate).toLowerCase().split('-')[0];
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(base)
    ? (base as SupportedLanguage)
    : 'en';
}

/** Translate a key, with `{name}` interpolation. Unknown keys return the key. */
export function localize(
  lang: SupportedLanguage,
  key: TranslationKey,
  params?: Record<string, string | number>,
): string {
  const dictionary = TRANSLATIONS[lang] ?? en;
  let text: string = dictionary[key] ?? en[key] ?? key;
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}

/** Curried translator bound to one language, for use in render methods. */
export function translator(
  lang: SupportedLanguage,
): (key: TranslationKey, params?: Record<string, string | number>) => string {
  return (key, params) => localize(lang, key, params);
}

export type { TranslationKey } from './locales';
export { TRANSLATIONS, DURATION_UNITS, SUPPORTED_LANGUAGES } from './locales';
export type { DurationUnits, SupportedLanguage } from './locales';
