import { describe, expect, it } from 'vitest';
import { DECI } from './deci.ts';

describe('DECI', () => {
  it('should convert a value expressed in tenths to a decimal with inOut', () => {
    expect(DECI.inOut(10)).toBe(1);
    expect(DECI.inOut(5)).toBe(0.5);
    expect(DECI.inOut(0)).toBe(0);
    expect(DECI.inOut(2.5)).toBe(0.25);
  });

  it('should convert a decimal to a value expressed in tenths with outIn', () => {
    expect(DECI.outIn(1)).toBe(10);
    expect(DECI.outIn(0.5)).toBe(5);
    expect(DECI.outIn(0)).toBe(0);
    expect(DECI.outIn(0.25)).toBe(2.5);
  });

  it('should support round trips inOut then outIn', () => {
    for (const value of [0, 2.5, 5, 7.5, 10, 13.37, -4.2]) {
      expect(DECI.outIn(DECI.inOut(value))).toBe(value);
    }
  });
});
