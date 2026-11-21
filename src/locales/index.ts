import en from './en.json';
import fr from './fr.json';
import es from './es.json';

export { en, fr, es };
export type TranslationKey = keyof typeof en;

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'es'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const TRANSLATIONS: Record<SupportedLanguage, Record<TranslationKey, string>> = {
  en,
  fr,
  es,
};

export interface DurationUnits {
  days: string;
  hours: string;
  minutes: string;
}

export const DURATION_UNITS: Record<SupportedLanguage, DurationUnits> = {
  en: { days: en['duration.days'], hours: en['duration.hours'], minutes: en['duration.minutes'] },
  fr: { days: fr['duration.days'], hours: fr['duration.hours'], minutes: fr['duration.minutes'] },
  es: { days: es['duration.days'], hours: es['duration.hours'], minutes: es['duration.minutes'] },
};
