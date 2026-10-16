import { describe, expect, it } from 'vitest';

import { OpenFirenetCard } from '../src/open-firenet-card';
import type { EntityRegistryEntry, HassEntity, HomeAssistant } from '../src/types';

function reg(entityId: string, translationKey: string): EntityRegistryEntry {
  return {
    entity_id: entityId,
    device_id: 'dev1',
    platform: 'open_firenet',
    translation_key: translationKey,
  };
}

function st(entityId: string, state: string, attributes: Record<string, unknown> = {}): HassEntity {
  return { entity_id: entityId, state, attributes, last_changed: '', last_updated: '' };
}

/** A complete-ish stove, enough to exercise every section. */
function makeHass(): HomeAssistant {
  const entries: EntityRegistryEntry[] = [
    reg('climate.open_firenet', 'open_firenet'),
    reg('sensor.open_firenet_stove_state', 'stove_state'),
    reg('sensor.open_firenet_room_temperature', 'room_temperature'),
    reg('sensor.open_firenet_combustion_chamber_temperature', 'combustion_temperature'),
    reg('sensor.open_firenet_board_temperature', 'board_temperature'),
    reg('sensor.open_firenet_pellets_consumed', 'pellets_total_kg'),
    reg('sensor.open_firenet_pellet_operating_hours', 'pellet_hours'),
    reg('sensor.open_firenet_service_countdown', 'service_countdown_kg'),
    reg('sensor.open_firenet_wifi_signal_strength', 'wifi_rssi'),
    reg('sensor.open_firenet_uptime', 'uptime_seconds'),
    reg('sensor.open_firenet_flue_draft_fan_speed', 'fan_speed_rpm'),
    reg('sensor.open_firenet_pellet_auger_speed', 'auger_speed_rpm'),
    reg('binary_sensor.open_firenet_connected', 'connected'),
    reg('binary_sensor.open_firenet_combustion_active', 'burning'),
    reg('binary_sensor.open_firenet_stove_error', 'problem'),
    reg('number.open_firenet_heating_power', 'heating_power'),
    reg('fan.open_firenet_multiair_1', 'multiair_1'),
    reg('number.open_firenet_multiair_1_convection_trim', 'multiair_1_area'),
    reg('switch.open_firenet_heating_schedule', 'heating_schedule'),
  ];
  const entities: Record<string, EntityRegistryEntry> = {};
  for (const e of entries) {
    entities[e.entity_id] = e;
  }
  return {
    states: {
      'climate.open_firenet': st('climate.open_firenet', 'heat', {
        current_temperature: 21.4,
        temperature: 22,
        min_temp: 14,
        max_temp: 28,
        target_temp_step: 1,
        preset_mode: 'comfort',
        preset_modes: ['manual', 'auto', 'comfort'],
      }),
      'sensor.open_firenet_stove_state': st('sensor.open_firenet_stove_state', 'heating'),
      'sensor.open_firenet_room_temperature': st('sensor.open_firenet_room_temperature', '21.4'),
      'sensor.open_firenet_combustion_chamber_temperature': st(
        'sensor.open_firenet_combustion_chamber_temperature',
        '187',
      ),
      'sensor.open_firenet_board_temperature': st('sensor.open_firenet_board_temperature', '42'),
      'sensor.open_firenet_pellets_consumed': st('sensor.open_firenet_pellets_consumed', '1245'),
      'sensor.open_firenet_pellet_operating_hours': st(
        'sensor.open_firenet_pellet_operating_hours',
        '680',
      ),
      'sensor.open_firenet_service_countdown': st(
        'sensor.open_firenet_service_countdown',
        '320',
      ),
      'sensor.open_firenet_wifi_signal_strength': st(
        'sensor.open_firenet_wifi_signal_strength',
        '-58',
      ),
      'sensor.open_firenet_uptime': st('sensor.open_firenet_uptime', '259200'),
      'sensor.open_firenet_flue_draft_fan_speed': st(
        'sensor.open_firenet_flue_draft_fan_speed',
        '2400',
      ),
      'sensor.open_firenet_pellet_auger_speed': st(
        'sensor.open_firenet_pellet_auger_speed',
        '3.1',
      ),
      'binary_sensor.open_firenet_connected': st('binary_sensor.open_firenet_connected', 'on'),
      'binary_sensor.open_firenet_combustion_active': st(
        'binary_sensor.open_firenet_combustion_active',
        'on',
      ),
      'binary_sensor.open_firenet_stove_error': st('binary_sensor.open_firenet_stove_error', 'off'),
      'number.open_firenet_heating_power': st('number.open_firenet_heating_power', '70', {
        min: 30,
        max: 100,
        step: 5,
      }),
      'fan.open_firenet_multiair_1': st('fan.open_firenet_multiair_1', 'on', {
        preset_mode: '3',
        friendly_name: 'MultiAir 1',
      }),
      'number.open_firenet_multiair_1_convection_trim': st(
        'number.open_firenet_multiair_1_convection_trim',
        '10',
        { min: -30, max: 30, step: 5 },
      ),
      'switch.open_firenet_heating_schedule': st(
        'switch.open_firenet_heating_schedule',
        'on',
      ),
    },
    entities,
    devices: { dev1: { id: 'dev1', name: 'Poêle salon', model: 'RIKA DOMO' } },
    language: 'fr',
    callService: async () => undefined,
  };
}

