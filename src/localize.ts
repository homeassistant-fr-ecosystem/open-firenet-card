import type { HomeAssistant } from './types';

/**
 * Strings shown by the card and the visual editor.
 * `en` is the reference dictionary: every other language must define all of its
 * keys (enforced by the `Record<TranslationKey, string>` type).
 */
const en = {
  'card.default_title': 'Pellet stove',
  'error.config_missing': 'open-firenet-card: configuration is missing',
  'error.no_entities':
    'No Open Firenet entity found. Make sure the integration is installed, or set the "entity" option.',
  'error.entity_not_found':
    'Entity "{entity}" was not found. Check the "entity" option of the card.',

  'badge.connected': 'Connected',
  'badge.offline': 'Offline',
  'badge.flame': 'Flame',
  'badge.hopper_open': 'Hopper open',
  'badge.error': 'Error',

  'section.status': 'Stove status',
  'section.climate': 'Heating',
  'section.temperatures': 'Temperatures',
  'section.fans': 'Fans',
  'section.consumption': 'Consumption & maintenance',
  'section.mechanics': 'Mechanics',
  'section.bridge': 'Bridge',
  'section.schedule': 'Schedule & protection',

  'caption.ambient': 'Ambient',
  'caption.target': 'Target',
  'caption.mode': 'Mode',
  'caption.power': 'Power',
  'caption.power_set': '(set {value} %)',
  'caption.combustion': 'Combustion chamber',
  'caption.board': 'Mainboard',
  'caption.pellets': 'Pellets consumed',
  'caption.operating_hours': 'Operating hours',
  'caption.service': 'Maintenance',
  'caption.service_remaining': 'remaining {value} kg',
  'caption.draft': 'Flue draft',
  'caption.auger': 'Auger',
  'caption.flaps': 'Air flaps',
  'caption.flaps_target': 'Air flaps (target {value} %)',
  'caption.wifi': 'Wi-Fi · {quality}',
  'caption.uptime': 'Uptime',
  'caption.link': 'Stove link',
  'caption.trim': 'Convection trim',
  'caption.enabled': 'Enabled',
  'caption.disabled': 'Disabled',
  'caption.running': 'Running',
  'caption.stopped': 'Stopped',
  'caption.fan_on': 'On',
  'caption.fan_off': 'Off',

  'button.start': 'Start',
  'button.stop': 'Stop',

  'aria.enable': 'Enable',
  'aria.disable': 'Disable',
  'aria.decrease_target': 'Decrease the target temperature',
  'aria.increase_target': 'Increase the target temperature',

  'switch.heating_schedule': 'Heating schedule',
  'switch.frost_protection': 'Frost protection',

  'preset.manual': 'Manual',
  'preset.auto': 'Auto',
  'preset.comfort': 'Comfort',

  'quality.excellent': 'Excellent',
  'quality.good': 'Good',
  'quality.fair': 'Fair',
  'quality.weak': 'Weak',
  'quality.very_weak': 'Very weak',
  'quality.none': '—',

  'duration.days': 'd',
  'duration.hours': 'h',
  'duration.minutes': 'min',

  'state.off': 'Off',
  'state.standby': 'Standby',
  'state.ignition': 'Ignition',
  'state.flame_start': 'Flame start',
  'state.heating': 'Heating',
  'state.cleaning': 'Cleaning',
  'state.burn_off': 'Burn off',
  'state.splitlog': 'Split log',
  'state.splitlog_check': 'Split log check',
  'state.splitlog_refuel': 'Refuel the log',
  'state.splitlog_no_refuel': 'Split log — no refuel',
  'state.unknown': 'Unknown',

  'editor.anchor': 'Anchor entity',
  'editor.anchor_hint': 'By default the card finds every entity of the same device.',
  'editor.title': 'Title (optional)',
  'editor.title_placeholder': 'Pellet stove',
  'editor.show_controls': 'Show controls',
  'editor.sections': 'Displayed sections',
  'editor.section.status': 'Stove status',
  'editor.section.climate': 'Heating (on/off, target, mode, power)',
  'editor.section.temperatures': 'Temperatures',
  'editor.section.fans': 'MultiAir fans',
  'editor.section.consumption': 'Consumption & maintenance',
  'editor.section.mechanics': 'Mechanics (draft, auger, flaps)',
  'editor.section.bridge': 'Bridge (Wi-Fi, uptime, link)',
  'editor.section.schedule': 'Schedule & frost protection',
  'editor.expanded_sections': 'Expanded by default',
  'editor.expanded_sections_hint':
    'The other sections start collapsed; click a section header to expand it.',
} as const;

export type TranslationKey = keyof typeof en;

