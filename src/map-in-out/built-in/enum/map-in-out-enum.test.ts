import { describe, expect, it } from 'vitest';
import { mapInOutEnum } from './map-in-out-enum.ts';

describe('mapInOutEnum', () => {
  const parity = mapInOutEnum([
    [0, 'even'],
    [1, 'odd'],
  ]);

  it('should map inputs to outputs with inOut', () => {
    expect(parity.inOut(0)).toBe('even');
    expect(parity.inOut(1)).toBe('odd');
  });

  it('should map outputs to inputs with outIn', () => {
    expect(parity.outIn('even')).toBe(0);
    expect(parity.outIn('odd')).toBe(1);
  });

  it('should support round trips inOut then outIn', () => {
    for (const value of [0, 1]) {
      expect(parity.outIn(parity.inOut(value))).toBe(value);
    }
  });

  it('should throw when the input is not part of the entries with inOut', () => {
    expect(() => parity.inOut(2)).toThrow('Missing enum key: 2');
  });

  it('should throw when the output is not part of the entries with outIn', () => {
    expect(() => parity.outIn('unknown')).toThrow('Missing enum key: "unknown"');
  });

  it('should return a frozen MapInOut', () => {
    expect(Object.isFrozen(parity)).toBe(true);
  });
});
