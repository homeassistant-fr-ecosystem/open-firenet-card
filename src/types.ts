/**
 * Minimal typings for the parts of the Home Assistant frontend this card uses.
 * The card is loaded by Home Assistant; `hass` is injected by the dashboard at runtime.
 */

export interface HassEntityAttributes {
  friendly_name?: string;
  icon?: string;
  unit_of_measurement?: string;
  /** climate */
  current_temperature?: number;
  temperature?: number;
  min_temp?: number;
  max_temp?: number;
  target_temp_step?: number;
  preset_modes?: string[];
  preset_mode?: string;
  hvac_modes?: string[];
  /** fan */
  percentage?: number;
  preset_modes_fan?: string[];
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed: string;
  last_updated: string;
}

export interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  area_id?: string | null;
  platform?: string;
  translation_key?: string | null;
  original_name?: string | null;
  disabled_by?: string | null;
  hidden_by?: string | null;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  model?: string | null;
  manufacturer?: string | null;
  sw_version?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities: Record<string, EntityRegistryEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  language: string;
  locale?: { language: string; number_format?: string; time_format?: string };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[] },
  ): Promise<unknown>;
  /** Format an entity state in the user's language and units (may be absent on older frontends). */
  formatEntityState?(stateObj: HassEntity): string;
  /** Format an entity name in the user's language (may be absent on older frontends). */
  formatEntityName?(stateObj: HassEntity): string;
}

export const SECTION_IDS = [
  'status',
  'climate',
  'temperatures',
  'fans',
  'consumption',
  'mechanics',
  'bridge',
  'schedule',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** Sections that can be collapsed; `status` is always visible. */
export const COLLAPSIBLE_SECTIONS = SECTION_IDS.filter(
  (id): id is Exclude<SectionId, 'status'> => id !== 'status',
);

/**
 * Card configuration.
 *
 * `entity` is the anchor entity (default `climate.open_firenet`); the card finds
 * every other entity of the same device from it. Any role can be overridden by
 * adding its name (e.g. `room_temperature: sensor.xxx`).
 */
export interface OpenFirenetCardConfig {
  type?: string;
  entity?: string;
  title?: string;
  show_controls?: boolean;
  sections?: SectionId[];
  /** Sections that start expanded; the others start collapsed. */
  expanded_sections?: SectionId[];
  /** Force a display language instead of following the Home Assistant locale. */
  language?: string;
  /** Maintenance interval in kg, used to draw the service countdown bar. */
  service_interval?: number;
  /** Per-role entity id overrides. */
  [key: string]: unknown;
}
