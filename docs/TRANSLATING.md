# Translating the card

The card and the visual editor are available in English and French, and follow
the Home Assistant language by default (falling back to English). Adding a
language needs no programming.

## Where the texts live

Everything is in one file: [`src/localize.ts`](../src/localize.ts).

- `en` is the **reference** dictionary. Every other language must define exactly
  the same keys: the TypeScript type `Record<TranslationKey, string>` refuses a
  missing or misspelled key, and a test checks there is no empty value.
- Each language is a `const xx: Record<TranslationKey, string> = { ... }`.
- Interpolated values are written `{name}` and filled in with the `params`
  argument of `localize()` — for example `'caption.service_remaining'` uses
  `{value}`.

## Adding a language

1. Copy the `en` object into a new `const de: Record<TranslationKey, string>`.
2. Translate every value. Do not translate the `{placeholders}` or the key names.
3. Register the code:
   ```ts
   export const SUPPORTED_LANGUAGES = ['en', 'fr', 'de'] as const;
   export const TRANSLATIONS = { en, fr, de };
   ```
4. Add the duration units if the language needs its own abbreviations:
   ```ts
   export const DURATION_UNITS = { en, fr, de };
   ```
5. Run the tests and the type check:
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
