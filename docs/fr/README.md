# Open Firenet Card

[English](../README.md) · **Français**

![Open Firenet Card — Poêle à granulés RIKA pour Home Assistant](../images/banner.svg)

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

Carte Lovelace pour l'intégration Home Assistant
[open-firenet-ha](https://github.com/openfirenet/open-firenet-ha) : affiche l'état
d'un poêle à granulés RIKA piloté par le bridge [Open Firenet](https://github.com/openfirenet/open-firenet)
et, en option, permet de le contrôler.

Une seule carte regroupe le statut du poêle, les températures, la consommation,
l'entretien, les ventilateurs MultiAir, la mécanique et la passerelle.

## Fonctionnalités

- **Statut en un coup d'œil** : état du poêle traduit (chauffe, veille, nettoyage…),
  flamme animée, température ambiante et consigne.
- **Consigne dans l'en-tête** : la consigne de chauffage reste toujours visible en
  haut de la carte, quel que soit l'état des sections ; un clic l'ouvre dans la
  boîte de dialogue Climat.
- **Sections repliables** : seules les sections essentielles (Chauffage,
  Températures, Consommation) sont dépliées au démarrage ; cliquez sur l'en-tête
  d'une section pour la déplier ou la replier. Une section repliée garde sa
  valeur clé dans l'en-tête (ex. Chauffage → la consigne), qui reste cliquable.
  Les sections importantes restent visibles, le reste est à portée de clic.
- **Détails au clic** : cliquez sur une valeur (températures, consommation,
  mécanique, passerelle), le statut ou la barre d'entretien pour ouvrir la boîte
  de dialogue de l'entité correspondante dans Home Assistant.
- **Icônes colorées** : chaque domaine a sa teinte (feu en orange, températures en
  ambre, mécanique en bleu, liaison en vert, planner en violet…), avec des
  variables de thème Home Assistant pour s'adapter au thème choisi.
- **Contrôle** (désactivable) : marche/arrêt, consigne ±, mode (Manuel / Auto /
  Confort), puissance de chauffe, ventilateurs MultiAir et leurs trims.
- **Découverte automatique** : à partir d'une seule entité ancre, la carte
  retrouve toutes les entités du même appareil. Aucune liste d'entités à saisir.
- **Robuste** : les entités absentes (modèle sans MultiAir, option non activée,
  firmware ancien) sont simplement masquées.
- **Éditeur visuel** : configurez l'entité, les sections et les contrôles depuis
  l'interface, sans écrire de YAML.

## Installation

Voir le guide détaillé : [`installation.md`](installation.md).

### Via HACS (recommandé)

1. HACS → **Tableau de bord** (Dashboard) → ⋮ → **Dépôts personnalisés**.
2. Ajoutez `https://github.com/openfirenet/open-firenet-card` en catégorie
   **Lovelace / Dashboard**.
3. Cherchez **Open Firenet Card** et installez-la.
4. La ressource est ajoutée automatiquement. Sinon, ajoutez-la manuellement :
   `/hacsfiles/open-firenet-card/open-firenet-card.js`, type **module
   JavaScript**.

### Installation manuelle

1. Copiez `dist/open-firenet-card.js` dans `<config>/www/`.
2. Paramètres → **Tableaux de bord** → ⋮ → **Ressources** → **Ajouter** :
   URL `/local/open-firenet-card.js`, type **Module JavaScript**.
3. Rechargez la page (Ctrl+F5).

## Utilisation

Ajoutez la carte à un tableau de bord (bouton **Ajouter une carte**, cherchez
**Open Firenet**), ou en YAML :

```yaml
type: custom:open-firenet-card
entity: climate.open_firenet
title: Poêle à granulés
```

## Options

| Option | Type | Défaut | Description |
|---|---|---|---|
| `entity` | `string` | `climate.open_firenet` | Entité **ancre** : la carte en déduit toutes les autres entités du même appareil. |
| `title` | `string` | nom de l'appareil | Titre affiché en haut de la carte. |
| `show_controls` | `bool` | `true` | Affiche les commandes. `false` = carte en lecture seule. |
| `sections` | `string[]` | toutes | Ordre et visibilité des sections (voir ci-dessous). |
| `expanded_sections` | `string[]` | `climate`, `temperatures`, `consumption` | Sections dépliées au démarrage. Les autres démarrent repliées (en-tête cliquable). `[]` = tout replié. |
| `service_interval` | `number` | `1500` | Intervalle d'entretien en kg, pour la barre de la section « Entretien ». |
| `language` | `string` | locale HA | Force la langue de la carte (`en`, `fr`). Sinon suit la locale de Home Assistant, avec repli sur l'anglais. |
| *(rôle)* | `string` | auto | N'importe quel rôle ci-dessous peut recevoir un `entity_id` explicite pour forcer la source. |

### Sections

| Id | Contenu |
|---|---|
| `status` | État du poêle, flamme, température ambiante, consigne |
| `climate` | Marche/arrêt, consigne ±, mode, puissance |
| `temperatures` | Ambiante, chambre de combustion, carte mère |
| `fans` | Ventilateurs MultiAir 1 & 2 (marche, vitesse, trim) |
| `consumption` | Granulés consommés, heures de fonctionnement, entretien |
| `mechanics` | Tirage (rpm), vis sans fin (rpm), volets d'air |
| `bridge` | Wi-Fi (RSSI), uptime, liaison poêle |
| `schedule` | Chauffage programmé, protection hors-gel |

La section **`status`** est toujours visible. Toutes les autres sont **repliables** :
seules celles listées dans `expanded_sections` sont dépliées au démarrage, les
autres n'affichent que leur en-tête. Un clic sur l'en-tête déplie/replie la
section (même en lecture seule, `show_controls: false`). Une section repliée
garde aussi sa valeur clé — la consigne pour Chauffage, la température ambiante,
les granulés consommés, le tirage, le niveau Wi-Fi ou l'état du planning — et un
clic dessus ouvre la boîte de dialogue de l'entité correspondante.

Exemple en lecture seule, trois sections :

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

### Rôles surchargeables

`climate`, `stove_state`, `connected`, `burning`, `problem`, `hopper_lid`,
`room_temperature`, `combustion_temperature`, `board_temperature`,
`pellets_total_kg`, `pellet_hours`, `service_countdown_kg`, `fan_speed_rpm`,
`auger_speed_rpm`, `power_actual_percent`, `air_flaps_percent`,
`air_flaps_target_percent`, `wifi_rssi`, `uptime_seconds`, `heating_power`,
`setback_temperature`, `frost_protection_temperature`, `room_temperature_offset`,
`bake_target_temperature`, `multiair_1`, `multiair_2`, `multiair_1_area`,
`multiair_2_area`, `heating_schedule`, `frost_protection`.

## Exemple de tableau de bord

Voir [`example-dashboard.yaml`](example-dashboard.yaml).

## Langue

L'interface de la carte et de l'éditeur suit la langue de Home Assistant :
**français** et **anglais** sont fournis, avec repli sur l'anglais pour toute
autre langue. Pour forcer une langue, utilisez l'option `language` :

```yaml
type: custom:open-firenet-card
entity: climate.open_firenet
language: en
```

Pour ajouter une langue, complétez le dictionnaire dans `src/localize.ts` :
le type TypeScript impose de fournir toutes les clés de la langue de référence
(`en`), et un test vérifie la complétude.

## Développement

```bash
npm install
npm run build     # produit dist/open-firenet-card.js
npm test          # tests unitaires + tests de rendu (Vitest)
npm run typecheck # vérification TypeScript
npm run watch     # build en continu
```

Pendant le développement, pointez la ressource Lovelace vers `dist/open-firenet-card.js`.

## Licence

MIT — voir [LICENSE](../../LICENSE).
