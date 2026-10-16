# Open Firenet Card

![Open Firenet Card — RIKA pellet stove for Home Assistant](docs/images/banner.svg)

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**English** · [Français](docs/fr/README.md)

A Lovelace card for the Home Assistant integration
[open-firenet-ha](https://github.com/openfirenet/open-firenet-ha): it shows the
state of a RIKA pellet stove driven by the
[Open Firenet](https://github.com/openfirenet/open-firenet) bridge and, optionally,
lets you control it.

A single card gathers the stove status, temperatures, consumption, maintenance,
MultiAir fans, mechanics and the bridge.

## Features

- **Status at a glance**: translated stove state (heating, standby, cleaning…),
  animated flame, ambient temperature and target temperature.
- **Collapsible sections**: only the essential sections (Heating, Temperatures,
  Consumption) are expanded on load; click a section header to expand or collapse
  it. A collapsed section keeps its key value in the header (e.g. Heating → the
  target temperature), which stays clickable. The important sections stay
  visible, the rest is one click away.
- **Click for details**: click a value (temperatures, consumption, mechanics,
  bridge), the status or the maintenance bar to open Home Assistant's more-info
  dialog for the matching entity.
- **Coloured icons**: each domain has its own accent (fire in orange, temperatures
  in amber, mechanics in blue, link in green, schedule in violet…), using Home
  Assistant theme variables so it follows the selected theme.
- **Controls** (can be disabled): on/off, target ±, mode (Manual / Auto / Comfort),
  heating power, MultiAir fans and their trims.
- **Auto-discovery**: from a single anchor entity, the card finds every entity of
  the same device. No entity list to fill in.
- **Robust**: missing entities (model without MultiAir, option not enabled, older
  firmware) are simply hidden.
- **Visual editor**: configure the entity, sections and controls from the UI,
  without writing YAML.

## Installation

See the detailed guide: [`docs/installation.md`](docs/installation.md).

### Via HACS (recommended)

1. HACS → **Dashboard** → ⋮ → **Custom repositories**.
2. Add `https://github.com/openfirenet/open-firenet-card` with category
   **Lovelace / Dashboard**.
3. Search for **Open Firenet Card** and install it.
4. The resource is added automatically. Otherwise, add it manually:
   `/hacsfiles/open-firenet-card/open-firenet-card.js`, type **JavaScript
   module**.

### Manual installation

1. Copy `dist/open-firenet-card.js` into `<config>/www/`.
2. Settings → **Dashboards** → ⋮ → **Resources** → **Add**:
   URL `/local/open-firenet-card.js`, type **JavaScript module**.
3. Reload the page (Ctrl+F5).

## Usage

Add the card to a dashboard (button **Add card**, search for **Open Firenet**),
or in YAML:

```yaml
type: custom:open-firenet-card
entity: climate.open_firenet
title: Pellet stove
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | `string` | `climate.open_firenet` | **Anchor** entity: the card derives every other entity of the same device from it. |
| `title` | `string` | device name | Title shown at the top of the card. |
| `show_controls` | `bool` | `true` | Show the controls. `false` = read-only card. |
| `sections` | `string[]` | all | Order and visibility of the sections (see below). |
| `expanded_sections` | `string[]` | `climate`, `temperatures`, `consumption` | Sections expanded on load. The others start collapsed (clickable header). `[]` = all collapsed. |
| `service_interval` | `number` | `1500` | Maintenance interval in kg, for the “Maintenance” section bar. |
| `language` | `string` | HA locale | Force the card language (`en`, `fr`). Otherwise follows the Home Assistant locale, falling back to English. |
| *(role)* | `string` | auto | Any role below can take an explicit `entity_id` to force the source. |

### Sections

| Id | Content |
|---|---|
| `status` | Stove state, flame, ambient temperature, target |
| `climate` | On/off, target ±, mode, power |
| `temperatures` | Ambient, combustion chamber, mainboard |
| `fans` | MultiAir 1 & 2 fans (on/off, speed, trim) |
| `consumption` | Pellets consumed, operating hours, maintenance |
| `mechanics` | Flue draft (rpm), auger (rpm), air flaps |
| `bridge` | Wi-Fi (RSSI), uptime, stove link |
| `schedule` | Heating schedule, frost protection |

The **`status`** section is always visible. All the others are **collapsible**:
only those listed in `expanded_sections` are expanded on load, the others show
just their header. Clicking a header expands/collapses the section (even in
read-only mode, `show_controls: false`). A collapsed header also keeps the
section's key value — the target temperature for Heating, the ambient
temperature, the pellet count, the flue draft, the Wi-Fi level or the schedule
state — and clicking it opens the matching entity dialog.

Read-only example with three sections:

```yaml
type: custom:open-firenet-card
entity: climate.open_firenet
show_controls: false
sections:
  - status
  - temperatures
  - consumption
expanded_sections:
  - temperatures
  - consumption
```

### Overridable roles

`climate`, `stove_state`, `connected`, `burning`, `problem`, `hopper_lid`,
`room_temperature`, `combustion_temperature`, `board_temperature`,
`pellets_total_kg`, `pellet_hours`, `service_countdown_kg`, `fan_speed_rpm`,
`auger_speed_rpm`, `power_actual_percent`, `air_flaps_percent`,
`air_flaps_target_percent`, `wifi_rssi`, `uptime_seconds`, `heating_power`,
`setback_temperature`, `frost_protection_temperature`, `room_temperature_offset`,
`bake_target_temperature`, `multiair_1`, `multiair_2`, `multiair_1_area`,
`multiair_2_area`, `heating_schedule`, `frost_protection`.

## Example dashboard

See [`docs/example-dashboard.yaml`](docs/example-dashboard.yaml).

## Language

The card and editor UI follow the Home Assistant language: **English** and
**French** are provided, falling back to English for any other language. To force
a language, use the `language` option:

```yaml
type: custom:open-firenet-card
entity: climate.open_firenet
language: en
```

To add a language, complete the dictionary in `src/localize.ts`: the TypeScript
type requires every key of the reference language (`en`), and a test checks
completeness.

## Development

```bash
npm install
npm run build     # produces dist/open-firenet-card.js
npm test          # unit tests + render tests (Vitest)
npm run typecheck # TypeScript check
npm run watch     # continuous build
```

During development, point the Lovelace resource at `dist/open-firenet-card.js`.

## License

MIT — see [LICENSE](LICENSE).
