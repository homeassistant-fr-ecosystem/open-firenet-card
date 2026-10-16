import type { TranslationKey } from './localize';
import { SECTION_IDS, type SectionId } from './types';

export const DOMAIN = 'open_firenet';

export const DEFAULT_SECTIONS: readonly SectionId[] = SECTION_IDS;

/** Maintenance interval used when the config does not set `service_interval`. */
export const DEFAULT_SERVICE_INTERVAL = 1500;

export type StoveTone = 'off' | 'idle' | 'active' | 'busy' | 'error';

export interface StoveStateInfo {
  /** Translation key for the human label. */
  labelKey: TranslationKey;
  icon: string;
  tone: StoveTone;
  /** True while pellets burn and the flame icon should animate. */
  burning: boolean;
}

/**
 * Stove states reported by `sensor.open_firenet_stove_state`.
 * Kept in sync with `STOVE_STATES` in the integration.
 */
export const STOVE_STATES: Record<string, StoveStateInfo> = {
  off: { labelKey: 'state.off', icon: 'mdi:power', tone: 'off', burning: false },
  standby: { labelKey: 'state.standby', icon: 'mdi:sleep', tone: 'idle', burning: false },
  ignition: { labelKey: 'state.ignition', icon: 'mdi:fire', tone: 'active', burning: true },
  flame_start: { labelKey: 'state.flame_start', icon: 'mdi:fire', tone: 'active', burning: true },
  heating: { labelKey: 'state.heating', icon: 'mdi:fire', tone: 'active', burning: true },
  cleaning: { labelKey: 'state.cleaning', icon: 'mdi:auto-fix', tone: 'busy', burning: false },
  burn_off: { labelKey: 'state.burn_off', icon: 'mdi:fire-off', tone: 'idle', burning: false },
  splitlog: { labelKey: 'state.splitlog', icon: 'mdi:fire', tone: 'active', burning: true },
  splitlog_check: { labelKey: 'state.splitlog_check', icon: 'mdi:fire', tone: 'active', burning: true },
  splitlog_refuel: {
    labelKey: 'state.splitlog_refuel',
    icon: 'mdi:fire-alert',
    tone: 'busy',
    burning: true,
  },
  splitlog_no_refuel: {
    labelKey: 'state.splitlog_no_refuel',
    icon: 'mdi:fire-off',
    tone: 'idle',
    burning: false,
  },
  unknown: { labelKey: 'state.unknown', icon: 'mdi:help-circle-outline', tone: 'idle', burning: false },
};

export const UNKNOWN_STATE: StoveStateInfo = {
  labelKey: 'state.unknown',
  icon: 'mdi:help-circle-outline',
  tone: 'idle',
  burning: false,
};

/** Operating modes of the climate entity, mapped to translation keys. */
export const PRESET_KEYS: Record<string, TranslationKey> = {
  manual: 'preset.manual',
  auto: 'preset.auto',
  comfort: 'preset.comfort',
};

/** MultiAir fan preset modes: auto plus manual levels 1..5. */
export const FAN_PRESETS = ['auto', '1', '2', '3', '4', '5'] as const;
