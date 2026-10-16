import { DOMAIN } from './const';
import type { HomeAssistant, OpenFirenetCardConfig } from './types';

/**
 * Logical roles the card displays. Each role maps to one entity of the stove.
 * The integration sets `translation_key` on every entity, so roles are resolved
 * by translation key first (stable across renames), with an entity-id suffix as a
 * fallback and an explicit config override on top.
 */
export type Role =
  | 'climate'
  | 'stove_state'
  | 'connected'
  | 'burning'
  | 'problem'
  | 'hopper_lid'
  | 'room_temperature'
  | 'combustion_temperature'
  | 'board_temperature'
  | 'pellets_total_kg'
  | 'pellet_hours'
  | 'service_countdown_kg'
  | 'fan_speed_rpm'
  | 'auger_speed_rpm'
  | 'power_actual_percent'
  | 'air_flaps_percent'
  | 'air_flaps_target_percent'
  | 'wifi_rssi'
  | 'uptime_seconds'
  | 'heating_power'
  | 'setback_temperature'
  | 'frost_protection_temperature'
  | 'room_temperature_offset'
  | 'bake_target_temperature'
  | 'multiair_1'
  | 'multiair_2'
  | 'multiair_1_area'
  | 'multiair_2_area'
  | 'heating_schedule'
  | 'frost_protection';

interface RoleSpec {
  domain: string;
  /** `translation_key` set by the integration. */
  key: string;
}

export const ROLES: Record<Role, RoleSpec> = {
  climate: { domain: 'climate', key: 'open_firenet' },
  stove_state: { domain: 'sensor', key: 'stove_state' },
  connected: { domain: 'binary_sensor', key: 'connected' },
  burning: { domain: 'binary_sensor', key: 'burning' },
  problem: { domain: 'binary_sensor', key: 'problem' },
  hopper_lid: { domain: 'binary_sensor', key: 'hopper_lid' },
  room_temperature: { domain: 'sensor', key: 'room_temperature' },
  combustion_temperature: { domain: 'sensor', key: 'combustion_temperature' },
  board_temperature: { domain: 'sensor', key: 'board_temperature' },
  pellets_total_kg: { domain: 'sensor', key: 'pellets_total_kg' },
  pellet_hours: { domain: 'sensor', key: 'pellet_hours' },
  service_countdown_kg: { domain: 'sensor', key: 'service_countdown_kg' },
  fan_speed_rpm: { domain: 'sensor', key: 'fan_speed_rpm' },
  auger_speed_rpm: { domain: 'sensor', key: 'auger_speed_rpm' },
  power_actual_percent: { domain: 'sensor', key: 'power_actual_percent' },
  air_flaps_percent: { domain: 'sensor', key: 'air_flaps_percent' },
  air_flaps_target_percent: { domain: 'sensor', key: 'air_flaps_target_percent' },
  wifi_rssi: { domain: 'sensor', key: 'wifi_rssi' },
  uptime_seconds: { domain: 'sensor', key: 'uptime_seconds' },
  heating_power: { domain: 'number', key: 'heating_power' },
  setback_temperature: { domain: 'number', key: 'setback_temperature' },
  frost_protection_temperature: { domain: 'number', key: 'frost_protection_temperature' },
  room_temperature_offset: { domain: 'number', key: 'room_temperature_offset' },
  bake_target_temperature: { domain: 'number', key: 'bake_target_temperature' },
  multiair_1: { domain: 'fan', key: 'multiair_1' },
  multiair_2: { domain: 'fan', key: 'multiair_2' },
  multiair_1_area: { domain: 'number', key: 'multiair_1_area' },
  multiair_2_area: { domain: 'number', key: 'multiair_2_area' },
  heating_schedule: { domain: 'switch', key: 'heating_schedule' },
  frost_protection: { domain: 'switch', key: 'frost_protection' },
};

export type DiscoveredEntities = Partial<Record<Role, string>>;

/** The card's anchor entity: explicit config, else the open_firenet climate. */
export function findAnchorEntity(
  hass: HomeAssistant,
  config: OpenFirenetCardConfig,
): string | undefined {
  if (config.entity) {
    return config.entity;
  }
  const registry = hass.entities ?? {};
  for (const [id, entry] of Object.entries(registry)) {
    if (entry.platform === DOMAIN && id.startsWith('climate.')) {
      return id;
    }
  }
  if (hass.states['climate.open_firenet']) {
    return 'climate.open_firenet';
  }
  return undefined;
}

/** Candidate entity ids belonging to the same device (or, failing that, the integration). */
function collectCandidates(hass: HomeAssistant, anchor?: string): string[] {
  const registry = hass.entities ?? {};
  const deviceId = anchor ? registry[anchor]?.device_id ?? undefined : undefined;

  if (deviceId) {
    const byDevice = Object.keys(registry).filter(
      (id) => registry[id].device_id === deviceId,
    );
    if (byDevice.length) {
      return byDevice;
    }
  }

  const byPlatform = Object.keys(registry).filter(
    (id) => registry[id].platform === DOMAIN,
  );
  if (byPlatform.length) {
    return byPlatform;
  }

  // Last resort: entity ids that look like ours.
  return Object.keys(hass.states).filter((id) =>
    (id.split('.')[1] ?? '').startsWith(`${DOMAIN}_`),
  );
}

/** Resolve every role to an entity id for this stove. */
export function discoverEntities(
  hass: HomeAssistant,
  config: OpenFirenetCardConfig,
): DiscoveredEntities {
  const result: DiscoveredEntities = {};
  const anchor = findAnchorEntity(hass, config);
  const candidates = collectCandidates(hass, anchor);
  const candidateSet = new Set(candidates);
  const registry = hass.entities ?? {};

  const byTranslationKey = new Map<string, string>();
  for (const id of candidates) {
    const entry = registry[id];
    const key = entry?.translation_key;
    if (key) {
      byTranslationKey.set(`${id.split('.')[0]}.${key}`, id);
    }
  }

  for (const [role, spec] of Object.entries(ROLES) as [Role, RoleSpec][]) {
    const override = config[role];
    if (typeof override === 'string' && override) {
      result[role] = override;
      continue;
    }
    const byKey = byTranslationKey.get(`${spec.domain}.${spec.key}`);
    if (byKey) {
      result[role] = byKey;
      continue;
    }
    const suffix = `.${DOMAIN}_${spec.key}`;
    const match = candidates.find((id) => candidateSet.has(id) && id.endsWith(suffix));
    if (match) {
      result[role] = match;
    }
  }

  return result;
}
