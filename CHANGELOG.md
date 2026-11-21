# Changelog

Notable changes to the Open Firenet Card. The headings follow the convention
used by the other Open Firenet repositories (`## Non publié`, `### New` /
`### Changes` / `### Fixes`); the text is written for users.

## Non publié

### New
- **Split log operating time.** The card now shows the "runtime log" sensor
  (`sensor.open_firenet_log_runtime`, "Fonctionnement bois") in the
  Consumption & maintenance section, as reported by the open-firenet
  integration v2.15+.

### Fixes
- When the configured `entity` does not exist, the card now says so (with the
  entity id) instead of showing an empty card with only its title.
- A bad `service_interval` value (non-numeric or ≤ 0) no longer draws a `NaN%`
  maintenance bar: the default interval is used.
- **Room temperature.** The ambient temperature now comes from the dedicated
  `room_temperature` sensor (`sensor.open_firenet_room_temperature`) instead of
  the `current_temperature` attribute of the climate entity, so it matches the
  value shown in the stove's detail view.
- **Power bar.** The power slider progress bar now respects the configured
  `[min, max]` range instead of drawing the raw value as a percentage.
- **Translations.** Fixed the "uptime" caption in French ("Durée de
  fonctionnement" instead of "Passerelle") and Spanish ("Tiempo de actividad"
  instead of "Pasarela").
- **Fans summary.** The collapsed "Fans" section header now links to the first
  available fan (`multiair_1` or `multiair_2`) instead of always `multiair_1`.
- **Entity discovery.** The last-resort entity fallback now also respects the
  anchor device's `device_id`, so two stoves on the same platform are not
  confused.
- **Service calls.** All action methods (`_setHvac`, `_adjustTemp`, `_setPreset`,
  `_setNumber`, `_toggleSwitch`, `_toggleFan`, `_setFanPreset`) now go through a
  single `_callServiceForRole` helper, removing duplicated entity-resolution
  logic.
- **`_adjustTemp` safety.** A non-numeric or ≤ 0 `target_temp_step` now falls
  back to 1 instead of producing `NaN`.
- **Editor.** The `status` section is no longer offered as a toggleable section
  (it is always visible).

### New
- **Editor language field.** The visual editor now exposes the `language`
  option.
- **Editor service interval.** The visual editor now exposes the
  `service_interval` option.
- **Editor role overrides.** The visual editor now offers per-role entity
  overrides for every supported role.

### Changes
- **Accessible controls.** Icon-only buttons (temperature −/+, fan and switch
  toggles) now carry an accessible name, the Wi-Fi bars are hidden from screen
  readers, and the flame and fan animations stop when the system asks for
  reduced motion (`prefers-reduced-motion`).
- The card logs its version to the browser console on load.
- `getCardSize` now follows the visible and expanded sections instead of a fixed
  number.
- Lint also covers the tests.
- The READMEs show a schematic illustration of the card.
- Development toolchain updated: ESLint 10, Vitest 5, happy-dom 21, Vite 8 and
  the Rollup plugins. This clears every `npm audit` finding (including a
  critical happy-dom issue). Node.js 22.12+ is now required for development, and
  the CI runs on Node 22 and 24. TypeScript stays on 5.x: the TypeScript ESLint
  plugin does not support TypeScript 7 yet.

## v0.1.0 (2026-10-16)

### New
- First release: a Lovelace card for the
  [Open Firenet](https://github.com/openfirenet/open-firenet) integration. It
  shows the RIKA pellet stove status, temperatures, consumption, maintenance,
  MultiAir fans, mechanics and bridge, and can control the stove (on/off, target
  temperature, mode, power, fans).
- **Auto-discovery**: from a single anchor entity, the card finds every entity of
  the same device.
- **Collapsible sections** with the key value kept visible in a collapsed
  header, and clickable values that open Home Assistant's more-info dialog.
- Per-domain coloured icons, following the Home Assistant theme.
- Visual editor (no YAML needed) and English/French localisation.

### Fixes
- Resolve the climate entity even when it carries no translation key.
