import { describe, expect, it } from 'vitest';

import pkg from '../package.json';
import { VERSION } from '../src/const';

describe('version', () => {
  it('keeps the card banner version in sync with package.json', () => {
    expect(VERSION).toBe(pkg.version);
  });
});