async function mount(config: Record<string, unknown>): Promise<OpenFirenetCard> {
  const el = document.createElement('open-firenet-card') as OpenFirenetCard;
  el.setConfig({ entity: 'climate.open_firenet', ...config });
  el.hass = makeHass();
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

function text(el: OpenFirenetCard): string {
  return el.shadowRoot?.textContent ?? '';
}

describe('open-firenet-card rendering', () => {
  it('shows the stove state, temperatures, model and device name', async () => {
    const el = await mount({});
    const content = text(el);
    expect(content).toContain('En chauffe');
    expect(content).toContain('RIKA DOMO');
    expect(content).toContain('Poêle salon');
    expect(content).toContain('Connecté');
    expect(content).toContain('Flamme');
  });

  it('renders every default section for a fully-equipped stove', async () => {
    const el = await mount({});
    const content = text(el);
    expect(content).toContain('Chauffage');
    expect(content).toContain('Températures');
    expect(content).toContain('Ventilateurs');
    expect(content).toContain('Consommation');
    expect(content).toContain('Mécanique');
    expect(content).toContain('Passerelle');
    expect(content).toContain('Planning');
  });

  it('exposes interactive controls by default', async () => {
    const el = await mount({});
    expect(el.shadowRoot?.querySelector('input[type=range]')).not.toBeNull();
    expect(el.shadowRoot?.querySelectorAll('button').length).toBeGreaterThan(0);
  });

  it('hides controls in read-only mode', async () => {
    const el = await mount({ show_controls: false });
    const content = text(el);
    expect(content).not.toContain('Démarrer');
    expect(content).not.toContain('Arrêter');
    expect(el.shadowRoot?.querySelector('input[type=range]')).toBeNull();
    // Still shows the state.
    expect(content).toContain('En chauffe');
  });

  it('limits rendering to the requested sections', async () => {
    const el = await mount({ sections: ['status'] });
    const content = text(el);
    expect(content).toContain('En chauffe');
    expect(content).not.toContain('Consommation');
    expect(content).not.toContain('Passerelle');
  });

  it('renders in English when Home Assistant is in English', async () => {
    const el = document.createElement('open-firenet-card') as OpenFirenetCard;
    el.setConfig({ entity: 'climate.open_firenet' });
    const hass = makeHass();
    hass.language = 'en';
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    const content = text(el);
    expect(content).toContain('Heating');
    expect(content).toContain('Connected');
    expect(content).toContain('Consumption & maintenance');
    expect(content).not.toContain('En chauffe');
  });

  it('lets the config force a language over the Home Assistant locale', async () => {
    const el = document.createElement('open-firenet-card') as OpenFirenetCard;
    el.setConfig({ entity: 'climate.open_firenet', language: 'en' });
    el.hass = makeHass(); // hass.language = 'fr'
    document.body.appendChild(el);
    await el.updateComplete;

    const content = text(el);
    expect(content).toContain('Heating');
    expect(content).not.toContain('En chauffe');
  });

  it('calls the right service when toggling the stove off', async () => {
    const calls: Array<[string, string, Record<string, unknown> | undefined]> = [];
    const el = document.createElement('open-firenet-card') as OpenFirenetCard;
    el.setConfig({ entity: 'climate.open_firenet' });
    const hass = makeHass();
    hass.callService = async (d, s, data) => {
      calls.push([d, s, data]);
      return undefined;
    };
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    const buttons = Array.from(el.shadowRoot?.querySelectorAll('button') ?? []);
    const stop = buttons.find((b) => b.textContent?.includes('Arrêter'));
    expect(stop).toBeDefined();
    stop!.dispatchEvent(new Event('click'));
    await el.updateComplete;

    expect(calls).toContainEqual([
      'climate',
      'set_hvac_mode',
      { entity_id: 'climate.open_firenet', hvac_mode: 'off' },
    ]);
  });
});

describe('card conformance to the Lovelace API', () => {
  it('declares grid options for the sections view', () => {
    const options = new OpenFirenetCard().getGridOptions();
    expect(options.columns).toBe(12);
    expect(options.min_columns).toBe(6);
  });

  it('builds a stub config from the open_firenet entities', () => {
    const config = OpenFirenetCard.getStubConfig(
      makeHass(),
      ['light.kitchen', 'climate.open_firenet'],
      [],
    );
    expect(config.entity).toBe('climate.open_firenet');
    expect(config.show_controls).toBe(true);
  });

  it('falls back to a usable stub config without candidates', () => {
    const config = OpenFirenetCard.getStubConfig(makeHass(), [], []);
    expect(config.entity).toBe('climate.open_firenet');
  });

  it('registers in the card picker with a preview and documentation link', () => {
    const entry = (window.customCards ?? []).find((c) => c.type === 'open-firenet-card');
    expect(entry).toBeDefined();
    expect(entry?.preview).toBe(true);
    expect(entry?.documentationURL).toContain('http');
  });

  it('suggests the card for the stove climate entity only', () => {
    const entry = (window.customCards ?? []).find((c) => c.type === 'open-firenet-card');
    const suggestion = entry?.getEntitySuggestion?.(makeHass(), 'climate.open_firenet');
    expect(suggestion?.config).toEqual({
      type: 'custom:open-firenet-card',
      entity: 'climate.open_firenet',
    });
    expect(entry?.getEntitySuggestion?.(makeHass(), 'light.kitchen')).toBeNull();
    expect(
      entry?.getEntitySuggestion?.(makeHass(), 'binary_sensor.open_firenet_connected'),
    ).toBeNull();
  });

  it('prefers the Home Assistant state formatter when available', async () => {
    const el = document.createElement('open-firenet-card') as OpenFirenetCard;
    el.setConfig({ entity: 'climate.open_firenet' });
    const hass = makeHass();
    hass.formatEntityState = (state) =>
      state.entity_id.includes('stove_state') ? 'FORMATTED STATE' : '';
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(text(el)).toContain('FORMATTED STATE');
  });
});

describe('states context (P4)', () => {
  function answerContextRequests(
    provider: HTMLElement,
    initialStates: HomeAssistant['states'],
  ): { subscribed: () => boolean; push: (states: HomeAssistant['states']) => void } {
    let subscribed = false;
    let push: (states: HomeAssistant['states']) => void = () => {};
    provider.addEventListener('context-request', (ev) => {
      const e = ev as CustomEvent & {
        context?: unknown;
        subscribe?: boolean;
        callback?: (states: HomeAssistant['states'], unsubscribe: () => void) => void;
      };
      if (e.context !== 'states' || !e.callback) {
        return;
      }
      subscribed = e.subscribe === true;
      push = (states) => e.callback!(states, () => {});
      e.callback(initialStates, () => {});
    });
    return { subscribed: () => subscribed, push: (states) => push(states) };
  }

  it('requests the states context with subscribe and renders from it', async () => {
    const contextStates = makeHass().states;
    contextStates['sensor.open_firenet_stove_state'] = st(
      'sensor.open_firenet_stove_state',
      'cleaning',
    );
    const provider = document.createElement('div');
    const { subscribed } = answerContextRequests(provider, contextStates);
    document.body.appendChild(provider);

    const el = document.createElement('open-firenet-card') as OpenFirenetCard;
    provider.appendChild(el);
    el.setConfig({ entity: 'climate.open_firenet', sections: ['status'] });
    el.hass = makeHass(); // hass.states says 'heating'
    await el.updateComplete;

    expect(subscribed()).toBe(true);
    expect(text(el)).toContain('Nettoyage'); // taken from the context
    expect(text(el)).not.toContain('En chauffe');
  });

  it('re-renders when the context pushes new states', async () => {
    const provider = document.createElement('div');
    const { push } = answerContextRequests(provider, makeHass().states);
    document.body.appendChild(provider);

    const el = document.createElement('open-firenet-card') as OpenFirenetCard;
    provider.appendChild(el);
    el.setConfig({ entity: 'climate.open_firenet', sections: ['status'] });
    el.hass = makeHass();
    await el.updateComplete;
    expect(text(el)).toContain('En chauffe');

    const next = makeHass().states;
    next['sensor.open_firenet_stove_state'] = st('sensor.open_firenet_stove_state', 'off');
    push(next);
    await el.updateComplete;
    expect(text(el)).toContain('Éteint');
  });

  it('ignores hass state changes while the context is active', async () => {
    const provider = document.createElement('div');
    answerContextRequests(provider, makeHass().states);
    document.body.appendChild(provider);

    const el = document.createElement('open-firenet-card') as OpenFirenetCard;
    provider.appendChild(el);
    el.setConfig({ entity: 'climate.open_firenet', sections: ['status'] });
    el.hass = makeHass();
    await el.updateComplete;
    expect(text(el)).toContain('En chauffe');

    const next = makeHass();
    next.states['sensor.open_firenet_stove_state'] = st('sensor.open_firenet_stove_state', 'off');
    el.hass = next;
    await el.updateComplete;

    // The context still holds 'heating': the card must not follow hass.states.
    expect(text(el)).toContain('En chauffe');
    expect(text(el)).not.toContain('Éteint');
  });

  it('unsubscribes from the states context when removed', async () => {
    let unsubscribed = false;
    const provider = document.createElement('div');
    provider.addEventListener('context-request', (ev) => {
      const e = ev as CustomEvent & {
        context?: unknown;
        callback?: (states: HomeAssistant['states'], unsubscribe: () => void) => void;
      };
      if (e.context !== 'states' || !e.callback) {
        return;
      }
      e.callback(makeHass().states, () => {
        unsubscribed = true;
      });
    });
    document.body.appendChild(provider);

    const el = document.createElement('open-firenet-card') as OpenFirenetCard;
    provider.appendChild(el);
    el.setConfig({ entity: 'climate.open_firenet' });
    el.hass = makeHass();
    await el.updateComplete;

    el.remove();
    expect(unsubscribed).toBe(true);
  });
});