const fr: Record<TranslationKey, string> = {
  'card.default_title': 'Poêle à granulés',
  'error.config_missing': 'open-firenet-card : configuration manquante',
  'error.no_entities':
    "Aucune entité Open Firenet trouvée. Vérifiez que l'intégration est installée ou renseignez l'option « entity ».",
  'error.entity_not_found':
    "L'entité « {entity} » est introuvable. Vérifiez l'option « entity » de la carte.",

  'badge.connected': 'Connecté',
  'badge.offline': 'Hors ligne',
  'badge.flame': 'Flamme',
  'badge.hopper_open': 'Couvercle ouvert',
  'badge.error': 'Erreur',

  'section.status': 'Statut du poêle',
  'section.climate': 'Chauffage',
  'section.temperatures': 'Températures',
  'section.fans': 'Ventilateurs',
  'section.consumption': 'Consommation & entretien',
  'section.mechanics': 'Mécanique',
  'section.bridge': 'Passerelle',
  'section.schedule': 'Planning & protection',

  'caption.ambient': 'Ambiante',
  'caption.target': 'Consigne',
  'caption.mode': 'Mode',
  'caption.power': 'Puissance',
  'caption.power_set': '(réglée {value} %)',
  'caption.combustion': 'Chambre de combustion',
  'caption.board': 'Carte mère',
  'caption.pellets': 'Granulés consommés',
  'caption.operating_hours': 'Heures de fonctionnement',
  'caption.service': 'Entretien',
  'caption.service_remaining': 'reste {value} kg',
  'caption.draft': 'Tirage',
  'caption.auger': 'Vis sans fin',
  'caption.flaps': "Volets d'air",
  'caption.flaps_target': "Volets (cible {value} %)",
  'caption.wifi': 'Wi-Fi · {quality}',
  'caption.uptime': 'Passerelle',
  'caption.link': 'Liaison poêle',
  'caption.trim': 'Trim convection',
  'caption.enabled': 'Activé',
  'caption.disabled': 'Désactivé',
  'caption.running': 'En marche',
  'caption.stopped': "À l'arrêt",
  'caption.fan_on': 'Marche',
  'caption.fan_off': 'Arrêt',

  'button.start': 'Démarrer',
  'button.stop': 'Arrêter',

  'aria.enable': 'Activer',
  'aria.disable': 'Désactiver',
  'aria.decrease_target': 'Diminuer la consigne',
  'aria.increase_target': 'Augmenter la consigne',

  'switch.heating_schedule': 'Chauffage programmé',
  'switch.frost_protection': 'Hors-gel',

  'preset.manual': 'Manuel',
  'preset.auto': 'Auto',
  'preset.comfort': 'Confort',

  'quality.excellent': 'Excellent',
  'quality.good': 'Bon',
  'quality.fair': 'Moyen',
  'quality.weak': 'Faible',
  'quality.very_weak': 'Très faible',
  'quality.none': '—',

  'duration.days': 'j',
  'duration.hours': 'h',
  'duration.minutes': 'min',

  'state.off': 'Éteint',
  'state.standby': 'Veille',
  'state.ignition': 'Allumage',
  'state.flame_start': 'Démarrage flamme',
  'state.heating': 'En chauffe',
  'state.cleaning': 'Nettoyage',
  'state.burn_off': 'Extinction',
  'state.splitlog': 'Bûche',
  'state.splitlog_check': 'Contrôle bûche',
  'state.splitlog_refuel': 'Recharger la bûche',
  'state.splitlog_no_refuel': 'Bûche — pas de rechargement',
  'state.unknown': 'Inconnu',

  'editor.anchor': 'Entité ancre',
  'editor.anchor_hint': 'Par défaut, la carte retrouve toutes les entités du même appareil.',
  'editor.title': 'Titre (optionnel)',
  'editor.title_placeholder': 'Poêle à granulés',
  'editor.show_controls': 'Afficher les contrôles',
  'editor.sections': 'Sections affichées',
  'editor.section.status': 'Statut du poêle',
  'editor.section.climate': 'Chauffage (marche/arrêt, consigne, mode, puissance)',
  'editor.section.temperatures': 'Températures',
  'editor.section.fans': 'Ventilateurs MultiAir',
  'editor.section.consumption': 'Consommation & entretien',
  'editor.section.mechanics': 'Mécanique (tirage, vis, volets)',
  'editor.section.bridge': 'Passerelle (Wi-Fi, uptime, liaison)',
  'editor.section.schedule': 'Planning & protection hors-gel',
  'editor.expanded_sections': 'Ouvertes par défaut',
  'editor.expanded_sections_hint':
    "Les autres sections sont repliées ; cliquez sur l'en-tête d'une section pour la déplier.",
};

