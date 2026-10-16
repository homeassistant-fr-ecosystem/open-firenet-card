import { describe, expect, it } from 'vitest';

import '../src/open-firenet-card-editor';
import type { OpenFirenetCardEditor } from '../src/open-firenet-card-editor';
import type { EntityRegistryEntry, HassEntity, HomeAssistant } from '../src/types';

function reg(id: string, translationKey: string, deviceId = 'dev1'): EntityRegistryEntry {
  return { entity_id: id, device_id: deviceId, platform: 'open_firenet', translation_key: translationKey };
}

function st(id: string, state: string, attributes: Record<string, unknown> = {}): HassEntity {
  return { entity_id: id, state, attributes, last_changed: '', last_updated: '' };
}

function makeHass(): HomeAssistant {
  const list = [
    reg('climate.open_firenet', 'open_firenet'),
    reg('sensor.open_firenet_stove_state', 'stove_state'),
    reg('switch.open_firenet_heating_schedule', 'heating_schedule'),
  ];
  const entities: Record<string, EntityRegistryEntry> = {};
  for (const e of list) {
    entities[e.entity_id] = e;
  }
  return {
    states: {
      'climate.open_firenet': st('climate.open_firenet', 'heat', {
        friendly_name: 'Poêle salon',
      }),
      'sensor.open_firenet_stove_state': st('sensor.open_firenet_stove_state', 'heating'),
      'switch.open_firenet_heating_schedule': st('switch.open_firenet_heating_schedule', 'on'),
    },
    entities,
    devices: {},
    language: 'fr',
    callService: async () => undefined,
  };
}

async function mountEditor(): Promise<OpenFirenetCardEditor> {
  const el = document.createElement('open-firenet-card-editor') as OpenFirenetCardEditor;
  el.setConfig({ entity: 'climate.open_firenet', show_controls: true });
  el.hass = makeHass();
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('open-firenet-card-editor', () => {
  it('uses only native controls (no ha-entity-picker dependency)', async () => {
    const el = await mountEditor();
    expect(el.shadowRoot?.querySelector('ha-entity-picker')).toBeNull();
    expect(el.shadowRoot?.querySelector('input[type=text]')).not.toBeNull();
  });

  it('offers the open_firenet entities as anchor suggestions', async () => {
    const el = await mountEditor();
    const options = Array.from(el.shadowRoot?.querySelectorAll('datalist option') ?? []).map(
      (o) => (o as HTMLOptionElement).value,
    );
    expect(options).toContain('climate.open_firenet');
    expect(options).toContain('sensor.open_firenet_stove_state');
  });

  it('shows the configured anchor entity', async () => {
    const el = await mountEditor();
    const input = el.shadowRoot?.querySelector('input[type=text]') as HTMLInputElement;
    expect(input.value).toBe('climate.open_firenet');
  });

  it('fires config-changed with the full config when a section is toggled', async () => {
    const el = await mountEditor();
    let received: Record<string, unknown> | undefined;
    el.addEventListener('config-changed', (ev) => {
      received = (ev as CustomEvent).detail.config;
    });

    const checkbox = el.shadowRoot?.querySelector('#section-consumption') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));

    expect(received).toBeDefined();
    expect(received!.entity).toBe('climate.open_firenet');
    expect(received!.sections).not.toContain('consumption');
    expect(received!.sections).toContain('status');
  });

  it('fires config-changed when the anchor entity changes', async () => {
    const el = await mountEditor();
    let received: Record<string, unknown> | undefined;
    el.addEventListener('config-changed', (ev) => {
      received = (ev as CustomEvent).detail.config;
    });

    const input = el.shadowRoot?.querySelector('input[type=text]') as HTMLInputElement;
    input.value = 'climate.other';
    input.dispatchEvent(new Event('change'));

    expect(received?.entity).toBe('climate.other');
  });
});
