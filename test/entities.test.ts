import { describe, expect, it } from 'vitest';

import { discoverEntities, findAnchorEntity } from '../src/entities';
import type { EntityRegistryEntry, HassEntity, HomeAssistant } from '../src/types';

function entry(
  entityId: string,
  translationKey: string,
  deviceId = 'dev1',
): EntityRegistryEntry {
  return {
    entity_id: entityId,
    device_id: deviceId,
    platform: 'open_firenet',
    translation_key: translationKey,
  };
}

function state(entityId: string): HassEntity {
  return { entity_id: entityId, state: 'on', attributes: {}, last_changed: '', last_updated: '' };
}

/** A realistic registry: two devices, both on the open_firenet platform. */
function makeHass(): HomeAssistant {
  const registryEntries: EntityRegistryEntry[] = [
    entry('climate.open_firenet', 'open_firenet'),
    entry('sensor.open_firenet_room_temperature', 'room_temperature'),
    entry('sensor.open_firenet_stove_state', 'stove_state'),
    entry('sensor.open_firenet_combustion_chamber_temperature', 'combustion_temperature'),
    entry('binary_sensor.open_firenet_connected', 'connected'),
    entry('binary_sensor.open_firenet_combustion_active', 'burning'),
    entry('fan.open_firenet_multiair_1', 'multiair_1'),
    entry('number.open_firenet_heating_power', 'heating_power'),
    entry('switch.open_firenet_heating_schedule', 'heating_schedule'),
    // Same platform, another device: must never be picked for this stove.
    entry('sensor.open_firenet_room_temperature_2', 'room_temperature', 'dev2'),
  ];
  const entities: Record<string, EntityRegistryEntry> = {};
  for (const e of registryEntries) {
    entities[e.entity_id] = e;
  }
  return {
    states: {
      'climate.open_firenet': state('climate.open_firenet'),
      'sensor.open_firenet_room_temperature': state('sensor.open_firenet_room_temperature'),
    },
    entities,
    devices: {
      dev1: { id: 'dev1', name: 'Poêle', model: 'RIKA DOMO' },
      dev2: { id: 'dev2', name: 'Autre poêle' },
    },
    language: 'fr',
    callService: async () => undefined,
  };
}

describe('findAnchorEntity', () => {
  it('finds the open_firenet climate from the registry', () => {
    expect(findAnchorEntity(makeHass(), {})).toBe('climate.open_firenet');
  });

  it('prefers the configured entity', () => {
    expect(findAnchorEntity(makeHass(), { entity: 'sensor.open_firenet_stove_state' })).toBe(
      'sensor.open_firenet_stove_state',
    );
  });
});

describe('discoverEntities', () => {
  it('maps roles by translation key for the anchor device', () => {
    const found = discoverEntities(makeHass(), {});
    expect(found.climate).toBe('climate.open_firenet');
    expect(found.room_temperature).toBe('sensor.open_firenet_room_temperature');
    expect(found.stove_state).toBe('sensor.open_firenet_stove_state');
    expect(found.combustion_temperature).toBe(
      'sensor.open_firenet_combustion_chamber_temperature',
    );
    expect(found.connected).toBe('binary_sensor.open_firenet_connected');
    expect(found.burning).toBe('binary_sensor.open_firenet_combustion_active');
    expect(found.multiair_1).toBe('fan.open_firenet_multiair_1');
    expect(found.heating_power).toBe('number.open_firenet_heating_power');
    expect(found.heating_schedule).toBe('switch.open_firenet_heating_schedule');
  });

  it('never picks an entity from another device', () => {
    const found = discoverEntities(makeHass(), {});
    expect(found.room_temperature).not.toBe('sensor.open_firenet_room_temperature_2');
  });

  it('honours explicit per-role overrides', () => {
    const found = discoverEntities(makeHass(), { room_temperature: 'sensor.custom_temp' });
    expect(found.room_temperature).toBe('sensor.custom_temp');
  });

  it('leaves optional roles undefined when absent', () => {
    const found = discoverEntities(makeHass(), {});
    expect(found.multiair_2).toBeUndefined();
    expect(found.board_temperature).toBeUndefined();
    expect(found.frost_protection).toBeUndefined();
  });

  it('falls back to entity-id suffixes when the registry is empty', () => {
    const hass = makeHass();
    hass.entities = {};
    const found = discoverEntities(hass, {});
    expect(found.room_temperature).toBe('sensor.open_firenet_room_temperature');
  });
});
