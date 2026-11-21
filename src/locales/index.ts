import { en } from './en';
import { fr } from './fr';
import { es } from './es';
import type { TranslationKey } from './en';

export { en, fr, es };
export type { TranslationKey };

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
