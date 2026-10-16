import { STOVE_STATES, UNKNOWN_STATE, type StoveStateInfo } from './const';
import {
  DURATION_UNITS,
  type DurationUnits,
  type SupportedLanguage,
  type TranslationKey,
} from './localize';
import type { HassEntity } from './types';

/** Numeric value of an entity, or null for un/available/not-a-number states. */
export function stateNumber(entity?: HassEntity | null): number | null {
  if (!entity) {
    return null;
  }
  const raw = entity.state;
  if (raw === '' || raw === 'unknown' || raw === 'unavailable') {
    return null;
  }
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

/** Whether an entity exists and carries a usable state. */
export function isAvailable(entity?: HassEntity | null): boolean {
  return !!entity && entity.state !== 'unknown' && entity.state !== 'unavailable';
}

/** Whether a binary-ish entity is on. */
export function isOn(entity?: HassEntity | null): boolean {
  return entity?.state === 'on';
}

/**
 * Format a number for display. Returns an em dash for null/NaN so a missing
 * value never shows as "NaN" or "0".
 */
export function formatNumber(
  value: number | null,
  digits = 1,
  lang?: SupportedLanguage,
): string {
  if (value === null || !Number.isFinite(value)) {
    return '—';
  }
  return value.toLocaleString(lang, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

/**
 * Format a duration in seconds as a short string. The unit words are supplied
 * by the caller (per language) so the result is localised.
 */
export function formatDuration(
  seconds: number | null,
  units: DurationUnits = DURATION_UNITS.en,
): string {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) {
    return '—';
  }
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) {
    return `${days} ${units.days} ${hours} ${units.hours}`;
  }
  if (hours > 0) {
    return `${hours} ${units.hours} ${minutes} ${units.minutes}`;
  }
  return `${minutes} ${units.minutes}`;
}

export interface SignalQuality {
  /** Translation key for the human label. */
  key: TranslationKey;
  /** 0..4, for a 4-bar indicator. */
  level: number;
}

/** Classify a Wi-Fi RSSI (dBm) into a label key and a 0..4 level. */
export function rssiQuality(dbm: number | null): SignalQuality {
  if (dbm === null) {
    return { key: 'quality.none', level: 0 };
  }
  if (dbm >= -50) {
    return { key: 'quality.excellent', level: 4 };
  }
  if (dbm >= -60) {
    return { key: 'quality.good', level: 3 };
  }
  if (dbm >= -70) {
    return { key: 'quality.fair', level: 2 };
  }
  if (dbm >= -80) {
    return { key: 'quality.weak', level: 1 };
  }
  return { key: 'quality.very_weak', level: 0 };
}

/**
 * Service countdown as a percentage of the maintenance interval, clamped to
 * 0..100. Null when the interval is not usable.
 */
export function serviceLevel(
  remainingKg: number | null,
  intervalKg: number,
): number | null {
  if (remainingKg === null || !Number.isFinite(remainingKg) || intervalKg <= 0) {
    return null;
  }
  return Math.max(0, Math.min(100, (remainingKg / intervalKg) * 100));
}

/** Severity tier of the service countdown, for colouring. */
export function serviceTone(percent: number | null): 'ok' | 'warn' | 'danger' {
  if (percent === null) {
    return 'ok';
  }
  if (percent < 10) {
    return 'danger';
  }
  if (percent < 25) {
    return 'warn';
  }
  return 'ok';
}

/** Info (translation key, icon, tone) for a stove state key. */
export function stoveStateInfo(key?: string | null): StoveStateInfo {
  if (key && key in STOVE_STATES) {
    return STOVE_STATES[key];
  }
  return UNKNOWN_STATE;
}
