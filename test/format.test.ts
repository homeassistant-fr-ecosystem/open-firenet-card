import { describe, expect, it } from 'vitest';

import {
  formatDuration,
  formatNumber,
  isOn,
  rssiQuality,
  serviceLevel,
  serviceTone,
  stateNumber,
  stoveStateInfo,
} from '../src/format';
import { DURATION_UNITS, localize } from '../src/localize';
import type { HassEntity } from '../src/types';

function entity(state: string): HassEntity {
  return {
    entity_id: 'sensor.test',
    state,
    attributes: {},
    last_changed: '',
    last_updated: '',
  };
}

describe('stateNumber', () => {
  it('parses numeric states', () => {
    expect(stateNumber(entity('21.5'))).toBe(21.5);
  });

  it('returns null for unknown, unavailable, empty and non-numeric states', () => {
    expect(stateNumber(entity('unknown'))).toBeNull();
    expect(stateNumber(entity('unavailable'))).toBeNull();
    expect(stateNumber(entity(''))).toBeNull();
    expect(stateNumber(entity('on'))).toBeNull();
    expect(stateNumber(undefined)).toBeNull();
    expect(stateNumber(null)).toBeNull();
  });
});

describe('isOn', () => {
  it('detects the on state', () => {
    expect(isOn(entity('on'))).toBe(true);
    expect(isOn(entity('off'))).toBe(false);
    expect(isOn(undefined)).toBe(false);
  });
});

describe('formatNumber', () => {
  it('returns an em dash for missing values', () => {
    expect(formatNumber(null)).toBe('—');
    expect(formatNumber(Number.NaN)).toBe('—');
  });

  it('rounds to the requested number of decimals', () => {
    // Locale-dependent decimal separator (',' or '.'), so match both.
    expect(formatNumber(21.456, 1)).toMatch(/^21[.,]5$/);
    // Below 1000 there is no grouping separator, so this is deterministic.
    expect(formatNumber(234.7, 0)).toBe('235');
  });
});

describe('formatDuration', () => {
  it('formats days, hours and minutes with English units by default', () => {
    expect(formatDuration(3 * 86400 + 4 * 3600)).toBe('3 d 4 h');
    expect(formatDuration(2 * 3600 + 5 * 60)).toBe('2 h 5 min');
    expect(formatDuration(7 * 60)).toBe('7 min');
  });

  it('uses the units of the requested language', () => {
    expect(formatDuration(3 * 86400 + 4 * 3600, DURATION_UNITS.fr)).toBe('3 j 4 h');
  });

  it('returns an em dash for invalid input', () => {
    expect(formatDuration(null)).toBe('—');
    expect(formatDuration(-5)).toBe('—');
  });
});

describe('rssiQuality', () => {
  it('classifies signal strength into levels 0..4', () => {
    expect(rssiQuality(-45).level).toBe(4);
    expect(rssiQuality(-55).level).toBe(3);
    expect(rssiQuality(-65).level).toBe(2);
    expect(rssiQuality(-75).level).toBe(1);
    expect(rssiQuality(-90).level).toBe(0);
    expect(rssiQuality(null).level).toBe(0);
  });
});

describe('serviceLevel', () => {
  it('computes the remaining share of the interval', () => {
    expect(serviceLevel(300, 1500)).toBeCloseTo(20);
    expect(serviceLevel(3000, 1500)).toBe(100);
    expect(serviceLevel(-10, 1500)).toBe(0);
  });

  it('returns null when it cannot be computed', () => {
    expect(serviceLevel(null, 1500)).toBeNull();
    expect(serviceLevel(300, 0)).toBeNull();
  });
});

describe('serviceTone', () => {
  it('flags low countdowns', () => {
    expect(serviceTone(5)).toBe('danger');
    expect(serviceTone(20)).toBe('warn');
    expect(serviceTone(60)).toBe('ok');
    expect(serviceTone(null)).toBe('ok');
  });
});

describe('stoveStateInfo', () => {
  it('maps known states to a label key', () => {
    expect(stoveStateInfo('heating').labelKey).toBe('state.heating');
    expect(stoveStateInfo('heating').burning).toBe(true);
    expect(localize('fr', stoveStateInfo('heating').labelKey)).toBe('En chauffe');
    expect(localize('en', stoveStateInfo('heating').labelKey)).toBe('Heating');
  });

  it('falls back to a safe unknown state', () => {
    expect(stoveStateInfo('does_not_exist').labelKey).toBe('state.unknown');
    expect(stoveStateInfo(null).labelKey).toBe('state.unknown');
  });
});
