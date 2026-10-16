import { describe, expect, it } from 'vitest';

import {
  TRANSLATIONS,
  localize,
  pickLanguage,
  translator,
  type TranslationKey,
} from '../src/localize';

describe('pickLanguage', () => {
  it('uses an explicit override first', () => {
    expect(pickLanguage({ language: 'en' }, 'fr')).toBe('fr');
  });

  it('reads the Home Assistant locale and strips the region', () => {
    expect(pickLanguage({ language: 'en', locale: { language: 'fr-FR' } })).toBe('fr');
  });

  it('falls back to hass.language', () => {
    expect(pickLanguage({ language: 'fr' })).toBe('fr');
  });

  it('falls back to English for unsupported languages', () => {
    expect(pickLanguage({ language: 'de' })).toBe('en');
    expect(pickLanguage(undefined)).toBe('en');
    expect(pickLanguage({ language: '' })).toBe('en');
  });
});

describe('localize', () => {
  it('returns the string in the requested language', () => {
    expect(localize('fr', 'badge.connected')).toBe('Connecté');
    expect(localize('en', 'badge.connected')).toBe('Connected');
  });

  it('interpolates named parameters', () => {
    expect(localize('en', 'caption.power_set', { value: 70 })).toBe('(set 70 %)');
    expect(localize('fr', 'caption.service_remaining', { value: 320 })).toBe('reste 320 kg');
  });

  it('interpolates every occurrence of a parameter', () => {
    expect(localize('en', 'caption.wifi', { quality: 'Good' })).toBe('Wi-Fi · Good');
  });

  it('returns the key itself for an unknown key', () => {
    expect(localize('fr', 'nope.not.a.key' as TranslationKey)).toBe('nope.not.a.key');
  });
});

describe('translator', () => {
  it('binds a language', () => {
    const t = translator('fr');
    expect(t('button.start')).toBe('Démarrer');
    expect(t('button.stop')).toBe('Arrêter');
    const en = translator('en');
    expect(en('button.start')).toBe('Start');
  });
});

describe('translation completeness', () => {
  it('defines every English key in each supported language', () => {
    const referenceKeys = Object.keys(TRANSLATIONS.en).sort();
    for (const [lang, dict] of Object.entries(TRANSLATIONS)) {
      expect(Object.keys(dict).sort(), `language: ${lang}`).toEqual(referenceKeys);
    }
  });

  it('has no empty translation', () => {
    for (const [lang, dict] of Object.entries(TRANSLATIONS)) {
      for (const [key, value] of Object.entries(dict)) {
        expect(value, `${lang}/${key}`).not.toBe('');
      }
    }
  });
});
