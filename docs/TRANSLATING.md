# Translating the card

The card and the visual editor are available in English, French and Spanish, and
follow the Home Assistant language by default (falling back to English). Adding a
language needs no programming.

## Where the texts live

Each language has its own file under [`src/locales/`](../src/locales/):

- [`src/locales/en.json`](../src/locales/en.json) is the **reference**
  dictionary. Every other language must define exactly the same keys: the
  TypeScript type `Record<TranslationKey, string>` refuses a missing or
  misspelled key, and a test checks there is no empty value.
- Each language is exported as a `const xx: Record<TranslationKey, string> =
  { ... }`.
- Interpolated values are written `{name}` and filled in with the `params`
  argument of `localize()` — for example `'caption.service_remaining'` uses
  `{value}`.

All dictionaries are aggregated in
[`src/locales/index.ts`](../src/locales/index.ts), which builds
`SUPPORTED_LANGUAGES`, `TRANSLATIONS` and `DURATION_UNITS`.

## Adding a language

1. Copy [`src/locales/en.json`](../src/locales/en.json) to
   `src/locales/xx.json`, where `xx` is the language code (e.g. `de`, `it`, `nl`).
2. Translate every value. Do not translate the `{placeholders}` or the key names.
3. Register the code in [`src/locales/index.ts`](../src/locales/index.ts):
   ```ts
   import { xx } from './xx';
   // …
   export const SUPPORTED_LANGUAGES = ['en', 'fr', 'es', 'xx'] as const;
   export const TRANSLATIONS: Record<SupportedLanguage, Record<TranslationKey, string>> = {
     en,
     fr,
     es,
     xx,
   };
   export const DURATION_UNITS: Record<SupportedLanguage, DurationUnits> = {
     en: { days: en['duration.days'], hours: en['duration.hours'], minutes: en['duration.minutes'] },
     fr: { days: fr['duration.days'], hours: fr['duration.hours'], minutes: fr['duration.minutes'] },
     es: { days: es['duration.days'], hours: es['duration.hours'], minutes: es['duration.minutes'] },
     xx: { days: xx['duration.days'], hours: xx['duration.hours'], minutes: xx['duration.minutes'] },
   };
   ```
4. Run the tests and the type check:
   ```bash
   npm test
   npm run typecheck
   ```

The completeness test (`test/localize.test.ts`) runs in CI and fails if a key is
missing, extra, or empty.

## Forcing a language

Until a translation exists, or to preview one, a card can pin its language:

```yaml
type: custom:open-firenet-card
entity: climate.open_firenet
language: fr
```
