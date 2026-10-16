import { describe, expect, it } from 'vitest';
import { mapInOutFactor } from './map-in-out-factor.ts';

describe('mapInOutFactor', () => {
  it('should create a MapInOut multiplying values by the factor with inOut', () => {
    const factor50 = mapInOutFactor(50);
    expect(factor50.inOut(1)).toBe(50);
    expect(factor50.inOut(0.5)).toBe(25);
    expect(factor50.inOut(0)).toBe(0);
    expect(factor50.inOut(3)).toBe(150);
  });

  it('should create a MapInOut dividing values by the factor with outIn', () => {
    const factor50 = mapInOutFactor(50);
    expect(factor50.outIn(50)).toBe(1);
    expect(factor50.outIn(25)).toBe(0.5);
    expect(factor50.outIn(0)).toBe(0);
    expect(factor50.outIn(150)).toBe(3);
  });

  it('should support round trips inOut then outIn', () => {
    const factor7 = mapInOutFactor(7);
    for (const value of [0, 7, 14, 1, 133.7, -42]) {
      expect(factor7.outIn(factor7.inOut(value))).toBe(value);
    }
  });

  it('should return a frozen MapInOut', () => {
    expect(Object.isFrozen(mapInOutFactor(2))).toBe(true);
  });
});
