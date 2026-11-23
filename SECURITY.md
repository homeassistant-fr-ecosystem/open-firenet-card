# Security Policy

## Supported versions

The Open Firenet Card is a Home Assistant Lovelace custom card. Security fixes are
provided for the latest released version only. Older versions should be upgraded
via HACS or by replacing `dist/open-firenet-card.js` with the latest build.

## Reporting a vulnerability

The Open Firenet Card runs in the user's browser inside Home Assistant. It calls
Home Assistant services (`climate`, `number`, `switch`, `fan`) on behalf of the
user and does not store credentials, make outbound HTTP requests, or evaluate
user-supplied code.

If you discover a security issue, please report it by opening a GitHub issue in
[this repository](https://github.com/openfirenet/open-firenet-card/issues)
with the following information:

- A clear description of the vulnerability
- Steps to reproduce (card version, Home Assistant version, browser, card config)
- The expected vs actual behaviour
- Any relevant console errors

Please do not disclose the vulnerability publicly until it has been triaged and a
fix is available.

## Disclosure policy

1. Reports are acknowledged within 5 business days.
2. A fix is targeted for the next patch release.
3. The reporter is credited in the release notes (unless they prefer anonymity).

## Scope

In scope:
- Service calls made by the card (`_call` in `src/open-firenet-card.ts`)
- Rendering of entity data via Lit templates (automatic XSS escaping)
- The visual editor (`open-firenet-card-editor`)

Out of scope:
- The Open Firenet bridge / firmware (see [open-firenet](https://github.com/openfirenet/open-firenet))
- The Home Assistant integration `open-firenet-ha` (see its own repository)
- Home Assistant core or the Lovelace frontend itself