const es: Record<TranslationKey, string> = {
  "card.default_title": "Estufa de Pellets",
  "error.config_missing": "open-firenet-card: configuración faltante",
  "error.no_entities":
    "No se ha encontrado ninguna entidad Open Firenet. Compruebe que la integración esté instalada o configure la opción « entity ».",
  "error.entity_not_found":
    "La entidad « {entity} » no se encuentra. Compruebe la opción « entity » de la tarjeta.",

  "badge.connected": "Conectado",
  "badge.offline": "Desconectado",
  "badge.flame": "Llama",
  "badge.hopper_open": "Tapa abierta",
  "badge.error": "Error",

  "section.status": "Estado de la estufa",
  "section.climate": "Calefacción",
  "section.temperatures": "Temperaturas",
  "section.fans": "Ventiladores",
  "section.consumption": "Consumo y mantenimiento",
  "section.mechanics": "Mecánica",
  "section.bridge": "Pasarela",
  "section.schedule": "Programación y protección",

  "caption.ambient": "Ambiente",
  "caption.target": "Consigna",
  "caption.mode": "Modo",
  "caption.power": "Potencia",
  "caption.power_set": "(configurado {value} %)",
  "caption.combustion": "Cámara de combustión",
  "caption.board": "Placa base",
  "caption.pellets": "Pellets consumidos",
  "caption.operating_hours": "Horas de funcionamiento",
  "caption.service": "Mantenimiento",
  "caption.service_remaining": "quedan {value} kg",
  "caption.draft": "Tiro",
  "caption.auger": "Tornillo sin fin",
  "caption.flaps": "Compuertas de aire",
  "caption.flaps_target": "Compuertas (objetivo {value} %)",
  "caption.wifi": "Wi-Fi · {quality}",
  "caption.uptime": "Pasarela",
  "caption.link": "Enlace de la estufa",
  "caption.trim": "Ajuste de convección",
  "caption.enabled": "Activado",
  "caption.disabled": "Desactivado",
  "caption.running": "En marcha",
  "caption.stopped": "Detenido",
  "caption.fan_on": "Marcha",
  "caption.fan_off": "Parada",

  "button.start": "Iniciar",
  "button.stop": "Detener",

  "aria.enable": "Activar",
  "aria.disable": "Desactivar",
  "aria.decrease_target": "Disminuir la consigna",
  "aria.increase_target": "Aumentar la consigna",

  "switch.heating_schedule": "Calefacción programada",
  "switch.frost_protection": "Antihielo",

  "preset.manual": "Manual",
  "preset.auto": "Auto",
  "preset.comfort": "Confort",

  "quality.excellent": "Excelente",
  "quality.good": "Bueno",
  "quality.fair": "Regular",
  "quality.weak": "Débil",
  "quality.very_weak": "Muy débil",
  "quality.none": "—",

  "duration.days": "d",
  "duration.hours": "h",
  "duration.minutes": "min",

  "state.off": "Apagado",
  "state.standby": "En espera",
  "state.ignition": "Encendido",
  "state.flame_start": "Inicio de llama",
  "state.heating": "Calentando",
  "state.cleaning": "Limpieza",
  "state.burn_off": "Extinción",
  "state.splitlog": "Leña",
  "state.splitlog_check": "Control de leña",
  "state.splitlog_refuel": "Recargar leña",
  "state.splitlog_no_refuel": "Leña — sin recarga",
  "state.unknown": "Desconocido",

  "editor.anchor": "Entidad ancla",
  "editor.anchor_hint":
    "Por defecto, la tarjeta encuentra todas las entidades del mismo dispositivo.",
  "editor.title": "Título (opcional)",
  "editor.title_placeholder": "Estufa de pellets",
  "editor.show_controls": "Mostrar controles",
  "editor.sections": "Secciones mostradas",
  "editor.section.status": "Estado de la estufa",
  "editor.section.climate":
    "Calefacción (encendido/apagado, consigna, modo, potencia)",
  "editor.section.temperatures": "Temperaturas",
  "editor.section.fans": "Ventiladores MultiAir",
  "editor.section.consumption": "Consumo y mantenimiento",
  "editor.section.mechanics": "Mecánica (tiro, tornillo, compuertas)",
  "editor.section.bridge": "Pasarela (Wi-Fi, tiempo de actividad, enlace)",
  "editor.section.schedule": "Programación y protección antihielo",
  "editor.expanded_sections": "Abiertas por defecto",
  "editor.expanded_sections_hint":
    "Las demás secciones están contraídas; haz clic en el encabezado de una sección para desplegarla.",
};

export const SUPPORTED_LANGUAGES = ["en", "fr", "es"] as const;
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

/**
 * Resolve the display language from an explicit override, then the Home
 * Assistant locale (`fr-FR` → `fr`), falling back to English.
 */
export function pickLanguage(
  hass?: Pick<HomeAssistant, 'language'> & Partial<Pick<HomeAssistant, 'locale'>>,
  override?: string,
): SupportedLanguage {
  const candidate = override || hass?.locale?.language || hass?.language || 'en';
  const base = String(candidate).toLowerCase().split('-')[0];
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(base)
    ? (base as SupportedLanguage)
    : 'en';
}

/** Translate a key, with `{name}` interpolation. Unknown keys return the key. */
export function localize(
  lang: SupportedLanguage,
  key: TranslationKey,
  params?: Record<string, string | number>,
): string {
  const dictionary = TRANSLATIONS[lang] ?? en;
  let text: string = dictionary[key] ?? en[key] ?? key;
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}

/** Curried translator bound to one language, for use in render methods. */
export function translator(
  lang: SupportedLanguage,
): (key: TranslationKey, params?: Record<string, string | number>) => string {
  return (key, params) => localize(lang, key, params);
}
