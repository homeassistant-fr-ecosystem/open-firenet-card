# Contributing to the Open Firenet Card

Thank you for your interest! You do not need to write code to help: reports,
translations and documentation are just as valuable.

The website has the overview of every way to help:
**https://openfirenet.github.io/contribute.html**

In short:

- **Something is broken, or a stove is missing a value?** Open an issue with the
  matching form. Say which card version you run (it is printed in the browser
  console, look for `OPEN-FIRENET-CARD`), your Home Assistant version, your
  browser, and the card configuration.
- **Translations**: see [docs/TRANSLATING.md](docs/TRANSLATING.md). No
  programming needed.
- **The bridge / firmware** and the **Home Assistant integration** live in their
  own repositories: [open-firenet](https://github.com/openfirenet/open-firenet)
  and [open-firenet-ha](https://github.com/openfirenet/open-firenet-ha).

## Development

You need **Node.js 22.12 or newer** (Vitest 5 and Vite 8 require it).

```bash
npm install
npm run build     # produces dist/open-firenet-card.js
npm test          # unit + render tests (Vitest)
npm run typecheck # TypeScript check
npm run lint      # ESLint (src and test)
npm run watch     # continuous build
```

Point the Lovelace resource at `dist/open-firenet-card.js` to try the card in a
Home Assistant instance.

## Changing the card

1. **Open an issue first**, or comment on an existing one, to agree on what to do.
2. **One branch per change**, named after the issue: `fix/42-short-description`,
   `feat/42-short-description`.
3. **Add tests** for new behaviour: the render tests in `test/card.test.ts` mount
   the card in a DOM and check what it shows and what services it calls.
4. **Add a line to `CHANGELOG.md`** under `## Non publié`, in English, written for
   users: what changes for them.
5. **Rebuild `dist/`** (`npm run build`) if the change affects the bundle, and
   commit it together with the source.
6. **Open a pull request** whose description starts with `Fixes #42` (or
   `Refs #42` for a partial change).

The CI runs lint, type check, tests and the HACS validation on every pull
request.
